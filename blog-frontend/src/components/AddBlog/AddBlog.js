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
        desc: '',
        image: null
    });

    const [isUpdate, setIsUpdate] = useState(false);
    const state  = props.location.state ? props.location.state : null;


    useEffect(() => {
        const updateForm = () => {
            if (state != null) {
                const blog = state.blog;
                const fetchedForm = {
                    desc: blog.description,
                    title: blog.title
                } 
                setFormData(fetchedForm);
                setIsUpdate(true);
            }
        };
        updateForm();

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
            description: formData.desc
        };

        if (isUpdate) {
            const blog = props.location.state.blog;
            BlogService.updateBlog(blog.id, data)
                .then(res => {
                    props.history.push('/blogs');
                })
                .catch(err => {
                    props.dispatch({ type: SET_ERROR, error: err.message });
                })
        } else {
            BlogService.postBlog(data, props.state.user.id)
                .then(res => {
                    if (formData.image !== null) {
                        imageData.append('image', formData.image);
                        BlogService.uploadBlogImage(imageData, res.id)
                            .then(res => {
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
                <div className="form-control">
                    <textarea
                        value={formData.desc}
                        name="desc"
                        placeholder="description"
                        id="description"
                        rows="3"
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

                <button className="btn add-blog" type="submit">Add</button>
                {isUpdate && <button className="btn" onClick={() => { props.history.goBack() }}>CANCEL</button>}
            </form>
        </div >
    );
};

export default withRouter(withState(AddBlog));