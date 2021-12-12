const { Schema, model } = require("mongoose");

const weekSchema = new Schema(
  {
    firstday: { type: String, required: true},
    lastday: { type: String, required: true},
    baby: { type: Schema.Types.ObjectId, ref: "Baby" },
    goals: [{ type: Schema.Types.ObjectId, ref: "Goal" }]
  }
);

const Week = model("Week", weekSchema);
module.exports = Week;
