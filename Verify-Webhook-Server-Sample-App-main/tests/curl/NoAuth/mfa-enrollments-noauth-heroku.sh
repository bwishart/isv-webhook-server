#!/bin/bash

##############################################################################
# Copyright contributors to the IBM Security Verify Bridge for Authentication Sample App project
##############################################################################

source ../../.env
cd $CERT_PATH

AUTH_ENCODED=`echo -n "${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}" | base64`

curl -i -v --location --insecure --request POST "https://bwishart-isv-webhook-server.herokuapp.com/enrollments" \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "scott1111"
}'