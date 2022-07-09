const responses = require('./response');

const message = {
    '/users/signin': {
        get: {
            tags: ["User"],
            summary: "sigin",
            description: "signin",
            operationId: 'Signin',
            consumes: 'application/json',
            produces: 'application/json',
            parameters: [
                {
                    name: "Login",
                    in: "body",
                    description: "Login",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                type: "string"
                            },
                            password: {
                                type: "string"
                            }
                        }
                    }
                }
            ],
            responses
        }
    }
};

const messageDefinitions = {
    Message: {
        type: "object",
        properties: {
            _id: {
                type: "string"
            },
            fname: {
                type: "string"
            },
        }
    }
};


module.exports = { message, messageDefinitions }