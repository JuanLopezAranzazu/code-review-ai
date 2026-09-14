"use client";

import { Select } from "radix-ui";
import { Check, ChevronDown } from "lucide-react";
import { LANGUAGES } from "@/lib/languages";

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-1.5 text-sm text-[var(--color-text)] hover:border-[var(--color-border-strong)] focus:outline-none data-[state=open]:border-[var(--color-brand)] transition-colors"
        aria-label="Lenguaje"
      >
        <span className="text-[var(--color-text-faint)]">Lenguaje</span>
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="size-3.5 text-[var(--color-text-muted)]" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={6}
          className="z-50 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-panel)]"
        >
          <Select.Viewport className="p-1">
            {LANGUAGES.map((lang) => (
              <Select.Item
                key={lang.id}
                value={lang.id}
                className="relative flex cursor-pointer select-none items-center rounded-[var(--radius-sm)] py-1.5 pl-7 pr-3 text-sm text-[var(--color-text)] outline-none data-[highlighted]:bg-[var(--color-brand-muted)] data-[highlighted]:text-[var(--color-text)]"
              >
                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <Check className="size-3.5 text-[var(--color-brand)]" />
                </Select.ItemIndicator>
                <Select.ItemText>{lang.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
