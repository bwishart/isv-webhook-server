// 
// Copyright contributors to the IBM Security Verify Bridge for Authentication Sample App project
// 

// Import required modules
require('dotenv').config()
const https                     = require('https');
const express                   = require('express');
const fs                        = require('fs');
// const handleInvalidOperation    = require('./operations/invalid-operation');
// const handlePasswordVerify      = require('./operations/password-verify');
// const handleGetStatus           = require('./operations/get-status');
// const handlePasswordChange      = require('./operations/password-change');
const handleRisk                = require('./operations/risk');
const handleMfaEnrollments      = require('./operations/mfa-enrollments');
const handleMfaInitiate         = require('./operations/mfa-initiate');
const handleMfaValidate         = require('./operations/mfa-validate');
const app                       = express();
const basicAuthen               = require('./authentication/basicAuthen');
const mtls                      = require('./authentication/mtls');
const symmetricJwt              = require('./authentication/symmetricJwt');
const asymmetricJwt             = require('./authentication/asymmetricJwt');
const oauth                     = require('./authentication/oauth');

// Create the logger. This simply prepends 'Extaunthn Web service' to console logs
const log                       = require('./utils/log.js')(process.env.LOGGER_PREFIX);

// Define the ports
//const TLS_PORT                  = process.env.PORT;
const port = process.env.PORT || 8000
const useTLS = process.env.USE_TLS 
console.log('in server.js port:', port,' useTLS: ', useTLS)

// Connect to the database (just a json object in this example)
data_source                     = require('./data_source/data_source.js');

// TLS config
const PATH_TO_CRT   = 'certs/extauthn.agent.crt';     // Location of the tls certificate
const PATH_TO_KEY   = 'certs/extauthn.agent.key';     // Location of the certificate private key
const PATH_TO_CA    = 'certs/extauthn.caroot.crt';    // Location of the certificate authority cert

// HTTPS config will go here
if (useTLS) {
const httpsServerConfig = {
    key: fs.readFileSync(PATH_TO_KEY),
    cert: fs.readFileSync(PATH_TO_CRT),
    ca: fs.readFileSync(PATH_TO_CA),
    requestCert: true,
    rejectUnauthorized: false,
}
}

// Logger request url
app.use((req, res, next) => {
    log(`\nURL Received:`);
    log(JSON.stringify(req.originalUrl));
    next();
});


// Logger request headers
app.use((req, res, next) => {
    log(`\nRequest headers received:`);
    log(JSON.stringify(req.headers));
    next();
});

// BW - suspend use of Basic Auth
// Authentication (uncomment desired)
// app.use(basicAuthen);                       // Basic Auth
// app.use(mtls);                              // MTLS
// app.use(symmetricJwt);                      // Symmetric signed JWT
// app.use(asymmetricJwt);                     // Asymmetric signed JWT
// app.use(oauth);                             // Oauth         

// json middleware to handle application/json requests
app.use(express.json());

// JSON body logger middleware, logs incoming json bodies
app.use((req, res, next) => {
    log("Request body:");
    log(JSON.stringify(req.body));
    next();
});


app.get('/risk', (req, res) => {
    res.send('GET is not supported, use POST')
})

app.post('/risk', (req, res) => {
    if (!req.body) {
        res.send('req.body is undefined')
        console.log('req.body is undefined')
    } else {
       handleRisk(req, res, data_source)
    }
})

app.post('/enrollments', (req, res) => {
    if (!req.body) {
        res.send('req.body is undefined')
        console.log('req.body is undefined')
    } else {
       handleMfaEnrollments(req, res, data_source)
    }
})

app.post('/initiate', (req, res) => {
    if (!req.body) {
        res.send('req.body is undefined')
        console.log('req.body is undefined')
    } else {
       handleMfaInitiate(req, res, data_source)
    }
})

app.post('/validate', (req, res) => {
    if (!req.body) {
        res.send('req.body is undefined')
        console.log('req.body is undefined')
    } else {
       handleMfaValidate(req, res, data_source)
    }
})

// app.post("/action", (req, res) => {
//     // Get the operation from the request
//     const operation = req.body.operation;

//     switch (operation) {
//         case "password-verify":
//             // Logic to handle the password verify operation
//             handlePasswordVerify(req, res, data_source);
//             break;
//         case "password-change":
//             // Logic to handle the password change operation goes here
//             handlePasswordChange(req, res, data_source);
//             break;
//         case "get-status":
//             // Logic to handle the get-status operation goes here
//             handleGetStatus(req, res);
//             break;
//         default:
//             // Logic to handle invalid operation
//             handleInvalidOperation(req, res);
//         break;
//     }
// });




app.get('*', (req, res) => {
    const badurl = req.originalUrl
    console.log("URL: " + badurl + " not found")
    res.status(404).json("URL: " + badurl + " not found");
    // res.send('URL not found')
})

//Create the server
if (useTLS) {
    const httpsServer = https.createServer(httpsServerConfig, app).listen(port, () => {
        log(`HTTPS Listening on port \t ${port}`);
    });
} else {
    app.listen(port, () => {
        console.log('HTTP Listening on port: ' + port)
        })
}
