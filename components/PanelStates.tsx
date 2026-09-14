"use client";

import { CircleAlert, ScanSearch, Sparkles } from "lucide-react";

export function EmptyResultsState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-accent-muted)]">
        <ScanSearch className="size-5 text-[var(--color-accent)]" />
      </div>
      <p className="text-sm font-medium text-[var(--color-text)]">Aún no hay análisis</p>
      <p className="max-w-[26ch] text-sm text-[var(--color-text-muted)]">
        Escribe o pega tu código y pulsa «Analizar código» para obtener el score, resumen y
        sugerencias.
      </p>
    </div>
  );
}

export function LoadingResultsState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-brand-muted)]">
        <Sparkles className="size-5 animate-pulse text-[var(--color-brand)]" />
      </div>
      <p className="text-sm font-medium text-[var(--color-text)]">Analizando tu código…</p>
      <p className="max-w-[26ch] text-sm text-[var(--color-text-muted)]">
        La IA está revisando estructura, complejidad y buenas prácticas.
      </p>
    </div>
  );
}

export function ErrorResultsState({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-bad-muted)]">
        <CircleAlert className="size-5 text-[var(--color-bad)]" />
      </div>
      <p className="text-sm font-medium text-[var(--color-text)]">No se pudo analizar el código</p>
      <p className="max-w-[32ch] text-sm text-[var(--color-text-muted)]">{message}</p>
    </div>
  );
}
