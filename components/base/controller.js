const Utils = require("../../helpers/utils");
const { responses } = require("../../libs/constants");

class Controller {
  static formartResponse() {
    return {
      now: new Utils().rightNow(),
      status: "",
      message: "",
      data: "",
    };
  }

  static errorResponse(error, data) {
    let response = Controller.formartResponse();

    response.status = error.CODE;
    response.message = error.MSG;

    data ? (response.data = data) : delete response.data;

    return response;
  }

  static succcessResponse(error, data) {
    let response = Controller.formartResponse();

    response.status = error.CODE;
    response.message = error.MSG;
    data ? (response.data = data) : delete response.data;
    return response;
  }

  sendResponse({ req, res, type, data }) {
    let response;
    switch (type.CODE) {
      case responses.SUCCESS.CODE:
        response = Controller.succcessResponse(responses.SUCCESS, data);
        return res.status(responses.SUCCESS.CODE).send(response);

      case responses.BAD_REQUEST.CODE:
        response = Controller.succcessResponse(responses.BAD_REQUEST, data);
        return res.status(responses.BAD_REQUEST.CODE).send(response);

      case responses.RESOURCE_NOT_FOUND.CODE:
        response = Controller.succcessResponse(
          responses.RESOURCE_NOT_FOUND,
          data
        );
        return res.status(responses.RESOURCE_NOT_FOUND.CODE).send(response);

      case responses.MOVED_PERMANENTLY.CODE:
        response = Controller.succcessResponse(responses.MOVED_PERMANENTLY);
        return res.status(responses.MOVED_PERMANENTLY.CODE).send(response);

      case responses.UNAUTHORIZED_REQUEST.CODE:
        response = Controller.succcessResponse(responses.UNAUTHORIZED_REQUEST);
        return res.status(responses.UNAUTHORIZED_REQUEST.CODE).send(response);

      case responses.FORBIDDEN_REQUEST.CODE:
        response = Controller.succcessResponse(responses.FORBIDDEN_REQUEST);
        return res.status(responses.FORBIDDEN_REQUEST.CODE).send(response);

      case responses.RESOURCE_ALREADY_EXISTS.CODE:
        response = Controller.succcessResponse(
          responses.RESOURCE_ALREADY_EXISTS
        );
        return res
          .status(responses.RESOURCE_ALREADY_EXISTS.CODE)
          .send(response);

      case responses.INVALID_PAYLOAD.CODE:
        response = Controller.errorResponse(responses.INVALID_PAYLOAD, data);
        return res.status(responses.INVALID_PAYLOAD.CODE).send(response);

      case responses.INTERNAL_SERVER_ERROR.CODE:
        response = Controller.succcessResponse(responses.INTERNAL_SERVER_ERROR);
        return res.status(responses.INTERNAL_SERVER_ERROR.CODE).send(response);

      default:
        return;
    }
  }
}

module.exports = Controller;
