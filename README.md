# Verify SaaS Webhooks Handler

## Introduction
This is a Nodejs application that acts in the role of a webhook handler for
ISV Webhooks. This provides a demo / PoC environment from which to demonstrate how to 
integrate with Verify SaaS via webhooks. 
The official documentation of webhooks in Verify is here:
https://www.ibm.com/docs/en/security-verify?topic=integrations-managing-webhooks-through-apis

The following webhook types are provided:
- Risk Webhook: Provides a low, medium and high risk response based on the preferred_username of
the user logged in.  The Access Policy conditions drive allow, MFA or deny based on the risk. 
This is exposed in a /risk endpoint.
- 3rd Party MFA using the initiate+verify flow: This returns 2 mobile phone numbers based on the
preferred_username of the user logged in /enrollments endpoint, then processes the /initiate and 
/validate endpoint. 

This is a follow-on / companion to the assets provided in the Master Skills University (MSU) Live Labs 2022
session.  The assets are available internally to IBMers at:
https://ibm.ent.box.com/folder/175313270516

This sample application was based on the Sample Application assets delivered with the Web Services
extensions for the Verify Bridge (for Authentication). Documentation for that sample application 
may be found here: https://docs.verify.ibm.com/verify/docs/developing-external-agent-ws
While this implementation is different, it shares the structure and directory structure of 
sample application/test scripts used by this project.

## Hosting Pre-reqs/Considerations

In order to use this asset, the following pre-reqs are required:
	- an Internet facing Node.js hosting environment: ISV needs to call an ISV https:// service, so 
this node.js application must be internet facing.
	- a hosting environment with a TLS certificate from a legit CA: ISV will validate that the TLS
certificate is from a valid CA (there doesn't seem to be a way to load a self-signed cert). Furthermore
in my testing, this must be listening on port :443.  

As such, it is best to find a hosting servicethat provides this as part of the environment and just 
launches this Nodejs app with a dynamically assigned PORT that this application can listen on.

	- authentication: while the underlying sample application can support various authentication 
types, for this project only http headers (carried from the MSU postman collection) are provided
and not authenticated in the isv-webhook-server app. Use of headers, basic auth and Oauth might
be used with associated configuration in the webhook and Nodejs code.

	- you will first need to follow the MSU ISV Webhook Live Lab to get familiar with
	the use of the Webhooks and setup the tenant (attributes, API client, etc.) This application does NOT implement a Notification webhook, but 
	what is described in that lab should be sufficient for testing. 

## Setup

1. Clone the repository and install the application
```bash
cd <downloaddir>
git clone https://github.com/bwishart/isv-webhook-server.git
cd <download dir>/isv-webhook-server/Verify-Webhook-Server-Sample-App-main/sample_application
npm install
```

2. Configure the environment variables
```bash
cd Verify-Webhook-Server-Sample-App-main/sample-application
cp .env_example .env`
```
For this implementation, since we are not using authentication, all the defaults can remain
and no changes are required.

3. (Optional) Deploy on localhost
You can deploy this locally and use the curl scripts in the ../test directory to mimic
inputs and outputs.  You will need to set the following in .env:
```bash
PORT=8000
```
Use the following curl scripts:
```bash
cd <download dir>/Verify-Webhook-Server-Sample-App-main/tests/curl/NoAuth
./risk-noauth-http.sh
./mfa-enrollments-noauth-http.sh
./mfa-initiate-noauth-http.sh
./mfa-validate-noauth-http.sh
```

4. Deploy the application on the hosting service.
This is dependant on your hosting service.  Ensure the .env is correct for the environment.
In my hosting service, I leave PORT and USE_TLS uncommented as these are provided by the hosting
service:
```bash
#PORT=8000
#USE_TLS=true
```

5. Test the application deployment using curl scripts
Modify the tests curl scripts for your environment and test. Relevant scripts are as follows:
```bash
./risk-noauth-heroku.sh
./mfa-enrollments-noauth-heroku.sh
./mfa-initiate-noauth-heroku.sh
./mfa-validate-noauth-heroku.sh
```
You can also do a https://<yourhost>/risk
The GET will be rejected with a message "GET not supported use POST" but this will tell you
the application is available.

6. Load the updated postman collection.
The following collection is augmented from the original MSU ISV Webhooks Live Lab material:
```bash
cd <download dir>/Verify-Webhook-Server-Sample-App-main/postman
```
The file is "MSU 2022-Webhooks Config for isv-webhook-server 10April2023.postman.collection"`
You will have to update the variables to match the environment you created with the MSU original lab


7. Create the webhook configurations
As performed in the MSU Webhook Lab Guide, modify the collections and URLs to suite your tenant.
You might need to manually delete a previous /risk webhook from within the Verify Admin UI as follows:
- unattach the "MSU" access policy from your protected application
- delete the "MSU" access policy
- under "Integrations..Realtime Webhooks" delete the risk webhook
Then execute the following to create the webhooks:
	- "Get access token"
	- "Create 3rd Party Risk Webhook - XFE iamlab"
	- "Create 3rd Party Risk Integration - XFE iamlab"
	- "Create 3rd Party MFA Webhook - iamlab"
	- "Create 3rd Party MFA Provider - iamlab"
	- "Create Adaptive and XFE IP Reputation Policy"
	
8. Create test users in your ISV tenant
The test users are found in the following location in the application deployment:
```bash
<downloaddir>/Verify-Webhook-Server-Sample-App-main/sample-application/datasource/datasource.js
```
In that file are the users: scott1111, alice2222 and jesica3333. You must have these ids
in your tenant. Alternatively you can modify this file to suite your ISV tenant. (note these
ids do not allow use of email with "@" in the username). 

9. Test
Login with each of 
	- scott1111 (medium risk/mfa), 
	- alice2222 (high risk, deny) and
	- jessica3333 (low risk, allow).
	

	
