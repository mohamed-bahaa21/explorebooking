// File name: controllers/comment.js
// Author's name: Saima Rafik Patel
// StudentID: 301248048
// Web App name: explorebooking

// Create a reference to the post model
let Post = require("../models/post");
let User = require("../models/user");
let Comment = require("../models/comment");

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

// Process Add Page
module.exports.createComment = (req, res, next) => {
  try {
    Comment.create({ ...req.body, userId: req.user?.id || null }, (err, item) => {
      if (err) {
        console.log(err);
        // res.end(err);
        return res.render("error", { message: err.message });
      } else {
        console.log(item);
        res.redirect("/post/details/"+req.body.postId);
      }
    });
  } catch (error) {
    return res.render("error", { message: err.message });
  }
};
