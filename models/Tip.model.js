const { Schema, model } = require("mongoose");

const tipSchema = new Schema(
  {
    content: { type: String, required: true}
  }
);

const Tip = model("Tip", tipSchema);

module.exports = Notification;