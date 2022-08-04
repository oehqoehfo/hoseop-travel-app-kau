export enum ActionType{
    SEARCH = "SEARCH",
    REMOVE_SEARCH = "REMOVE_SEARCH",
    VIEW_ITEM="VIEW_ITEM"
}

interface SearchAction{
    type:ActionType.SEARCH
}
interface RemoveSearchAction{
    type:ActionType.REMOVE_SEARCH
}
interface ViewItemAction{
    type:ActionType.VIEW_ITEM
}
export type Action = SearchAction|RemoveSearchAction|ViewItemAction