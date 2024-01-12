const { google } = require('googleapis');
const { auth } = require('google-auth-library');
const axios = require('axios');

const sendSmsTo = (smsNumber) => {
  const headerValues = {
    'Content-Type': 'application/json',
    'Authorization-Token': `Bearer ${process.env.AUTHORIZATION_TOKEN}`,
    'Authorization-Client': process.env.AUTHORIZATION_CLIENT
  }

  axios
    .post(
      'https://api.smsforall.org/v2/sms/create',
      {
        sms_content: 'Gracias por participar en smsforall.org',
        sms_number: `+52${smsNumber}`,
        sms_type: 'standard_delivery',
        sms_customer_reference_id: '',
        mobile_hub_id: process.env.SMS_MOBILE_HUB
      },
      {
        headers: headerValues
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function readColumnFromSpreadsheet(range) {
  // Load client secrets from a local file
  const client = auth.fromJSON(require('./service-account-apis-google.json'));
  client.scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

  const sheets = google.sheets({ version: 'v4', auth: client });

  try {
    // console.log(process.env.SPREADSHEET_ID, 'spreadsheetid')
    // console.log(sheets.spreadsheets, 'spreadsheets')
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: range,
    });

    const rows = response.data.values;
    // console.log(rows, 'rows')
    if (rows.length === 0) {
      console.log('No data found.');
    } else {
      // Process the rows
      let phoneNumber;
      rows.forEach((row) => {
        phoneNumber = row[0];
        console.log(`sending message to: ${phoneNumber}`)
        sendSmsTo(phoneNumber);
      });
    }
  } catch (err) {
    console.error('The API returned an error: ' + err);
  }
}

const range = 'B2:B';
readColumnFromSpreadsheet(range);
