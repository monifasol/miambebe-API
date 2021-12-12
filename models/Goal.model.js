const { Schema, model } = require("mongoose");

const goalSchema = new Schema(
  {
    foodgroup: { type: Schema.Types.ObjectId, ref: "Foodgroup" },
    quantityGoal: { type: Number, required: true},                    // in portions
    quantityAccomplished: { type: Number},
    week: { type: Schema.Types.ObjectId, ref: "Week" }
  },
  { timestamps: true }
);

const Goal = model("Goal", goalSchema);

module.exports = Goal;