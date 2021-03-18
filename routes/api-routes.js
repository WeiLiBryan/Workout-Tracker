const db = require("../models");
const router = require("express").Router();

// Retrieves all workouts
router.get("/api/workouts", (req, res) => {

    db.Workout.find({}).then(data => {
        data.forEach(workout => {
            var total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(data);

    }).catch(err => {
        res.json(err);
    });
});