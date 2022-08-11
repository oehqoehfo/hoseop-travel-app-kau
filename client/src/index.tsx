import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import {createRoot} from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import { createStoreHook } from "react-redux";
import  App  from "./App";
import './style/tailwind.css';
import {store} from './redux/store';
const rootElement =document.getElementById("root");
const root = createRoot(rootElement!);
root.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
//ReactDOM.render(<App/>,document.querySelector("#root"))