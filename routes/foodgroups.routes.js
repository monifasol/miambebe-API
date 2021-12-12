const express = require("express");
const router = express.Router();
const Foodgroup = require("../models/Foodgroup.model");

const createResponseObject = require("../utils/createResponseObject")
const createResponseErrorObject = require("../utils/createResponseErrorObject")

//  GET /foodgroups -  Returns all foodgroups
router.get("/", (req, res) => {

    Foodgroup.find()
      .then((foodgroups) => {
        let message = `${foodgroups.length} foodgroups found.`
        res.status(200).json(createResponseObject(foodgroups, message, null))    
      })
      .catch((error) => res.status(400).json(createResponseErrorObject(error)))
  });

module.exports = router;
