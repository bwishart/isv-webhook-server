express = require('express')

// Create the logger
const log                       = require('../utils/log')('Webhooks Web Service');

const respondLog = (responseBody, res) => {
    res.status(200).json(responseBody);
    log("Replied");
    log(JSON.stringify(responseBody));
}

const handleRisk = (req, res, data_source) => {
    // Get the relevant properties from the request body
    // const operation             = req.body.operation;
    const operation = 'risk'
    //const parameters            = req.body.parameters;
    const sessionContext        = req.body.sessionContext

    // INVALID_PARAMETERS if the parameters property doesn't exist
    if (!sessionContext) {
        respondLog({
            operation, 
            status: {
                result: "INVALID_PARAMETERS",
                message: "Parameters property missing from request"
            }
        }, res);
        return;
    }

    // Get the parameters
    const username = sessionContext.preferredUsername
    
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
    const category = data_source[username].category
    const score = data_source[username].score
    const mfaAction = data_source[username].action

    // Create the successful response
    let responseBody = {
        attributes: {
            "XFE-IP-Category": category,
            "XFE-IP-Score": score
        },
        integrationId: "50eb741b-885c-4621-8c32-b514d2bada76",
        result: { 
            action : mfaAction,
            message : "Risk response returned from handleRisk webhook response username: " + username
        },
        "version": "1.1"
    }
     
    // Return the successful response with the response code 200 as per the specification
    respondLog(responseBody, res);
}


module.exports = handleRisk

