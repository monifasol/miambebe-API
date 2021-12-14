const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model")

const createResponseObject = require("../utils/createResponseObject")
const createResponseErrorObject = require("../utils/createResponseErrorObject")

//| HTTP verb | URL               | Request body  | Response         | Action                                  |
//| --------- | ----------------- | ------------- | ---------------- | --------------------------------------- |
//| GET       |`/recipes`         | (empty)       | JSON             | Lists all recipes                       |                
//| POST      |`/recipes`         | JSON          | JSON New recipe  | Adds a new recipe                       |                
//| GET       |`/recipes/:id`     | (empty)       | JSON             | Returns the specified                   |                
//| PUT       |`/recipes/:id`     | JSON          | JSON             | Updates the specified recipe            |                
//| DELETE    |`/recipes/:id`     | (empty)       | (empty)          | Deletes the specified recipe            |       
//| GET       |`/recipes/:userId` | (empty)       | JSON             | Lists all recipes of the specified user |


//  GET /recipes -  Returns all recipes
router.get("/", (req, res) => {

  Recipe.find()
    .then((recipes) => {
      let message = `${recipes.length} recipes(s) found.`
      res.status(200).json(createResponseObject(recipes, message, null))    
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});

// POST /recipes - Adds a new recipe
router.post("/", (req, res) => {
  const { title, content, preparationTime, difficulty, intolerances, tags, userId } = req.body;
  
  Recipe.create({ title, content, preparationTime, difficulty, intolerances, tags, userId })
      .then((createdRecipe) => {
        let message = `Recipe with id ${createdRecipe.id} successfully created.`
        res.status(200).json(createResponseObject(createdRecipe, message, null))    
      })
      .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});


//  GET /recipes/:id -  Returns the recipe specified by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified user id is not valid" });
    return;
  }

  Recipe.findById(id)
    .populate('user')
    .then((foundRecipe) => {
      let message = `Recipe with id ${foundRecipe.id} found.`
      res.status(200).json(createResponseObject(foundRecipe, message, null))    
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});



// PUT  /recipe/:id  -  Updates the specified recipe
router.put("/:id", (req, res) => {

  const { id } = req.params
  const bodyRequest = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified user id is not valid" });
    return;
  }

  Recipe
    .findByIdAndUpdate(
        { _id : id },
        bodyRequest,
        { new: true }
      )
    .populate("user")
    .then((updatedRecipe) => {
      let message = `Recipe with id ${updatedRecipe._id} successfully updated.`
      res.status(200).json(createResponseObject(updatedRecipe, message, null))    
    })
    .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});



// DELETE  /recipes/:id  -  Deletes the specified recipe
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The specified user id is not valid" });
    return;
  }

  Recipe.findByIdAndRemove(id)
      .then(() => {
        let message = `Recipe with id ${id} deleted.`
        res.status(200).json(createResponseObject(null, message, null))    
      })
      .catch((error) => res.status(400).json(createResponseErrorObject(error)))
});

module.exports = router;
