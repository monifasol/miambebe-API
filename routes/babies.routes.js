const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Baby = require("../models/Baby.model")

const createResponseObject = require("../utils/createResponseObject")
const createResponseErrorObject = require("../utils/createResponseErrorObject")

//| HTTP verb | URL             | Request body  | Response           | Action                                      |
//| --------- | --------------- | ------------- | ------------------ | ------------------------------------------- |
//| GET       |`/babies`        | (empty)       | JSON               | Lists all babies                            |                   
//| POST      |`/babies`        | JSON          | JSON New Baby      | Adds a new baby                             |                   
//| GET       |`/babies/:id`    | (empty)       | JSON               | Returns the specified baby                  |               
//| PUT       |`/babies/:id`    | JSON          | JSON Updated baby  | Updates info for the speficied baby         | 


//  GET /babies -  Returns all babies
router.get("/", (req, res) => {

  Baby.find()
    .then((babies) => {
      let message = `${babies.length} baby(ies) found.`
      res.status(200).json(createResponseObject(users, message, null))    
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});

// POST /babies - Adds a new baby
router.post("/", (req, res) => {
  const { name, age, weight, pictureUrl } = req.body;
  
  Baby.create({ name, age, weight, pictureUrl })
      .then((createdBaby) => {
        let message = `Baby with id ${createdBaby.id} successfully created.`
        res.status(200).json(createResponseObject(createdBaby, message, null))    
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

  Baby.findById(id)
    .then((foundBaby) => {
      let message = `User with id ${foundBaby.id} found.`
      res.status(200).json(createResponseObject(foundBaby, message, null))    
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});



// PUT  /babies/:id  -  Updates the specified baby
router.put("/:id", (req, res) => {

  const { id } = req.params
  const bodyRequest = req.body

  console.log("BODY IN THE REQUEST FOR UPDATE BABY ===> ", bodyRequest)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified user id is not valid" });
    return;
  }

  Baby
    .findByIdAndUpdate(
        { _id : id },
        { bodyRequest },
        { new: true }
      )
    .then((updatedBaby) => {
      let message = `Baby with id ${updatedBaby._id} successfully updated.`
      res.status(200).json(createResponseObject(updatedBaby, message, null))    
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
