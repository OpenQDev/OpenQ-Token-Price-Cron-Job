
require('dotenv').config();

const fetchFirstTenPrices = require("./fetchFirstTenPrices");
const updatePrices = require("./updatePrices.js");

const updateFirstTenPrices = async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const firstTenPrices = await fetchFirstTenPrices();
			const result = await updatePrices(firstTenPrices);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = updateFirstTenPrices;