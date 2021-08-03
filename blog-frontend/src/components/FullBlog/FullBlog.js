import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { withState } from '../../blog-context';
import BlogService from '../../services/blog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { SET_ERROR } from '../../store/actionTypes';
import moment from 'moment';
import './FullBlog.css';

const FullBlog = (props) => {
    const { id } = props.match.params;
    const [fullblog, setFullblog] = useState();
    const [comment, setComment] = useState('');

    const fetchFullBlog = async () => {
        const blog = await BlogService.getFullBlog(id)
        setFullblog(blog);
    }

    useEffect(() => {
        fetchFullBlog();
        // eslint-disable-next-line
    }, [id]);

    const commentHandler = (event) => {
        setComment(event.target.value);
    }

    const commentSubmitHandler = (event) => {
        event.preventDefault();
        if (props.state.user) {
            const data = {
                comment: comment,
                user: props.state.user.username
            }
            BlogService.postComment(fullblog._id, data)
                .then(() => {
                    setComment('');
                    fetchFullBlog();
                })
                .catch(err => {
                    props.dispatch({ type: SET_ERROR, error: err.message });
                })
        } else {
            alert("Please login first !!!")
        }
    }

    const updateBlogHandler = () => {
        console.log(fullblog);
        props.history.push({
            pathname: `/blog/${fullblog._id}`,
            state: {
                blog: fullblog
            }
        })
    }

    const deleteBlogHandler = () => {
       
        if (window.confirm("Delete blog ?")) {
            
            BlogService.deleteBlog(fullblog._id)
                .then(() => {
                    props.history.goBack();
                })
                .catch(err => {
                    props.dispatch({ type: SET_ERROR, error: err.message });
                })
        }

    }

    return (
        <div>
            {fullblog &&
                <div className="fullblog">
                    <div className="section1">
                        <div className="blog_title">{fullblog.title}</div>
                        <div className="blog_author"> @{fullblog.author}</div>
                        {(props.state.user && props.state.user.username === fullblog.author)
                            && <div className="change_btns">
                                <FontAwesomeIcon onClick={updateBlogHandler} icon={faEdit} />
                                {"   "}
                                <FontAwesomeIcon onClick={deleteBlogHandler} icon={faTrashAlt} />
                            </div>}
                        <div className="blog_date"> {moment(fullblog.createdAt).format('Do MMM YYYY, h:mm:ss a')}</div>
                    </div>

                    {fullblog.imageUrl && <div className="fullblog_img">
                        <img src={fullblog.imageUrl} alt={fullblog.title} />
                    </div>}


                    <div className="blog_body">{fullblog.body}</div>
                    <div className="comment_form">
                        <form onSubmit={commentSubmitHandler}>
                            <input
                                value={comment}
                                onChange={commentHandler}
                            />
                            <button className="btn cmnt" type="submit">Post Comment</button>
                        </form>
                    </div>


                    <div>
                        <div className="comments">
                            {fullblog.comments.map((comment, index) => {
                                return <div className="comment" key={index}>
                                    <div className="comment_body">{comment.body}</div>
                                    <div className="comment_user">@{comment.user}</div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default withRouter(withState(FullBlog));