const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

// Route for displaying all posts
router.get('/', postController.displayAllPosts);

// Route for displaying a specific post
router.get('/details/:id', postController.displayPostDetails);

// Route for displaying the add post page
router.get('/add', postController.displayAddPage);

// Route for processing the add post form
router.post('/add', postController.processAdd);

// Route for displaying the edit post page
router.get('/edit/:id', postController.displayEditPage);

// Route for processing the edit post form
router.post('/edit/:id', postController.processEdit);

// Route for deleting a post
router.get('/delete/:id', postController.deletePost);

module.exports = router;