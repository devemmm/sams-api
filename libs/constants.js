const responses = {
  SUCCESS: { CODE: 200, MSG: "Success" },
  BAD_REQUEST: { CODE: 400, MSG: "Bad Request" },
  RESOURCE_ALREADY_EXISTS: { CODE: 409, MSG: "Resource Already Exists" },
  MOVED_PERMANENTLY: { CODE: 301, MSG: "Moved Permanently" },
  UNAUTHORIZED_REQUEST: { CODE: 401, MSG: "Unauthorized Request" },
  FORBIDDEN_REQUEST: { CODE: 403, MSG: "Forbidden Request" },
  RESOURCE_NOT_FOUND: { CODE: 404, MSG: "Resource Not Found" },
  INVALID_PAYLOAD: { CODE: 422, MSG: "Invalid Input Payload" },
  INTERNAL_SERVER_ERROR: { CODE: 500, MSG: "Internal Server Error" },
};

module.exports = { responses };
