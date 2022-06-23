const updateTopTenPrices = require('./updateTopTenPrices');

require('dotenv').config();

const indexer = async () => {
	try {
		const result = await updateTopTenPrices();
		console.log(result.data.data.updatePrices.count);
		// await updateTvls(await fetchTvls());
	}
	catch (error) {
		// GraphQL errors at error.response.data.errors
		console.error('An error occured: ', error);
	}
};

module.exports = indexer;
