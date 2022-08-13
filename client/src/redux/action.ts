//define redux action types
export enum ActionType{
    SEARCH = "SEARCH",
    REMOVE_SEARCH = "REMOVE_SEARCH",
    VIEW_ITEM="VIEW_ITEM",
    GET_SEARCH_KEYWORD="SET_SEARCH_KEYWORD"
}

//redux action interfaces
interface SearchAction{
    type:ActionType.SEARCH
}
interface RemoveSearchAction{
    type:ActionType.REMOVE_SEARCH
}
interface ViewItemAction{
    type:ActionType.VIEW_ITEM
}
interface SetSearchKeywordAction{
    type:ActionType.GET_SEARCH_KEYWORD,
    payload:String
}

//export all actions
export type Action = SearchAction|RemoveSearchAction|ViewItemAction|SetSearchKeywordAction