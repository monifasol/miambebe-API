
const mongoose = require("mongoose");
const Tip = require("../../models/Tip.model");

const tips = [
  { content: "Egg is a common food allergen; introduce it very little by little!"},
  { content: "Introduce foods one at a time and mix them only with other foods that have already been introduced and are safe."},
  { content: "As soon as your baby starts eating solid, you can introduce the egg!"},
  { content: "Soja is considered healthy for full-term infants."},
  { content: "Soja is not considered healthy for babies born preterm: the higher aluminium content of soy formula may cause weaker bones or with reduced renal function."},
  { content: "Check our veggie bolognese made with carrots, tomate, and textured soybeans, kids love it!"},
  { content: "Some ideas for vegetal protein are: textured soybeans."},
  { content: "Healthy foods have nutrients that are important for growth, development and learning."},
  { content: "Limit salty, fatty and sugary foods."},
  { content: "Limit low-fibre foods."},
  { content: "Limit drinks with caffeine or a lot of sugar."},
  { content: "Between 1.6% and 7% of babies are allergic to milk."},
  { content: "About 2% of children under three years are allergic to eggs."},
  { content: "Up to 2% of children are allergic to peanuts, watch out!"},
  { content: "It's a good idea to combine iron-rich foods with citrics for a better iron absorption."},
  { content: "There are so many tasty spices for spicing up a dish like cumin, curcuma, curry, nutmeg, oregan, pepper... to avoid the salt!"},
];

// Connection BD
require("../index");

Tip.deleteMany()
  .then((tips) =>
    console.log(`Deleted ${tips.deletedCount} tips.`)
  )
  .then(
    Tip.insertMany(tips)
            .then((tips) => { console.log(`Created ${tips.length} tips.`) })
  )
  .catch((err) =>
    console.log(`An error occurred seeding tips to the DB: ${err}.`)
  )
  .finally( ()=> {
    mongoose.disconnect();
  })
