import { useState, useEffect } from "react";
import { withState } from "../../blog-context";
import { withRouter } from "react-router";
import FormData from 'form-data';
import BlogService from "../../services/blog";
import { SET_ERROR } from "../../store/actionTypes";
import './AddBlog.css';

const AddBlog = (props) => {

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        body: '',
        image: null
    });

    const [isUpdate, setIsUpdate] = useState(false);
    const state = props.location.state ? props.location.state : null;
    

    useEffect(() => {
        const updateForm = async () => {
            const blog = await BlogService.getFullBlog(state.blog._id);
            const fetchedForm = {
                body: blog.body,
                title: blog.title,
                author: blog.author
            }

            setFormData(fetchedForm);
            setIsUpdate(true);

        };
        if (state != null) { updateForm(); }

    }, [state])

    const formDataHandler = (event) => {
        const fetchedForm = { ...formData };
        if (event.target.name !== 'image') {
            fetchedForm[event.target.name] = event.target.value;
        } else {
            fetchedForm[event.target.name] = event.target.files[0];
        }
        setFormData(fetchedForm);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const imageData = new FormData();
        const data = {
            title: formData.title,
            body: formData.body,
            author: props.state.user.username
        };
        

        if (isUpdate) {
            const blog = props.location.state.blog;
            
            BlogService.updateBlog(data, blog._id)
                .then(() => {
                    props.history.push(`/full-blog/${blog._id}`);
                })
                .catch(err => {
                    props.dispatch({ type: SET_ERROR, error: err.message });
                })
        } else {
            BlogService.postBlog(data, props.state.user._id)
                .then(res => {
                    
                    if (formData.image !== null) {
                        imageData.append('image', formData.image);
                        BlogService.uploadBlogImage(imageData, res._id)
                            .then(() => {
                                props.history.push('/');
                            })
                            .catch(err => {
                                props.dispatch({ type: SET_ERROR, error: err.message });
                            })
                    } else {
                        props.history.push('/');
                    }
                })
                .catch(err => {
                    props.dispatch({ type: SET_ERROR, error: err.message });

                })

        }
    };

    return (
        <div className="add-blog-form">
            <form onSubmit={formSubmitHandler}>
                <div className="form-control">
                    <input
                        value={formData.title}
                        type="text"
                        name="title"
                        placeholder="title"
                        onChange={formDataHandler}
                    />
                </div>
                {!isUpdate && <div className="form-control">
                    <input
                        type="file"
                        name="image"
                        onChange={formDataHandler}
                    />
                </div>}
                <div className="form-control">
                    <textarea
                        value={formData.body}
                        name="body"
                        placeholder="description"
                        rows="3"
                        onChange={formDataHandler}
                    />
                </div>

                <button className="btn add-blog" type="submit">Add</button>
                {isUpdate && <button className="btn" onClick={() => { props.history.goBack() }}>CANCEL</button>}
            </form>
        </div >
    );
};

export default withRouter(withState(AddBlog));