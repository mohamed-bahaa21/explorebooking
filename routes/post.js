
// File name: post.js
// Author's name: Adityasinh Makwana
// StudentID: 301175966
// Web App name: explorebooking

const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
let controlerIndex = require('../controllers/index');

// Function for authentication // Added by chungyin 02/04/2023
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(req.isAuthenticated()){
        //if user is logged in, go to next function
        next();
    }else{
        //if user is not loggged in, copy the originalUrl to the session
        req.session.url = req.originalUrl;
        return res.redirect('/user/login');
    }
    

}

// Route for displaying all posts
router.get('/', controlerIndex.home);

// Route for displaying a specific post
router.get('/details/:id', postController.displayPostDetails);

// Route for displaying the add post page
router.get('/add', requireAuth, postController.displayAddPage);

// Route for processing the add post form
router.post('/add', requireAuth, postController.processAdd);

// Route for displaying the edit post page
router.get('/edit/:id', requireAuth, postController.displayEditPage);

// Route for processing the edit post form
router.post('/edit/:id', requireAuth, postController.processEdit);

// Route for deleting a post
router.get('/delete/:id', requireAuth, postController.deletePost);

// Route for filter by keyword
router.post('/search', postController.filterByKeywords);

// Route for displaying user profile
router.get('/user', requireAuth, controlerIndex.home);

//Route for the search function
// router.get('/search', (req, res) => {
//   const query = req.query.q; // Get the search query
//   const results = searchPosts(query); // Search for posts

//   // Render the search results page
//   res.render('search-results', { results });
// });


module.exports = router;
