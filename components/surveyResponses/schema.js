const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      trim: true,
    },
    survey: {
      type: String,
      trim: true,
      required: true,
    },
    question: {
      type: String,
      trim: true,
      required: true,
    },
    answer: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SurveyResponses = mongoose.model("SurveyResponses", surveySchema);

module.exports = SurveyResponses;
