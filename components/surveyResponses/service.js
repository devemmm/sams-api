const Controller = require("../base/controller");
const SurveySchema = require("../survey/schema");
const Schema = require("./schema");
const { responses } = require("../../libs/constants");
const fs = require("fs");
var json2xls = require("json2xls");
const filename = "sample.xlsx";

class Service extends Controller {
  constructor() {
    super();
    return this;
  }

  async respond(req, res) {
    try {
      if (req.body.answers.length > 0) {
        req.body.answers.forEach(async (item) => {
          const response = new Schema({
            ...item,
            uid: req.body.uid,
            surveyId: req.body.surveyId,
            surveyName: req.body.surveyName,
          });
          await response.save();
        });
      } else {
        return { error: "database error" };
      }

      return { congratulation: "thank you for your information" };
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }

  static convert = function (responses) {
    var xls = json2xls(responses);
    fs.writeFileSync(filename, xls, "binary", (err) => {
      if (err) {
        console.log("writeFileSync :", err);
      }
      console.log(filename + " file is saved!");
    });
  };

  

  async list(req, res) {
    try {
      const responses = await Schema.find({});
      Service.convert(responses);

      return responses;
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }

  async analysis(req, res) {
    try {
      let surveyData;

      if (req.params.id) {
        surveyData = await SurveySchema.find({ _id: req.params.id });
      } else {
        surveyData = await SurveySchema.find({});
      }
      const surveyResponsedata = await Schema.find({});

      let singleAna = [];
      const analysis1 = [];
      surveyData.forEach(async (survey) => {
        survey.questions.forEach((question) => {
          singleAna.push({
            surveyId: survey._id,
            questionId: question._id,
            questionName: question.question,
          });
          question.options.forEach((option) => {
            analysis1.push({
              surveyId: survey._id,
              surveyName: survey.name,
              questionId: question._id,
              questionName: question.question,
              option: option,
            });
          });
        });
      });

      const analysis2 = [];

      analysis1.forEach((questionAnswer) => {
        const filteredQuestionAnswer = surveyResponsedata.filter(
          (item) =>
            item.surveyId.toString() === questionAnswer.surveyId.toString() &&
            item.surveyName === questionAnswer.surveyName &&
            item.questionId.toString() ===
              questionAnswer.questionId.toString() &&
            item.questionName === questionAnswer.questionName &&
            item.answer === questionAnswer.option
        );

        const countPeople = surveyResponsedata.filter(
          (item) =>
            item.surveyId.toString() === questionAnswer.surveyId.toString() &&
            item.surveyName === questionAnswer.surveyName &&
            item.questionId.toString() ===
              questionAnswer.questionId.toString() &&
            item.questionName === questionAnswer.questionName
        );

        let fin = questionAnswer;
        fin.value = filteredQuestionAnswer.length;
        fin.total = countPeople.length;
        fin.name = fin.option;
        analysis2.push(fin);
      });

      let finalStatisticsSingleSurvey = [];

      if (req.params.id) {
        singleAna.forEach((question) => {
          finalStatisticsSingleSurvey.push({
            question: question.questionName,
            data: analysis2.filter(
              (response) =>
                response.surveyId === question.surveyId &&
                response.questionId === question.questionId &&
                response.questionName === question.questionName
            ),
          });
        });
      }

      if (req.params.id) {
        return finalStatisticsSingleSurvey;
      } else {
        return analysis2;
      }
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }
}

module.exports = Service;
