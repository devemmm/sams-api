const Controller = require("../base/controller");
const SurveySchema = require("../survey/schema");
const Schema = require("./schema");
const { responses } = require("../../libs/constants");

class Service extends Controller {
  constructor() {
    super();
    return this;
  }

  async respond(req, res) {
    try {
      const responses = new Schema(req.body);
      return await responses.save();
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }

  async list(req, res) {
    try {
      return Schema.find({});
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }

  async analysis(req, res) {
    try {
      const surveyData = await SurveySchema.find({});
      const surveyResponsedata = await Schema.find({});

      const analysis1 = [];
      surveyData.forEach(async (survey) => {
        survey.questions.forEach((question) => {
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

      // item.surveyId === questionAnswer.surveyId &&
      //       item.surveyName === questionAnswer.surveyName &&
      //       item.questionId === questionAnswer.questionId &&
      //       item.questionName === questionAnswer.questionName &&
      //       item.option === questionAnswer.answer

      analysis1.forEach((questionAnswer) => {
        const filteredQuestionAnswer = surveyResponsedata.filter((item) => {
          return (
            item.surveyName === questionAnswer.surveyName &&
            item.questionName === questionAnswer.questionName &&
            item.option === questionAnswer.answer
          );
        });

        console.log(filteredQuestionAnswer.length);

        let fin = questionAnswer;
        fin.value = filteredQuestionAnswer.length;

        analysis2.push(fin);
      });
      return analysis2;
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }
}

module.exports = Service;
