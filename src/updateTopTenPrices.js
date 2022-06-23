
require('dotenv').config();

const fetchFirstTenPrices = require("./fetchFirstTenPrices");
const updatePrices = require("./updatePrices.js");

const updateFirstTenPrices = async () => {
	const firstTenPrices = fetchFirstTenPrices();
	const result = await updatePrices(firstTenPrices);
	return result;

};

module.exports = updateFirstTenPrices;