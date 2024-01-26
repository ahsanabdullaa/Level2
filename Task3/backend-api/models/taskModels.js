var mongoose = require("mongoose");

var taskSchema = mongoose.Schema({
  task: String,
  date: String,
  status: {
    type: String,
    default: "Ongoing",
  },
});

var Task = mongoose.model("Task", taskSchema);

module.exports.Task = Task;
