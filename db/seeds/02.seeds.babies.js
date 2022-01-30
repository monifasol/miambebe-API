
const Baby = require("../../models/Baby.model");
const User = require("../../models/User.model");
const adminEmail = 'moni.sm@gmail.com'

const baby = {
      name: "Test baby", 
      age: "17",        // in months
      weight: "10",     // in Kg
      intolerances: ["celiac desease", "fructose intolerance"],
      avoids: ["MEAT", "FISH", "CEREAL"]
    };

Baby.deleteMany()
  .then((babies) => console.log(`Deleted ${babies.deletedCount} babies.`))
  .then(
    Baby.create(baby)
        .then((createdBaby) => {
          console.log(`Created baby with id ${createdBaby._id}.`)

          User.findOneAndUpdate( 
            { email: adminEmail }, 
            { $addToSet: { babies: createdBaby.id } },
            { new: true }
          )
          .then( (updatedUser) => {
            console.log(`Baby added to admin user (id user: ${updatedUser._id}).`)
          })
          .catch( (err) => {
            console.log(`Something failed while adding baby to user: ${err}`)
          })

        })
        .catch((err) => console.log(`An error occurred while creating a baby in the DB: ${err}.`))
  )
  .catch((err) =>
    console.log(`An error occurred seeding babies to the DB: ${err}.`)
  )
