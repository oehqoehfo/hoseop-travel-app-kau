import { combineReducers } from "redux";
import { Action } from "./action";

//properties that reducer contains and theirs type
type State={
    searched:boolean,
    itemViewed:boolean,
    searchKeyword:String
}

//initial value of states
const initialState:State = {
    searched:false,
    itemViewed:false,
    searchKeyword:""
}
const searchReducer=(state=initialState,action:Action):State =>{

    //change redux state when user performs specific redux action
    switch(action.type){
        case "SEARCH":
            return{
                itemViewed:false,
                searched:true,
                searchKeyword:""
            }
        case "REMOVE_SEARCH":
            return{
                itemViewed:false,
                searched:false,
                searchKeyword:""
            }
        case "VIEW_ITEM":
            return{
                itemViewed:true,
                searched:false,
                searchKeyword:state.searchKeyword
            }
        case "SET_SEARCH_KEYWORD":
            return{
                ...state,
                searchKeyword:action.payload
            }
        default :
            return{
                itemViewed:false,
                searched:false,
                searchKeyword:""
            };
    }
}
const reducers = combineReducers({
    searchReducer
});
export default reducers;
export type ReducerState = ReturnType<typeof reducers>