
const getAllBounties = require("./getAllBounties");
const getTokenValues = require('./getTokenValues');
const fetchCoingeckoPrices = require('./fetchCoingeckoPrices');

const fetchTvls = async (environment, batchSize) => {
	const { pricingMetadata, bounties } = await getAllBounties([], [], environment, batchSize);
	const data = await fetchCoingeckoPrices(pricingMetadata);
	const tvls = await getTokenValues(bounties, pricingMetadata, data, environment);
	return tvls;
};

module.exports = fetchTvls;