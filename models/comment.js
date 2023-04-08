// File name: models/comment.js
// Author's name: Saima Rafik Patel
// StudentID: 301248048
// Web App name: explorebooking

//Import
let mongoose = require("mongoose");

//comment model
let commentModel = mongoose.Schema(
  {
    commentText: {
      type: String,
      default: "Comment text",
      trim: true,
      require: "Comment text is required",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: 'User id is required',
        default: null,
        required: false
      },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: 'Post id is required'
    },
  },
  {
    collection: "comment",
  }
);

module.exports = mongoose.model("comment", commentModel);
