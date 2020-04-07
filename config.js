require('dotenv').config();

module.exports = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromPhoneNumber: process.env.TWILIO_FROM_NUMBER,
  },
  toPhoneNumbers: process.env.TO_NUMBERS.split(',').map((n) => n.trim()),
};
