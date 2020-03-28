const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date, 
    default: Date.now()
  },
  exercises: [
    {
      type: {
        type: String,
        allowNull: false
      },
      name: {
        type: String,
        allowNull: false
      },
      duration: {
        type: Number,
        allowNull: false
      },
      weight: Number,
      reps: Number,
      sets: Number,
      distance: Number,
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
