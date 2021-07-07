import axios from '../axios';

const BlogService = {

    postBlog: (data, userId) => {
        return axios.post(`/post-blog/${userId}`, data)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    },
    uploadBlogImage: (data, blogId) => {
        return axios.post(`/upload-image/${blogId}`, data)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    },
    getAllBlogs: () => {
        return axios.get('/get-blogs')
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    },
    getBlogsByUserId: (userId) => {
        return axios.get(`/blogs/${userId}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    },
    deleteBlog: (blogId, userId) => {
        return axios.get(`/delete-blog/${userId}/${blogId}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    },
    postComment: (userId, data) => {
        return axios.post(`/add-comment/${userId}`, data)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    },
    updateBlog: (blogId, data) => {
        return axios.post(`/update-blog/${blogId}`, data)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    }
}

export default BlogService;