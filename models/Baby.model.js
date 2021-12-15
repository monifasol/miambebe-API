const { Schema, model } = require("mongoose");

const babySchema = new Schema(
  {
    name: { type: String, required: true}, 
    age: { type: Number, required: true},        // in months
    weight: { type: Number, required: true},     // in Kg
    intolerances: [String],
    avoids: [String],
    imageUrl: { type: String }
  },
  { timestamps: true }
);

const Baby = model("Baby", babySchema);

module.exports = Baby;
