const openQPolygonMainnetEnumerable = require("./constants/openq-polygon-mainnet-enumerable.json");
const axios = require("axios");

const fetchFirstTenPrices = () => {
	return new Promise(async (resolve, reject) => {
		const firstTen = openQPolygonMainnetEnumerable.slice(0, 11).map(elem => elem.address).concat('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270');
		const network = 'polygon-pos';
		const stringifiedTokens = firstTen.join(',');
		try {
			let url = `https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${stringifiedTokens}&vs_currencies=usd`;
			
			if (process.env.COINGECK_API_KEY) {
				url = `https://pro-api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${stringifiedTokens}&vs_currencies=usd&x_cg_pro_api_key=${process.env.COINGECK_API_KEY}`;
			}

			const {data} = await axios.get(url);
			resolve(
				{ ...data, '0x2791bca1f2de4661ed88a30c99a7a9449aa84174': { usd: 1 }, "0xc2132D05D31c914a87C6611C10748AEb04B58e8F": { usd: 1 } });
	
		} catch (error) {
			reject(`Error fetching OpenQ Local Tokens: ${error}`,);
		}
	});
};

module.exports = fetchFirstTenPrices;