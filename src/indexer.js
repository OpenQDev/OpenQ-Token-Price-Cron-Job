const axios = require('axios');
const { getAddress } = require('@ethersproject/address');

const UPDATE_BOUNTY = require('./graphql/updateBounty');
const CREATE_PRICES = require('./graphql/createPrices');
const GET_ALL_BOUNTIES = require('./graphql/getAllBounties');
const UPDATE_PRICES = require('./graphql/updatePrices');

const tokenMetadata = require('./constants/local.json');
const polygonMetadata = require('./constants/polygon-mainnet-indexable.json');

const updateFirstTenPrices = require('./updateFirstTenPrices');
const fetchTvls = require('./fetchTvls');
const updateTvls = require('./updateTvls');

require('dotenv').config();

const indexer = async () => {
	try {
		await updateFirstTenPrices();
		await updateTvls(await fetchTvls());
	}
	catch (error) {
		console.error('An error occured: ', error);
	}
};

module.exports = indexer;
