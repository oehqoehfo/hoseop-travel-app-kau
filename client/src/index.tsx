import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import {createRoot} from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import  App  from "./App";

import './style/tailwind.css';
const rootElement =document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
    <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StrictMode>
)
//ReactDOM.render(<App/>,document.querySelector("#root"))