
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function PostForm({ id, onSubmit, onSubmitting, children }) {
    const titleRef = useRef();
    const contentRef = useRef();
    const authorRef = useRef();
    const [isError, setIsError] = useState(false);
    let errorText = "All fields are requrided!";

    const posts = useSelector(states => states.posts.posts);
    let title = "";
    let content = ""
    let author = "";

    if (id) {
        const editPostIndex = posts.findIndex(post => post.id == id);
        title = posts[editPostIndex].title;
        content = posts[editPostIndex].content;
        author = posts[editPostIndex].author;
    }
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const fromData = Object.fromEntries(fd.entries());
        if (titleRef.current.value === "" || authorRef.current.value === "" || contentRef.current.value === "") {
            setIsError(true);
            return;
        }
        onSubmitting(true);
        onSubmit(fromData);
        setTimeout(() => {
            onSubmitting(false);
            navigate("/");
        }, 2000)
    }
    return (
        <>
            {isError && <p className="error">{errorText}</p>}
            <form id="editForm" method="post" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input ref={titleRef} type="text" name="title" defaultValue={title} required />
                <label htmlFor="content">Content</label>
                <textarea ref={contentRef} id="content" name="content" defaultValue={content} rows="10" required />
                <label htmlFor="author">Name</label>
                <input ref={authorRef} type="text" name="author" defaultValue={author} required />
                <p className="form-actions">
                    {children}
                </p>
            </form>
        </>
    )
}
