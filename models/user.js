// File name: user.js
// Author's name: Arvin Almario, Chung Yin Tsang
// StudentID: 301225269, 301216704
// Web App name: explorebooking

//Import arvin
let mongoose = require('mongoose');
//Import crypto // chungyin 02/04/2023
let crypto = require('crypto');

//user model arvin
let UserSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        },
        userType:{
            type: String,
            default: "normal"
        }, //Added userType for authentication //chungyin 02/04/2023
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        password: {
            type: String,
            validate: [(password) => {
                return password && password.length > 6;
            }, 'Password should be longer']
        },
        salt: {
            type: String
        },
        provider: {
            type: String,
            required: 'Provider is required'
        },
        providerId: String,
        providerData: {},
        created: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "user"
    }
);

// Function for authentication // Added by chungyin 02/04/2023
UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

// Function for authentication // Added by chungyin 02/04/2023
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};


module.exports = mongoose.model("User", UserSchema);