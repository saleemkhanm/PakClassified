const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = require("mongoose");

const ProvinceSchema = new Schema({

    name: {
        type: String,
        required: true
    },
     countryid: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Country"
    }
});

const Province = mongoose.model("Province", ProvinceSchema);
module.exports = Province;