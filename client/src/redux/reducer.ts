import { combineReducers } from "redux";
import { Action } from "./action";
type State={
    searched:boolean
}
const initialState:State = {
    searched:false
}
const searchReducer=(state: object =initialState,action:Action):State =>{
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
            return{
                searched:false
            };
    }
}
const reducers = combineReducers({
    searchReducer
});
export default reducers;
export type ReducerState = ReturnType<typeof reducers>