const Blog = require('../models/blog');
const appConfig = require('../config/app.config');
const fs = require('fs');

exports.postBlog = (req, res) => {
    const { title, body, author } = req.body;
    const comments = [];
    const newblog = new Blog({ title, body, author, comments });
    newblog
        .save()
        .then((result) => {
            return res.send(result);
        })
        .catch(e => {
            return res.status(500).json({ message: 'Internal Server Error' });
        })
}

exports.getAllBlogs = async (req, res) => {
    try {
        const fetchedBlog = await Blog.find({}, { _id: 1, comments: 1, title: 1, body: 1, author: 1, createdAt: 1, imageUrl:1  });
        return res.send(fetchedBlog);

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }

};

exports.getFullBlog = async (req, res) => {
    const { blogId } = req.params;
    try {
        const fullBlog = await Blog.find({ _id: blogId }, { comments: 1, title: 1, body: 1, author: 1, createdAt: 1, imageUrl:1 });
        return res.send(fullBlog[0]);
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.postComment = async (req, res) => {
    const { blogId } = req.params;
    const { comment, user } = req.body;
    try {
        const updatedBlog = await Blog.updateOne({ _id: blogId }, { "$push": { comments: { body: comment, user: user, createAt: new Date() } } })

        if (updatedBlog) {
            return res.json({ message: 'Comment posted successfully' })
        }

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.updateBlog = async (req, res) => {
    const { blogId } = req.params;
    const { body, title } = req.body;
    try {
        const updatedBlog = await Blog.updateOne({ _id: blogId }, { body: body, title: title });
        if (updatedBlog) {
            return res.json({ message: 'Blog updated successfully' });
        }

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.deleteBlog = async (req, res) => {
    const { blogId } = req.params;
    try {
        const deletedBlog = await Blog.findOne({ _id: blogId });

        if (deletedBlog) {
            if(deletedBlog.imageUrl) {
                const filename = deletedBlog.imageUrl.split(`${appConfig.appUrl}:${appConfig.appPort}/`)[1];
                fs.unlinkSync(`uploads/${filename}`);
            }
            deletedBlog.remove();
            return res.json({ message: 'Blog deleted successfully' });
        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getBlogsByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const blogs = await Blog.find({ author: username }, { _id: 1, body: 1, title: 1, author: 1, imageUrl:1  })
        return res.send(blogs);

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.uploadImage = async (req, res) => {
    const { blogId } = req.params;
    if (req.file) {
        const blog = await Blog.updateOne({ _id: blogId }, { imageUrl: `${appConfig.appUrl}:${appConfig.appPort}/${req.file.filename}` });
        if (blog) {
            return res.json("Blog-image uploaded successfully !");
        } else {
            return res.status(404).json({ message: 'Blog not found' });
        }
    }

    return res.status(500).json('No image uploaded')
};

