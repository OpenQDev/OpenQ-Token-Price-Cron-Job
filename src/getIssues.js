const axios = require("axios");
const { GET_CATEGORY } = require("./graphql/query.js");

const getIssues = async (bountyIds, startAt, skip) => {
  let result;
  const patsArray = process.env.PATS.split(",");
  const token = patsArray[Math.floor(Math.random() * patsArray.length)];
  const currentBountyIds = bountyIds.slice(startAt, startAt + skip);
  try {
    result = await axios.post(
      `https://api.github.com/graphql`,
      {
        query: GET_CATEGORY,
        variables: { bountyIds: currentBountyIds },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
if(result.data.errors){
  console.log(result.data.errors)
  throw new Error(result.data.errors[0].message);
}
    // remove all null values from result.data.data.nodes
    nonNullNodes = result.data.data.nodes.filter((node) => node !== null);
    const indexedIssues = {};
    nonNullNodes.forEach((node) => {
      indexedIssues[node.id] = {
        id: node.id,
        title: node.title,
        repositoryId: node.repository.id,
      };
    });
    return indexedIssues;
  } catch (error) {
    // GraphQL errors at error.response.data.errors
    console.error("error in getIssues", error);
  }
};

module.exports = getIssues;
