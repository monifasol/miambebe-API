
const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");

const users = [
      {
        name: "Monica",
        email: "moni.sm@gmail.com",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(10))
      },
      {
        name: "Florian",
        email: "jublot.florian@gmail.com",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(10))
      }
];

User.deleteMany()
  .then((users) =>
    console.log(`Deleted ${users.deletedCount} users.`)
  )
  .then(
    User.insertMany(users)
          .then((users) => { console.log(`Created ${users.length} users.`) })
          .catch((e)=> console.log(e))
  )
  .catch((err) =>
    console.log(`An error occurred seeding users to the DB: ${err}.` )
  )