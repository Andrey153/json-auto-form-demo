import React from "react";
import { JSONAutoForm } from "json-auto-form";
import example01 from "./example01.json";

function App() {
  return (
    <JSONAutoForm
      inValue={example01}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    />
  );
}

export default App;
