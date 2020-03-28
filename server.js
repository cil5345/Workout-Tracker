const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


//routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

//FIND
app.get("/api/workouts", (req, res) => {
  db.Workout.find({}, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

//INSERT
app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

//UPDATE
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.update(
    { _id: mongojs.ObjectId(req.params.id) },
    { $push: { exercises: req.body } },
    (err, data) => {
      if (err) throw err;
      res.json(data);
    }
  );
});
//FIND WORKOUT RANGE
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).limit(7)
      .then(dbWorkouts => {
        console.log(dbWorkouts)
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
