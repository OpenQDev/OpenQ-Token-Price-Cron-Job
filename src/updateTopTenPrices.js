const axios = require('axios');
require('dotenv').config();

const UPDATE_PRICES = require('./graphql/updatePrices');

const openQLocalTokens = require('./constants/openq-local-enumerable.json');

const updateFirstTenPrices = () => {
	return new Promise(async (resolve, reject) => {
		const firstTen = openQLocalTokens.slice(0, 11).map(elem => elem.address).concat('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270');
		const network = 'polygon-pos';
		const stringifiedTokens = firstTen.join(',');
		const firstTenPrices = await axios.get(`https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${stringifiedTokens}&vs_currencies=usd`);

		let updated = null;
		try {
			updated = await axios
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
		} catch (error) {
			return reject(error);
		}

		if (updated.data.updatePrices.count === 0) {
			let updated = null;
			try {
				updated = await axios
					.post(
						`${process.env.OPENQ_API_URL}/graphql`,
						{
							query: CREATE_PRICES,
							variables: { priceObj: firstTenPrices.data }
						},
						{
							headers: {
								'Authorization': process.env.OPENQ_API_SECRET,
							},
						}
					);
				return resolve(updated);
			} catch (error) {
				return reject(error);
			}
		} else {
			return resolve(updated);
		}
	});
};

module.exports = updateFirstTenPrices;