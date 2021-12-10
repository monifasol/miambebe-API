
const User = require("../../models/User.model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const users = [
    {
        name: "Monica",
        email: "moni.sm@gmail.com",
        password: bcrypt.hashSync("Dahlu1234!", bcrypt.genSaltSync(10))
      },
];

// Connection BD
require("../index");

User.deleteMany()
  .then((users) =>
    console.log(`Deleted ${users.deletedCount} users.`)
  )
  .then(()=> {
    return User
        .insertMany(users)
        .then((users) => { console.log(`Created ${users.length} users.`) })
      }
  )
  .catch((err) =>
    console.log(`An error occurred seeding tips to the DB: ${err}.`)
  )
  .finally( ()=> {
    mongoose.disconnect();
  })

