import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { withState } from "../../blog-context";
import { SET_ERROR } from "../../store/actionTypes";
import BlogService from "../../services/blog";
import Blog from "./Blog/Blog";

import './Blogs.css';

const Blogs = (props) => {

    const [blogs, setBlogs] = useState([]);
    const {dispatch} = props;

    useEffect(() => {
        const fetchedBlogs = () => {
            BlogService.getAllBlogs()
                .then(fetchedBlogs => {
                    setBlogs(fetchedBlogs);
                })
                .catch(err => {
                    dispatch({ type: SET_ERROR, error: err.message });
                })
        }
        fetchedBlogs();
    }, [dispatch]);

    return (
        <div className="blogs-list">
            {blogs.length > 0
                && blogs.map(blog => {
                    return <Blog key={blog.id} blog={blog} />
                })
            }
        </div>
    );
};

export default withRouter(withState(Blogs));