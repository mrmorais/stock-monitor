const stockGetter = require('./stockGetter')

stockGetter('https://quotes.wsj.com/BR/PSSA3')
	.then(console.log)
	.catch(console.error);
