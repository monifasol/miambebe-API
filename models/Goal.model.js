const { Schema, model } = require("mongoose");

const goalSchema = new Schema(
  {
    foodgroup: { type: String, required: true},
    quantity: { type: Number, required: true},    // in portions
    given: { type: Number},
    week: { type: Schema.Types.ObjectId, ref: "Week" }
  },
  { timestamps: true }
);

const Goal = model("Goal", goalSchema);

module.exports = Goal;