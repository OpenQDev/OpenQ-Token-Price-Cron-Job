const axios = require('axios');

const fetchCoingeckoPrices = async (pricingMetadata) => {
	const network = 'polygon-pos';
	const commaDelimitedTokenAddresses = pricingMetadata.map((metadata) => metadata.address).join(',');
	
	let url = `https://pro-api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${commaDelimitedTokenAddresses}&vs_currencies=usd`;
  if (process.env.COINGECK_API_KEY) {
    url = `${url}&x_cg_pro_api_key=${process.env.COINGECK_API_KEY}`;
  }

	const { data } = await axios.get(url);
	return  { ...data, '0x2791bca1f2de4661ed88a30c99a7a9449aa84174': { usd: 1 }, "0xc2132D05D31c914a87C6611C10748AEb04B58e8F": { usd: 1 } };
};

module.exports = fetchCoingeckoPrices;