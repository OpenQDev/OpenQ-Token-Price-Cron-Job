const updateTopTenPrices = require('./updateTopTenPrices');

require('dotenv').config();

const indexer = async () => {
	try {
		const result = await updateTopTenPrices();
		// await updateTvls(await fetchTvls());
	}
	catch (error) {
		// GraphQL errors at error.response.data.errors
		console.error('An error occured: ', error.response.data.errors);
	}
};

module.exports = indexer;
