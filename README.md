# Google Credentials Helper
nodejs library to help with GOOGLE_APPLICATION_CREDENTIALS on Heroku and clouds other then google


## Why I created this library: TLDR;

Initially I wrote this library for myself and later I decided to open it for others,
when I tried to use google apis in my nodejs server there was no way to pass the credentials directly as we can so in rest pai calls 
(it turned out there was a way before to pass config in client library initialization but later on it was pronounced deprecated)
Google forced us to put the path of their `service_account.json` file in environment variable insted of the the `service account json` itself which I donot understand and lots of other people complaining about that.
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

or 

`npm i https://github.com/malikasinger1/google-credentials-helper`

## Usage:

### Setting Environment Variables:

In local machine You must have to have Environment variable like this:<br><br>
```
export GOOGLE_APPLICATION_CREDENTIALS="google-credentials.json"

export GOOGLE_CREDENTIALS='{
  "type": "service_account",
  "project_id": "abc-project-id",
  "private_key_id": "6153365dad9d1...84b54867896b20a",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvg...ERNeAoD\n-----END PRIVATE KEY-----\n",
  "client_email": "dialogflow-client-service-acco@abc-project-id.iam.gserviceaccount.com",
  "client_id": "11121892...183973207",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dialogflow-client-service-acco%40abc-project-id.iam.gserviceaccount.com"
}'
```

In heroku it should look like this:
![image](https://user-images.githubusercontent.com/14273842/155875395-218ef516-29c8-4ea9-ab02-88e5a8bf0fbb.png)




### ES6 code
```
import gcHelper from "google-credentials-helper"

gcHelper();

```

### ES5 code
```
const gcHelper = require("google-credentials-helper")

gcHelper();

```

# Example Project:

to see this library in action, checkout this project:

## [Dialogflow Integration with React App](https://github.com/malikasinger1/Dialogflow-integration-with-react-app)

in this example project check server.mjs file on the root of the project to see how the library is imported and initialized, line# 4 and line# 7 respectively 


# Feedback
please feel free to contact me on malikasinger@gmail.com<br>
or create an issue to improve this library<br>
pull requests are always welcomed

Thanks,<br>
Malik.



