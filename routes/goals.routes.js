const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Goal = require("../models/Goal.model");
const Week = require("../models/Week.model");
const Foodgroup = require("../models/Foodgroup.model")

const createResponseObject = require("../utils/createResponseObject")
const createResponseErrorObject = require("../utils/createResponseErrorObject")


// | HTTP verb | URL              | Request body  | Response          | Action                                        |
// | --------- | ---------------- | ------------- | ----------------- | --------------------------------------------- |
// | POST      |`/goals`          | JSON          | JSON              | Adds a new goal (and pushes a goal to Week)   |                
// | GET       |`/goals/:id`      | (empty)       | JSON              | Returns the specified goal                    |  
// | PUT       |`/goals/:id`      | JSON          | JSON Updated goal | Updates the specified goal                    |  
// | DELETE    |`/goals/:id`      | (empty)       | (empty)           | Deletes the specified goal                    |  
// | GET       |`/goals/:weekId`  | (empty)       | JSON              | Lists goals for the specified week            |                



//  POST /goals  -  Creates a new goal
router.post("/", (req, res) => {
    const { foodgroupId, quantityGoal, quantityAccomplished, weekId } = req.body;
  
    Goal.create({ foodgroup: foodgroupId, quantityGoal, quantityAccomplished, week: weekId })
        .then((newGoal) => {

            // when it works, then add the then and catch!
            return Week.findByIdAndUpdate(weekId, {
                $push: { goals: newGoal._id },
            });
        })
        .then((newGoal) => {
            let message = `Goal with id ${newGoal._id} has been created.`
            res.status(200).json(createResponseObject(newGoal, message, null))    
        })
        .catch((error) => res.status(400).json(createResponseErrorObject(error)))
  });

//  GET /goals/:id  - Returns the speficied goal
router.get("/:id", (req, res) => {
    const { id } = req.params;
  
    Goal.findById({ _id: id })
        .populate({
            path: "foodgroup",
            model: "Foodgroup"
        })
        .then((foundGoal) => {
            let message = `Goal with id ${foundGoal._id} found.`
            res.status(200).json(createResponseObject(foundGoal, message, null))    
        })
        .catch((error) => res.status(400).json(createResponseErrorObject(error)))
  });

//  PUT /goals  -  Updated the specified goal
router.put("/:id", (req, res) => {

    const { foodgroupId, quantityGoal, quantityAccomplished, weekId } = req.body
    const { id } = req.params

    Goal.findOneAndUpdate(
            { _id: id },
            { foodgroup: foodgroupId, quantityGoal, quantityAccomplished, week: weekId }, 
            { new: true }
        )
        .populate({
            path: "foodgroup",
            model: "Foodgroup"
        })
        .then((updatedGoal) => {
            let message = `Goal with id ${updatedGoal._id} has been updated.`
            res.status(200).json(createResponseObject(updatedGoal, message, null))    
        })
        .catch((error) => res.status(400).json(createResponseErrorObject(error)))
  });

module.exports = router;
