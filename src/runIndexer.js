const indexer = require('./indexer');

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const runIndexer = async (wait) => {
	console.log(`Initialized. Waiting for ${wait / 1000} seconds for OpenQ-API to initialize`);
	await sleep(wait);
	console.log('Running...');
	await indexer();
	console.log('TVLs updated ✅');
};

module.exports = runIndexer;