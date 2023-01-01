const mongoose = require("mongoose");

const moduleTemplate = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  department: {
    type: "String",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports =
  mongoose.models.modules || mongoose.model("modules", moduleTemplate);
