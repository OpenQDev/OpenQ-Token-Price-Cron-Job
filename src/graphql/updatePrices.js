const UPDATE_PRICES = `
	mutation Mutation($priceObj: JSON) {
		updatePrices(priceObj: $priceObj) {
			count
		}
	}
`;

module.exports = UPDATE_PRICES;
