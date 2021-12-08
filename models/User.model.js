const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    babies: [{ type: Schema.Types.ObjectId, ref: "Baby" }]
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
