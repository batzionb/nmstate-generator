// import { CodeEditor, CodeEditorProps, Language } from '@patternfly/react-code-editor';
import { NMStateConfig } from "../types";
import { dump, load } from "js-yaml";
import { editor } from "monaco-editor";
import { configureMonacoYaml } from "monaco-yaml";
import Editor, { Monaco } from "@monaco-editor/react";
import React from "react";
import { MonacoEditor } from "monaco-types";

type NMStateYamlCodePanelProps = {
  nmstateConfig: NMStateConfig;
  updateNMStateConfig: (nmstateConfig: NMStateConfig) => void;
};

const NMStateYamlCodePanel = ({
  nmstateConfig,
  updateNMStateConfig,
}: NMStateYamlCodePanelProps) => {
  const [code, setCode] = React.useState<string>("");

  const refEditor = React.useRef(null);

  const onMount = React.useCallback(
    (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      configureMonacoYaml(monaco as MonacoEditor, {
        schemas: [
          {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "The person’s display name",
              },
              age: {
                type: "integer",
                description: "How old is the person in years?",
              },
              occupation: {
                enum: ["Delivery person", "Software engineer", "Astronaut"],
              },
            },
          },
        ],
      });
      refEditor.current = editor;
    },
    []
  );

  const handleChange = (value?: string) => {
    try {
      if (!value) {
        return;
      }
      const updatedConfig = load(value) as NMStateConfig;
      updateNMStateConfig(updatedConfig);
    } catch (e) {
      console.log(e);
    }
  };

  const onValidate = React.useCallback((markers: editor.IMarker[]) => {
    markers.forEach((marker) => {
      console.log(marker);
      const { startLineNumber, message } = marker;
      console.log(startLineNumber, ":", message);
    });
  }, []);

  React.useEffect(() => {
    setCode(dump(nmstateConfig));
  }, [nmstateConfig]);
  return (
    <div className="codeEditor">
      <Editor
        defaultLanguage="yaml"
        height="100vw"
        width="100vw"
        value={code}
        options={{
          minimap: { enabled: false },
          acceptSuggestionOnCommitCharacter: false,
          //inlayHints: { enabled: "off" }
          // codeLens: false
          // acceptSuggestionOnEnter: 0,
          // parameterHints: { enabled: false },
          // snippetSuggestions: "none",
          // showInlineDetails: false,
          accessibilitySupport: "off",
          //contextmenu: false,
          // suggest: {
          //   showSnippets: false,
          //   showInterfaces: false,
          //   showReferences: false
          // }
          // snippetsPreventQuickSuggestions: true
        }}
        onChange={handleChange}
        onMount={onMount}
        onValidate={onValidate}
      />
    </div>
  );
};

export default NMStateYamlCodePanel;
