// File name: controllers/post.js
// Author's name: Chung Yin Tsang
// StudentID: 301216704
// Web App name: explorebooking

// Create a reference to the post model
let Post = require("../models/post");

function getErrorMessage(err) {
    if (err.errors) {
      for (let errName in err.errors) {
        if (err.errors[errName].message) return err.errors[errName].message;
      }
    }
    if (err.message) {
      return err.message;
    } else {
      return "Unknown server error";
    }
}

// Render Post Overviews (List of the post)

// Render Post Details for Each Post
module.exports.postDetails = (req, res, next) => {
    
  let id = req.params.id;

  Post.findById(id, (err, postToShow) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //show the edit view
          res.render('post/details', {
              post: postToShow
          })
      }
  });
}


// Display Add Page
module.exports.displayAddPage = (req, res, next) => {
    let newPost = Post();

    res.render('post/add_edit', {
        title: 'Add a New Post',
        post: newPost,
        userName: req.user ? req.user.username : ''
    })           

}

// Process Add Page
module.exports.processAdd = (req, res, next) => {
    try {
      let newItem = Post({
        _id: req.body.id,
        title: req.body.title,
        picture: req.body.picture,
        content: req.body.content,
        date: req.body.date,
        owner:
          req.body.owner == null || req.body.owner == ""
            ? req.payload.id
            : req.body.owner,
      });
  
      Post.create(newItem, (err, item) => {
        if (err) {
          console.log(err);
          // res.end(err);
          res.status(400).json({
            success: false,
            message: getErrorMessage(err),
          });
        } else {
          // refresh the  list
          console.log(item);
          res.redirect('/');
          res.status(200).json(item);
        }
      });
    }catch (error) {
          return res.status(400).json(
              { 
                  success: false, 
                  message: getErrorMessage(error)
              }
          );
      } 
  };

// Display Edit Page

// Process Edit Page

// Perform Delete
