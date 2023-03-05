const axios = require('axios');

const fetchCoingeckoPrices = async (pricingMetadata) => {
	const network = 'polygon-pos';
	const commaDelimitedTokenAddresses = pricingMetadata.map((metadata) => metadata.address).join(',');
	
	let url = `https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${commaDelimitedTokenAddresses}&vs_currencies=usd`;
  if (process.env.COINGECK_API_KEY) {
    url = `${url}&x_cg_pro_api_key=${process.env.COINGECK_API_KEY}`;
  }

	const { data } = await axios.get(url);
	return data;
};

module.exports = fetchCoingeckoPrices;