import {useDispatch, useSelector, useStore} from "react-redux";
import {useEffect} from "react";
import {
    getPostsByUser,
    getPosts,
    setComment,
    setUserId,
    getFilteredPostsByComment,
    setFindComment
} from "../../redux/action.creator";
import Post from "./Post";


export default function AllPosts() {
    let{postByUser,findComment, userId}=useSelector(store=>store);
    const dispatch = useDispatch();
    console.log(postByUser);

    useEffect(()=>{
        getPosts(dispatch)
    },[])

    useEffect(()=>{
        if(findComment!=='') {
            getFilteredPostsByComment(dispatch, findComment)
        }
    },[findComment])



    useEffect(()=>{
        getPostsByUser(dispatch, userId)
    },[userId])


    const onClickHandler = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        if(e.target.value >0 && e.target.value < 11 )
        setUserId(dispatch, Number(e.target.value))
    }
   const onInputFindComment = (e) =>{
       e.preventDefault();
       console.log(e.target.value + "findComment")
       setFindComment(dispatch, e.target.value)
   }
    return (
        <div>Posts of user:
            <input type="number" name="UserId" placeholder="Input id of user" value={userId} onChange={onClickHandler} />
            find by comment:
            <input type="text"
                   name="findComment"
                   placeholder="Input comment"
                   value={findComment}
                   onChange={onInputFindComment} />
            {
                postByUser.map((value, index)=><Post item={value} key={index} myKey={index} />)
        }
           <div> <button type="submit" onClick={()=>{
                if(userId > 1){
                setUserId(dispatch, userId -1)}
            }} >prev</button>
            <button type="submit" onClick={()=>{
                if(userId < 10)
                setUserId(dispatch, userId +1)
            }} >next</button>
           </div>
        </div>
    );
}
