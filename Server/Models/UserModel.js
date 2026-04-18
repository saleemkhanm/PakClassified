const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = require("mongoose");

const UserSchema = new Schema({

    firstname: {
        type: String,
        required: true
    },

     lastname: {
        type: String,
        required: true
    },

     email: {
        type: String,
        required: true,
        unique: true
    },

     password: {
        type: String,
        required: true
    },

     contact: {
        type: String,
        required: true
    },

     dob: {
        type: String,
        required: true
    },

     img: {
        type: String,
        required: true
    },

     securityquestions: {
        type: String,
        required: true
    },

     securityanswers: {
        type: String,
        required: true
    },

     adress: {
        type: String,
        required: true
    },

    //  roleid: {
    //     type: SchemaTypes.ObjectId,
    //     required: true,
    //     ref: "Role"
    // }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;