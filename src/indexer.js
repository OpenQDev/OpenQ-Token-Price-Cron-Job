const updateTopTenPrices = require('./updateTopTenPrices');
const updateTvls = require('./updateTvls');
const fetchTvls = require('./fetchTvls');

require('dotenv').config();

const indexer = async () => {
	try {
		// const result = await updateTopTenPrices();
		const result = await updateTvls(await fetchTvls(process.env.DEPLOY_ENV));
		console.log(result);
	}
	catch (error) {
		// GraphQL errors at error.response.data.errors
		console.error('An error occured: ', error);
	}
};

module.exports = indexer;
