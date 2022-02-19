const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    uid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    survey: { type: mongoose.Schema.Types.ObjectId, ref: "Survey" },
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
