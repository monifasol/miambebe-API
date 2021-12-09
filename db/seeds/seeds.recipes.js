require("dotenv").config();
const mongoose = require("mongoose");
const Recipe = require("../../models/Recipe.model");
const User = require("../../models/User.model")


const getSeedsUser = async (email) => {
    const user = await User.findOne({ email: email })
    console.log("user id in seeds: ", user)
    return user._id
}

const recipes = async() => {
  [
    {
      title: "My first recipe",
      content: "Pour the fresh spinachs in a pan, add oil, and move until they cook. Remove and let cool down. Add 1 egg, grated cheese, and make little balls with your hands. Bake for 10’.",
      picture: "",
      preparationTime: 50, 
      difficulty: "easy",
      public: true,
      tags:["EGG", "VEG"],
      user: getSeedsUser('moni.sm@gmail.com')
    }
  ];
}

// connects to DB
require("../index");

Recipe.deleteMany()
  .then((recipes) =>
    console.log(`Deleted ${recipes.deletedCount} recipes.`)
  )
  .then(
    Recipe.insertMany(recipes)
            .then((recipes) => {
                console.log(`Created ${recipes.length} recipes.`);
                mongoose.connection.close();
    })
  )
  .catch((err) =>
    console.log(
      `An error occurred seeding recipes to the DB: ${err}.`
    )
  );
          