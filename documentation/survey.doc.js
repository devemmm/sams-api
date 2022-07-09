const responses = require('./response');

const survey = {
    '/survey': {
        post: {
            tags: ["Survey"],
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
        },
        get: {
            tags: ['Survey'],
            summary: 'list of Survey',
            description: 'list of Survey',
            operationId: 'list of Survey',
            produces: ['application/json'],
            responses
        }
    },
    '/survey/{id}': {
        get: {
            tags: ['Survey'],
            summary: 'find survey but id',
            description: 'find survey but id',
            operationId: 'find survey but id',
            parameters: [
                {
                    name: "id",
                    in: "path",
                }
            ],
            produces: ['application/json'],
            responses
        }
    },
    '/surveyResponses': {
        get: {
            tags: ['Survey'],
            summary: 'get all survey response',
            description: 'get all survey response',
            operationId: 'get all survey response',
            produces: ['application/json'],
            responses
        }
    },
    '/surveyresponses/statistics': {
        get: {
            tags: ['Survey'],
            summary: 'get all survey statistics',
            description: 'get all survey statistics',
            operationId: 'get all survey statistics',
            produces: ['application/json'],
            responses
        }
    },
    '/surveyresponses/statistics/{id}': {
        get: {
            tags: ['Survey'],
            summary: 'get single survey statistics',
            description: 'get single survey statistics',
            operationId: 'get single survey statistics',
            parameters: [
                {
                    name: "id",
                    in: "path",
                }
            ],
            produces: ['application/json'],
            responses
        }
    },
    '/survey/{id}': {
        delete: {
            tags: ['Survey'],
            summary: 'delete survey',
            description: 'delete survey',
            operationId: 'delete survey',
            parameters: [
                {
                    name: "id",
                    in: "path",
                }
            ],
            produces: ['application/json'],
            responses,
            security: [
                {
                    JWT: []
                }
            ]

        }
    },
    '/surveyResponses': {
        post: {
            tags: ['Survey'],
            summary: 'fill survey here',
            description: 'fill survey here',
            operationId: 'fill survey here',
            parameters: [
                {
                    name: "Login",
                    in: "body",
                    description: "Login",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            uid: {
                                type: "string"
                            },
                            surveyId: {
                                type: "string"
                            },
                            surveyName: {
                                type: "string"
                            },
                            answers: {
                                type: "object",
                                properties: {
                                    questionId: {
                                        type: "string"
                                    },
                                    questionName: {
                                        type: "string"
                                    },
                                    answer: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            ],
            produces: ['application/json'],
            responses,
            security: [
                {
                    JWT: []
                }
            ]

        }
    },
};

const surveyDefinitions = {
    Survey: {
        type: "object",
        properties: {
            _id: {
                type: "string"
            },
            name: {
                type: "string"
            },
            questions: {
                type: "object",
                properties: {
                    question: {
                        type: "string"
                    },
                    option: {
                        type: "array"
                    }
                }
            }
        }
    }
};


module.exports = { survey, surveyDefinitions }