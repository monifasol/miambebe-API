const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Week = require("../models/Week.model");
//const Goal = require("../models/Goal.model");

//  POST /weeks  -  Creates a new week
router.post("/weeks", (req, res, next) => {
  const { startdate } = req.body;

  Week.create({ startdate, goals: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /weeks -  Returns all weeks for the specified baby
router.get("/weeks/:babyId", (req, res, next) => {
  Week.find()
    .populate("goals")
    .then((weeks) => res.json(weekss))
    .catch((err) => res.json(err))
});

//  GET /weeks/:id -  Returns the week specified by id
router.get("/weeks/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Week.findById(id)
    .populate("goals")
    .then((week) => res.status(200).json(week))
    .catch((error) => res.json(error));
});

// PUT  /weeks/:id  -  Updates the specified week (add goals)
router.put("/weeks/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The id specified for the week is not valid" });
    return;
  }

  Week.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedPWeek) => res.json(updatedPWeek))
    .catch((error) => res.json(error));
});

// DELETE  /weeks/:id  -  Deletes the specified week
router.delete("/weeks/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "The id specified for the week is not valid" });
    return;
  }

  Week.findByIdAndRemove(id)
    .then(() =>
      res.json({
        message: `Week with id ${id} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
