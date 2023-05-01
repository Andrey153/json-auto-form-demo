import './App.css';

import Editor from '@monaco-editor/react';
import { Button, Select, Space } from 'antd';
import hjson from 'hjson';
import yaml from 'js-yaml';
import { JSONAutoForm } from 'json-auto-form';
import React, { useState } from 'react';

import example01 from './examples/example01.json';
import example02 from './examples/example02.json';
import {
  // generateRandomSentenceArray,
  generateRandomValueArray,
} from './utils/generateLoremIpsumSentence';

// may be can be useful but return promise
// const examples = import.meta.glob('./examples/*.json')

// const hjson = require("hjson");

// const example03 = generateRandomSentenceArray(10000, 3);
const example03 = generateRandomValueArray(10_000, [
  'boolean',
  'string',
  'number',
  'number',
  'boolean',
  'string',
]);

function App() {
  const [jsonTxt, setJsonTxt] = useState<string | undefined>(JSON.stringify(example02, null, 2));

  const [selectExample, setSelectExample] = useState<string | undefined>('example02');

  function changeExample(value: string) {
    setSelectExample(value);
    if (value === 'example01') {
      setJsonTxt(JSON.stringify(example01, null, 2));
    }
    if (value === 'example02') {
      setJsonTxt(JSON.stringify(example02, null, 2));
    }
    if (value === 'example03') {
      setJsonTxt(JSON.stringify(example03, null, 2));
    }
  }

  let JsonValue = {};

  let jsonError = '';
  let hjsonError = '';
  let yamlError = '';

  let typeOfContentTxt = 'JSON';

  try {
    JsonValue = JSON.parse(jsonTxt || '');
  } catch (e: any) {
    jsonError = e.toString();
    typeOfContentTxt = 'HJSON';
    try {
      JsonValue = hjson.parse(jsonTxt || '', {
        // keepWsc: true,
        // legacyRoot: false,
      });
    } catch (e: any) {
      hjsonError = e.toString();
      typeOfContentTxt = 'YAML';
      try {
        JsonValue = yaml.load(jsonTxt || '') as any;
      } catch (e: any) {
        typeOfContentTxt = 'ERR';
        yamlError = e.toString();
      }
    }
  }

  if (yamlError && hjsonError && jsonError) JsonValue = { jsonError, hjsonError, yamlError };

  // monaco-editor options:
  // https://www.npmjs.com/package/@monaco-editor/react
  // https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IStandaloneEditorConstructionOptions.html

  return (
    <div className="jafd1146-app">
      <div className="jafd1146-app-left">
        <div className="jafd1146-app-left-header">
          <Space direction="vertical">
            <div>
              This is a demo application of react component &quot; json-auto-form &quot;.
              <br />
              You can select examples or input your test data in JSON, HJSON, or YAML format.
            </div>
            <Space wrap>
              <Select
                defaultValue="example02"
                style={{ width: 200 }}
                value={selectExample}
                onChange={changeExample}
                options={[
                  {
                    value: 'example',
                    label: 'From text editor',
                  },
                  {
                    value: 'example01',
                    label: 'Example simple object',
                  },
                  {
                    value: 'example02',
                    label: 'Example complex object',
                  },
                  {
                    value: 'example03',
                    label: 'Example big table',
                  },
                ]}
              />
              {typeOfContentTxt}
              <Button
                disabled={typeOfContentTxt === 'ERR'}
                type="primary"
                onClick={() => {
                  setJsonTxt(JSON.stringify(JsonValue, null, 2));
                }}
              >
                JSON format
              </Button>
            </Space>
          </Space>
        </div>
        <div className="jafd1146-app-left-content">
          <Editor
            height="100%"
            // defaultLanguage={typeOfContentTxt === "JSON" ? "json" : "yaml"}
            defaultLanguage={'yaml'}
            // defaultValue={defValue}
            value={jsonTxt}
            onChange={(v) => {
              setSelectExample('example');
              setJsonTxt(v);
            }}
            options={{ minimap: { enabled: false } }}
          />
        </div>
      </div>
      <div className="jafd1146-app-right">
        <JSONAutoForm
          // inValue={example01}
          inValue={JsonValue}
          // themeId={'defaultDarkF1059AF6'}
          // style={{ position: "relative", width: "100%", height: "100%" }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}

export default App;
