import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { withState } from "../../blog-context";
import { SET_ERROR } from "../../store/actionTypes";
import BlogService from "../../services/blog";
import './MyBlogs.css';

const MyBlogs = (props) => {

    const [blogs, setBlogs] = useState([]);
    const { dispatch, state } = props;
    const username = state.user.username;

    useEffect(() => {
        const fetchedBlogs = () => {
            BlogService.getMyBlogs(username)
                .then(res => {
                    setBlogs(res);
                })
                .catch(err => {
                    dispatch({ type: SET_ERROR, error: err.message });
                })
        }
        fetchedBlogs();
    }, [dispatch, username]);

    const fullBlogView = (blogId) => {
        props.history.push(`/full-blog/${blogId}`);
    }

    return (
        <div className="blogs-list">
            {blogs.length > 0
                && blogs.map(blog => {
                    return <div key={blog._id} className="blog" onClick={() => fullBlogView(blog._id)}>
                        <div className="blog_title">{blog.title}</div>
                        <div className="blog_body">{blog.body}</div>
                        {blog.imageUrl && <div className="blog_image">
                            <img src={blog.imageUrl} alt={blog.title} />
                        </div>}
                    </div>
                })
            }
        </div>
    );
};

export default withRouter(withState(MyBlogs));