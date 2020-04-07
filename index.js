const cheerio = require('cheerio');
const got = require('got');

const config = require('./config');

const INTERVAL_TO_MINUTES = 60 * 1000;
const { intervalInMinutes } = config;

async function checkStock() {
  try {
    const response = await got(
      'https://www.corehomefitness.com/products/core-home-fitness-adjustable-dumbbell-set'
    );

    const $ = cheerio.load(response.body);
    const soldoutElementClassName = '.product-mark.sold-out';
    const soldoutElement = $(soldoutElementClassName);

    if (!soldoutElement || soldoutElement.text() !== 'sold out') {
      return { isInStock: true };
    }

    return { isInStock: false };
  } catch (err) {
    console.error(err);
    return { isInStock: false };
  }
}

(function () {
  setInterval(async () => {
    const isInStock = await checkStock();
    if (isInStock) {
      console.log(`not in stock yet -- ${Date.now()}`);
      return;
    }

    console.log(`in stock!!! -- ${Date.now()}`);
    process.exit(1);
  }, INTERVAL_TO_MINUTES * intervalInMinutes);
})();
