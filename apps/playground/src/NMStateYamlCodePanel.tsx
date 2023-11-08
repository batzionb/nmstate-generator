import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const URI = "file:///nmstate.yaml";

const init = () => {
  const model = monaco.editor.getModel(monaco.Uri.parse(URI));
  if (!model) {
    monaco.editor.createModel("", "yaml", monaco.Uri.parse(URI));
  }

  return monaco.editor.getModel(monaco.Uri.parse(URI));
};

const NmStateEditorCodePanel = () => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;
        const _editor = monaco.editor.create(monacoEl.current!, {
          value: "",
        });
        const model = init();
        console.log(model);
        _editor.setModel(model);
        return _editor;
      });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  return <div ref={monacoEl} style={{ width: "100vw", height: "100vh" }}></div>;
};

export default NmStateEditorCodePanel;
