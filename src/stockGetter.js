const Cheerio = require('cheerio');
const https = require('https');

// stockGetter function. Receives a TWSJ quotes URL and return the stock current price
module.exports = function(url_) {
	// first try request the page 
	return new Promise((resolve, reject) => {
		https.get(url_, (res) => {
			res.on('data', (data) => {
				const htmlRes = data.toString();
				const $ = Cheerio.load(htmlRes);
				const stockPriceStr = $('span #quote_val').html();
				if (stockPriceStr) {
					const stockPrice = Number(stockPriceStr);
					resolve(stockPrice);
				}
			}).on('error', (err) => {
				reject(err);
			})
		});
	});
}
