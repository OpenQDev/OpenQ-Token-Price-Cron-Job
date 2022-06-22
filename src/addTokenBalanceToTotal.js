const polygonMetadata = require("./constants/polygon-mainnet-indexable.json");
const { getAddress } = require('@ethersproject/address');

const addTokenBalanceToTotal = (runningTotal, tokenBalance, tokenMetadata, priceData) => {
	const checksummedTokenAddress = getAddress(tokenBalance.tokenAddress);
	const lowerCaseTokenAddress = tokenBalance.tokenAddress.toLowerCase();
	if (!runningTotal) { return tokenBalance; }
	const currentMetadata = tokenMetadata[checksummedTokenAddress] || polygonMetadata[checksummedTokenAddress];
	const multiplier = tokenBalance.volume / 10 ** currentMetadata.decimals;
	const price = priceData[currentMetadata.address.toLowerCase()] || 0;
	const newTotal = price.usd * multiplier + parseFloat(runningTotal);
	return newTotal;
};

module.exports = addTokenBalanceToTotal;