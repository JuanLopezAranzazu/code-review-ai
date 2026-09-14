"use client";

import { AlertTriangle, Info, OctagonAlert } from "lucide-react";
import type { Severity, Suggestion } from "@/types/analysis";

const SEVERITY_CONFIG: Record<
  Severity,
  { label: string; icon: typeof Info; color: string; bg: string }
> = {
  info: {
    label: "Info",
    icon: Info,
    color: "var(--color-accent)",
    bg: "var(--color-accent-muted)",
  },
  warning: {
    label: "Aviso",
    icon: AlertTriangle,
    color: "var(--color-warn)",
    bg: "var(--color-warn-muted)",
  },
  critical: {
    label: "Crítico",
    icon: OctagonAlert,
    color: "var(--color-bad)",
    bg: "var(--color-bad-muted)",
  },
};

export function SuggestionList({ suggestions }: { suggestions: Suggestion[] }) {
  if (suggestions.length === 0) {
    return (
      <p className="text-sm text-[var(--color-text-muted)]">
        No se encontraron sugerencias adicionales.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2.5">
      {suggestions.map((s, i) => {
        const cfg = SEVERITY_CONFIG[s.severity];
        const Icon = cfg.icon;
        return (
          <li
            key={i}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3.5"
          >
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: cfg.bg }}
              >
                <Icon className="size-3.5" style={{ color: cfg.color }} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-medium text-[var(--color-text)]">{s.title}</h4>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
                    style={{ backgroundColor: cfg.bg, color: cfg.color }}
                  >
                    {cfg.label}
                  </span>
                  {typeof s.line === "number" && (
                    <span className="font-mono text-[11px] text-[var(--color-text-faint)]">
                      línea {s.line}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {s.description}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
