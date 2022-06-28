const updateTopTenPrices = require('./updateTopTenPrices');
const updateTvls = require('./updateTvls');
const fetchTvls = require('./fetchTvls');

require('dotenv').config();

const indexer = async () => {
	try {
		const updateTopTenResult = await updateTopTenPrices();
		const tvls = await fetchTvls(process.env.DEPLOY_ENV);
		console.log(tvls);
		const updateTvlsResult = await updateTvls(tvls);
		if (updateTopTenResult.data.errors !== undefined) {
			console.log('updateTopTenResult.data.errors', updateTopTenResult.data.errors);
		}
		if (updateTopTenResult.data.errors !== undefined) {
			console.log('updateTvlsResult.data.errors', updateTvlsResult.data.errors);
		}
	}
	catch (error) {
		// GraphQL errors at error.response.data.errors
		console.error('An error occured: ', error);
	}
};

module.exports = indexer;
