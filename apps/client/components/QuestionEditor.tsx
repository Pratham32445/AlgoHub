"use client";

import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { LoaderCircle, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGE_MAPPING, MONACO_LANGUAGE_MAPPING } from "@/lib/Mapping";
import { Button } from "./ui/button";
import axios from "axios";

const QuestionEditor = ({
  boilerPlates,
  problemId,
}: {
  boilerPlates: Record<string, string>;
  problemId: string;
}) => {
  const [language, setLanguage] = useState("cpp");
  const [editorState, setEditorState] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const SERVER_URI = "http://localhost:3000";

  useEffect(() => {
    setEditorState(boilerPlates[language] || "");
    setLoading(false);
  }, [language, boilerPlates]);

  const formatCode = (editor: any) => {
    editor.getAction("editor.action.formatDocument").run();
  };

  const createSubmission = async () => {
    try {
      const res = await axios.post(`${SERVER_URI}/api/problem/submit`, {
        problemId,
        languageId: LANGUAGE_MAPPING[language as keyof typeof LANGUAGE_MAPPING],
        code: editorState
      });
      console.log(res.data);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  if (loading) {
    return <LoaderCircle className="animate-spin" />;
  }

  return (
    <div className="relative w-full h-full p-2">
      <div className="border mb-1 flex items-center justify-between">
        <div>
          <Select onValueChange={setLanguage} value={language}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder={language} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cpp">Cpp</SelectItem>
              <SelectItem value="js">Js</SelectItem>
              <SelectItem value="ts">Ts</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="px-3">
          <RotateCcw width={20} height={20} />
        </div>
      </div>
      <Editor
        height="100%"
        language={MONACO_LANGUAGE_MAPPING[language]}
        theme="vs-dark"
        value={editorState}
        onMount={formatCode}
        onChange={(value) => setEditorState(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 18,
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
          }
        }}
      />
      <div className="absolute bottom-0 right-[10px] flex gap-5 p-2">
        <Button className="bg">Run</Button>
        <Button
          className="bg-[#2CBB5D] hover:bg-[#26a954] text-white"
          onClick={createSubmission}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default QuestionEditor;