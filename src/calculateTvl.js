const addTokenBalanceToTotal = require('./addTokenBalanceToTotal');

const calculateTvl = (bounty, tokenMetadata, priceData) => {
	return bounty.bountyTokenBalances.reduce((runningTotal, tokenBalance) => {
		return addTokenBalanceToTotal(runningTotal, tokenBalance, tokenMetadata, priceData);
	}, 0);
};

module.exports = calculateTvl;