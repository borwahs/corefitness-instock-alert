const cheerio = require('cheerio');
const got = require('got');

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

(async function () {
  const isInStock = await checkStock();
  console.log(isInStock);
})();
