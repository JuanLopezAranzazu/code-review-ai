import type { LanguageSupport } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { rust } from "@codemirror/lang-rust";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

export interface LanguageOption {
  id: string;
  label: string;
  extension: () => LanguageSupport;
  placeholder: string;
}

export const LANGUAGES: LanguageOption[] = [
  {
    id: "typescript",
    label: "TypeScript",
    extension: () => javascript({ jsx: true, typescript: true }),
    placeholder: `function suma(a: number, b: number): number {\n  return a + b;\n}`,
  },
  {
    id: "javascript",
    label: "JavaScript",
    extension: () => javascript({ jsx: true }),
    placeholder: `function suma(a, b) {\n  return a + b;\n}`,
  },
  {
    id: "python",
    label: "Python",
    extension: () => python(),
    placeholder: `def suma(a, b):\n    return a + b`,
  },
  {
    id: "java",
    label: "Java",
    extension: () => java(),
    placeholder: `public class Main {\n    public static int suma(int a, int b) {\n        return a + b;\n    }\n}`,
  },
  {
    id: "cpp",
    label: "C++",
    extension: () => cpp(),
    placeholder: `int suma(int a, int b) {\n    return a + b;\n}`,
  },
  {
    id: "php",
    label: "PHP",
    extension: () => php(),
    placeholder: `<?php\nfunction suma($a, $b) {\n    return $a + $b;\n}`,
  },
  {
    id: "rust",
    label: "Rust",
    extension: () => rust(),
    placeholder: `fn suma(a: i32, b: i32) -> i32 {\n    a + b\n}`,
  },
  {
    id: "html",
    label: "HTML",
    extension: () => html(),
    placeholder: `<button class="btn">Enviar</button>`,
  },
  {
    id: "css",
    label: "CSS",
    extension: () => css(),
    placeholder: `.btn {\n  padding: 8px 16px;\n}`,
  },
];

export function getLanguage(id: string): LanguageOption {
  return LANGUAGES.find((l) => l.id === id) ?? LANGUAGES[0];
}
