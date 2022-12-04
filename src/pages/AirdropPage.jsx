import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
import { useWeb3 } from "../store/web3_store";
import { InputField } from "../components/InputField";

export const AirdropPage = () => {
  const createAirdrop = useWeb3((state) => state.createAirdrop);
  const [reqData, setReqData] = useState({
    url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    query: gql`
      query Uniswap($first: Int!) {
        users(orderBy: id, orderDirection: desc, first: $first) {
          id
        }
      }
    `,
    hint: "Airdrop to random 1000 Uniswap users",
  });
  const [users, setUsers] = useState([]);

  const [amount, setamount] = useState(100);

  // useEffect(() => {
  //     document.querySelector('input').onchange((e) => {
  const handleChange = () => {
    const pattern = document.querySelector(
      'input[name="user_base"]:checked'
    ).value;

    if (pattern === "Uniswap") {
      setReqData({
        url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
        query: gql`
          query Uniswap($first: Int!) {
            users(orderBy: id, orderDirection: desc, first: $first) {
              id
            }
          }
        `,
        hint: "Airdrop to " + amount + " Uniswap users",
      });
    } else if (pattern === "Bancor") {
      setReqData({
        url: "https://api.thegraph.com/subgraphs/name/blocklytics/bancor",
        query: gql`
          query Bancor($first: Int!) {
            users(where: { numSwaps_gt: 5 }, first: $first) {
              id
            }
          }
        `,
        hint:
          "Airdrop to " +
          amount +
          " Bancor users who have performed at least 5 swaps",
      });
    } else if (pattern === "Compound") {
      setReqData({
        url: "https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2",
        query: gql`
          query Compound($first: Int!) {
            accountCTokens(
              where: { totalUnderlyingBorrowed_gt: 0 }
              first: $first
            ) {
              account {
                id
              }
              totalUnderlyingBorrowed
            }
          }
        `,
        hint:
          "Airdrop to " + amount + " Compound users who have a non-zero loan",
      });
    } else if (pattern === "Synthetix") {
      setReqData({
        url: "https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix",
        query: gql`
          query Synthetix($first: Int!) {
            snxholders(where: { balanceOf_gt: 1 }, first: $first) {
              id
              balanceOf
            }
          }
        `,
        hint: "Airdrop to " + amount + " users who hold more than 1 SNX",
      });
    } else {
      setReqData({
        url: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer",
        query: gql`
          query Balancer($first: Int!) {
            users(orderBy: id, orderDirection: desc, first: $first) {
              id
            }
          }
        `,
        hint: "Airdrop to " + amount + " Balancer users",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const client = new ApolloClient({
      uri: reqData.url,
      cache: new InMemoryCache(),
    });

    const data = await client.query({
      query: reqData.query,
      variables: { first: parseInt(amount) },
    });

    const pattern = document.querySelector(
      'input[name="user_base"]:checked'
    ).value;

    let users = [];

    if (pattern === "Compound") {
      users = data.data.accountCTokens.map((res) => res.account.id);
    } else if (pattern === "Synthetix") {
      users = data.data.snxholders.map((res) => res.id);
    } else {
      users = data.data.users.map((res) => res.id);
    }

    setUsers(users);

    console.log("users: ", users);

    await createAirdrop(amount, users);
  };

  const tokenInfo = useWeb3((state) => state.tokenInfo);

  if (!tokenInfo) return <div>Loading</div>;

  return (
    <div className="px-40 py-4">
      <div className="grid-center mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 self-center">
            <div className="rounded-full w-16 h-16 bg-gray-200">
              <img src={tokenInfo.image} />
            </div>
            <div className="space-y-1 text-left">
              <h1 className="uppercased">{tokenInfo.symbol}</h1>

              <h6 className="text-xs ">{tokenInfo.name}</h6>
            </div>
          </div>
        </div>
      </div>

      <form onChange={handleChange}>
        <p className="text-2xl tracking-wide">
          Token to airdrop {tokenInfo.symbol}{" "}
        </p>

        <br />
        <p className="my-2 font-medium">Amount</p>

        <input
          className="bg-gray-100 w-full mx-auto max-w-sm text-sm rounded-lg block p-2"
          type="number"
          placeholder={"Amount"}
          value={amount}
          onChange={(e) => setamount(e.target.value)}
        />

        <br />

        <p className="font-bold my-4 tracking-wide">
          Select User base for airdrop
        </p>

        <div className="space-x-2">
          <input type="radio" id="uniswap" name="user_base" value="Uniswap" />
          <label htmlFor="uniswap">Uniswap</label>
          <input type="radio" id="bancor" name="user_base" value="Bancor" />
          <label htmlFor="bancor">Bancor</label>
          <input type="radio" id="compound" name="user_base" value="Compound" />
          <label htmlFor="compound">Compound</label>
          <input
            type="radio"
            id="synthetix"
            name="user_base"
            value="Synthetix"
          />
          <label htmlFor="synthetix">Synthetix</label>
          <input type="radio" id="balancer" name="user_base" value="Balancer" />
          <label htmlFor="balancer">Balancer</label>
        </div>
        <br />
        <p className="font-medium tracking-wide my-4">{reqData.hint}</p>
        <br />
        <button onClick={handleSubmit} className="primary-btn">
          Fetch users and create airdrop
        </button>
      </form>
    </div>
  );
};

