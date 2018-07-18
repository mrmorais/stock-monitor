const monitor = require('./monitor')
const myWallet = require('../my-wallet');

monitor.setStocks(myWallet);

function beautyPrint(stocks_) {
	console.log(Date());
	stocks_.forEach((stock) => {
		let line = '['+stock.url+'][ '+ stock.price +' ] ';
		stock.wallet.forEach((wallet, idx) => {
			line += '{ WLT ' + idx + ' ' + wallet.balance + ' }';
			console.log(line);
		});
	});
	console.log('\n');
}

function measureRound() {
	if (!monitor.fetchingStocks) {
		monitor.fetchStockQuotes();
	}

	let exit = false;
	while (!monitor.fetchingStocks || !exit) {
		monitor.balanceStocks();
		beautyPrint(monitor.getStocks());
		exit = true;
	}
}

measureRound();
setInterval(() => {
	measureRound();
}, 5000);
