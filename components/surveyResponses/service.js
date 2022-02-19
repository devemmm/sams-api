const Controller = require("../base/controller");
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
}

module.exports = Service;
