const Schema = require("./schema");
const MessageSchema = require("./messagesSchema");
const Controller = require("../base/controller");
const { responses } = require("../../libs/constants");
const bcrypt = require('bcrypt')

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

  async updateAccount(req, res) {
    try {

      var user = await Schema.findOne({ email: req.user?.email })

      const updates = Object.keys(req.body)
      const allowedUpdates = ['country', 'address', 'phone', 'about']

      const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
      if (!isValidOperation) {
        throw new Error("you are updating the an allowed field")
      }

      updates.forEach((update) => user[update] = req.body[update])
      await user.save()

      return { message: "account updated successfull" }
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }

  async changePassword(req, res) {
    try {
      const { password, newPassword } = req.body
      const user = await Schema.findByCredentials(req.user?.email, password)
      user.password = newPassword
      await user.save()

      return { message: "password changed successfull" }
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }
}

module.exports = Service;
