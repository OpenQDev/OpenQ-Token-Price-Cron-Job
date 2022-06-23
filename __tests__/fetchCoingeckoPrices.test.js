const fetchCoingeckoPrices = require('../src/fetchCoingeckoPrices');
const axios = require("axios");

describe('fetchCoingeckoPrices', () => {
	const wbtcAddress = "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6";
	const pricingMetadata = [{ [wbtcAddress]: { address: wbtcAddress, decimals: 8 } }];
	const data = { "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6": { "usd": 20650 } };

	beforeEach(() => {
		jest.mock('axios');
		axios.get = jest.fn().mockResolvedValue({ data });
	});

	it('fetchCoingeckoPrices', async () => {
		const prices = await fetchCoingeckoPrices(pricingMetadata);
		expect(prices).toEqual(data);
	});

});