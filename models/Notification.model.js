const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    content: { type: String, required: true},
    baby: { type: Schema.Types.ObjectId, ref: "Baby" }
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);

module.exports = Notification;