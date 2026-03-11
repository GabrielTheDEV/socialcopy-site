/**
 * Environment Validation
 * Ensures all required environment variables are present at runtime
 */

const requiredEnvVars = [
  'VITE_API_BASE',
] as const;

type EnvVar = (typeof requiredEnvVars)[number];

interface ValidatedEnv {
  API_BASE: string;
}

/**
 * Validate environment variables at runtime
 * Throws error if any required variable is missing
 */
export const validateEnvironment = (): ValidatedEnv => {
  const missing: EnvVar[] = [];

  for (const envVar of requiredEnvVars) {
    if (!import.meta.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
      `Please ensure these are set in your .env file.`
    );
  }

  return {
    API_BASE: import.meta.env.VITE_API_BASE as string,
  };
};

/**
 * Get validated environment with fallback
 * Returns validated env or throws in production
 */
export const getValidatedEnv = (): ValidatedEnv => {
  try {
    return validateEnvironment();
  } catch (error) {
    if (import.meta.env.PROD) {
      throw error;
    }
    // In development, use defaults if available
    console.warn('[Env] Using default environment values for development');
    return {
      API_BASE: import.meta.env.VITE_API_BASE || 'http://localhost:8000',
    };
  }
};

export default {
  validateEnvironment,
  getValidatedEnv,
};
