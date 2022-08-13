import {configureStore} from '@reduxjs/toolkit'
import reducers from "./reducer";

//A store which contains reducers
export const store = configureStore({
    reducer:{
                reducers
            }
    }
)