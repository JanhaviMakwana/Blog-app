import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import BlogService from '../../../services/blog';
import { withState } from '../../../blog-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import './Blog.css';
const Blog = (props) => {

    const blog = props.blog;
    const [doComment, setDoComment] = useState(false);
    const [comment, setComment] = useState('');

    const commentChangeHandler = (event) => {
        setComment(event.target.value);
    };

    const openCommentBox = () => {
        if (props.state.user) {
            setDoComment(!doComment)
        }
        else {
            props.history.push('/auth');
        }
    }

    const commentSubmitHandler = (event, blogId) => {
        event.preventDefault();
        BlogService.postComment(props.state.user.id, { blogId: blogId, desc: comment })
            .then(res => {
                setComment('');
                setDoComment(false);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className="blog">
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <div className="blog-img">
                {blog.imageUrl
                    &&
                    <img
                        className="blog-img-item"
                        src={blog.imageUrl}
                        alt={blog.title}
                        width="400"
                    />}
            </div>
            <div className="add-comment-form">
                <FontAwesomeIcon onClick={openCommentBox} className="comment-icon" icon={faComments} />
                <form onSubmit={(event) => commentSubmitHandler(event, blog.id)}>
                    {doComment && <input value={comment} onChange={commentChangeHandler} />}
                    <input type="submit" hidden />
                </form>
            </div>
            <div>
              {blog.comments.length > 0 &&  <p>{blog.comments[blog.comments.length - 1].description}</p> }{/* Last comment */}
            </div>
        </div>
    );

};

export default withRouter(withState(Blog));