require("dotenv").config();
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe.model");
const Foodgroup = require("../models/Foodgroups.model")
const User = require("../models/User.model")

const getFoodgroupId = async (code) => {
    const foodgroupId = await Foodgroup.find({ code: code }).id
    console.log("foodgroup id in seeds: ", foodgroupId)
    return foodgroupId
}

const getSeedsUser = async (email) => {
    const userId = await User.find({ email: email }).id
    console.log("user id in seeds: ", userId)
    return userId
}

const recipes = [
  {
    title: "My first recipe",
    content: "Pour the fresh spinachs in a pan, add oil, and move until they cook. Remove and let cool down. Add 1 egg, grated cheese, and make little balls with your hands. Bake for 10’.",
    picture: "",
    preparationTime: 50, 
    difficulty: "easy",
    public: true,
    tags: [ getFoodgroupId("EGG"), getFoodgroupId("VEG")],
    user: getSeedsUser('moni.sm@gmail.com')
  },
  {
    title: "My second recipe",
    content: "Pour the fresh spinachs in a pan, blablabla, bla blabla bla, bla, and bla, until it cooks. Remove and let cool down. ",
    picture: "",
    preparationTime: 50, 
    difficulty: "easy",
    public: true,
    tags: [ getFoodgroupId("EGG"), getFoodgroupId("VEG")],
    user: getSeedsUser('moni.sm@gmail.com')
  }
];

// connects to DB
require("./index");

Recipe.deleteMany()
  .then((recipes) =>
    console.log(`Deleted ${recipes.deletedCount} recipes.`)
  )
  .then(
    Recipe.insertMany(recipes)
            .then((recipes) => {
                console.log(`Created ${recipes.length} recipes)`);
                mongoose.connection.close();
    })
  )
  .catch((err) =>
    console.log(
      `An error occurred seeding recipes to the DB: ${err}`
    )
  );
          