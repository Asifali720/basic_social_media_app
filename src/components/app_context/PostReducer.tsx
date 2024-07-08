export const postActions ={
    HANDLE_ERROR: "HANDLE_ERROR",
    SUBMIT_POST: "SUBMIT_POST",
    ADD_LIKES: "ADD_LIKES",
} 

export const postStates = {
    error: false,
    posts: [],
    likes: []
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
        case postActions.ADD_LIKES:
            return {
                ...state,
                error: false,
                likes: action.likes
            }    
        default:
            return state
    }
}