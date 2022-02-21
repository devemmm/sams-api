const express = require("express");
const router = express();
const Controller = require("./controller");
const Validator = require("../base/validator");
const requestValidator = require("../../helpers/validator");

const controller = new Controller();
const validator = new Validator();

router
  .route("/")
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.signup)
    ),
    controller.signup.bind(controller)
  );

router
  .route("/signin")
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.signin)
    ),
    controller.signin.bind(controller)
  );

router
  .route("/")
  .get(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.listUsers)
    ),
    controller.list.bind(controller)
  );

router
  .route("/message")
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.userMessage)
    ),
    controller.sendMessage.bind(controller)
  );

router
  .route("/messages")
  .get(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.getUserMessage)
    ),
    controller.getMessage.bind(controller)
  );

module.exports = router;
