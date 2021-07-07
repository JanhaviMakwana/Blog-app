const db = require('../models');
const Blog = db.blog;

exports.postBlog = async (req, res) => {
    const { title, description } = req.body;
    try {
        const blog = await req.user.createBlog({ title: title, description: description });
        console.log(blog);
        res.send(blog);

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.uploadImage = async (req, res) => {
    const { blogId } = req.params;
    if (req.file) {
        const blog = await Blog.update({ imageUrl: req.file.filename }, { where: { id: blogId } });
        if (blog) {
            const blogs = await Blog.findAll();
            return res.send(blogs);
        } else {
            return res.status(404).json({ message: 'Blog not found' });
        }
    }

    return res.status(500).json('No image uploaded')
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({ include: ['comments'] });
        if (blogs.length > 0) {
            return res.send(blogs);
        }
        return res.send([]);

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getBlogsByUserId = async (req, res) => {
    try {
        const blogs = await req.user.getBlogs();
        return res.send(blogs);
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getBlogById = async (req, res) => {
    const { blogId } = req.params;
    try {
        const blog = await Blog.findByPk(blogId);
        return res.send(blog);
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteBlog = async (req, res) => {
    const { blogId } = req.params;
    try {
        const blog = await (await Blog.findByPk(blogId)).destroy();
        if (blog) {
            const blogs = await req.user.getBlogs();
            return res.send(blogs);
        }
        return res.json({ message: "Blog doesn't exist" });

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.addComment = async (req, res) => {
    const { blogId, desc } = req.body;
    try {
        const comment = await req.user.createComment({ blogId: blogId, description: desc })
            .then(comment => {

                return comment;
            })


        return res.send(comment);

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateBlog = async (req, res) => {
    const { blogId } = req.params;
    const { title, description } = req.body;

    try {
        const blog = await Blog.findByPk(blogId);

        if (blog) {
            const updatedBlog = await blog.update({ title: title, description: description });
            return res.send(updatedBlog);
        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};