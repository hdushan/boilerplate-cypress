const commonTestData = {
    ecUser: {
        username: 'hans.dushanthaku',
        password: 'amaysim123'
    }
}

const environmentSpecificTestData = {
    dev: {
        ...commonTestData
    },
    qa: {
        ...commonTestData
    },
    preprod: {
        ...commonTestData
    },
    production: {
        ecUser: {
            username: Cypress.env('PROD_EC_USER_USERNAME'),
            password: Cypress.env('PROD_EC_USER_PASSWORD')
        }
    }
}

module.exports =  environmentSpecificTestData[Cypress.env('ENV')]