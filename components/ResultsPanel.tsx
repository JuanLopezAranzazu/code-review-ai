"use client";

import { Tabs } from "radix-ui";
import { Sparkles } from "lucide-react";
import type { CodeAnalysis } from "../types/analysis";
import { ScoreGauge } from "./ScoreGauge";
import { SuggestionList } from "./SuggestionList";
import { BestPracticesList } from "./BestPracticesList";
import { ComplexityCard } from "./ComplexityCard";

const TAB_TRIGGER_CLASS =
  "rounded-[var(--radius-sm)] px-3 py-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] data-[state=active]:bg-[var(--color-brand-muted)] data-[state=active]:text-[var(--color-brand-hover)]";

export function ResultsPanel({ analysis }: { analysis: CodeAnalysis }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-[var(--color-border)] p-5">
        <ScoreGauge score={analysis.score} />
      </div>

      <Tabs.Root defaultValue="resumen" className="flex min-h-0 flex-1 flex-col">
        <Tabs.List className="flex gap-1 border-b border-[var(--color-border)] px-3 pt-2">
          <Tabs.Trigger value="resumen" className={TAB_TRIGGER_CLASS}>
            Resumen
          </Tabs.Trigger>
          <Tabs.Trigger value="sugerencias" className={TAB_TRIGGER_CLASS}>
            Sugerencias
            <span className="ml-1.5 text-[var(--color-text-faint)]">
              {analysis.suggestions.length}
            </span>
          </Tabs.Trigger>
          <Tabs.Trigger value="practicas" className={TAB_TRIGGER_CLASS}>
            Buenas prácticas
          </Tabs.Trigger>
          <Tabs.Trigger value="complejidad" className={TAB_TRIGGER_CLASS}>
            Complejidad
          </Tabs.Trigger>
        </Tabs.List>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <Tabs.Content value="resumen" className="flex flex-col gap-5">
            <div className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]" />
              <p className="text-sm leading-relaxed text-[var(--color-text)]">{analysis.summary}</p>
            </div>

            {analysis.strengths.length > 0 && (
              <div>
                <h3 className="mb-2 text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
                  Puntos fuertes
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {analysis.strengths.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[var(--color-good)]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Tabs.Content>

          <Tabs.Content value="sugerencias">
            <SuggestionList suggestions={analysis.suggestions} />
          </Tabs.Content>

          <Tabs.Content value="practicas">
            <BestPracticesList practices={analysis.bestPractices} />
          </Tabs.Content>

          <Tabs.Content value="complejidad">
            <ComplexityCard complexity={analysis.complexity} />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}
