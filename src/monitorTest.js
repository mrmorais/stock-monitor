const Monitor = require('./monitor');

Monitor.addStock('https://quotes.wsj.com/BR/PSSA3');

console.log(Monitor.getStocks());
