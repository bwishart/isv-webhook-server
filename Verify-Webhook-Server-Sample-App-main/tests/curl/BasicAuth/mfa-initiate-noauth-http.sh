#!/bin/bash

##############################################################################
# Copyright contributors to the IBM Security Verify Bridge for Authentication Sample App project
##############################################################################

source ../../.env
cd $CERT_PATH

AUTH_ENCODED=`echo -n "${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}" | base64`

curl -i --location  --request POST "http://${EXTAUTHN_SERVER_HOST}:${EXTAUTHN_SERVER_PORT}/initiate" \
--header 'Content-Type: application/json' \
--data-raw '{
    "capability" : "smsotp",
    "id" : "scott1111-deviceId", 
    "attributes" : {
        "username": "scott1111"
    }
}'