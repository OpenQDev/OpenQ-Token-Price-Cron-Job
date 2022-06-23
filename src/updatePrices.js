const { UPDATE_PRICES } = require("./graphql/mutations");
const axios = require("axios");

const updatePrices = (firstTenPrices) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await axios
				.post(
					`${process.env.OPENQ_API_URL}/graphql`,
					{
						query: UPDATE_PRICES,
						variables: { priceObj: firstTenPrices, pricesId: "pricesId" }
					},
					{
						headers: {
							'Authorization': process.env.OPENQ_API_SECRET,
						},
					}
				);
			console.log(result.data);
			return resolve(result);
		} catch (error) {
			return reject(error);
		}

	});

};

module.exports = updatePrices;