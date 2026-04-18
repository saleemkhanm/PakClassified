const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = require("mongoose");

const AdvertismentimageSchema = new Schema({

    img: {
        type: String,
        required: true
    },

     rank: {
        type: String,
        required: true
    },

     caption: {
        type: String,
        required: true
    }
     
});

const Advertismentimage = mongoose.model("Advertismentimage", AdvertismentimageSchema);
module.exports = Advertismentimage;