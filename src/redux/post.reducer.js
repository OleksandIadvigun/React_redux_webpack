import {
    Get_Posts_ByUser,
    Get_Posts,
    Set_Comment,
    Add_Comment,
    Set_Id_User,
    Delete_Comment,
    Set_Selected_Comment,
    Add_Edited_Comment,
    Get_Filtered_Posts_ByComment, Set_Find_Comment
} from "./action.tipes";


export const post_reducer = (initialState = {
                                 posts: [],
                                 postByUser: [],
                                 userId: 1,
                                 comment: '',
                                 comments: [],
                                 selected: -1,
                                 findComment: ''
                             }
    , action) => {
    switch (action.type) {
        case Get_Posts:
            let {payload: {posts}} = action;
            return {...initialState, posts: posts.map(element=>{return{...element, comments:[]} })};
        case Get_Posts_ByUser:
            let {payload: {post}} = action;
            return {...initialState, postByUser: post};
        case Set_Id_User:
            let {payload: {userId}} = action;
            return {...initialState, userId};
        case Set_Comment:
            let {payload: {comment}} = action;
            return {...initialState, comment};
        case Add_Comment:
            let {payload: {comm}} = action;
            return{...initialState, postByUser: initialState.postByUser.map((item, key)=> key!==comm.key ? item: comm ),
                posts: initialState.posts.map((post)=> post.id===comm.id ?  comm: post),
                comments: [...initialState.comments,comm.addedComm]}
        case Delete_Comment:
            let {payload: {item}} = action;
            return {
                ...initialState, postByUser: initialState.postByUser.map((post, i) => post.id === item.id ? item  : post),
                    posts: initialState.posts.map((post, i) => post.id === item.id ? item  : post
                    ),
                comments: initialState.comments.filter(el => el.commentId!==item.deletedComm.commentId)
            };
        case Set_Selected_Comment:
            let {payload: {com}} = action;
            return {...initialState, comment: com.body , selected: com.commentId }

        case Add_Edited_Comment:
            let {payload: {editedCom}} = action;
            return {...initialState, postByUser: initialState.postByUser
                    .map((element,ind)=> element.id !== editedCom.id  ? element: editedCom ),
                posts: initialState.posts
                    .map((element,ind)=> element.id !== editedCom.id ? element: editedCom ),
                comment: '',
                selected: -1,
                comments: initialState.comments.map(el=>el.commentId===editedCom.editedComm.commentId? editedCom.editedComm: el)
            }
        case Get_Filtered_Posts_ByComment:
            let {payload: {findComment}} = action;
           const resultArrayOfComments =  initialState.comments.filter((item)=>item.body.includes(findComment))
            // console.log("resultArrayinFilter" + resultArrayOfComments[0].body)
            return {...initialState, postByUser: initialState.posts.filter((elem)=>
                resultArrayOfComments.some(el=>el.id===elem.id)? elem: '') // todo
                };
        case Set_Find_Comment:
            let {payload: {findComm}} = action;
            return {...initialState, findComment: findComm};
        default:
            return {...initialState};
    }
}
