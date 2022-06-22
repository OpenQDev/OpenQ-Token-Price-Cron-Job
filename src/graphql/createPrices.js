const { gql } = require('@apollo/client');

const UPDATE_PRICES = gql`
	mutation Mutation($priceObj: JSON) {
  createPrices(priceObj: $priceObj) {
    timestamp
	priceObj
  }
}
`;
module.exports = UPDATE_PRICES;
