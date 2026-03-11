import { useState, useCallback } from 'react';
import { generateContent, GeneratedContent, GeneratePayload } from '@/lib/api';
import { getErrorMessage } from '@/lib/errorHandler';

export function useGenerate(): {
  generate: (payload: GeneratePayload) => Promise<GeneratedContent[]>;
  loading: boolean;
  error: string | null;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (payload: GeneratePayload): Promise<GeneratedContent[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await generateContent(payload);
      return res;
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { generate, loading, error } as const;
}

export default useGenerate;
