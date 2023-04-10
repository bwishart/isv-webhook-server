#!/bin/bash

##############################################################################
# Copyright contributors to the IBM Security Verify Bridge for Authentication Sample App project
##############################################################################

source ../../.env
cd $CERT_PATH

AUTH_ENCODED=`echo -n "${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}" | base64`

curl -i --location --cacert $CA_CERT_NAME --request POST "https://${EXTAUTHN_SERVER_HOST}:${EXTAUTHN_SERVER_PORT}/risk" \
--header 'Content-Type: application/json' \
--data-raw '{
    "sessionContext": {
        "preferredUsername": "scott1111",
        "sessionID": "98765432-222",
        "emailAddr": "scott1111@yopmail.com",
        "mobileNumber": "9057772222"
    },
    "attributeContext": {
        "ipAddress": "10.0.0.1",
        "evaluationData": "eval data"
    },
    "policyContext": {
        "id": "98777",
        "policyName": "policy name 98777"
    },
    "adaptiveContext": {},
    "customAttriibutes": {},
    "authnMethods": []
}'

# curl -i --location --cacert $CA_CERT_NAME --request POST "https://${EXTAUTHN_SERVER_HOST}:${EXTAUTHN_SERVER_PORT}/risk" \
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
