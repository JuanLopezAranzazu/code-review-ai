"use client";

import { useState } from "react";
import { Code2, Loader2, Sparkles, Trash2 } from "lucide-react";
import { Tooltip } from "radix-ui";
import { CodeEditor } from "@/components/CodeEditor";
import { LanguageSelect } from "@/components/LanguageSelect";
import { ResultsPanel } from "@/components/ResultsPanel";
import {
  EmptyResultsState,
  ErrorResultsState,
  LoadingResultsState,
} from "@/components/PanelStates";
import { useAnalyzeCode } from "@/hooks/useAnalyzeCode";
import { getLanguage } from "@/lib/languages";

export default function Home() {
  const [language, setLanguage] = useState("typescript");
  const [code, setCode] = useState(getLanguage("typescript").placeholder);
  const { analysis, isLoading, error, analyze, reset } = useAnalyzeCode();

  const handleAnalyze = () => {
    if (!code.trim() || isLoading) return;
    analyze(code, language);
  };

  const handleClear = () => {
    setCode("");
    reset();
  };

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="flex h-screen flex-col bg-[var(--color-bg)]">
        <header className="flex shrink-0 items-center border-b border-[var(--color-border)] px-5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-brand-muted)]">
              <Code2 className="size-4 text-[var(--color-brand)]" />
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-none text-[var(--color-text)]">
                Code Review AI
              </h1>
              <p className="mt-1 text-[11px] leading-none text-[var(--color-text-faint)]">
                Revisión de código asistida por IA
              </p>
            </div>
          </div>
        </header>

        <main className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-2">
          {/* Panel del editor */}
          <section className="flex min-h-0 flex-col border-b border-[var(--color-border)] lg:border-b-0 lg:border-r">
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[var(--color-border)] px-4 py-2.5">
              <LanguageSelect value={language} onChange={setLanguage} />

              <div className="flex items-center gap-2">
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={handleClear}
                      className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text)]"
                      aria-label="Limpiar código"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={6}
                      className="rounded-[var(--radius-sm)] bg-[var(--color-bg-elevated)] px-2 py-1 text-xs text-[var(--color-text)] shadow-[var(--shadow-panel)]"
                    >
                      Limpiar
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>

                <button
                  onClick={handleAnalyze}
                  disabled={!code.trim() || isLoading}
                  className="flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-brand)] px-3.5 py-1.5 text-sm font-medium text-[#1a0f0c] transition-colors hover:bg-[var(--color-brand-hover)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Sparkles className="size-4" />
                  )}
                  Analizar código
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1">
              <CodeEditor code={code} language={language} onChange={setCode} />
            </div>
          </section>

          {/* Panel de resultados */}
          <section className="min-h-0 bg-[var(--color-bg)]">
            {isLoading && <LoadingResultsState />}
            {!isLoading && error && <ErrorResultsState message={error} />}
            {!isLoading && !error && !analysis && <EmptyResultsState />}
            {!isLoading && !error && analysis && <ResultsPanel analysis={analysis} />}
          </section>
        </main>
      </div>
    </Tooltip.Provider>
  );
}
