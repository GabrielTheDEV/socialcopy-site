/**
 * API Error Handler
 * Provides robust error handling, retry logic, and error categorization
 */

export class ApiError extends Error {
  constructor(
    public code: string,
    public status: number,
    public originalError?: Error
  ) {
    super(`API Error: ${code}`);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export type ErrorCategory = 
  | 'network'
  | 'server'
  | 'client'
  | 'timeout'
  | 'unknown';

export const categorizeError = (error: unknown): ErrorCategory => {
  if (error instanceof ApiError) {
    if (error.status >= 500) return 'server';
    if (error.status >= 400 && error.status < 500) return 'client';
  }

  if (error instanceof TypeError) {
    if (error.message.includes('fetch')) return 'network';
  }

  return 'unknown';
};

interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
  backoffMultiplier?: number;
  retryableStatuses?: number[];
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  delayMs: 1000,
  backoffMultiplier: 2,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

/**
 * Sleep utility with exponential backoff
 */
const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch with retry logic and proper error handling
 */
export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<Response> => {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...retryOptions };
  let lastError: Error | null = null;
  let delayMs = config.delayMs;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      // Check if we should retry based on status
      if (
        !response.ok &&
        attempt < config.maxRetries &&
        config.retryableStatuses.includes(response.status)
      ) {
        await sleep(delayMs);
        delayMs *= config.backoffMultiplier;
        continue;
      }

      if (!response.ok) {
        throw new ApiError(
          `HTTP_${response.status}`,
          response.status,
          new Error(await response.text())
        );
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (error instanceof TypeError && error.name === 'AbortError') {
        throw new ApiError('TIMEOUT', 408, lastError);
      }

      // Don't retry on the last attempt
      if (attempt < config.maxRetries) {
        await sleep(delayMs);
        delayMs *= config.backoffMultiplier;
        continue;
      }
    }
  }

  // If we get here, we've exhausted all retries
  if (lastError instanceof ApiError) {
    throw lastError;
  }

  throw new ApiError(
    'NETWORK_ERROR',
    0,
    lastError || new Error('Unknown error occurred')
  );
};

/**
 * Get user-friendly error message
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    switch (error.code) {
      case 'TIMEOUT':
        return 'Request timed out. Please try again.';
      case 'NETWORK_ERROR':
        return 'Network error. Please check your connection.';
      case 'HTTP_400':
        return 'Invalid request. Please check your input.';
      case 'HTTP_401':
        return 'Authentication required. Please log in.';
      case 'HTTP_403':
        return 'You do not have permission for this action.';
      case 'HTTP_404':
        return 'Resource not found.';
      case 'HTTP_429':
        return 'Too many requests. Please try again later.';
      case 'HTTP_500':
      case 'HTTP_502':
      case 'HTTP_503':
      case 'HTTP_504':
        return 'Server error. Please try again later.';
      default:
        return `Request failed: ${error.code}`;
    }
  }

  if (error instanceof Error) {
    return error.message || 'An unexpected error occurred';
  }

  return 'An unexpected error occurred';
};
