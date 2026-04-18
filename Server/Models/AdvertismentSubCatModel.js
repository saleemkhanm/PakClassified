const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = require("mongoose");

const AdvertismentSubCatSchema = new Schema({

    name: {
        type: String,
        required: true
    },

     categoryid: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "AdvertismentCategory"
    }
     
     
});

const AdvertismentSubCat = mongoose.model("AdvertismentSubCat", AdvertismentSubCatSchema);
module.exports = AdvertismentSubCat;