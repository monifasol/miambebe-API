const { Schema, model } = require("mongoose");

const intoleranceSchema = new Schema(
  {
    name: { type: String, required: true},
    foodgroups: [String]
  },
  { timestamps: true }
);

const Intolerance = model("Intolerance", intoleranceSchema);

module.exports = Intolerance;
