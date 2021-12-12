const express = require("express");
const router = express.Router();
const Intolerance = require("../models/Intolerance.model");

const createResponseObject = require("../utils/createResponseObject")
const createResponseErrorObject = require("../utils/createResponseErrorObject")

//  GET /intolerances -  Returns all intolerances
router.get("/", (req, res) => {

    Intolerance.find()
      .then((intolerances) => {
        let message = `${intolerances.length} intolerances found.`
        res.status(200).json(createResponseObject(intolerances, message, null))    
      })
      .catch((error) => res.status(400).json(createResponseErrorObject(error)))
  });

module.exports = router;