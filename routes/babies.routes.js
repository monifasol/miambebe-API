const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Baby = require("../models/Baby.model")
const User = require("../models/User.model")
const Goal = require("../models/Goal.model");               // needed for the populate
const Foodgroup = require("../models/Foodgroup.model");     // needed for the deep populate

const fileUploader = require("../config/cloudinary.config");

const createResponseObject = require("../utils/createResponseObject")
const createResponseErrorObject = require("../utils/createResponseErrorObject")

//| HTTP verb | URL                       | Request body  | Response           | Action                                   |
//| --------- | ------------------------- | ------------- | ------------------ | ---------------------------------------- |
//| GET       |`/babies`                  | (empty)       | JSON               | Lists all babies                         |                   
//| POST      |`/babies/:userId`          | JSON          | JSON New Baby      | Adds a new baby for specified user       |                   
//| GET       |`/babies/:id`              | (empty)       | JSON               | Returns the specified baby               |               
//| GET       |`/babies/:id/goals`        | (empty)       | JSON               | Returns the goals for the specified baby |               
//| PUT       |`/babies/:id`              | JSON          | JSON Updated baby  | Updates info for the speficied baby      | 
//| POST      |`/babies/:babyId/uploadPic`| JSON (file)   | pic_url            | Adds avatar picture to baby              |
//| PUT       |`/babies/goals/:goalId`    | JSON          | JSON Updated Goal  | Adds a new baby for specified user       |                   


// PUT  /babies/:id  -  Updates the specified baby
router.put("/:id", (req, res) => {

    const { id } = req.params
    const bodyRequest = req.body
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "The specified user id is not valid" });
      return;
    }
  
    Baby
      .findByIdAndUpdate(
          { _id : id },
          bodyRequest,
          { new: true }
      )
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
      .then((updatedBaby) => {
        let message = `Baby with id ${updatedBaby._id} successfully updated.`
        res.status(200).json(createResponseObject(updatedBaby, message, null))    
      })
      .catch((error) => {
        res.status(400).json(createResponseErrorObject(error)) })
  });


// POST "/babies/:babyId/uploadPic" => Receives an image, sends it to Cloudinary via fileUploader and returns the image URL
router.post("/:babyId/uploadPic", fileUploader.single("imageUrl"), (req, res, next) => {

  const { babyId } = req.params

  if (!req.file.path) {
    next(new Error("No file uploaded!"));
    return;
  }

  let image_baby_url = req.file.path

  Baby
    .findByIdAndUpdate(
        { _id : babyId },
        { imageUrl: image_baby_url },
        { new: true }
    )
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
    .then((updatedBaby) => {
      let message = `Picture uploaded for baby with id ${updatedBaby._id}.`
      res.status(200).json(createResponseObject(updatedBaby, message, null))    
    })
    .catch((error) => {
      res.status(400).json(createResponseErrorObject(error)) })
});


//  GET /babies -  Returns all babies
router.get("/", (req, res) => {

  Baby.find()
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
    .then((babies) => {
      let message = `${babies.length} baby(ies) found.`
      res.status(200).json(createResponseObject(users, message, null))    
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});

// POST /babies/:userId - Adds a new baby
router.post("/:userId", (req, res) => {
  const { name, age, weight, pictureUrl } = req.body;
  const { userId } = req.params
  
  Baby.create({ name, age, weight, pictureUrl, goals: [] })
      .then((createdBaby) => {

        // baby created
        let message = `Baby with id ${createdBaby.id} successfully created.`

        // add baby to user.babies
        User
        .findByIdAndUpdate(
            { _id : userId },
            { $addToSet: { babies: createdBaby.id } },  
            { new: true }
          )
          .populate("babies")
          .then((updatedUser) => {
            message = `${message} / Baby "${createdBaby.id}" added to user with id ${updatedUser._id}.`
            res.status(200).json(createResponseObject(updatedUser, message, null))    
          })
          .catch((error) => res.status(400).json(createResponseErrorObject(error)))
      })
      .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});


//  GET /babies/:id -  Returns the baby specified by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified user id is not valid" });
    return;
  }

  Baby
    .findById(id)
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
    .then((foundBaby) => {
      let message = `User with id ${foundBaby.id} found.`
      res.status(200).json(createResponseObject(foundBaby, message, null))    
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});


//  GET /babies/:id/goals  - Returns the goals for the speficied baby
router.get("/:id/goals", (req, res) => {

  const { id } = req.params;

  Baby
    .findById(id)
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
    .then((baby) => {
        let goalsBaby = baby.goals 
        let message = `${goalsBaby.length} goal(s) found for baby ${baby._id}.`
        res.status(200).json(createResponseObject(goalsBaby, message, null))    
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});


// DELETE  /babies/:id  -  Deletes the specified baby
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified user id is not valid" });
    return;
  }

  Baby.findByIdAndRemove(id)
      .then(() => {
        let message = `Baby with id ${id} deleted.`
        res.status(200).json(createResponseObject(null, message, null))    
      })
      .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});

module.exports = router;
