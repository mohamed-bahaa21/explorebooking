// File name: db.js
// Author's name: Arvin Almario
// StudentID: 301225269
// Web App name: explorebooking

// added my DB connection string aalmario
let atlasDB = "mongodb+srv://COMP231W23-T8:2hIbHQfFR21cEMNC@comp231w23-t8.e8jm5ef.mongodb.net/test";

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}