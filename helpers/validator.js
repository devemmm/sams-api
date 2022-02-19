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
}

module.exports = Validator;
