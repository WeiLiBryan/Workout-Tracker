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

// adds/updates an exercise
router.put("/api/workouts/:id", (req, res) => {

    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $push: { exercises: req.body }
        },
        { new: true })
        
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        
        .catch(err => {
        res.json(err);
        });
});

// creates a new exercise
router.post("/api/workouts", ({ body }, res) => {

    db.Workout.create(body)
        .then((data => {
            res.json(data);
        })).catch(err => {
            res.json(err);
        });
});