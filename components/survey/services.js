const Schema = require("./schema");
const Controller = require("../base/controller");
const { responses } = require("../../libs/constants");

class Service extends Controller {
  constructor() {
    super();
    return this;
  }

  async create(req, res) {
    try {
      const survey = new Schema(req.body);

      return await survey.save();
    } catch (error) {
      let responseType = responses.BAD_REQUEST;
      responseType.MSG = error.message;
      this.sendResponse({ req, res, type: responseType });
    }
  }

  async list(req, res) {
    try {
      if (req.params.id) {
        return Schema.findOne({ _id: req.params.id });
      }
      return Schema.find({});
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;
      this.sendResponse({ req, res, type: responseType });
    }
  }

  async delete(req, res) {

    try {
      const survey = await Schema.findOne({ _id: req.params.id })


      if (!survey) {
        throw new Error("survey not found")
      }

      await survey.delete();
      return { message: 'survey deleted successfully' };
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;
      this.sendResponse({ req, res, type: responseType });
    }
  }
}

module.exports = Service;
