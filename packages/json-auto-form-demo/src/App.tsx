import './App.css';

import Editor from '@monaco-editor/react';
import { Button, Select, Space } from 'antd';
import hjson from 'hjson';
import yaml from 'js-yaml';
import { JSONAutoForm } from 'json-auto-form';

// import React, { useEffect, useState } from 'react';
import example01 from './examples/example01.json';
import example02 from './examples/example02.json';
import {
  // generateRandomSentenceArray,
  generateRandomValueArray,
} from './utils/generateLoremIpsumSentence';
import { useIndexedDBStore } from './utils/useIndexedDBStore';

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

export type AppStateType = {
  selectExample: string;
  jsonTxt: string;
};

function App() {
  const [appState, setAppState] = useIndexedDBStore<AppStateType>({
    dbName: 'json-auto-from-demo',
    storeName: 'state',
    key: 'jsonTxt',
    initialState: {
      selectExample: 'example02',
      jsonTxt: JSON.stringify(example02, null, 2),
    },
  });

  function changeExample(selectExample: string) {
    let newJsonTxt = appState.jsonTxt;
    if (selectExample === 'example01') {
      newJsonTxt = JSON.stringify(example01, null, 2);
    }
    if (selectExample === 'example02') {
      newJsonTxt = JSON.stringify(example02, null, 2);
    }
    if (selectExample === 'example03') {
      newJsonTxt = JSON.stringify(example03, null, 2);
    }
    setAppState({ selectExample, jsonTxt: newJsonTxt });
  }

  let JsonValue = {};

  let jsonError = '';
  let hjsonError = '';
  let yamlError = '';

  let typeOfContentTxt = 'JSON';

  try {
    JsonValue = JSON.parse(appState.jsonTxt || '');
  } catch (e: any) {
    jsonError = e.toString();
    typeOfContentTxt = 'HJSON';
    try {
      JsonValue = hjson.parse(appState.jsonTxt || '', {
        // keepWsc: true,
        // legacyRoot: false,
      });
    } catch (e: any) {
      hjsonError = e.toString();
      typeOfContentTxt = 'YAML';
      try {
        JsonValue = yaml.load(appState.jsonTxt || '') as any;
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
                value={appState.selectExample}
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
                  setAppState({ jsonTxt: JSON.stringify(JsonValue, null, 2) });
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
            value={appState.jsonTxt}
            onChange={(jsonTxt) => {
              setAppState({ selectExample: 'example', jsonTxt });
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
