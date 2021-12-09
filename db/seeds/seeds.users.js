require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");

const users = [
    {
        firstname: "Monica",
        email: "moni.sm@gmail.com",
        password: bcrypt.hashSync("Dahlu25!", bcrypt.genSaltSync(4))
      },
];

// connects to DB
require("../index");

User.deleteMany()
  .then((tips) =>
    console.log(`Deleted ${users.deletedCount} users.`)
  )
  .then(
    User.insertMany(users)
            .then((users) => {
                console.log(`Created ${users.length} users)`);
                mongoose.connection.close();
    })
  )
  .catch((err) =>
    console.log(
      `An error occurred seeding tips to the DB: ${err}`
    )
  );
