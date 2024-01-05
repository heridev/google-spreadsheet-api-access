## Google APIS example with Node.js

In this repository you might find two different examples using Node with Javascript:
- GoogleForms.js
- googleSpreadsheetWithServiceAccount.js

### Using Oauth 2 
The first example uses the Oauth 2 authentication to get access to the data of a Google Spreadsheet, 
and after generate your OAuth 2.0 Client ID in the Google cloud console credentials, you
might be able to run it with
```
node GoogleForms.js
```

And remember to place your credentials in the root folder of this project, with the name of
```
credentials.json
```

### Using a service account
In the second example, you might need to generate a new service account credentials
```
https://console.cloud.google.com/apis/credentials?project=your-project
```

And store it in this folder and then specify the name of the credentials, by default
it will search for the file
```
service-account-apis-google.json
```

In this case I'm making a request to the smsforall.org api so you might also need to 
generate your API keys and set them before running the example, for instance:
```
export AUTHORIZATION_TOKEN='xxxxxxxxxxxxxxxxxxxxxxxxxxx'
export AUTHORIZATION_CLIENT='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
export SMS_MOBILE_HUB=c5fccd8c-xxxx-xxxx-xxxxx-e82xxxxxxx21c8
export SPREADSHEET_ID=1IB7vuCyZFcxxxxxxxxxxxxxxxxxxxxxxhPzZpIwPE
node googleSpreadsheetWithServiceAccount.js
```

