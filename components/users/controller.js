const BaseController = require("../base/controller");
const Service = require("./service");
const { responses } = require("../../libs/constants");

class Controller extends BaseController {
  constructor() {
    super();
  }

  async signup(req, res) {
    const data = await new Service().signup(req, res);
    return data
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data })
      : null;
  }

  async signin(req, res) {
    const data = await new Service().signin(req, res);

    return data
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data })
      : null;
  }

  async list(req, res) {
    const users = await new Service().list(req, res);

    return users
      ? this.sendResponse({
          req,
          res,
          type: responses.SUCCESS,
          data: users,
        })
      : null;
  }
}

module.exports = Controller;
