import React from "react";
import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";
import { gql } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";

export const AirdropPage = () => {
    const [reqData, setReqData] = useState({
        url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
        query: gql`
        query Uniswap($first: Int!) {
          users(orderBy: id, orderDirection: desc, first: $first) {
            id
          }
        }
        `,
        hint: "Airdrop to random 1000 Uniswap users"
    });
    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     document.querySelector('input').onchange((e) => {
        const handleChange = () => {
            const pattern = document.querySelector('input[name="user_base"]:checked').value;
        const amount = parseInt(document.querySelector('#airdrop_amount').value);

        if(pattern === "Uniswap") {
            setReqData({url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
                query: gql`
                    query Uniswap($first: Int!) {
                    users(orderBy: id, orderDirection: desc, first: $first) {
                        id
                    }
                    }
                `,
                hint: "Airdrop to "+amount+" Uniswap users"
            })
        } else if (pattern === "Bancor") {
            setReqData({url: "https://api.thegraph.com/subgraphs/name/blocklytics/bancor",
                query : gql`
                    query Bancor($first: Int!) {
                    users(where: { numSwaps_gt: 5 }, first: $first) {
                        id
                    }
                    }
                `,
                hint: "Airdrop to "+amount+" Bancor users who have performed at least 5 swaps"
            })
        } else if (pattern === "Compound") {
            setReqData({url: "https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2",
                query : gql`
                    query Compound($first: Int!) {
                        accountCTokens(where: { totalUnderlyingBorrowed_gt: 0 }, first: $first) {
                        account {
                            id
                        }
                        totalUnderlyingBorrowed
                        }
                    }
                `,
                hint: "Airdrop to "+amount+" Compound users who have a non-zero loan"
            });
        } else if (pattern === "Synthetix") {
            setReqData({url:  "https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix",
                query : gql`
                    query Synthetix($first: Int!) {
                    snxholders(where: { balanceOf_gt: 1 }, first: $first) {
                        id
                        balanceOf
                    }
                    }
                `,
                hint: "Airdrop to "+amount+" users who hold more than 1 SNX"
            })
        } else {
            setReqData({url: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer",
                query : gql`
                    query Balancer($first: Int!) {
                    users(orderBy: id, orderDirection: desc, first: $first) {
                        id
                    }
                    }
                `,
                hint: "Airdrop to "+amount+" Balancer users"
            })
        }
    }

    const handleSubmit = async () => {
        
        const client = new ApolloClient({
            uri: reqData.url,
            cache: new InMemoryCache(),
        });

        const amount = parseInt(document.querySelector('#airdrop_amount').value);

        const data = await client.query({query: reqData.query, variables: {first: amount}})
        console.log(data);

        // if(pattern === "Compound") {
        //     setUsers(data.accountCTokens.map((res) => res.account.id))
        // } else if (pattern === "Synthetix") {
        //     setUsers(data.snxholders.map((res) => res.id))
        // } else {
            // setUsers(data.users.map((res) => res.id))
        // }

        //ToDo: Call LaunchCoin.createAirdrop(tokenAddress, amount, users);
    }

    return (<>
    <form onChange={handleChange}>
            <p>Token to airdrop: Token List Tile</p>

            <br />
             <p>Amount</p>
            <input id="airdrop_amount" type={"number"} name="amount" />

            <br />
            <br />

            <p>User base for airdrop:</p>

            <input type="radio" id="uniswap" name="user_base" value="Uniswap"/>
            <label htmlFor="uniswap">Uniswap</label>
            <input type="radio" id="bancor" name="user_base" value="Bancor"/>
            <label htmlFor="bancor">Bancor</label>
            <input type="radio" id="compound" name="user_base" value="Compound"/>
            <label htmlFor="compound">Compound</label>
            <input type="radio" id="synthetix" name="user_base" value="Synthetix"/>
            <label htmlFor="synthetix">Synthetix</label>
            <input type="radio" id="balancer" name="user_base" value="Balancer"/>
            <label htmlFor="balancer">Balancer</label>

            <br />
            <br />
            <p>{reqData.hint}</p>
            <br />
            <br />

            <p onClick={handleSubmit}>Fetch users and create airdrop</p>
            </form>
    </>);
}