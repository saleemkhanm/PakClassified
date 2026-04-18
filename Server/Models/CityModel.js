const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = require("mongoose");

const CitySchema = new Schema({

    name: {
        type: String,
        required: true
    },
     provinceid: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Province"
    }
});

const City = mongoose.model("City", CitySchema);
module.exports = City;