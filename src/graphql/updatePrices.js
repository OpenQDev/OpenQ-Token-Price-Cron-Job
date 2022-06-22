const { gql } = require('@apollo/client');

const UPDATE_PRICES = gql`
	mutation Mutation($priceObj: JSON) {
  updatePrices(priceObj: $priceObj) {
    count
  }
}
`;
module.exports = UPDATE_PRICES;
