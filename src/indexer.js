const updateTopTenPrices = require('./updateTopTenPrices');
const updateContracts = require('./updateContracts');
const fetchContractParameters = require('./fetchContractParameters');

require('dotenv').config();

const indexer = async () => {
	try {
		const updateTopTenResult = await updateTopTenPrices();
		console.log(updateTopTenResult?.data);
		const tvls = await fetchContractParameters(process.env.DEPLOY_ENV, 100);
		const updateTvlsResult = await updateContracts(tvls);
	}
	catch (error) {
		// GraphQL errors at error.response.data.errors
		if (error.code === 'ECONNREFUSED') {
			console.error(`Unable to connect to localhost:${error.port}`);
		} else {
			console.error('An error occured: ', error);
		}
	}
};

module.exports = indexer;
