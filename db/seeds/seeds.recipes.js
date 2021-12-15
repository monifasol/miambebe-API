const mongoose = require("mongoose");
const Recipe = require("../../models/Recipe.model");
const User = require("../../models/User.model")

const adminEmail = "moni.sm@gmail.com"

// seeds of recipes for testing user "moni.sm@gmail.com"
const recipes = 
  [
    {
      title: "Spinach and cheese balls",
      content: "Pour the fresh spinach in a pan, add oil, and move until they cook. Remove and let cool down. Add 1 egg, grated cheese, and make little balls with your hands. Bake for 10’.",
      picture: "",
      preparationTime: 20, 
      difficulty: "medium",
      intolerances: ["Egg allergy"],
      tags:["EGG", "VEG"],
      user: null
    },
    {
      title: "Baked butternut squash",
      content: "Cut in the middle, remove seeds, and cut into thick slices. Let bake 35-40 min in the oven (do not add oil!). You can remove the skin if you prefere, before giving it to your baby. They'll love it!",
      picture: "",
      preparationTime: 40, 
      difficulty: "easy",
      intolerances: ["Fructose intolerance"],
      tags:["VEG"],
      user: null
    },
    {
      title: "Muffins egg broccoli",
      content: "For this recipe you will need: 1 cup finely grated cheddar cheese, plus extra for topping, 1 cup cooked quinoa, 1 cup grated broccoli crown, 12 eggs, ¼ tsp turmeric, ¼ tsp cumin, and ¼ tsp pepper. Preheat the oven to 180 and lightly grease about 24 mini muffin tins. Pour it into a bowl, mix together the quinoa, cheese, broccoli, eggs, turmeric, cumin and pepper. Top with additional grated cheese, if desired. Divide the mixture between the mini muffin tins and bake for 10 minutes, or until set. Let cool down before serving.",
      picture: "",
      preparationTime: 50, 
      difficulty: "medium",
      intolerances: ["Egg allergy", "Lactose intolerance"],
      tags:["EGG", "VEG"],
      user: null
    },
    {
      title: "Galletas avena, manzana asada, platano, canela",
      content: "Para esta receta necesitarás: 1 manzana (o pera), Copos de Avena, 1 Platano, Canela, Pera o manzana 2-3 min en el microondas (u horno más tiempo). Preparación: triturar con tenedor. Añadir un plátano, triturar con tenedor. Añadir canela al gusto. Añadir copos de avena. Remover. Si está demasiado líquido, añadir más copos. Con un tenedor, poner porciones en la bandeja del horno. Hornear 20 min a 180 grados!",
      picture: "",
      preparationTime: 50, 
      difficulty: "medium",
      intolerances: ["Fructose intolerance"],
      tags:["CEREAL", "FRUIT"],
      user: null
    },
    {
      title: "Sweet potato and quinoa balls",
      content: "The ingredients are very simple: 1 cup quinoa, fresh spinach, 3 sweet potatoes, and 1 egg. Peel the sweet potatoes and cut them into cubes. Steam them for 10-15 min. Wash the quinoa and boil it. Wash the spinach and cook them in a pan with oil for 3-5min (I would steam it too). Mix spinach and sweet potatoes and smash (with pure smasher). Add quinoa, mix. Add 1 egg, mix. Make balls with the mass, and bake in the oven for 30 min.",
      picture: "",
      preparationTime: 50, 
      difficulty: "medium",
      intolerances: ["Egg allergy"],
      tags:["CEREAL", "VEG"],
      user: null
    },
    {
      title: "Broccoli",
      content: "Just steam a broccoli, lazy bitch!",
      picture: "",
      preparationTime: 7, 
      difficulty: "easy",
      intolerances: [],
      tags:["VEG"],
      user: null
    }
  ];

// Connection BD
require("../index");

Recipe.deleteMany()
  .then((recipes) => console.log(`Deleted ${recipes.deletedCount} recipes.`))
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
  //.finally( () => {
  //  mongoose.disconnect();
  //})
  
          