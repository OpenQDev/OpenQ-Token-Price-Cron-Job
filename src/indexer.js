const axios = require('axios');
const { getAddress } = require('@ethersproject/address');

const UPDATE_BOUNTY = require('./graphql/updateBounty');
const CREATE_PRICES = require('./graphql/createPrices');
const GET_ALL_BOUNTIES = require('./graphql/getAllBounties');
const UPDATE_PRICES = require('./graphql/updatePrices');

const tokenMetadata = require('./constants/local.json');
const polygonMetadata = require('./constants/polygon-mainnet-indexable.json');

const updateTopTenPrices = require('./updateTopTenPrices');
const fetchTvls = require('./fetchTvls');
const updateTvls = require('./updateTvls');

require('dotenv').config();

const indexer = async () => {
	try {
		const result = await updateTopTenPrices();
		console.log(result.data.data.updatePrices.count);
		// await updateTvls(await fetchTvls());
	}
	catch (error) {
		console.error('An error occured: ', error);
	}
};

module.exports = indexer;
