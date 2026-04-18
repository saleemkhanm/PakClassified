const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = require("mongoose");

const AdvertismentSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    feature: {
        type: String,
        required: true
    },
    starton: {
        type: String,
        required: true
    },

    endon: {
        type: String,
        required: true
    },

    advertismentimgid: {
        type: String,
        required: true,
        ref: "Advertismentimage"
    },

    cityareaid: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "CityArea"
    },

    advertismentstatusid: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "AdvertismentStatus"
    },

    advertismenttypeid: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "AdvertismentType"
    },

    advertismentcategory: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "AdvertismentSubCat"
    },

    userid: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
}, { timestamps: true });

const Advertisment = mongoose.model("Advertisment", AdvertismentSchema);
module.exports = Advertisment;