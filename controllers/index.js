// File name: controllers/index.js
// Author's name:
// StudentID:
// Web App name: explorebooking
let Post = require("../models/post");

// exports.home = function(req, res, next) {
//   res.render('index', { 
//       title: 'Home'
//   });
// };


// Render Post Overviews (List of the post)

module.exports.home = function(req, res, next) {  
  Post.find((err, postList) => {
      // console.log(postList);
      if(err)
      {
          return console.error(err);
      }
      else
      {
          res.render('index', {
              title: 'Posts', 
              postList: postList,
              user: req.user ? req.user.firstName: '',
              userType: req.user ? req.user.userType: ''
          })            
      }
  });
}

// Perform filter by region
module.exports.filterByRegion = async (req, res, next) => {
    try {
      const { region } = req.params;
      console.log("Loading filter:" + region);
      if (!region) {
        return res.render("/error", { message: `Region is required` });
      }
      const posts = await Post.find({ region });
      return res.render("index", {
        title: region, 
        postList: posts,
        user: req.user ? req.user.firstName: '',
        userType: req.user ? req.user.userType: '' 
        });
    } catch (err) {
      return res.render("/error", { message: err.message });
    }
  };
  

  Post.find({title:'Test - Post Title Sample 3'}, (error, data) => {
    if(error){
        console.log(error)
    }else{
        console.log(data)
    }
  });
  