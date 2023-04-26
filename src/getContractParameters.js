const getBudgetTokenBalance = require("./utils/getBudgetTokenBalance");
const calculateTvl = require("./calculateTvl");
const calculateBudget = require("./calculateBudget");
const getIssues = require("./getIssues");
const getTokenMetadata = require("./utils/getTokenMetadata");

/**
 *
 * @param {Array of bounties} bounties
 * @param {Array of token addresses used to fund any bounty} pricingMetadata
 * @returns
 * @devnote Coingecko returns address-indexed prices using lower-case addresses
 * @description Returns the formatted parameters for updating TVL and category for each bounty in the OpenQ-API
 */
const getContractParameters = async (
  bounties,
  pricingMetadata,
  data,
  environment
) => {
  const tokenMetadata = getTokenMetadata(environment);
  const bountyIds = bounties.map((bounty) => {
    return bounty.bountyId;
  });

  const startAt = 0;

  const skip = 100;
  const recursivelyGetIssues = async (
    startAt,
    skip,
    previouslyFetchedIssues
  ) => {
    const issues = await getIssues(bountyIds, startAt, skip);

    const newIssues = { ...previouslyFetchedIssues, ...issues };
    if (issues.length === 100) {
      return await recursivelyGetIssues(startAt + skip, skip, newIssues);
    }
    return newIssues;
  };
  const newIssues = await recursivelyGetIssues(startAt, skip, []);

  //filters for closed
  const tvls = bounties.map((bounty) => {
    const tvl = calculateTvl(bounty, tokenMetadata, data);


    const budget = calculateBudget(bounty, tokenMetadata, data);
    console.log(budget, "budget")
    
    const labels = newIssues[bounty.bountyId].labels;
    const title = newIssues[bounty.bountyId].title;
    const repositoryId = newIssues[bounty.bountyId].repositoryId;
    return {
      budget,
      address: bounty.bountyAddress,
      bountyId: bounty.bountyId,
      type: bounty.bountyType,
      bountyMintTime: bounty.bountyMintTime,
      externalUserId: bounty.externalUserId,
      payoutSchedule: bounty.payoutSchedule,
      fundingGoalVolume: bounty.fundingGoalVolume,
      payoutTokenAddress: bounty.payoutTokenAddress,
      fundingGoalTokenAddress: bounty.fundingGoalTokenAddress,
      tvl,
      labels,
      title,
      organizationId: bounty.organization.id,
      repositoryId,
    };
  });
  return tvls;
};

module.exports = getContractParameters;
