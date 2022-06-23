const axios = require('axios');
require('dotenv').config();

const UPDATE_PRICES = require('./graphql/updatePrices');

const openQPolygonMainnetEnumerable = require('./constants/openq-polygon-mainnet-enumerable.json');

const updateFirstTenPrices = () => {
	return new Promise(async (resolve, reject) => {
		const firstTen = openQPolygonMainnetEnumerable.slice(0, 11).map(elem => elem.address).concat('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270');
		const network = 'polygon-pos';
		const stringifiedTokens = firstTen.join(',');

		let firstTenPrices = null;
		try {
			firstTenPrices = await axios.get(`https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${stringifiedTokens}&vs_currencies=usd`);
		} catch (error) {
			return reject(`Error fetching OpenQ Local Tokens: ${error}`,);
		}

		try {
			const result = await axios
				.post(
					`${process.env.OPENQ_API_URL}/graphql`,
					{
						query: UPDATE_PRICES,
						variables: { priceObj: firstTenPrices.data }
					},
					{
						headers: {
							'Authorization': process.env.OPENQ_API_SECRET,
						},
					}
				);
			return resolve(result);
		} catch (error) {
			return reject(error);
		}
	});
};

module.exports = updateFirstTenPrices;