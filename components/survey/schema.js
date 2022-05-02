const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    name: String,
    questions: [
      {
        question: String,
        options: [],
      },
    ],
  },
  { timestamps: true }
);

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
