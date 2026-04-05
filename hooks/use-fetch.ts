"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useFetch<T>(url: string | null): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(() => {
    if (!url) return;

    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    fetch(url, { signal: controllerRef.current.signal, credentials: "same-origin" })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message ?? "Erro ao carregar dados");
        setLoading(false);
      });
  }, [url]);

  useEffect(() => {
    fetchData();
    return () => controllerRef.current?.abort();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
