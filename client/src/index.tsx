import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import {createRoot} from "react-dom/client";
import  App  from "./App";

import './style/tailwind.css';
const rootElement =document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
    <StrictMode>
        <App/>
    </StrictMode>
)
//ReactDOM.render(<App/>,document.querySelector("#root"))