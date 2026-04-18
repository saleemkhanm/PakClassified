const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = require("mongoose");

const RoleSchema = new Schema({

    name: {
        type: String,
        required: true
    }
});

const Role = mongoose.model("Role", RoleSchema);
module.exports = Role;