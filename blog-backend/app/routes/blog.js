const express = require('express');
const { postBlog, uploadImage, getAllBlogs, getBlogsByUserId, deleteBlog, addComment, updateBlog } = require('../controllers/blog');
const { getCurrentUser,authenticate } = require('../middleware/auth');
const { blogImageUpload, blogImageRemove } = require('../middleware/imageUpload');
const router = express.Router();

router.post('/update-blog/:blogId',[authenticate], updateBlog);
router.post('/post-blog/:userId', [authenticate,getCurrentUser], postBlog);
router.post('/upload-image/:blogId', [authenticate,blogImageUpload], uploadImage);
router.get('/blogs/:userId', [authenticate,getCurrentUser], getBlogsByUserId);
router.post('/add-comment/:userId', [authenticate,getCurrentUser], addComment);
router.get('/delete-blog/:userId/:blogId', [authenticate,getCurrentUser, blogImageRemove], deleteBlog);
router.get('/get-blogs', getAllBlogs);

module.exports = router;