const updateTopTenPrices = require('./updateTopTenPrices');
const updateTvls = require('./updateTvls');
const fetchTvls = require('./fetchTvls');

require('dotenv').config();

const indexer = async () => {
	try {
		const updateTopTenResult = await updateTopTenPrices();
		const updateTvlsResult = await updateTvls(await fetchTvls(process.env.DEPLOY_ENV));
		console.log('updateTopTenResult', updateTopTenResult);
		if (updateTopTenResult.data.errors !== "undefined") {
			console.log('updateTopTenResult.data.errors', updateTopTenResult.data.errors);
		}
		console.log('updateTvlsResult', updateTvlsResult);
	}
	catch (error) {
		// GraphQL errors at error.response.data.errors
		console.error('An error occured: ', error);
	}
};

module.exports = indexer;
