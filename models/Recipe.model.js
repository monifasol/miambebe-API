const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    title: { type: String, required: true},
    content: { type: String, required: true},
    preparationTime: { type: Number, required: true},   // in minutes 
    difficulty: { 
                    type: String, 
                    required: true,
                    enum: ["easy", "medium", "hard"]
                },
    intolerances: [String],
    tags: [String],
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
