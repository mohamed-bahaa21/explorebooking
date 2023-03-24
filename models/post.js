// File name: post.js
// Author's name: Adityasinh Makwana
// StudentID: 301175966
// Web App name: explorebooking

//Import
let mongoose = require('mongoose');

//post model
let postModel = mongoose.Schema(
    {
        title:
        {
            type: String,
            default: 'Post title',
            trim: true,
            require: 'Post title required'
        },

        picture: String,

        content:
        {
            type: String,
            default: 'Post description',
            trim: true,
            require: 'Post desription required'
        },

        date:
        {
            type: Date,
            default: Date.now
        }
    },

    {
        collection: "post"
    }

);

module.exports = mongoose.model("Post", postModel);