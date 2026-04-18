const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = require("mongoose");

const AdvertismentCategorySchema = new Schema({

    name: {
        type: String,
        required: true
    },
      img: {
        type: String,
        required: true
    }
     
});

const AdvertismentCategory = mongoose.model("AdvertismentCategory", AdvertismentCategorySchema);
module.exports = AdvertismentCategory;