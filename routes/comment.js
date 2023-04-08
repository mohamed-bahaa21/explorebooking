
// File name: routes/comment.js
// Author's name: Saima Rafik Patel
// StudentID: 301248048
// Web App name: explorebooking

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
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

router.post('/add', commentController.createComment);



module.exports = router;
