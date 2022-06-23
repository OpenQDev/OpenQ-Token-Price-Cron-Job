const calculateTvl = require('../src/calculateTvl');

describe('calculateTvl', () => {
	it('calculateTvl', () => {
		const wbtcAddress = "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6";
		const bounty = {
			bountyTokenBalances: [
				{ tokenAddress: wbtcAddress, volume: 1000 },
				{ tokenAddress: wbtcAddress, volume: 1000 },
				{ tokenAddress: wbtcAddress, volume: 1000 },
			]
		};

		const priceData = { [wbtcAddress.toLowerCase()]: { usd: 1400.00 } };
		const pricingMetadata = { [wbtcAddress]: { address: wbtcAddress, decimals: 8 } };
		const expectedTvl = 0.042;

		// ACT
		const tvl = calculateTvl(bounty, pricingMetadata, priceData);
		// ASSERT
		expect(tvl).toEqual(expectedTvl);
	});
});