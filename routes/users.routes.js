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
//| PUT       |`/users/:id/baby`    | (JSON)        | JSON Updated user | Updates the specified user (adds baby)  |
//| DELETE    |`/users/:id`         | (empty)       | (empty)           | Deletes the specified user              |  

//  GET /users -  Returns all users
router.get("/", (req, res, next) => {

  User.find()
    .populate('babies')
    .then((users) => {
      let message = `${users.length} user(s) found.`
      res.status(200).json(createResponseObject(users, message, null))    
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});

// POST /users - Adds a new user
router.post("/", (req, res, next) => {
  const { name, email, password } = req.body;
  
  User.create({ name, email, password })
      .then((createdUser) => {
        let message = `User with id ${createdUser.id} successfully created.`
        res.status(200).json(createResponseObject(createdUser, message, null))    
      })
      .catch((error) => res.status(400).json(createResponseErrorObject(error)))
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
    .then((foundUser) => {
      let message = `User with id ${foundUser.id} found.`
      res.status(200).json(createResponseObject(foundUser, message, null))    
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});



// PUT  /users/:id  -  Updates the specified user
router.put("/:id", (req, res) => {

  const { id } = req.params
  const { name } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified user id is not valid" });
    return;
  }

  User
    .findByIdAndUpdate(
        { _id : id },
        { name: name },
        { new: true }
      )
    .populate("babies")
    .then((updatedUser) => {
      let message = `User with id ${updatedUser._id} successfully updated.`
      res.status(200).json(createResponseObject(updatedUser, message, null))    
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});



// PUT  /users/:id/baby  -  Updates the specified user adding a baby
router.put("/:id/baby", (req, res) => {

  const { id } = req.params
  const { babyId } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified user id is not valid" });
    return;
  }

  User
    .findByIdAndUpdate(
        { _id : id },
        { $addToSet: { babies: babyId } },  
        { new: true }
      )
      .populate("babies")
      .then((updatedUser) => {
        let message = `Baby added! User with id ${updatedUser._id} successfully updated.`
        res.status(200).json(createResponseObject(updatedUser, message, null))    
      })
      .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});


// DELETE  /users/:id  -  Deletes the specified user
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified user id is not valid" });
    return;
  }

  User.findByIdAndRemove(id)
      .then(() => {
        let message = `User with id ${id} deleted.`
        res.status(200).json(createResponseObject(null, message, null))    
      })
      .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});

module.exports = router;
