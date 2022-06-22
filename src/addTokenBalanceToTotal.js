const polygonMetadata = require("./constants/polygon-mainnet-indexable.json");

const addTokenBalanceToTotal = (runningTotal, tokenBalance, tokenMetadata) => {
	const checksummedTokenAddress = getAddress(tokenBalance.tokenAddress);
	const lowerCaseTokenAddress = tokenBalance.tokenAddress.toLowerCase();
	if (!runningTotal) { return tokenBalance; }
	const currentMetadata = tokenMetadata[checksummedTokenAddress] || polygonMetadata[lowerCaseTokenAddress];
	const multiplier = tokenBalance.volume / 10 ** currentMetadata.decimals;
	const price = data[currentMetadata.address.toLowerCase()] || 0;
	const newTotal = price.usd * multiplier + parseFloat(runningTotal);
	return newTotal;
};

module.exports = addTokenBalanceToTotal;