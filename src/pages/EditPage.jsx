import { Link, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { useDispatch } from "react-redux";
import { postActions } from "../store";
import { useState } from "react";


export default function EditPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleIsSubmitting(data) {
        setIsSubmitting(data);
    }

    const { id } = useParams();
    const dispatch = useDispatch();
    function handleNewPostSubmit(data) {
        dispatch(postActions.editPost({ id: id, ...data }))
    }
    return (
        <div className="container">
            <PostForm onSubmitting={handleIsSubmitting} id={id} onSubmit={handleNewPostSubmit}>
                {!isSubmitting && <>
                    <Link to="/" className="btn button-text">Cancle</Link>
                    <button type="submit" className="btn button">Update</button>
                </>}
                {
                    isSubmitting && <p className="btn submit">Updating.....</p>
                }
            </PostForm>
        </div>
    )
}
