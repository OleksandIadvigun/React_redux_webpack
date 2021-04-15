import {createStore} from "redux";
import {post_reducer} from "./post.reducer";




export const store = createStore(post_reducer);
store.subscribe(()=>{
    localStorage.setItem('redux-store', JSON.stringify(store.getState()))
})
