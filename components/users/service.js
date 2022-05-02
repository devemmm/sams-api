const Schema = require("./schema");
const MessageSchema = require("./messagesSchema");
const Controller = require("../base/controller");
const { responses } = require("../../libs/constants");

class Service extends Controller {
  constructor() {
    super();
    return this;
  }

  async signup(req, res) {
    const user = new Schema(req.body);
    try {
      await user.save();
      await user.generateAuthToken();
      return user;
    } catch (error) {
      let responseType = responses.BAD_REQUEST;
      responseType.MSG = error.message;
      this.sendResponse({ req, res, type: responseType });
    }
  }

  async signin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await Schema.findByCredentials(email, password);
      const token = await user.generateAuthToken();

      return { user, token };
    } catch (error) {
      let responseType = responses.RESOURCE_NOT_FOUND;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }

  async list(req, res) {
    try {
      const users = Schema.find({});

      return users;
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }

  async sendMessage(req, res) {
    const message = new MessageSchema(req.body);

    try {
      return await message.save();
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }

  async getMessage(req, res) {
    try {
      return await MessageSchema.find({});
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }
}

module.exports = Service;
