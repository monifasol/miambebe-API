const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Week = require("../models/Week.model");
const Goal = require("../models/Goal.model");
const Baby = require("../models/Baby.model");
const Foodgroup = require("../models/Foodgroup.model");

const createResponseObject = require("../utils/createResponseObject")
const createResponseErrorObject = require("../utils/createResponseErrorObject")


// | HTTP verb | URL                       | Request body  | Response          | Action                                   |
// | --------- | ------------------------- | ------------- | ----------------- | ---------------------------------------- |
// | GET       |`/weeks/:babyId`           | (empty)       | JSON              | Lists all weeks for the specified baby   |   
// | POST      |`/weeks`                   | JSON          | JSON New week     | Adds a new week for the specified baby   |   
// | GET       |`/weeks/:babyId/:firstday` | (empty)       | JSON              | Returns week with the specified firstday |   
// | GET       |`/weeks/:id`               | (empty)       | JSON              | Returns the specified week               |                
// | PUT       |`/weeks/:id`               | JSON          | JSON Updated week | Updates Week (add GOALS to the week)     |                
// | DELETE    |`/weeks/:id`               | (empty)       | JSON              | Deletes goals from specified week        | 


//  GET /weeks/:id -  Returns the week specified by id
router.get("/:id", (req, res) => {

  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified week id is not valid" });
    return;
  }

  Week.findById({_id: id})
    //.populate('baby')
    .populate({
      path: "goals",
      populate: [ 
        {
          path: "foodgroup",
          model: "Foodgroup"
        }
      ]
    })
    .lean()
    .then((foundWeek) => {
      let message = `Week with id ${foundWeek._id} found.`
      res.status(200).json(createResponseObject(foundWeek, message, null))    
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});



//  GET /weeks/:babyId -  Returns all weeks for the specified baby
router.get("/:babyId", (req, res) => {
  const {babyId} = req.params

  Week.find( { baby: babyId } )
    //.populate("baby")
    .populate({
      path: "goals",
      populate: [ 
        {
          path: "foodgroup",
          model: "Foodgroup"
        }
      ]
    })
    .lean()
    .then((weeks) => {
      let message = `List of ${weeks.length} found.`
      res.status(200).json(createResponseObject(weeks, message, null)) 
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});

//  POST /weeks -  Creates a new week
router.post("/", async (req, res) => {
  const { firstday, lastday, babyId } = req.body

  const weekFound = await Week.findOne( {firstday, baby: babyId } )

  if (!weekFound) {
    Week.create({ firstday, lastday, baby: babyId, goals: [] })
    .then((createdWeek) => {
      let message = `Week with with id ${createdWeek._id} created.`
      res.status(200).json(createResponseObject(createdWeek, message, null)) 
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
  } else {
    // we still return the week found
    let message = `Week was not created because it already existed, with id ${weekFound._id}.`
    res.status(200).json(createResponseObject(weekFound, message, null)) 
  }
});



// THIS ROUTE NEEDS TO BE TESTED:

//  GET /weeks/:babyId/:firstday -  Returns week with the specified firstday
router.get("/:babyId/:firstday", (req, res) => {
  
  // firstday format is: dd-mm-yyyy
  const {babyId, firstday } = req.params

  Week.findOne( { baby: babyId, firstday: firstday } )
    //.populate("baby")
    .populate({
      path: "goals",
      populate: [ 
        {
          path: "foodgroup",
          model: "Foodgroup"
        }
      ]
    })
    .lean()
    .then((foundWeek) => {
      console.log("foundWeek : ", foundWeek)
      let message = `Week with id ${foundWeek._id} found.`
      res.status(200).json(createResponseObject(foundWeek, message, null))    
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});


// DELETE  /weeks/:id  -  Deletes the specified week
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified week id is not valid" });
    return;
  }

  Week.findByIdAndRemove({_id: id})
  .then(() => {
    let message = `Week with id ${id} removed successfully.`
    res.status(200).json(createResponseObject(null, message, null))    
  })
  .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});

module.exports = router;
