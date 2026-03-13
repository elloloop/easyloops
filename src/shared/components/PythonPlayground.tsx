'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PYODIDE_CONFIG, MONACO_CONFIG } from '@/shared/constants';

interface PythonPlaygroundProps {
  initialCode: string;
}

// Strip REPL >>> prefixes and interleaved output lines
function cleanReplCode(code: string): string {
  const lines = code.split('\n');
  const hasRepl = lines.some((l) => l.trimStart().startsWith('>>>'));
  if (!hasRepl) return code;

  return lines
    .filter((l) => {
      const trimmed = l.trimStart();
      return trimmed.startsWith('>>>') || trimmed.startsWith('...');
    })
    .map((l) => {
      const trimmed = l.trimStart();
      if (trimmed.startsWith('>>> ')) return trimmed.slice(4);
      if (trimmed.startsWith('>>>')) return trimmed.slice(3);
      if (trimmed.startsWith('... ')) return trimmed.slice(4);
      if (trimmed.startsWith('...')) return trimmed.slice(3);
      return trimmed;
    })
    .join('\n');
}

const PythonPlayground: React.FC<PythonPlaygroundProps> = ({ initialCode }) => {
  const cleanedCode = React.useMemo(
    () => cleanReplCode(initialCode),
    [initialCode]
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [code, setCode] = useState(cleanedCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pyodideRef = useRef<any>(null);
  const codeRef = useRef(cleanedCode);

  // Keep codeRef in sync
  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  const loadPyodide = useCallback(async () => {
    if (pyodideRef.current) return;
    setPyodideLoading(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!('loadPyodide' in (window as any))) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = PYODIDE_CONFIG.CDN_URL;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Pyodide'));
          document.head.appendChild(script);
        });
        await new Promise((r) => setTimeout(r, 100));
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pyodideRef.current = await (window as any).loadPyodide({
        indexURL: PYODIDE_CONFIG.INDEX_URL,
      });
    } finally {
      setPyodideLoading(false);
    }
  }, []);

  // Load Monaco editor when expanded
  useEffect(() => {
    if (!isExpanded || !editorContainerRef.current) return;

    const container = editorContainerRef.current;

    const initEditor = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).require.config({ paths: { vs: MONACO_CONFIG.VS_PATH } });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).require(['vs/editor/editor.main'], (monaco: any) => {
        if (!container || editorRef.current) return;
        container.innerHTML = '';

        const lineCount = codeRef.current.split('\n').length;
        const editorHeight = Math.max(lineCount * 20 + 20, 80);
        container.style.height = `${editorHeight}px`;

        const editor = monaco.editor.create(container, {
          value: codeRef.current,
          language: 'python',
          theme: document.documentElement.classList.contains('dark')
            ? 'vs-dark'
            : 'vs',
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          lineHeight: 20,
          renderLineHighlight: 'none',
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'auto',
          },
        });

        editor.onDidChangeModelContent(() => {
          const newValue = editor.getValue();
          setCode(newValue);
          // Auto-resize editor height
          const newLineCount = newValue.split('\n').length;
          const newHeight = Math.max(newLineCount * 20 + 20, 80);
          container.style.height = `${newHeight}px`;
          editor.layout();
        });

        editorRef.current = editor;
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ('require' in (window as any)) {
      initEditor();
    } else {
      const script = document.createElement('script');
      script.src = MONACO_CONFIG.CDN_URL;
      script.onload = initEditor;
      document.body.appendChild(script);
    }

    // Start loading Pyodide in parallel
    loadPyodide();

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, [isExpanded, loadPyodide]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');

    try {
      if (!pyodideRef.current) {
        setOutput('Loading Python... please wait.');
        await loadPyodide();
        setOutput('');
      }

      const py = pyodideRef.current;

      // Redirect stdout and stderr
      await py.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);

      try {
        await py.runPythonAsync(codeRef.current);
      } catch (e: unknown) {
        const stderr = await py.runPythonAsync('sys.stderr.getvalue()');
        const errMsg = e instanceof Error ? e.message : String(e);
        setOutput(stderr || errMsg);
        await py.runPythonAsync(
          'sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__'
        );
        setIsRunning(false);
        return;
      }

      const stdout = await py.runPythonAsync('sys.stdout.getvalue()');
      await py.runPythonAsync(
        'sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__'
      );

      setOutput(stdout || '(no output)');
    } catch (e: unknown) {
      const errMsg = e instanceof Error ? e.message : String(e);
      setOutput(`Error: ${errMsg}`);
    }

    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(cleanedCode);
    if (editorRef.current) {
      editorRef.current.setValue(cleanedCode);
    }
    setOutput('');
  };

  if (!isExpanded) {
    return (
      <div className="python-playground-collapsed">
        <pre>
          <code>{initialCode}</code>
        </pre>
        <button
          className="python-playground-try-btn"
          onClick={() => setIsExpanded(true)}
        >
          ▶ Try it!
        </button>
      </div>
    );
  }

  return (
    <div className="python-playground-expanded">
      <div className="python-playground-toolbar">
        <button
          onClick={runCode}
          disabled={isRunning}
          className="python-playground-run-btn"
        >
          {isRunning ? 'Running...' : '▶ Run'}
        </button>
        <button onClick={resetCode} className="python-playground-reset-btn">
          Reset
        </button>
        <button
          onClick={() => {
            setIsExpanded(false);
            setOutput('');
          }}
          className="python-playground-close-btn"
        >
          Close
        </button>
        {pyodideLoading && (
          <span className="python-playground-loading">Loading Python...</span>
        )}
      </div>
      <div ref={editorContainerRef} className="python-playground-editor" />
      {output && (
        <div className="python-playground-output">
          <div className="python-playground-output-label">Output:</div>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default PythonPlayground;
