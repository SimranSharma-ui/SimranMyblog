const express = require('express');
const { createBlog, deleteBlog, getAllBlogs, getSingleBlog, getMyBlogs, updateBlog } = require('../controller/blogController');
const {isAuthenticated, isAdmin} = require('../midleware/Authmidleware');
const router = express.Router();

router.post('/create',isAuthenticated ,isAdmin("admin"),createBlog);
router.delete('/delete/:id',isAuthenticated,isAdmin("admin"),deleteBlog);
router.get('/all-blogs',getAllBlogs);
router.get('/single-blog/:id',isAuthenticated,getSingleBlog);
router.get('/my-blog',isAuthenticated,isAdmin('admin'),getMyBlogs);
router.put('/update/:id',isAuthenticated,isAdmin("admin"),updateBlog);

module.exports = router;