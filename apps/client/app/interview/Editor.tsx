"use client";

import React from "react";
import { Editor as VsEditor } from "@monaco-editor/react";
import { boilerPlates } from "./boilerplate";

const Editor = ({ Id }: { Id: string }) => {
  return (
    <VsEditor
      height="100%"
      language={"cpp"}
      theme="vs-light"
      defaultValue={boilerPlates["cpp"]}
      options={{
        minimap: { enabled: false },
        fontSize: 15,
        lineNumbers: "on",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        cursorStyle: "line",
        quickSuggestions: false,
        suggestOnTriggerCharacters: false,
        parameterHints: {
          enabled: false,
        },
        wordBasedSuggestions: "off",
        // Added options to hide errors and suggestions
        renderValidationDecorations: "off",
        snippetSuggestions: "none",
        codeLens: false,
        contextmenu: false,
        colorDecorators: false,
        suggest: {
          showMethods: false,
          showFunctions: false,
          showConstructors: false,
          showFields: false,
          showVariables: false,
          showClasses: false,
          showStructs: false,
          showInterfaces: false,
          showModules: false,
          showProperties: false,
          showEvents: false,
          showOperators: false,
          showUnits: false,
          showValues: false,
          showConstants: false,
          showEnums: false,
          showEnumMembers: false,
          showKeywords: false,
          showWords: false,
          showColors: false,
          showFiles: false,
          showReferences: false,
          showFolders: false,
          showTypeParameters: false,
          showSnippets: false,
        },
      }}
    />
  );
};

export default Editor;