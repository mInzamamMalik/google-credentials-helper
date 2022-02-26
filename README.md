# google-credentials-helper
nodejs library to help with GOOGLE_APPLICATION_CREDENTIALS on Heroku and clouds other then google


## Why I created this library: TLDR;

Initially I wrote this library for myself and later I decided to open it for others,
when I tried to use google apis in my nodejs server there was no way to pass the credentials directly as we can so in rest pai calls 
(it turned out there was a way before to pass config in client library initialization but later on it was pronounced deprecated)
Google forced us to put the path of their `service account json` in environment variable insted of the the `service account json` itself.
in local machine it worked fine I saved service account json in a folder and saved its path in env vars but when it came to deploy on heroku
it was a real problem, because my github repo was public and I was not willing to add service account json in the repo even if it was private because you never know
at that point I googled what other people doing for this problem, and I found [this article](https://devdojo.com/bryanborge/adding-google-cloud-credentials-to-heroku)
in which the guy created a heroku buildpack to get service account data from env vars and create a json file on the root of the project on heroku
this approach is pretty obvious and I used his buildpack at that time but later I realised that this approach will not work on other platforms
if someday I migrate to someother cloud provider probably aws, I will endup at the same place as before because heroku buildpack is not going to
work anywhere else but only on heroku. so I wrote this library which will do the same thing what they are doing with buildpack but through
npm library so it will work anywhere without any change is codebase



## Installation:
`npm i google-credentials-helper`

## Usage:

### Environment Variable
In local machine You must have to have Environment variable like this:
`GOOGLE_CREDENTIALS='{ "project_id": "abc-project-id", "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvg...9Z2bw4YKuO9uXM6PeAoD\n-----END PRIVATE KEY-----\n", "client_email": "dialogflow-client-service-acco@abc-project-id.iam.gserviceaccount.com" }'`

In heroku it should look like this:



### ES6
```
import gcHelper from "google-credentials-helper"

gcHelper();

```

### ES5
```
const gcHelper = require("google-credentials-helper")

gcHelper();

```

