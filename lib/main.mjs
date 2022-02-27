import fs from 'fs'

function init(dev, callback) {

    //checking params
    if (dev === undefined) dev = false;
    if (callback === undefined) callback = function () {
        print("google-credentials.json file write success");
    }

    function print(arg1, arg2, arg3, arg4, arg5) {
        if (dev) {
            if (arg1 && arg2 && arg3 && arg4 && arg5) console.log(arg1, arg2, arg3, arg4, arg5);
            else
                if (arg1 && arg2 && arg3 && arg4) console.log(arg1, arg2, arg3, arg4);
                else
                    if (arg1 && arg2 && arg3) console.log(arg1, arg2, arg3);
                    else
                        if (arg1 && arg2) console.log(arg1, arg2);
                        else
                            if (arg1) console.log(arg1);
        }
    }

    const cert = process.env.GOOGLE_CREDENTIALS;
    if (typeof (cert) === "string")
        print("json found in GOOGLE_CREDENTIALS env var ")


    if (cert === undefined) {
        print("json not found in GOOGLE_CREDENTIALS env var ")
        throw new Error(
            `Please set GOOGLE_CREDENTIALS in your environment variables 
            with Stringfied form of service account json. e.g:
            GOOGLE_CREDENTIALS: { "project_id": "abc-project-id", "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvg...9Z2bw4YKuO9uXM6PeAoD\n-----END PRIVATE KEY-----\n", "client_email": "dialogflow-client-service-acco@abc-project-id.iam.gserviceaccount.com" }`
        )
    }

    try {
        var json = JSON.parse(cert);
    } catch (e) {
        throw new Error("invalid JSON in GOOGLE_CREDENTIALS env var")
    }

    if (!json.private_key || !json.client_email) {
        throw new Error(
            `You must have to have private_key and client_email in your GOOGLE_CREDENTIALS json. e.g:
            GOOGLE_CREDENTIALS: { "project_id": "abc-project-id", "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvg...9Z2bw4YKuO9uXM6PeAoD\n-----END PRIVATE KEY-----\n", "client_email": "dialogflow-client-service-acco@abc-project-id.iam.gserviceaccount.com" }`
        )
    }
    let isFoundCred = false;
    try {
        var credFile = fs.readFileSync('google-credentials.json', 'utf8');
        credFile = credFile.toString();
        isFoundCred = credFile.includes(JSON.stringify(json));
        print("credentials file found in working directory: ", isFoundCred);
    } catch (e) {
        print(e)
        print("credentials file not found in working directory");
    }
    if (!isFoundCred) {
        fs.writeFile('google-credentials.json', JSON.stringify(json), 'utf8', callback);
    }




    ////////////////writing in .gitignore
    let isFound = false;
    try {
        var gitIgnoreFile = fs.readFileSync('.gitignore', 'utf8');
        gitIgnoreFile = gitIgnoreFile.toString();
        isFound = gitIgnoreFile.includes("google-credentials.json");
        print("google-credentials.json entry found in .gitignore file: ", isFound);
    } catch (e) {
        print(e)
        print("google-credentials.json entry not found in .gitignore file");
    }
    if (!isFound) {
        fs.writeFile('.gitignore', '\ngoogle-credentials.json', { flag: "a+" }, (err) => {
            if (err) throw err;
            console.log('google-credentials.json entry added in .gitignore file');
        });
    }
}

export default init;

