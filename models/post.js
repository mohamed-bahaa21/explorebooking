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
         region: 
         {
             type: String,
             default: 'Berat',
             trim: true,
             require: 'Region is required'
          },
         date: 
         {
            type: Date,
            default: Date.now
         },
         // Add owner for authentication // by chungyin 02/04/2023
         owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },

    {
        collection: "post"
    }

);

module.exports = mongoose.model("Post", postModel);