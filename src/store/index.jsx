import { createSlice, configureStore } from "@reduxjs/toolkit";

// const time=new Date().toLocaleString([],{timeStyle:"short",dateStyle:"short"});
// const initialPostState={posts:[{id:1,title:"First Post",content:"Craete your post by clicking on the new post button.",author:"Default",time:time}]}
// localStorage.setItem("posts",JSON.stringify([
//     {id:1,title:"First Post",content:"Craete your post by clicking on the new post button.",author:"Default",time:time},
//  ]));

const posts = JSON.parse(localStorage.getItem("posts"));
const initialPostState = { posts: posts }
const postSlice = createSlice({
    name: "posts",
    initialState: initialPostState,
    reducers: {
        createPost(state, action) {
            let newPostId;
            if (state.posts.length === 0) {
                newPostId = 1;
            } else {
                newPostId = state.posts[0].id + 1;

            }
            const newTime = new Date().toLocaleString([], { timeStyle: "short", dateStyle: "short" });
            const newPost = {
                id: newPostId,
                title: action.payload.title,
                content: action.payload.content,
                author: action.payload.author,
                time: newTime
            }
            const updatedPostsList = [newPost, ...state.posts];
            state.posts = updatedPostsList;
            localStorage.setItem("posts", JSON.stringify(updatedPostsList));
        },
        editPost(state, action) {
            const updatedPosts = [...state.posts]
            const editPostIndex = updatedPosts.findIndex(post => post.id == action.payload.id);
            const editPost = updatedPosts[editPostIndex];
            if (action.payload.title) {
                editPost.title = action.payload.title;
            }
            if (action.payload.content) {
                editPost.content = action.payload.content;
            }
            if (action.payload.author) {
                editPost.author = action.payload.author
            }
            const newTime = new Date().toLocaleString([], { timeStyle: "short", dateStyle: "short" });
            editPost.time = newTime;
            state.posts = updatedPosts;
            localStorage.setItem("posts", JSON.stringify(updatedPosts));
        },
        deletePost(state, action) {
            const prevsPostslist = [...state.posts];
            const newPostsList = prevsPostslist.filter(post => post.id != action.payload.id);
            state.posts = newPostsList;
            localStorage.setItem("posts", JSON.stringify(newPostsList));
        }
    }

});

const store = configureStore({
    reducer: {
        posts: postSlice.reducer
    }
});

export const postActions = postSlice.actions;
export default store;