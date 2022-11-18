
const getAllBounties = require("./getAllBounties");
const fetchCoingeckoPrices = require('./fetchCoingeckoPrices');
const getContractParameters = require("./getContractParameters");

const fetchContractParameters = async (environment, batchSize) => {
	const { pricingMetadata, bounties } = await getAllBounties([], [], environment, batchSize);
	const data = await fetchCoingeckoPrices(pricingMetadata);
	const tvls = await getContractParameters(bounties, pricingMetadata, data, environment);

	return tvls;
};

module.exports = fetchContractParameters;