import { withRouter } from 'react-router-dom';
import { withState } from '../../../blog-context';
import './Blog.css';
const Blog = (props) => {

    const blog = props.blog;

    const fullBlogView = () => {
        props.history.push(`/full-blog/${blog._id}`);
    }

    return (
        <div className="blog" onClick={fullBlogView}>
            <div className="section1">
                <div className="blog_title">{blog.title}</div>
                <div className="blog_author">@{blog.author}</div>

            </div>
            <div className="blog_body">{blog.body}</div>
            {blog.imageUrl && <div className="blog_image">
                <img src={blog.imageUrl} alt={blog.title} />
            </div>}
        </div>
    );

};

export default withRouter(withState(Blog));