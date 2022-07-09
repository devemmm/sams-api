const responses = require('./response');

const user = {
    '/users/signin': {
        post: {
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
    },
    '/users/signup': {
        post: {
            tags: ['User'],
            summary: 'Signup',
            description: 'Signup',
            operationId: 'Signup',
            consumes: 'application/json',
            produces: 'application/json',
            parameters: [
                {
                    name: "body",
                    in: "body",
                    required: "true",
                    schema: {
                        type: "object",
                        properties: {
                            fname: {
                                type: "string"
                            },
                            lname: {
                                type: "string"
                            },
                            email: {
                                type: "string"
                            },
                            phone: {
                                type: "string"
                            },
                            dob: {
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
        },

    },
    '/users': {
        get: {
            tags: ['User'],
            summary: 'list of users --route for system admin',
            description: 'list of users',
            operationId: 'list of users',
            produces: ['application/json'],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        }
    },
    '/users/me': {
        get: {
            tags: ['User'],
            summary: 'get my profile',
            description: 'get my profile',
            operationId: 'get my profile',
            produces: ['application/json'],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        },
    },
    '/users/signout': {
        post: {
            tags: ['User'],
            summary: 'signout for user',
            description: 'signout for user',
            operationId: 'signout for user',
            produces: ['application/json'],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        },
    },
    '/users': {
        post: {
            tags: ['User'],
            summary: 'update account',
            description: 'update account',
            operationId: 'update account',
            produces: ['application/json'],
            responses,
            parameters: [
                {
                    name: "body",
                    in: "body",
                    required: "true",
                    schema: {
                        type: "object",
                        properties: {
                            country: {
                                type: "string"
                            },
                            address: {
                                type: "string"
                            },
                            phone: {
                                type: "string"
                            }
                        }
                    }
                }
            ],
            security: [
                {
                    JWT: []
                }
            ]
        },
    },
    '/users/password': {
        post: {
            tags: ['User'],
            summary: 'change password',
            description: 'change password',
            operationId: 'change password',
            produces: ['application/json'],
            responses,
            parameters: [
                {
                    name: "body",
                    in: "body",
                    required: "true",
                    schema: {
                        type: "object",
                        properties: {
                            password: {
                                type: "string"
                            },
                            newPassword: {
                                type: "string"
                            }
                        }
                    }
                }
            ],
            security: [
                {
                    JWT: []
                }
            ]
        },
    },
    '/users/message': {
        post: {
            tags: ['User'],
            summary: 'contact ministry of health',
            description: 'contact ministry of health',
            operationId: 'ministry of health',
            produces: ['application/json'],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        },
    },
    '/surveyResponses/report': {
        post: {
            tags: ['User'],
            summary: 'contact ministry of health',
            description: 'contact ministry of health',
            operationId: 'ministry of health',
            produces: ['application/json'],
            responses,
            parameters: [
                {
                    name: "body",
                    in: "body",
                    required: "true",
                    schema: {
                        type: "object",
                        properties: {
                            generateReport: {
                                type: "string"
                            },
                            email: {
                                type: "string"
                            }
                        }
                    }
                }
            ],
            security: [
                {
                    JWT: []
                }
            ]
        },
    }
};

const userDefinitions = {
    User: {
        type: "object",
        properties: {
            _id: {
                type: "string"
            },
            fname: {
                type: "string"
            },
            lname: {
                type: "string"
            },
            about: {
                type: "string"
            },
            company: {
                type: "string"
            },
            country: {
                type: "string"
            },
            address: {
                type: "string"
            },
            email: {
                type: "string"
            },
            phone: {
                type: "string"
            },
            dob: {
                type: "string"
            },
            avatar: {
                type: "string"
            },
            userType: {
                type: "string"
            },
            password: {
                type: "string"
            }
        },
        example: {
            id: "bqkjvdjwhvefjmhwvefhkjhmwfbeqw",
            fname: "Emmanuel",
            lname: "NTIVUGURUZWA",
            about: "Sinior Software developer",
            company: "QT-Software LTD",
            country: "RWANDA",
            address: "KIGALI",
            email: "primaryemmy@gmail.com",
            phone: "0788596841",
            dob: "1-1-1998",
            avatar: "assets/img/default.jpg",
            userType: "user",
            createdAt: "2022-04-17T17:03:59.000Z",
            updatedAt: "2022-04-17T17:03:59.000Z",
        }
    }
};


module.exports = { user, userDefinitions }