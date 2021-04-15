import {
    Get_Posts_ByUser,
    Get_Posts,
    Set_Comment,
    Add_Comment,
    Set_Id_User,
    Delete_Comment,
    Set_Selected_Comment, Add_Edited_Comment, Get_Filtered_Posts_ByComment, Set_Find_Comment
} from "./action.tipes";

export const getPosts = (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/posts').then(value => value.json())
        .then(value => {
            dispatch({type: Get_Posts, payload: {posts: value}})
        })
}

export const setUserId = (dispatch, id) => {
    dispatch({type: Set_Id_User, payload: {userId: id}})
}

export const getPostsByUser = (dispatch, id) => {
    if (localStorage.getItem('redux-store')) {
        const filteredPosts = JSON.parse(localStorage.getItem('redux-store')).posts.filter((input) =>
            input.userId === id);
        console.log(filteredPosts + "f posts")
        dispatch({type: Get_Posts_ByUser, payload: {post: filteredPosts}})

    }
}
export const setComment = (dispatch, comment) => {
    dispatch({type: Set_Comment, payload: {comment: comment}})
}

export const addComment = (dispatch, newElem) => {
    dispatch({type: Add_Comment, payload: {comm: newElem}})
}
export const deleteComment = (dispatch, key) => {
    dispatch({type: Delete_Comment, payload: {item: key}})
}
export const setSelectedComment = (dispatch, key, postId) => {
    const ArrayOfOnePost = JSON.parse(localStorage.getItem('redux-store')).postByUser.filter((input) =>
        input.id === postId);
    const selectedCommArr = ArrayOfOnePost[0].comments.filter((c, ind) => ind === key)
    dispatch({type: Set_Selected_Comment, payload: {com: selectedCommArr[0]}})
}
export const addEditedComment = (dispatch, comment) => {
    dispatch({type: Add_Edited_Comment, payload: {editedCom: comment}})
}
export const getFilteredPostsByComment = (dispatch, findComment) => {
    dispatch({type: Get_Filtered_Posts_ByComment, payload: {findComment: findComment}})
}
export const setFindComment = (dispatch, findComment) => {
    dispatch({type: Set_Find_Comment, payload: {findComm: findComment}})
}
