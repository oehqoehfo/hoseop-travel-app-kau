import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import {createRoot} from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Provider from 'redux';
import { createStoreHook } from "react-redux";
import  App  from "./App";
import reducer from './redux/reducer';
import './style/tailwind.css';
const rootElement =document.getElementById("root");
const root = createRoot(rootElement!);
const store = createStoreHook(reducer);
root.render(
    <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StrictMode>
)
//ReactDOM.render(<App/>,document.querySelector("#root"))