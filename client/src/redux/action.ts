export enum ActionType{
    SEARCH = "SEARCH",
    REMOVE_SEARCH = "REMOVE_SEARCH"
}

interface SearchAction{
    type:ActionType.SEARCH
}
interface RemoveSearchAction{
    type:ActionType.REMOVE_SEARCH
}
export type Action = SearchAction|RemoveSearchAction