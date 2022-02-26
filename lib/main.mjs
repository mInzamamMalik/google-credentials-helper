import fs from 'fs'



function init(dev, callback) {

    if (dev === undefined) dev = false;
    print("callback: ", callback)
    if (callback === undefined) callback = function () {
        print("write success");
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
    print("cert: ", cert)


    if (cert === undefined) {
        throw new Error(`Please set GOOGLE_CREDENTIALS in your environment variables\
with Stringfied form of service account json. e.g:
GOOGLE_CREDENTIALS: { "project_id": "abc-project-id", "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvg...9Z2bw4YKuO9uXM6PeAoD\n-----END PRIVATE KEY-----\n", "client_email": "dialogflow-client-service-acco@abc-project-id.iam.gserviceaccount.com" }`)
    }

    print("typeof cert: ", cert)

    var json = JSON.parse(cert);
    print(json);

    if (!json.private_key || !json.client_email) {
        throw new Error(`You must have to have private_key and client_email in your GOOGLE_CREDENTIALS json. e.g:
GOOGLE_CREDENTIALS: { "project_id": "abc-project-id", "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvg...9Z2bw4YKuO9uXM6PeAoD\n-----END PRIVATE KEY-----\n", "client_email": "dialogflow-client-service-acco@abc-project-id.iam.gserviceaccount.com" }`)

    }

    fs.writeFile('google-credentials.json', JSON.stringify(json), 'utf8', callback);
}


export default init;