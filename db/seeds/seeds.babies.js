
const mongoose = require("mongoose");
const Baby = require("../../models/Baby.model");
const Week = require("../../models/Week.model");

// We SEED ONE BABY for testing, as well as a week attached to them.

const baby = {
      name: "Test baby", 
      age: "17",        // in months
      weight: "10",     // in Kg
      intolerances: ["celiac desease", "fructose intolerance"],
      avoids: ["MEAT", "FISH", "CEREAL"]
    };


const formatDate = (date) => {
  return date.getDate() + 
  "-" +  (date.getMonth() + 1) +
  "-" +  date.getFullYear();
}  

let today = new Date()
const day = today.getDay();                                   // day of week
const diff = today.getDate() - day + (day === 0 ? -6 : 1);    // day of month - day of week (-6 if Sunday), otherwise +1
var firstD = new Date(today.setDate(diff))                    // first day
var lastD = new Date(today.setDate(firstD.getDate() + 6))     // last day --> first day + 6

const week = {
  firstday: formatDate(firstD),
  lastday: formatDate(lastD)
};

// Connection BD
require("../index");

Baby.deleteMany()
  .then((babies) => console.log(`Deleted ${babies.deletedCount} babies.`))
  .then(
    Baby.create(baby)
        .then((createdBaby) => {
          console.log(`Created baby with id ${createdBaby._id}.`)
          
          Week.deleteMany()
          .then((weeks) => console.log(`Deleted ${weeks.deletedCount} weeks.`))
          .then( () => {
            Week.create({
              firstday: week.firstday,
              lastday: week.lastday,
              baby: createdBaby._id
            })
            .then( (createdWeek) => console.log(`Created week with id ${createdWeek._id}.`))
            .catch( (err) => console.log(`An error occurred while creating a week in the DB: ${err}.`))
          })
          .catch((err) => console.log(`An error occurred while deleting the existent weeks from the DB: ${err}.`)) 
        })
        .catch((err) => console.log(`An error occurred while creating a baby in the DB: ${err}.`))
  )
  .catch((err) =>
    console.log(`An error occurred seeding babies to the DB: ${err}.`)
  )
  //.finally( ()=> {
  //  mongoose.disconnect();
  //})
