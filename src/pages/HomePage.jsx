import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";


export default function HomePage() {
    const posts = useSelector(states => states.posts.posts);

    const [searchList, setSearchList] = useState(posts);

    const [curentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    // let postsList = [...posts];

    function handleSearch(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const { search } = Object.fromEntries(fd.entries());

        if (search == "") {
            setSearchList(posts);
        } else {
            const newPostsList = posts.filter(post => {
                const searchableText = `${post.title} ${post.content} ${post.author}`
                return searchableText.toLowerCase().includes(search.toLowerCase());
            });
            console.log(newPostsList);
            setSearchList(newPostsList);
        }
    }

    const indexOfLastPost = curentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = searchList.slice(indexOfFirstPost, indexOfLastPost);

    function handlePaginate(number) {
        setCurrentPage(number);
    }

    useEffect(() => {
        setSearchList(posts);
    }, [posts])

    let message = "No post found!";

    return (
        <div className="col-md-8 col-lg-10 container">
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Notes App</Link>
                    <form className="d-flex" role="search" method="post" onSubmit={handleSearch}>
                        <input className="form-control me-2 my-auto" type="search" name="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-auto" type="submit">Search</button>
                    </form>
                </div>
            </nav>

            <ul id="postsList" className="mt-5">
                {posts.length > 0 && searchList.length === 0 && <p className="btn">{message}</p>}
                {posts.length === 0 && <p className="text-center">Click new post button to create your notes.</p>}
                <Posts posts={currentPosts} />
                {
                    searchList.length > 10 &&
                    <Pagination totalPosts={searchList.length} postPerPage={postsPerPage} paginate={handlePaginate} />
                }
            </ul>
            <Link to="/newpost" id="newPostBtn" className="btn btn-success">New Post</Link>
        </div>

    )
}


