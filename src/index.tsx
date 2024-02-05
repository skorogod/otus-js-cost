import { App } from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";

window.addEventListener("load", () => {
  const rootEl = document.querySelector("#root");
  if (rootEl) {
    const root = createRoot(rootEl);
    root.render(<App></App>);
  }
});
