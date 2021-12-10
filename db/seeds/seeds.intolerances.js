
const mongoose = require("mongoose");
const Intolerance = require("../../models/Intolerance.model");

const intolerances = [
  {
    name: "Fructose intolerance",
    foodgroups: ["FRUIT"]
  },
  {
    name: "Lactose intolerance",
    foodgroups: ["DAIRY, FAT"]
  },
  {
    name: "Celiac desease",
    foodgroups: ["CEREAL"]
  },
  {
    name: "Egg allergy",
    foodgroups: ["EGG"]
  },
  {
    name: "Nuts allergy",
    foodgroups: ["FRUIT, VEG"]    
  },
  {
    name: "Peanuts allergy",
    foodgroups: ["VEG"]         // peanuts are vegetables!!
  }
];

// Connection BD
require("../index");

Intolerance.deleteMany()
  .then((intolerances) =>
    console.log(`Deleted ${intolerances.deletedCount} intolerances.`)
  )
  .then(
    Intolerance.insertMany(intolerances)
            .then((intolerances) => { console.log(`Created ${intolerances.length} intolerances.`) })
  )
  .catch((err) =>
    console.log(`An error occurred seeding intolerances to the DB: ${err}.`)
  )
  .finally( ()=> {
    mongoose.disconnect();
  })
