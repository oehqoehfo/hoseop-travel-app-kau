import { combineReducers } from "redux";
import { Action } from "./action";
const initialState = {
    searched:false
}
const searchReducer=(state: object =initialState,action:Action):object =>{
    switch(action.type){
        case "SEARCH":
            return{
                searched:true
            }
        case "REMOVE_SEARCH":
            return{
                searched:false
            }
        default :
            return state;
    }
}
const reducers = combineReducers({
    search:searchReducer
});
export default reducers;
export type RootReducer = ReturnType<typeof reducers>