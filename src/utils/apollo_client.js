import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link";
import { gql } from "@apollo/client";

// import { createHttpLink } from "apollo-link-http";

// export const client = new ApolloClient({
//   link: ApolloLink.from([
//     new MultiAPILink({
//       endpoints: {
//         compound:
//           "https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2",
//         balancer:
//           "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer",
//         bancor: "https://api.thegraph.com/subgraphs/name/blocklytics/bancor",
//         synthetix:
//           "https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix",
//         uniswap: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
//       },
//       createHttpLink: () => createHttpLink(),
//     }),
//   ]),
//   cache: InMemoryCache(),
// });

export const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  cache: new InMemoryCache(),
});

// const { loading, error, data } = useQuery(UNISWAP_QUERY,{variables: {first: 1000}});

// console.log(data.users.map((res) => res.id));

const UNISWAP_QUERY = gql`
  query Uniswap($first: Int!) {
    users(orderBy: id, orderDirection: desc, first: $first) {
      id
    }
  }
`;

const BALANCER_QUERY = gql`
  query Balancer($first: Int!) {
    users(orderBy: id, orderDirection: desc, first: $first) {
      id
    }
  }
`;

const SYNTHETIX_QUERY = gql`
  query Synthetix($first: Int!) {
    snxholders(where: { balanceOf_gt: 1 }, first: $first) {
      id
      balanceOf
    }
  }
`;

const BANCOR_QUERY = gql`
  query Bancor($first: Int!) {
    users(where: { numSwaps_gt: 5 }, first: $first) {
      id
    }
  }
`;

const COMPOUND_QUERY = gql`
  query Compound($first: Int!) {
    accountCTokens(where: { totalUnderlyingBorrowed_gt: 0 }, first: $first) {
      account {
        id
      }
      totalUnderlyingBorrowed
    }
  }
`;
