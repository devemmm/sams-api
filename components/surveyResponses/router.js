const express = require("express");
const router = express.Router();
const Controller = require("./controller");
const Validator = require("../base/validator");
const requestValidator = require("../../helpers/validator");

const controller = new Controller();
const validator = new Validator();

router
  .route("/")
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.respondSurvey)
    ),
    controller.create.bind(controller)
  );

router
  .route("/")
  .get(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.listSurveyResponses)
    ),
    controller.list.bind(controller)
  );

router
  .route("/statistics")
  .get(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.listSurveyResponses)
    ),
    controller.statistics.bind(controller)
  );

router
  .route("/statistics/:id")
  .get(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.getSuveyStatisticsById)
    ),
    controller.singleSurveyStatistics.bind(controller)
  );

module.exports = router;
