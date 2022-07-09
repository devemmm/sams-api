const { user, userDefinitions } = require('./user.doc')
const { survey, surveyDefinitions } = require('./survey.doc')
const host = process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL.split('https://')[1]
    : process.env.BASE_URL.split('http://')[1];

const paths = {
    ...user,
    ...survey
};

const definitions = {
    ...userDefinitions,
    ...surveyDefinitions
};

const config = {
    swagger: '2.0',
    info: {
        description: 'Sanitation Accessability Monitoring System',
        version: '1.0.0',
        title: '@Sanitation Accessability Monitoring System(sams) --version-1',
        contact: {
            name: "devemm",
            email: "emmanuel@gennxttechsol.com"
        }
    },
    host,
    schemes: ['http', 'https'],
    securityDefinitions: {
        JWT: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    paths,
    definitions
};

module.exports = config