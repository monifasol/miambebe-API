const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Baby = require("../models/Baby.model")

const createResponseObject = require("../utils/createResponseObject")
const createResponseErrorObject = require("../utils/createResponseErrorObject")

//| HTTP verb | URL                 | Request body  | Response          | Action                                  |
//| --------- | ------------------- | ------------- | ----------------- | --------------------------------------- |
//| GET       |`/users`             | (empty)       | JSON              | Lists all users                         |                
//| POST      |`/users`             | JSON          | JSON New user     | Lists all users                         |                
//| GET       |`/users/:id`         | (empty)       | JSON              | Returns the specified user              |  
//| PUT       |`/users/:id`         | JSON          | JSON Updated user | Updates the specified user              |  
//| DELETE    |`/users/:id`         | (empty)       | (empty)           | Deletes the specified user              |  


//  GET /users -  Returns all users
router.get("/", (req, res, next) => {

  User.find()
    .populate('babies')
    .then((users) => res
        .status(200)
        .json(
           { data: users, message: `${users.length} user(s) found.`, error: null, pagination: null }
        )
    )
    .catch((error) => res
      .status(400)
      .json(
        { 
          data: null, 
          message: `There's been an error: ${error}.`, error: error, pagination: null 
        }
      ))
});

// POST /users - Adds a new user
router.post("/", (req, res, next) => {
  const { name, email, password } = req.body;
  
  User.create({ name, email, password })
      .then((userCreated) => res
      .status(200)
      .json(
        { data: userCreated, message: `User with id ${userCreated.id} successfully created.`, error: null, pagination: null }
      )
    )
    .catch((error) => res
      .status(400)
      .json(
        { 
          data: null, 
          message: `There's been an error: ${error}.`, error: error, pagination: null 
        }
      ))
});


//  GET /users/:id -  Returns the user specified by id
router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified user id is not valid" });
    return;
  }

  User.findById(id)
    .populate('babies')
    .then((user) => res.status(200).json(user))
    .catch((error) => res
      .status(400)
      .json(
        { 
          data: null, 
          message: `There's been an error: ${error}.`, error: error, pagination: null 
        }
      ))
});

// PUT  /users/:id  -  Updates the specified user (add baby)
router.put("/:id", (req, res, next) => {
  const { id } = req.params
  const { babyId } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified user id is not valid" });
    return;
  }

  User
    .findByIdAndUpdate(
        id,
        { $addToSet: {babies: babyId} },
        { new: true }
      )
    .populate("babies")
    .then((updatedUser) => res
        .status(200)
        .json(
          { 
            data: { updatedUser, babies: updatedUser.babies }, 
            message: `User with id ${updatedUser._id} updated.`, error: null, pagination: null 
          }
        ))
    .catch((error) => res
      .status(400)
      .json(
        { 
          data: null, 
          message: `There's been an error: ${error}.`, error: error, pagination: null 
        }
      ))
});

// DELETE  /users/:id  -  Deletes the specified user
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified user id is not valid" });
    return;
  }

  User.findByIdAndRemove(id)
    .then(() =>
      res
        .status(200)
        .json(
          { data: null, message: `User with id ${updatedUser._id} deleted.`, error: null, pagination: null }
        )
    )
    .catch((error) => res
      .status(400)
      .json(
        { 
          data: null, 
          message: `There's been an error: ${error}.`, error: error, pagination: null 
        }
      ))
});

module.exports = router;
