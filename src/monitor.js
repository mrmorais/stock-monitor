const stockGetter = require('./stockGetter');

class Monitor {
	constructor() {
		this.stocks = [];
	}

	addStock(url_) {
		this.stocks.push({
			url: url_,
			price: null,
			wallet: []
		});
	}

	addStockWallet(stockIndex_, quantity_, unitBuyPrice_, brokerageCost_, incomeTax_) {
		const walletInput = {
			quantity: quantity_,
			unitBuyPrice: unitBuyPrice_,
			brokerageCost: brokerageCost_,
			incomeTax: incomeTax_,
			balance: null,
		};

		this.stocks[stockIndex_].wallet.push(walletInput);
	}

	setStocks(stocks_) {
		this.stocks = stocks_;
	}

	getStocks() {
		return this.stocks;
	}

	fetchStockQuotes() {
		if (!this.fetchingStocks) {
			this.fetchingStocks = true;
			let trials = 0;

			this.stocks.forEach((stock) => {
				stockGetter(stock.url)
					.then((stockPrice) => {
						stock.price = stockPrice
						trials += 1;
						if (trials == this.stocks.length) this.fetchingStocks = false;
					});
			}, this);
		}
	}

	balanceStocks() {
		this.stocks.forEach((stock) => {
			stock.wallet.forEach((wltInstace) => {
				const crudleBalancePerUnit = stock.price - wltInstace.unitBuyPrice;
				const crudleBalance = (crudleBalancePerUnit * wltInstace.quantity) - wltInstace.brokerageCost;
				if (crudleBalance <= 0) {
					wltInstace.balance = crudleBalance;
				} else {
					wltInstace.balance = crudleBalance - (crudleBalance * wltInstace.incomeTax);
				}
			});
		});
	};
}

module.exports = new Monitor();
