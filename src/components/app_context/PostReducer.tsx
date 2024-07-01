import { error } from "console"

export const postActions ={
    HANDLE_ERROR: "HANDLE_ERROR",
    SUBMIT_POST: "SUBMIT_POST",
} 

export const postStates = {
    error: false,
    posts: [],
}

export const PostReducer = (state: any, action: any) => {
    switch (action.type) {
        case postActions.HANDLE_ERROR:
            return {
                ...state,
                error: true,
                posts: []
            }
        case postActions.SUBMIT_POST:
            return {
                ...state,
                error: false,
                posts: action.posts
            }
        default:
            return state
    }
}