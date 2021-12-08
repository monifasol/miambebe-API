const { Schema, model } = require("mongoose");

const weekSchema = new Schema(
  {
    startdate: { type: Date, required: true},
    goals: [{ type: Schema.Types.ObjectId, ref: "Goal" }]
  }
);

const Week = model("Week", weekSchema);
module.exports = Week;
