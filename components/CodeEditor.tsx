"use client";

import { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { getLanguage } from "../lib/languages";

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string) => void;
}

const editorTheme = EditorView.theme({
  "&": {
    fontSize: "13.5px",
    backgroundColor: "var(--color-bg-inset)",
    height: "100%",
  },
  ".cm-content": {
    fontFamily: "var(--font-mono)",
    padding: "16px 0",
    caretColor: "var(--color-brand)",
  },
  ".cm-gutters": {
    backgroundColor: "var(--color-bg-inset)",
    color: "var(--color-text-faint)",
    border: "none",
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(255, 107, 87, 0.05)",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "rgba(255, 107, 87, 0.08)",
    color: "var(--color-text-muted)",
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "var(--color-brand)",
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "rgba(255, 107, 87, 0.18) !important",
  },
  ".cm-scroller": {
    fontFamily: "var(--font-mono)",
  },
});

export function CodeEditor({ code, language, onChange }: CodeEditorProps) {
  const lang = getLanguage(language);
  const extensions = useMemo(() => [lang.extension(), editorTheme], [lang]);

  return (
    <div className="h-full overflow-hidden">
      <CodeMirror
        value={code}
        height="100%"
        theme={oneDark}
        extensions={extensions}
        onChange={onChange}
        placeholder={lang.placeholder}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          tabSize: 2,
        }}
        style={{ height: "100%" }}
      />
    </div>
  );
}
