const config = require('./config');

const { accountSid, authToken, fromPhoneNumber } = config.twilio;
const { toPhoneNumbers } = config;

const client = require('twilio')(accountSid, authToken);

async function sendInStockAlert(message) {
  const work = toPhoneNumbers.map((number) => {
    return client.messages.create({
      body: message,
      from: fromPhoneNumber,
      to: number,
    });
  });

  return Promise.all(work);
}

module.exports = {
  sendInStockAlert,
};
