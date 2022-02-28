const joi = require("@hapi/joi");

class Validator {
  constructor() {
    return this;
  }

  static signup = joi.object().keys({
    fname: joi.string().required(),
    lname: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    dob: joi.string().required(),
    password: joi.string().required(),
  });

  static signin = joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
  });

  static listUsers = joi.object().keys();

  static createSurvey = joi.object().keys({
    name: joi.string().required(),
    questions: joi.array().required(),
  });

  // ------------------SURVEY -----------------
  static listSurveys = joi.object().keys();

  static respondSurvey = joi.object().keys({
    uid: joi.string().required(),
    surveyId: joi.string().required(),
    surveyName: joi.string(),
    answers: joi.array().required(),
    // questionId: joi.string().required(),
    // questionName: joi.string().required(),
    // answer: joi.string().required(),
  });

  static listSurveyResponses = joi.object().keys();
  static getSuveyStatisticsById = joi.object().keys({
    id: joi.string().required(),
  });
  // ------------------ENDS -----------------

  //--------------------Messages ------------------
  static userMessage = joi.object().keys({
    names: joi.string().required(),
    avatar: joi.string(),
    subject: joi.string().required(),
    email: joi.string().required(),
    message: joi.string().required(),
  });

  static getUserMessage = joi.object().keys();
}

module.exports = Validator;
