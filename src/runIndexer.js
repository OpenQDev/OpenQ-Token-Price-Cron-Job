const indexer = require('./indexer');

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const runIndexer = async () => {
	console.log('init, waiting');
	await sleep(1000);
	console.log('running');
	await indexer();
	console.log('completed');
};

module.exports = runIndexer;