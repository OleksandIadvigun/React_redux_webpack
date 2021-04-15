import {deleteComment, setComment, setSelectedComment} from "../../redux/action.creator";
import {useDispatch} from "react-redux";

export default function Comment({item, specialKey, postId, deleteMethod}) {
    const dispatch = useDispatch();
    const setEditedComment = () =>{
        setSelectedComment(dispatch, specialKey, postId)

    }
  return (
    <div className="comment">
        comment: {item.id} - {item.body} - {item.commentId} - <button onClick={setEditedComment}>edit</button>
        <button onClick={()=>{
            deleteMethod(item);
    }}>Delete</button>
    </div>
  );
}
