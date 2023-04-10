#!/bin/bash

##############################################################################
# Copyright contributors to the IBM Security Verify Bridge for Authentication Sample App project
##############################################################################

source ../../.env
cd $CERT_PATH

AUTH_ENCODED=`echo -n "${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}" | base64`

curl -i --location  --request POST "http://${EXTAUTHN_SERVER_HOST}:${EXTAUTHN_SERVER_PORT}/risk" \
--header 'Content-Type: application/json' \
--data-raw '{
    "sessionContext": {
        "preferredUsername": "scott1111",
        "sessionID": "98765432-222",
        "emailAddr": "scott1111@yopmail.com",
        "mobileNumber": "9057772222",
        "userType":"regular",
        "uid":"6430023HCA"
    },
    "attributeContext": {
        "ipAddress": "10.0.0.1",
        "appId":"8734904324827838350",
        "evaluationData": "eval data"
    },
    "policyContext": {
        "id": "98777",
        "name":"MSU 2022 Adaptive and XFE IP Reputation",
        "policyName": "policy name 98777"
    },
    "adaptiveContext": {},
    "customAttributes":{"ecifid":["1111"]},
    "authnMethods":["anyFactor"]
}'

# curl -i --location  --request POST "http://${EXTAUTHN_SERVER_HOST}:${EXTAUTHN_SERVER_PORT}/risk" \
# --header 'Content-Type: application/json' \
# --data-raw '{
#     "sessionContext": {
#         "preferredUsername": "alice2222",
#         "sessionID": "98765432-222",
#         "emailAddr": "alice2222@yopmail.com",
#         "mobileNumber": "9057772222"
#     },
#     "attributeContext": {
#         "ipAddress": "10.0.0.1",
#         "evaluationData": "eval data"
#     },
#     "policyContext": {
#         "id": "98777",
#         "policyName": "policy name 98777"
#     },
#     "adaptiveContext": {},
#     "customAttriibutes": {},
#     "authnMethods": []
# }'

# curl -i --location  --request POST "http://${EXTAUTHN_SERVER_HOST}:${EXTAUTHN_SERVER_PORT}/risk" \
# --header 'Content-Type: application/json' \
# --data-raw '{
#     "sessionContext": {
#         "preferredUsername": "jessica3333",
#         "sessionID": "98765432-222",
#         "emailAddr": "jessica3333@yopmail.com",
#         "mobileNumber": "9054446666"
#     },
#     "attributeContext": {
#         "ipAddress": "10.0.0.1",
#         "evaluationData": "eval data"
#     },
#     "policyContext": {
#         "id": "98777",
#         "policyName": "policy name 98777"
#     },
#     "adaptiveContext": {},
#     "customAttriibutes": {},
#     "authnMethods": []
# }'

