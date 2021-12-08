const { Schema, model } = require("mongoose");

const babySchema = new Schema(
  {
    name: { type: String, required: true}, 
    age: { type: Number, required: true},        // in months
    weight: { type: Number, required: true},     // in Kg
    intolerances: [{ type: Schema.Types.ObjectId, ref: "Intolerance" }],
    avoids: [{ type: Schema.Types.ObjectId, ref: "Foodgroup" }]
  },
  { timestamps: true }
);

const Baby = model("Baby", babySchema);

module.exports = Baby;
