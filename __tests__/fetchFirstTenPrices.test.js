const axios = require("axios");

const fetchFirstTenPrices = require('../src/fetchFirstTenPrices');
const expectedData = {
	'0x8f3cf7ad23cd3cadbd9735aff958023239c6a063': { usd: 0.999611 },
	'0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6': { usd: 20560 },
	'0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3': { usd: 4.71 },
	'0xda537104d6a5edd53c6fbba9a898708e465260b6': { usd: 5140.4 },
	'0xb33eaad8d922b1083446dc23f610c2567fb5180f': { usd: 5.52 },
	'0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c': { usd: 42.2 },
	'0xc2132d05d31c914a87c6611c10748aeb04b58e8f': { usd: 0.999909 },
	'0x2791bca1f2de4661ed88a30c99a7a9449aa84174': { usd: 1.001 },
	'0x7ceb23fd6bc0add59e62ac25578270cff1b9f619': { usd: 1117.53 },
	'0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270': { usd: 0.511388 }
};

describe('fetchFirstTenPrices', () => {
	beforeEach(() => {
		jest.mock('axios');
		axios.get = jest.fn().mockResolvedValue({ data: { data: expectedData } });
	});

	it('fetchFirstTenPrices', async () => {
		const result = await fetchFirstTenPrices();
		expect(result.data).toEqual(expectedData);
	});
});