import { Link } from "react-router-dom";
import PostForm from "../components/PostForm";
import { useDispatch } from "react-redux";
import { postActions } from "../store";
import { useState } from "react";

export default function NewPost() {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleIsSubmitting(data) {
        setIsSubmitting(data);
    }
    function handleNewPostSubmit(data) {
        dispatch(postActions.createPost({ ...data }))
    }
    return (
        <div className="container">
            <PostForm onSubmitting={handleIsSubmitting} onSubmit={handleNewPostSubmit}>
                {!isSubmitting && <>
                    <Link to="/" className="btn button-text">Cancle</Link>
                    <button type="submit" className="btn button">Submit</button></>
                }
                {
                    isSubmitting && <p className="btn submit">Submitting...</p>
                }

            </PostForm>
        </div>
    )
}