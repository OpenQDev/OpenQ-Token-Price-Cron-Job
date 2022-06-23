const addTokenBalanceToTotal = require('../src/addTokenBalanceToTotal');
const polygonMetadata = require('../src/constants/polygon-mainnet-indexable.json');

describe('addTokenBalanceToTotal', () => {
	it('addTokenBalanceToTotal', () => {
		// ARRANGE
		const wbtcAddress = '0x652e36ecfa0e4f7e435f6d38688d68a3be65639c';
		const runningTotal = 12.5;
		const tokenBalance = { tokenAddress: wbtcAddress, volume: 100000000 };
		const priceData = { [wbtcAddress]: { usd: 1400.00 } };

		// ACT
		const newTotal = addTokenBalanceToTotal(runningTotal, tokenBalance, polygonMetadata, priceData);

		// ASSERT
		expect(newTotal).toBe(1412.5);
	});
});