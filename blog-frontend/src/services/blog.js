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
    updateBlog: (data, blogId) => {
        return axios.post(`/update-blog/${blogId}`, data)
            .then((data) => {
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

    getFullBlog: (blogId) => {
        return axios.get(`/blog/${blogId}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                console.log(err);
                throw new Error(err.response.data.message);
            });
    },
    postComment: (blogId, data) => {
        return axios.post(`/post-comment/${blogId}`, data)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    },

    deleteBlog: (blogId) => {
        return axios.get(`/delete-blog/${blogId}`)
            .then((data) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    },

    getMyBlogs: (username) => {
        return axios.get(`/myblogs/${username}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    },
    uploadBlogImage: (imageData, blogId) => {
        return axios.post(`/upload-image/${blogId}`, imageData)
            .then((data) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    }
}

export default BlogService;