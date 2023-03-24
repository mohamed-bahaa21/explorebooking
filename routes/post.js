// File name: post.js
// Author's name: Adityasinh Makwana
// StudentID: 301175966
// Web App name: explorebooking

var express = require('express');
var router = express.Router();
let postController = require('../controllers/post');

//route for adding post
router.get('/add', postController.addPost);


//route for deleting post
router.get('delete/:id', postController.deletePost);

module.exports = router;