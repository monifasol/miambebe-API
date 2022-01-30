const { Schema, model } = require("mongoose");

const goalSchema = new Schema(
  {
    foodgroup: { type: Schema.Types.ObjectId, ref: "Foodgroup", required: true },
    quantityGoal: { type: Number, required: true},                    // in portions
    quantityAccomplished: { type: Number},
    baby: { type: Schema.Types.ObjectId, ref: "Baby", required: true }
  },
  { timestamps: true }
);

const Goal = model("Goal", goalSchema);

module.exports = Goal;