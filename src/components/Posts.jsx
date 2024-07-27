import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { postActions } from "../store";


export default function Posts({ posts, }) {
    const dispatch = useDispatch();
    function handleDelete(id) {
        dispatch(postActions.deletePost({ id: id }));
    }

    return (
        <>
            {posts.map(post => {
                return <li key={post.id}>
                    <h2>{post.title}</h2>
                    <small>{post.time}</small>
                    <p>{post.content}</p>
                    <small>{post.author}</small>
                    <Link to={`/edit/${post.id}`} className="btn btn-primary me-3 edit">Edit</Link>
                    <button className="btn btn-danger delete" onClick={() => handleDelete(post.id)}>Delete</button>
                </li>
            })}
        </>
    )
}
