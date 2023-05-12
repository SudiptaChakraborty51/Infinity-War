import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { ProductProvider } from "./contexts/ProductContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </StrictMode>,
  rootElement
);
