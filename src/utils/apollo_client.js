import { ApolloClient, ApolloLink } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";

const client = new ApolloClient({
  link: ApolloLink.from([
    new MultiAPILink({
      endpoints: {
        compound:
          "https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2",
        balancer:
          "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer",
        bancor: "https://api.thegraph.com/subgraphs/name/blocklytics/bancor",
        synthetix:
          "https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix",
        uniswap: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
      },
      createHttpLink: () => createHttpLink(),
    }),
  ]),
});

const UNISWAP_QUERY = `
{
    users(orderBy: id, orderDirection:desc, first: 1000) {
      id
    }
}
`;

const BALANCER_QUERY = `
{
    users(orderBy: id, orderDirection:desc, first: 1000) {
      id
    }
}
`;

const SYNTHETIX_QUERY = `
{
    snxholders(where: {balanceOf_gt: 1}, first:1000) {
      id
      balanceOf
    }
}
`;

const BANCOR_QUERY = `
{
    users(where: {numSwaps_gt:5}, first:1000) {
      id
    }
  }
`;

const COMPOUND_QUERY = `
{
    accountCTokens(where: {totalUnderlyingBorrowed_gt: 0}, first: 1000){
      account{
        id
      }
      totalUnderlyingBorrowed
    }
}
`;
