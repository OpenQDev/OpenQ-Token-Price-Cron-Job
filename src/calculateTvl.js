const calculateTvl = (bounty, tokenMetadata) => {
	return bounty.bountyTokenBalances.reduce((runningTotal, tokenBalance) => {
		return addTokenBalanceToTotal(runningTotal, tokenBalance, tokenMetadata);
	}, [0]);
};

module.exports = calculateTvl;