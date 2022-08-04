import { combineReducers } from "redux";
import { Action } from "./action";
type State={
    searched:boolean,
    itemViewed:boolean
}
const initialState:State = {
    searched:false,
    itemViewed:false
}
const searchReducer=(state: object =initialState,action:Action):State =>{
    switch(action.type){
        case "SEARCH":
            return{
                itemViewed:false,
                searched:true
            }
        case "REMOVE_SEARCH":
            return{
                itemViewed:false,
                searched:false
            }
        case "VIEW_ITEM":
            return{
                itemViewed:true,
                searched:false
            }
        default :
            return{
                itemViewed:false,
                searched:false
            };
    }
}
const reducers = combineReducers({
    searchReducer
});
export default reducers;
export type ReducerState = ReturnType<typeof reducers>