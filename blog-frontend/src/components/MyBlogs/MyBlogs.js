import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { withState } from "../../blog-context";
import { SET_ERROR } from "../../store/actionTypes";
import BlogService from "../../services/blog";
import './MyBlogs.css';

const MyBlogs = (props) => {

    const [blogs, setBlogs] = useState([]);
    const {dispatch, state} = props;
    const userId = state.user.id;


    useEffect(() => {
        const fetchedBlogs = () => {
            BlogService.getBlogsByUserId(userId)
                .then(res => {
                    setBlogs(res);
                })
                .catch(err => {
                    dispatch({ type: SET_ERROR, error: err.message });
                })
        }
        fetchedBlogs();
    }, [dispatch,userId]);

    const blogDeleteHandler = (id) => {
        BlogService.deleteBlog(id, props.state.user.id)
            .then(res => {
                setBlogs(res);
            })
            .catch(err => {
                props.dispatch({ type: SET_ERROR, error: err.message });
            })
    };

    const updateBlogHandler = (blog) => {
        props.history.push({
            pathname: `/blog/${blog.id}`,
            state: {
                blog: blog
            }
        })
    };

    return (
        <div className="blogs-list">
            {blogs.length > 0
                && blogs.map(blog => {
                    return <div key={blog.id} className="blog">
                        <h3>{blog.title}</h3>
                        <p>{blog.description}</p>
                        <div className="blog-img">
                            {blog.imageUrl && <img className="blog-img-item" src={blog.imageUrl} alt={blog.title} />}
                        </div>
                        <button className="btn update" onClick={() => updateBlogHandler(blog)}>Update</button>
                        <button className="btn delete" onClick={() => blogDeleteHandler(blog.id)}>Delete</button>
                    </div>
                })
            }
        </div>
    );
};

export default withRouter(withState(MyBlogs));