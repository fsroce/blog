import { useState, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string;
}

export function useAsync<T>(initialData: T | null = null) {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: false,
    error: '',
  });

  const execute = useCallback(async (asyncFn: () => Promise<T>) => {
    setState(s => ({ ...s, loading: true, error: '' }));
    try {
      const data = await asyncFn();
      setState({ data, loading: false, error: '' });
      return data;
    } catch (err: unknown) {
      const error = (err as { response?: { data?: { error?: string } } })
        .response?.data?.error || 'Something went wrong';
      setState(s => ({ ...s, loading: false, error }));
      throw err;
    }
  }, []);

  const setError = (error: string) => setState(s => ({ ...s, error }));
  const setData = (data: T) => setState(s => ({ ...s, data }));

  return { ...state, execute, setError, setData };
}
