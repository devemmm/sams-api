const express = require("express");
const router = express.Router();
const Validator = require("../base/validator");
const Controller = require("./controller");
const requestValidator = require("../../helpers/validator");
const validator = new Validator();
const controller = new Controller();

router
  .route("/")
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.createSurvey)
    ),
    controller.create.bind(controller)
  );

router
  .route("/")
  .get(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.listSurveys)
    ),
    controller.list.bind(controller)
  );

router
  .route("/:id")
  .get(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.listSurveys)
    ),
    controller.list.bind(controller)
  );

router
  .route("/:id")
  .delete(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.listSurveys)
    ),
    controller.delete.bind(controller)
  );

module.exports = router;
