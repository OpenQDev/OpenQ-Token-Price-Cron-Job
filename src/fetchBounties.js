const getBounties = require("./getBounties");
const getAllBounties = require("./getAllBounties");
const filterNonIssues = require('./utils/filterNonIssues');
const populatePricingMetadata = require("./populatePricingMetadata");
const getTokenValues = require('./getTokenValues');
const fetchCoingeckoPrices = require('./fetchCoingeckoPrices');

const openqPolygonMetadata = require("./constants/openq-polygon-mainnet-indexable.json");
const openqLocalMetadata = require("./constants/openq-local-indexable.json");
const polygonMetadata = require("./constants/polygon-mainnet-indexable.json");

const fetchBounties = async () => {
	const { pricingMetadata, bounties } = await getAllBounties([], []);
	const data = await fetchCoingeckoPrices(pricingMetadata);
	const tvls = await getTokenValues(bounties, pricingMetadata, data, process.env.DEPLOY_ENV);
	return tvls;
};

module.exports = fetchBounties;