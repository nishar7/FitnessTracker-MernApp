import "dotenv/config";
import express from "express";
import asyncHandler from "express-async-handler";
import * as exercises from "./exercises_model.mjs";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

/**
 * Validates date format
 * @param {string} date
 * Return true if the date format is MM-DD-YY
 */
function isDateValid(date) {
  const format = /^\d\d-\d\d-\d\d$/;
  return format.test(date);
}

/**
 * Route handler for retrieving all exercises
 */
app.get(
  "/exercises",
  asyncHandler(async (req, res) => {
    let filter = {};
    const exercise = await exercises.findExercises(filter);
    res.status(200).json(exercise);
  })
);

/**
 * Route handler for retrieving an exercise by ID
 */
app.get(
  "/exercises/:_id",
  asyncHandler(async (req, res) => {
    const exercise = await exercises.findExerciseById(req.params._id);
    if (exercise !== null) {
      res.status(200).json(exercise);
    } else {
      res.status(404).json({ Error: "Not found" });
    }
  })
);

/**
 * Route handler for creating new exercises
 */
app.post(
  "/exercises",
  asyncHandler(async (req, res) => {
    let isValid;
    if (req.body.name === "" || typeof req.body.name !== "string") {
      isValid = false;
    } else if (!Number.isInteger(parseInt(req.body.reps))) {
      isValid = false;
    } else if (req.body.reps < 1) {
      isValid = false;
    } else if (!Number.isInteger(parseInt(req.body.weight))) {
      isValid = false;
    } else if (req.body.weight < 1) {
      isValid = false;
    } else if (req.body.unit !== "lbs" && req.body.unit !== "kgs") {
      isValid = false;
    } else if (!isDateValid(req.body.date)) {
      isValid = false;
    } else {
      isValid = true;
    }
    if (isValid) {
      const exercise = await exercises.createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      );
      res.status(201).json(exercise);
    } else {
      res.status(400).json({ Error: "Invalid request" });
    }
  })
);

/**
 * Route handler for updating an exercise
 */
app.put(
  "/exercises/:_id",
  asyncHandler(async (req, res) => {
    let isValid;
    let resultVal;
    if (req.body.name === "" || typeof req.body.name !== "string") {
      isValid = false;
    } else if (!Number.isInteger(parseInt(req.body.reps))) {
      isValid = false;
    } else if (req.body.reps < 1) {
      isValid = false;
    } else if (!Number.isInteger(parseInt(req.body.weight))) {
      isValid = false;
    } else if (req.body.weight < 1) {
      isValid = false;
    } else if (req.body.unit !== "lbs" && req.body.unit !== "kgs") {
      isValid = false;
    } else if (!isDateValid(req.body.date)) {
      isValid = false;
    } else {
      isValid = true;
    }
    if (isValid) {
      const update = {};
      update.name = req.body.name;
      update.reps = req.body.reps;
      update.weight = req.body.weight;
      update.unit = req.body.unit;
      update.date = req.body.date;
      resultVal = await exercises.updateExercise(
        { _id: req.params._id },
        update
      );
      if (resultVal > 0) {
        const exercise = await exercises.findExerciseById(req.params._id);
        res.status(200).json(exercise);
      } else {
        res.status(404).json({ Error: "Not Found" });
      }
    } else {
      res.status(400).json({ Error: "Invalid request" });
    }
  })
);

/**
 * Route handler for deleting an exercise
 */
app.delete(
  "/exercises/:_id",
  asyncHandler(async (req, res) => {
    const resultVal = await exercises.deleteExercise({ _id: req.params._id });
    if (resultVal > 0) {
      res.status(204).json({ Success: "Deleted" });
    } else {
      res.status(404).json({ Error: "Not found" });
    }
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
