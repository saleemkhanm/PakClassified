const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = require("mongoose");

const AdvertismentTypeSchema = new Schema({

    name: {
        type: String,
        required: true
    }
     
});

const AdvertismentType = mongoose.model("AdvertismentType", AdvertismentTypeSchema);
module.exports = AdvertismentType;