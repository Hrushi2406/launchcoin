// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library DataTypes {
    struct TaxVars {
        bool isTaxed;
        uint taxPercentage;
        bool shouldBurnTax;
    }

    struct TokenInfo {
        string image;
        string name;
        string symbol;
        address contractAddress;
    }

    struct PoolInfo {
        address tokenAddress;
        address poolContractAddress;
        address pairTokenAddress;
    }

    struct AirdropInfo {
        address tokenAddress;
        uint amount;
        uint timestamp;
        address[] recieverAddresses;
    }
}
