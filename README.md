# Curation-UI

## Env variables
Update the following environmental variables on the Node server host:

* MONGODB_URI: connection string to the database
* PORT: application port
* NODE_ENV: dev/prod
* HOSTNAME: server hostnmane
* API_URL: ${HOSTNAME}/api/
* SENDGRID_KEY: https://sendgrid.com/ key for email notifications
* CURATION_HTTPS: true (run with https), false (run with http)
If HTTPS is enabled, add the paths to the certificate:
* PK
* CA
* CRT
