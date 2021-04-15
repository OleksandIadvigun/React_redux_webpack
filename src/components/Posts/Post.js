import {Link, Route, Switch, withRouter} from "react-router-dom";
import {setComment, addComment, addEditedComment, setSelectedComment, deleteComment} from "../../redux/action.creator";
import {useDispatch, useSelector} from "react-redux";
import Comment from "./Comment";

function Post({item,match, myKey}) {
  let{url} = match;
  const{comment, comments, selected, userId} = useSelector(store=>store);
  const dispatch = useDispatch();

  const onInputHandler = (e) =>{
    e.preventDefault();
    setComment(dispatch,e.target.value)
  }
    const deleteCommentFromList = (comment) =>{
        let EditedComments = item.comments.filter((item,index)=>item.commentId!==comment.commentId)
        let editedPost = {
            userId: userId,
            title: item.title,
            key: myKey,
            id: item.id,
            body: item.body,
            deletedComm: comment,
            comments: EditedComments
        }
        deleteComment(dispatch,editedPost)
    }
    const randomIndex = () => {
        return Math.round(Math.random()*1200*(Math.random()*1440))
    };
    const newComment = () => {
        let newCom = {
            id: item.id,
            body: comment,
            commentId: randomIndex()
        }
        return newCom;
    }
 const newItemWithComment = () =>{

     if(item.comments!==undefined) {
         let addedCom = newComment();
         let newElement = {
             userId: userId,
             title: item.title,
             key: myKey,
             id: item.id,
             body: item.body,
             addedComm: addedCom,
             comments: [...item.comments, addedCom]

         }
         return newElement;
     }else{
         let addedCom = newComment();
         let newElement2 = {
             userId: userId,
             title: item.title,
             key: myKey,
             id: item.id,
             body: item.body,
             addedComm: addedCom,
             comments: [addedCom]
         }
         return newElement2;
     }
 }
 const onClickAdd=()=>{
     let editCom =  {
         id: item.id,
         body: comment,
         commentId: selected
     };
     let EditedComments = item.comments.map((item,index)=>item.commentId===selected? editCom: item)
     let editedPost = {
         userId: userId,
         title: item.title,
         key: myKey,
         id: item.id,
         body: item.body,
         editedComm: editCom,
         comments: EditedComments
     }
     newItemWithComment();
     if(selected >= 0 ){
         console.log('inside edit')
         addEditedComment(dispatch,editedPost)

     }else{
         addComment(dispatch, newItemWithComment())
         setComment(dispatch, '')
     }
 }
  return (
    <div>
      {item.id} -{item.title} - <Link to={url+'/'+item.id}> Details of post</Link>
      <div>
        <Switch>
            <Route path={url+'/'+item.id} render={()=>{
                return <div> {item.body}
                    <input type="text"
                           name="comment"
                           placeholder="Input comment"
                           value={comment}
                           onChange={onInputHandler} />
                    <button type="submit" onClick={()=> {
                       onClickAdd()
                    }}>Add comment</button>
                    <br/>
                    comments:
                    {item.comments.map((element,key)=><Comment item={element} key={key} postId={item.id} specialKey={key} deleteMethod={deleteCommentFromList}/>)}
                </div>
            }}/>
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(Post)
