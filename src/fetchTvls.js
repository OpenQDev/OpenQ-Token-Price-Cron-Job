
const getAllBounties = require("./getAllBounties");
const getTokenValues = require('./getTokenValues');
const fetchCoingeckoPrices = require('./fetchCoingeckoPrices');

const fetchTvls = async (environment) => {
	const { pricingMetadata, bounties } = await getAllBounties([], [], environment);
	const data = await fetchCoingeckoPrices(pricingMetadata);
	const tvls = await getTokenValues(bounties, pricingMetadata, data, environment);
	return tvls;
};

module.exports = fetchTvls;