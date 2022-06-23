const UPDATE_PRICES = require("./graphql/updateBounty")
const updatePrices = (firstTenPrices) => {
	return new Promise((resolve, reject) => {

		try {
			const result = await axios
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
			return resolve(result);
		} catch (error) {
			return reject(error);
		}

	});

};

module.exports = updatePrices;