const UPDATE_PRICES = `
	mutation Mutation($priceObj: JSON) {
		createPrices(priceObj: $priceObj) {
			timestamp
		priceObj
		}
	}
`;

module.exports = UPDATE_PRICES;