const openQPolygonMainnetEnumerable = require("./constants/openq-polygon-mainnet-enumerable.json")

const fetchFirstTenPrices = () => {
	return new Promise(async (resolve, reject) => {
		const firstTen = openQPolygonMainnetEnumerable.slice(0, 11).map(elem => elem.address).concat('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270');
		const network = 'polygon-pos';
		const stringifiedTokens = firstTen.join(',');
		try {
			const firstTenPrices = await axios.get(`https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${stringifiedTokens}&vs_currencies=usd`);
			resolve(firstTenPrices);
		} catch (error) {
			reject(`Error fetching OpenQ Local Tokens: ${error}`,);
		}
	});
};

module.exports = fetchFirstTenPrices;