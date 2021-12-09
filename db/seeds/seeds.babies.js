require("dotenv").config();

const mongoose = require("mongoose");
const Baby = require("../../models/Baby.model");

const babies = [
    {
      name: "Test baby", 
      age: "17",        // in months
      weight: "10",     // in Kg
      intolerances: ["celiac desease", "fructose intolerance"],
      avoids: ["MEAT", "FISH", "CEREAL"]
    },
];

// connects to DB
require("../index");

Baby.deleteMany()
  .then((babies) =>
    console.log(`Deleted ${babies.deletedCount} babies.`)
  )
  .then(
    Baby.insertMany(babies)
            .then((babies) => {
                console.log(`Created ${babies.length} babies.`);
                mongoose.connection.close();
    })
  )
  .catch((err) =>
    console.log(
      `An error occurred seeding tips to the DB: ${err}.`
    )
  );
