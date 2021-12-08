const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    content: { type: String, required: true},
    week: { type: Schema.Types.ObjectId, ref: "Week" }
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);

module.exports = Notification;