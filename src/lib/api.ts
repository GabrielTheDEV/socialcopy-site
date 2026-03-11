export type GeneratedContent = {
  platform: string;
  content: string;
  hashtags?: string[];
};

import { fetchWithRetry, ApiError, getErrorMessage } from './errorHandler';

const API_BASE = (import.meta.env.VITE_API_BASE as string) || '';
// console.log(import.meta.env.VITE_API_BASE).;

if (!API_BASE && typeof window !== 'undefined') {
  console.warn('[API] VITE_API_BASE environment variable is not set');
}

export type GeneratePayload = {
  baseText: string;
  language?: string; // e.g. 'pt-BR'
  tone?: string; // e.g. 'profissional e persuasivo'
  includeHashtags: boolean;
  socialNetworks: string[]; // e.g. ['INSTAGRAM','LINKEDIN']
};

export async function generateContent(payload: GeneratePayload | {
  // backward-compat
  content: string;
  platforms: string[];
  includeTags: boolean;
}): Promise<GeneratedContent[]> {
  const url = API_BASE ? `${API_BASE.replace(/\/$/, '')}/copy/generate` : `/copy/generate`;

  // Normalize payload to the new API shape
  const body: GeneratePayload = 'baseText' in payload
    ? (payload as GeneratePayload)
    : {
        baseText: (payload as Record<string, unknown>).content as string,
        language: undefined,
        tone: undefined,
        includeHashtags: (payload as Record<string, unknown>).includeTags as boolean,
        socialNetworks: ((payload as Record<string, unknown>).platforms as string[]) || [],
      };

  try {
    const res = await fetchWithRetry(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const json = (await res.json()) as unknown;

  // Helper: map network string to internal platform id
  const mapNetworkToPlatform = (network?: string) => {
    if (!network) return network;
    const n = network.toUpperCase();
    switch (n) {
      case 'INSTAGRAM': return 'instagram';
      case 'LINKEDIN': return 'linkedin';
      case 'TWITTER':
      case 'X':
        return 'x';
      case 'FACEBOOK': return 'facebook';
      case 'TIKTOK': return 'tiktok';
      default:
        return network.toLowerCase();
    }
  };

  const extractHashtags = (text: string) => {
    if (!text) return undefined;
    // Unicode-aware hashtag extraction
    const matches = Array.from(text.matchAll(/#[\p{L}\p{N}_-]+/gu)).map(m => m[0]);
    return matches.length ? matches : undefined;
  };

  // If API returns array like [{ network, content }, ...]
  if (Array.isArray(json)) {
    return (json as Array<Record<string, unknown>>).map((item) => {
      const platform = mapNetworkToPlatform(item.network as string | undefined || item.platform as string | undefined || item.socialNetwork as string | undefined);
      const content = (item.content as string) || (item.text as string) || '';
      const hashtags = body.includeHashtags ? extractHashtags(content) : undefined;
      return { platform, content, hashtags } as GeneratedContent;
    });
  }

  // If API returns { results: [...] }
  if (json && typeof json === 'object' && 'results' in json && Array.isArray((json as Record<string, unknown>).results)) {
    return ((json as Record<string, unknown>).results as Array<Record<string, unknown>>).map((item) => {
      const platform = mapNetworkToPlatform(item.network as string | undefined || item.platform as string | undefined || item.socialNetwork as string | undefined);
      const content = (item.content as string) || (item.text as string) || '';
      const hashtags = body.includeHashtags ? extractHashtags(content) : undefined;
      return { platform, content, hashtags } as GeneratedContent;
    });
  }

  throw new Error('Unexpected API response format');
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'API_ERROR',
      0,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

export default {
  generateContent,
};
