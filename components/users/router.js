const express = require("express");
const router = express();
const Controller = require("./controller");
const Validator = require("../base/validator");
const requestValidator = require("../../helpers/validator");
const Authorization = require('../middleware/requireAuth')

const controller = new Controller();
const validator = new Validator();
const authorization = new Authorization();

router
  .route("/signup")
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

router
  .route("/")
  .patch(
    authorization.requireAuth.bind(authorization),
    validator.validateRequest.bind(
      new Validator().init(requestValidator.updateAccount)
    ),
    controller.updateAccount.bind(controller)
  );

router
  .route("/password")
  .patch(
    authorization.requireAuth.bind(authorization),
    validator.validateRequest.bind(
      new Validator().init(requestValidator.changePassword)
    ),
    controller.changePassword.bind(controller)
  );

module.exports = router;
