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
    "operation": "risk",
    "parameters": {
      "username": "scott"
    },
    "requestedAttributes": ["cn", "mobile_number", "displayName"]
}'

# curl -i --location --cacert $CA_CERT_NAME --request POST "https://${EXTAUTHN_SERVER_HOST}:${EXTAUTHN_SERVER_PORT}/risk" \
# --header 'Content-Type: application/json' \
# --data-raw '{
#     "operation": "risk",
#     "parameters": {
#       "username": "alice"
#     },
#     "requestedAttributes": ["cn", "mobile_number", "displayName"]
# }'