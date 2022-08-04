import { Dispatch } from "react";
import { Action,ActionType } from "./action";

export const search=()=>{
    console.log("search");
    return(dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionType.SEARCH
        })
    }
};
export const removeSearch=()=>{
    return(dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionType.REMOVE_SEARCH
        })
    }
}
export const viewItem=()=>{
    return(dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionType.VIEW_ITEM
        })
    }
}