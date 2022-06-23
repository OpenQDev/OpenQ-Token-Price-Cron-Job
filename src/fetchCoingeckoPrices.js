const axios = require('axios');

const fetchCoingeckoPrices = async (pricingMetadata) => {
	const network = 'polygon-pos';
	const commaDelimitedTokenAddresses = pricingMetadata.map((metadata) => metadata.address).join(',');
	const url = `https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${commaDelimitedTokenAddresses}&vs_currencies=usd`;
	const { data } = await axios.get(url);
	return data;
};

module.exports = fetchCoingeckoPrices;