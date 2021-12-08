const { Schema, model } = require("mongoose");

const foodgroupSchema = new Schema(
  {
    name: { type: String, required: true},
    code: { type: String, required: true},
    description: { type: String, required: true},
    picture: { type: String }
  }
);

const Foodgroup = model("Foodgroup", foodgroupSchema);

module.exports = Foodgroup;
