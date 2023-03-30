express = require('express')

// Create the logger
const log                       = require('../utils/log')('Webhooks Web Service');

const respondLog = (responseBody, res) => {
    res.status(200).json(responseBody);
    log("Replied");
    log(JSON.stringify(responseBody));
}

const handleMfaEnrollments = (req, res, data_source) => {
    // Get the relevant properties from the request body
    // const operation             = req.body.operation;
    const operation = 'mfa-enrollments'
    //const parameters            = req.body.parameters;
    // const sessionContext        = req.body.sessionContext

    // Get the parameters
    const username = req.body.username
    
    //const username              = parameters.username;
   //  const password              = parameters.password;

    // INVALID_PARAMETERS if username missing from request
    if (!username) {
        respondLog({
            operation, 
            status: {
                result: "INVALID_PARAMETERS",
                message: "Username is missing from the request parameters"
            }
        }, res);
        return;
    }

    // USER_NOT_FOUND if user doesn't exist in the datasource
    if (!data_source[username]) {
        respondLog({
            operation, 
            status: {
                result: "USER_NOT_FOUND",
                message: "User not found in data source"
            }
        }, res);
        return;
    }

    log('Retrieved from data_source:')
    log(JSON.stringify(data_source[username]))

    // const category = 'test'
    // const score = '80'
    // const category = data_source[username].category
    // const score = data_source[username].score
    // const mfaAction = data_source[username].action
    const mobileNumber = data_source[username].mobile_number
    const emailAddress = data_source[username].emailAddress
    const deviceName = data_source[username].deviceName
    const deviceId = data_source[username].deviceId

    // Create the successful response
    let responseBody = 
        [
            {
                "attributes": {
                    "authExecutionFlow": "init_then_validate",
                    "deliveryAddress": mobileNumber,
                    "deviceName": deviceName
                },
                "capability": "smsotp",
                "id": deviceId
            }
        ]

     
    // Return the successful response with the response code 200 as per the specification
    respondLog(responseBody, res);
}


module.exports = handleMfaEnrollments


