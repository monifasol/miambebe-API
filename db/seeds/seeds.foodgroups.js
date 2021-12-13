
const mongoose = require("mongoose");
const Foodgroup = require("../../models/Foodgroup.model");

const foodgroups = [
  {
    name: "Fruits",
    code: "FRUIT",
    description: "Banana, apple, pear, mango, red fruits, papaya, grapes,...",
    picture: ""
  },
  {
    name: "Vegetables",
    code: "VEG",
    description: "Brocoli, eggplant, zucchini, green beans, peas, tomatoes, carrots, leek...",
    picture: ""
  },
  {
    name: "Legumes",
    code: "DRIED_VEG",
    description: "Lentils, chickpeas, white beans,",
    picture: ""
  },
  {
    name: "Dairy",
    code: "DAIRY",
    description: "Cow milk, goat milk, yogurts, cheese,...",
    picture: ""
  },
  {
    name: "Potatoes",
    code: "POTATOES",
    description: "Mashes potatoes, potato chunks.",
    picture: ""
  },
  {
    name: "Cereal, Bread",
    code: "CEREAL",
    description: "Breads, cereals, rice, pasta, noodles and other grains.",
    picture: ""
  },
  {
    name: "Eggs",
    code: "EGG",
    description: "Eggs",
    picture: ""
  },
  {
    name: "Meat",
    code: "MEAT",
    description: "Meat",
    picture: ""
  },
  {
    name: "Fish",
    code: "FISH",
    description: "Fish",
    picture: ""
  },
  {
    name: "Fats",
    code: "FAT",
    description: "Butter, olive oil, any vegetal oil,...",
    picture: ""
  }
];

// Connection BD
require("../index");

Foodgroup.deleteMany()
  .then((foodgroups) =>
    console.log(`Deleted ${foodgroups.deletedCount} foodgroups.`)
  )
  .then(
    Foodgroup.insertMany(foodgroups)
            .then((foodgroups) => { console.log(`Created ${foodgroups.length} foodgroups.`) })
            .catch((e)=> console.log(e))
  )
  .catch((err) =>
    console.log(`An error occurred seeding foodgroups to the DB: ${err}.` )
  )
  .finally( ()=> {
    mongoose.disconnect();
  })
