const mongoose = require("mongoose");
const Recipe = require("../../models/Recipe.model");
const User = require("../../models/User.model")

const adminEmail = "moni.sm@gmail.com"

// seeds of recipes for testing user "moni.sm@gmail.com"
const recipes = 
  [
    {
      title: "My first recipe",
      content: "Pour the fresh spinachs in a pan, add oil, and move until they cook. Remove and let cool down. Add 1 egg, grated cheese, and make little balls with your hands. Bake for 10’.",
      picture: "",
      preparationTime: 50, 
      difficulty: "easy",
      public: true,
      intolerances: ["Egg allergy"],
      tags:["EGG", "VEG"],
      user: null
    },
    {
      title: "My second recipe",
      content: "Pour the fresh spinachs in a pan, add oil, bla, bla, bla. Remove and let cool down. Add 1 egg, grated cheese, and make little balls with your hands. Bake for 10’.",
      picture: "",
      preparationTime: 30, 
      difficulty: "medium",
      public: true,
      intolerances: ["Fructose intolerance", "Celiac desease"],
      tags:["FRUIT", "CEREAL"],
      user: null
    }
  ];

// Connection BD
require("../index");

Recipe.deleteMany()
  .then((recipes) => { return console.log(`Deleted ${recipes.deletedCount} recipes.`) })
  .then( () => {
    User.findOne({ email: adminEmail })
        .then( (user) => {
          
          recipes.forEach( (recipe) => {
            Recipe.create(
              {
                title: recipe.title,
                content: recipe.content,
                picture: recipe.picture,
                preparationTime: recipe.preparationTime, 
                difficulty: recipe.difficulty,
                public: recipe.public,
                intolerances: recipe.intolerances,
                tags: recipe.tags,
                user: user._id
              }
            )
            .then( (createdRecipe) => { console.log(`Created recipe with id ${createdRecipe._id}.`) })
            .catch((err) => console.log(`An error occurred creatin a recipe to the DB: ${err}.`) )
          })
          console.log(`Created ${recipes.length} recipes.`)
        })
        .catch((err) => console.log(`An error occurred finding the writter of the recipe: ${err}.`) )
      })
  .catch((err) =>
    console.log(`An error occurred seeding recipes to the DB: ${err}.`)
  )
  .finally( () => {
    mongoose.disconnect();
  })
  
          