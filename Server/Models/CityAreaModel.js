const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = require("mongoose");

const CityAreaSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    cityid: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "City"
    }
});

const CityArea = mongoose.model("CityArea", CityAreaSchema);
module.exports = CityArea;