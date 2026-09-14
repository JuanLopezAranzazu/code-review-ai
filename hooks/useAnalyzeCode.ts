"use client";

import { useCallback, useState } from "react";
import type { CodeAnalysis } from "@/types/analysis";

interface UseAnalyzeCodeResult {
  analysis: CodeAnalysis | null;
  isLoading: boolean;
  error: string | null;
  analyze: (code: string, language: string) => Promise<void>;
  reset: () => void;
}

export function useAnalyzeCode(): UseAnalyzeCodeResult {
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (code: string, language: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "No se pudo analizar el código.");
      }

      setAnalysis(data as CodeAnalysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido al analizar el código.");
      setAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setAnalysis(null);
    setError(null);
  }, []);

  return { analysis, isLoading, error, analyze, reset };
}
