const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = require("mongoose");

const AdvertismentStatusSchema = new Schema({

    name: {
        type: String,
        required: true
    }
     
});

const AdvertismentStatus = mongoose.model("AdvertismentStatus", AdvertismentStatusSchema);
module.exports = AdvertismentStatus;