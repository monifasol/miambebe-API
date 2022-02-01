const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Goal = require("../models/Goal.model");
const Baby = require("../models/Baby.model");               
const Foodgroup = require("../models/Foodgroup.model");     // needed for the deep populate

const createResponseObject = require("../utils/createResponseObject")
const createResponseErrorObject = require("../utils/createResponseErrorObject")


// | HTTP verb | URL              | Request body  | Response          | Action                                        |
// | --------- | ---------------- | ------------- | ----------------- | --------------------------------------------- |
// | POST      |`/goals`          | JSON          | JSON              | Adds a new goal (and pushes a goal to Baby)   |                
// | GET       |`/goals/:id`      | (empty)       | JSON              | Returns the specified goal                    |  
// | PUT       |`/goals/:id`      | JSON          | JSON Updated goal | Updates the specified goal                    |  
// | DELETE    |`/goals/:id`      | (empty)       | (empty)           | Deletes the specified goal                    |  


//  POST /goals  -  Creates a new goal
router.post("/", (req, res) => {
    const { foodgroupId, quantityGoal, quantityAccomplished, babyId } = req.body;
  
    Goal.create({ foodgroup: foodgroupId, quantityGoal, quantityAccomplished, baby: babyId })
        .then((newGoal) => {

            Baby.findByIdAndUpdate(babyId, {
                $push: { goals: newGoal._id },
            })
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
            .then( () => {
                let message = `Goal with id ${newGoal._id} has been created.`
                res.status(200).json(createResponseObject(newGoal, message, null))  
            })
            .catch((error) => res.status(400).json(createResponseErrorObject(error)))
        })
        .catch((error) => res.status(400).json(createResponseErrorObject(error)))
  });

// GET /goals/:id  - Returns the speficied goal
router.get("/:id", (req, res) => {
    const { id } = req.params;
  
    Goal.findById({ _id: id })
        .populate('foodgoup')
        .then((foundGoal) => {
            let message = `Goal with id ${foundGoal._id} found.`
            res.status(200).json(createResponseObject(foundGoal, message, null))    
        })
        .catch((error) => res.status(400).json(createResponseErrorObject(error)))
  });
  

//  PUT /goals  -  Updated the specified goal
router.put("/:id", (req, res) => {

    const { foodgroupId, quantityGoal, quantityAccomplished, babyId } = req.body
    const { id } = req.params

    Goal.findOneAndUpdate(
            { _id: id },
            { foodgroup: foodgroupId, quantityGoal, quantityAccomplished, baby: babyId }, 
            { new: true }
        )
        .populate('foodgoup')
        .then((updatedGoal) => {
            let message = `Goal with id ${updatedGoal._id} has been updated.`
            res.status(200).json(createResponseObject(updatedGoal, message, null))    
        })
        .catch((error) => res.status(400).json(createResponseErrorObject(error)))
  });


  // DELETE  /goals/:id/:babyId - Deletes the goal
router.delete("/:id/:babyId", (req, res) => {

    const { id, babyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "The specified goal id is not valid" });
        return;
    }

    // first find Goal and Remove from the Baby's array of goals
    Goal.findById({_id: id})
        .then((foundGoal) => {

            Baby.findByIdAndUpdate(babyId, {
                $pull: { goals: foundGoal._id },
            })
            .then( () => {
                Goal.deleteOne(foundGoal)
                    .then(() => {
                        let message = `Goal with id ${id} removed successfully.`
                        res.status(200).json(createResponseObject(null, message, null))    
                    })
                    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
              })
            .catch((error) => res.status(400).json(createResponseErrorObject(error)))
        })
        .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});


module.exports = router;
