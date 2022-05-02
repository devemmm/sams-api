const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    uid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    surveyId: { type: mongoose.Schema.Types.ObjectId, ref: "Survey" },
    surveyName: {
      type: String,
      trim: true,
      default: "default Survey Name",
    },
    questionId: {
      type: String,
      trim: true,
      required: true,
    },
    questionName: {
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
