const axios = require('axios');
const { getAddress } = require('@ethersproject/address');

const UPDATE_BOUNTY = require('./graphql/updateBounty');
const CREATE_PRICES = require('./graphql/createPrices');
const GET_ALL_BOUNTIES = require('./graphql/getAllBounties');
const UPDATE_PRICES = require('./graphql/updatePrices');

const tokenMetadata = require('./constants/local.json');
const polygonMetadata = require('./constants/polygon-mainnet-indexable.json');
const openQLocalTokens = require('./constants/openq-local-enumerable.json');

require('dotenv').config();

const updateTvls = async (values) => {
	const pending = [];
	for (let i = 0; i < values.length; i += 1) {
		const value = values[i];
		const address = getAddress(value.address);
		const tvl = parseFloat(value.tvl);
		const { organizationId } = value;

		let result = null;
		try {
			result = await axios
				.post(
					`${process.env.OPENQ_API_URL}/graphql`,
					{
						query: UPDATE_BOUNTY,
						variables: { address, tvl, organizationId },
					},
					{
						headers: {
							'Authorization': process.env.OPENQ_API_SECRET,
						},
					}
				);
		} catch (error) {
			console.error(error);
		}

		pending.push(result.data);
	}
	return Promise.all(pending);
};

const indexer = async () => {
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
		console.error(error);
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
		} catch (error) {
			console.error(error);
		}

	}

	try {
		const TVLS = await fetchBounties();
		await updateTvls(TVLS);
	}
	catch (err) {
		console.log('could not update bounties');
	}
};

module.exports = indexer;
