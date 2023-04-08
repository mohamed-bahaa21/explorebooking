// File name: controllers/post.js
// Author's name: Chung Yin Tsang
// StudentID: 301216704
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


// Render Post Details for Each Post
module.exports.displayPostDetails = async (req, res, next) => {
  try {
    const id = req.params.id;

    const postToShow = await Post.findById(id);
    if (!postToShow) {
      return res.render("error", { message: "Post not found" });
    }

    const user = await User.findById(postToShow.owner);
    if (!user) {
      return res.render("error", { message: "User not found" });
    }

    const comments = await Comment.find({ postId: id }).populate("userId");
    if (!comments) {
      return res.render("error", { message: "Comments not found" });
    }

    res.render("post/details", {
      post: postToShow,
      user: req.user ? req.user.firstName : "",
      userType: req.user ? req.user.userType : "",
      owner: user.firstName + " " + user.lastName,
      comments: comments,
    });
  } catch (error) {
    console.log(error);
    res.render("error", { message: "Unknown server error" });
  }
};


// Display Add Page
module.exports.displayAddPage = (req, res, next) => {
  let newPost = Post();

  res.render('post/add_edit', {
    title: 'Add a New Post',
    post: newPost,
    user: req.user ? req.user.firstName : '',
    userType: req.user ? req.user.userType : ''
  })

}

// Process Add Page
module.exports.processAdd = (req, res, next) => {
  try {
    let newItem = Post({
      _id: req.body.id,
      title: req.body.title,
      region: req.body.region,
      picture: req.body.picture,
      content: req.body.content,
      date: new Date(),
      owner: req.user.id
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
        console.log(item);
        res.redirect('/');
      }
    });
  } catch (error) {
    return res.status(400).json(
      {
        success: false,
        message: getErrorMessage(error)
      }
    );
  }
};

// Display Edit Page
module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;
  let currentUser = req.user.id;
  Post.findById(id, (err, postFound) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      let owner = postFound.owner;
      console.log("Process Edit. Owner ID:" + owner + " Requested ID: " + currentUser);

      if (owner == currentUser) {
        Post.findById(id, (err, post) => {
          if (err) {
            console.log(err);
            res.end(err);
          } else {
            res.render('post/add_edit', {
              title: 'Edit Post',
              post: post,
              user: req.user ? req.user.firstName : '',
              userType: req.user ? req.user.userType : ''
            })
          }
        });
      } else {
        console.log("Edit Rejected: Not the post owner.")
        res.render('post/confirmation', {
          user: req.user ? req.user.firstName : '',
          userType: req.user ? req.user.userType : '',
          post: postFound,
          message: "Edit Rejected: Not the post owner."
        });
      }
    }
  });
};

// Process Edit Page
module.exports.processEdit = (req, res, next) => {
  let id = req.params.id;
  let currentUser = req.user.id;
  Post.findById(id, (err, postFound) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      let owner = postFound.owner;
      console.log("Process Edit. Owner ID:" + owner + " Requested ID: " + currentUser);

      if (owner == currentUser) {
        // Edit post
        Post.findByIdAndUpdate(id, {
          $set: {
            title: req.body.title,
            region: req.body.region,
            picture: req.body.picture,
            content: req.body.content,
            date: req.body.date
          }
        }, (err, post) => {
          if (err) {
            console.log(err);
            res.end(err);
          } else {
            res.redirect('/post/details/' + id);
          }
        });
      } else {
        console.log("Edit Rejected: Not the post owner.")
        res.render('post/confirmation', {
          user: req.user ? req.user.firstName : '',
          userType: req.user ? req.user.userType : '',
          post: postFound,
          message: "Edit Rejected: Not the post owner."
        });
      }
    }
  });


};

// Perform Delete
module.exports.deletePost = (req, res, next) => {
  let id = req.params.id;
  let owner = "";
  let currentUser = req.user.id;
  let userType = req.user.userType;

  Post.findById(id, (err, postFound) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      owner = postFound.owner;
      console.log("Process delete. Owner ID:" + owner + " Requested ID: " + currentUser + " UserType: " + userType);

      if (owner == currentUser || userType == 'admin') {
        Post.findByIdAndRemove(id, (err, post) => {
          if (err) {
            console.log(err);
            res.end(err);
          } else {
            res.render('post/deleteConfirmation', {
              user: req.user ? req.user.firstName : '',
              userType: req.user ? req.user.userType : '',
              message: "Post successfully deleted."
            });
          }
        });
      } else {
        console.log("Deletion Rejected: Not the post owner/Admin.")
        res.render('post/deleteConfirmation', {
          user: req.user ? req.user.firstName : '',
          userType: req.user ? req.user.userType : '',
          message: "Deletion Rejected: Not the post owner/Admin."
        });
      }
    }
  });


};

// Perform filter by keywords
module.exports.filterByKeywords = async (req, res, next) => {
  try {
    let keyword = req.body.keyword;
    console.log("Searching keyword: " + keyword);
    if (typeof keyword === 'string' && keyword.length > 0) {
      const posts = await Post.find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { content: { $regex: keyword, $options: "i" } }
        ],
      });
      return res.render("index", {
        title: 'Search Result: ' + keyword,
        postList: posts,
        user: req.user ? req.user.firstName : '',
        userType: req.user ? req.user.userType : ''
      });
    } else {
      res.redirect('/');
    }

  } catch (err) {
    return res.render("error", { message: err.message });
  }
};


// Process Edit Page
// module.exports.editPost = async (req, res) => {
//   const { title, picture, content, postId, date } = req.body;
//   try {
//     if (!title || !picture || !content) {
//       return res.status(400).json({
//         success: false,
//         message: `${
//           !title ? "Title" : !picture ? "Picture" : "Content"
//         } is required`,
//       });
//     }
//     await Post.updateOne(
//       { _id: postId },
//       {
//         title,
//         picture,
//         content: content,
//         ...(date ? { date } : {}),
//       }
//     );
//     return  res.redirect("/post/" + postId);
//   } catch (err) {
//     return res.render("error", { message: err.message });
//   }
// };


