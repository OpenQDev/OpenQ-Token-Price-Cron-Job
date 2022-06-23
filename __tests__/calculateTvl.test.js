const calculateTvl = require('../src/calculateTvl');

describe('calculateTvl', () => {
	it('calculateTvl', () => {
		const bounty = {
			bountyTokenBalances: [
				{ tokenAddress: "", volume: 1000 },
				{ tokenAddress: "", volume: 1000 },
				{ tokenAddress: "", volume: 1000 },
			]
		};

		const priceData = { [wbtcAddress]: { usd: 1400.00 } };

		// ACT

		// ASSERT
		const expectedTvlBody = {

		};
		expect(tvl).toEqual(expectedTvlBody);
	});
});