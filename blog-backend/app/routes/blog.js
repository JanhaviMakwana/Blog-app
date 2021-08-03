const express = require('express');
const router = express.Router();
const { postBlog, getAllBlogs, getFullBlog, postComment, updateBlog, deleteBlog, getBlogsByUsername, uploadImage } = require('../controllers/blog');
const { blogImageUpload } = require('../middleware/imageUpload');
const { authenticate } = require('../middleware/auth');

router.post('/post-blog/:userId', [authenticate], postBlog);
router.post('/post-comment/:blogId',[authenticate], postComment);
router.get('/blog/:blogId', [authenticate], getFullBlog);
router.post('/update-blog/:blogId', [authenticate], updateBlog);
router.get('/myblogs/:username', [authenticate], getBlogsByUsername);
router.get('/delete-blog/:blogId', [authenticate], deleteBlog);
router.post('/upload-image/:blogId', [authenticate,blogImageUpload], uploadImage)
router.get('/get-blogs', getAllBlogs);

module.exports = router;
