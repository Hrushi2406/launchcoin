// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import {DataTypes} from "./utils/DataTypes.sol";
import {IPUSHCommInterface} from "./utils/IPUSHCommInterface.sol";
import {IUniswapV3Factory} from "./utils/IUniswapV3Factory.sol";
import {CustomERC20} from "./CustomERC20.sol";

/**
 * @title LaunchTokenApp contract
 * @author Sumit Mahajan
 * @dev Primary contract for the LaunchTokenApp
 **/
contract LaunchCoinApp is ReentrancyGuard {
    using EnumerableSet for EnumerableSet.UintSet;

    address constant UNISWAP_V3_FACTORY =
        0x1F98431c8aD98523631AE4a59f267346ea31F984;

    uint currTokenId;
    uint currPoolId;
    uint currAirdropId;

    mapping(address => EnumerableSet.UintSet) creatorToTokenIds;
    mapping(address => EnumerableSet.UintSet) tokenToPoolIds;
    mapping(address => EnumerableSet.UintSet) tokenToAirdropIds;

    mapping(uint => DataTypes.TokenInfo) tokens;
    mapping(uint => DataTypes.PoolInfo) pools;
    mapping(uint => DataTypes.AirdropInfo) airdrops;

    function getAllTokensForUser(
        address user
    ) public view returns (DataTypes.TokenInfo[] memory) {
        DataTypes.TokenInfo[] memory userTokens = new DataTypes.TokenInfo[](
            creatorToTokenIds[user].length()
        );

        for (uint i = 0; i < creatorToTokenIds[user].length(); i++) {
            userTokens[i] = tokens[creatorToTokenIds[user].at(i)];
        }

        return userTokens;
    }

    function getAllAirdropsForToken(
        address tokenAddress
    ) public view returns (DataTypes.AirdropInfo[] memory) {
        DataTypes.AirdropInfo[] memory tokenDrops = new DataTypes.AirdropInfo[](
            tokenToAirdropIds[tokenAddress].length()
        );

        for (uint i = 0; i < tokenToAirdropIds[tokenAddress].length(); i++) {
            tokenDrops[i] = airdrops[tokenToAirdropIds[tokenAddress].at(i)];
        }

        return tokenDrops;
    }

    function getAllPoolsForToken(
        address tokenAddress
    ) public view returns (DataTypes.PoolInfo[] memory) {
        DataTypes.PoolInfo[] memory tokenPools = new DataTypes.PoolInfo[](
            tokenToPoolIds[tokenAddress].length()
        );

        for (uint i = 0; i < tokenToPoolIds[tokenAddress].length(); i++) {
            tokenPools[i] = pools[tokenToPoolIds[tokenAddress].at(i)];
        }

        return tokenPools;
    }

    function createToken(
        string memory _image,
        string memory _name,
        string memory _symbol,
        uint _initialSupply,
        uint _maxSupply,
        bool _isMintAllowed,
        bool _isBurnAllowed,
        DataTypes.TaxVars memory _taxVars
    ) external {
        address tokenAddress = address(
            new CustomERC20(
                _name,
                _symbol,
                _initialSupply,
                _maxSupply,
                _isMintAllowed,
                _isBurnAllowed,
                _taxVars,
                msg.sender
            )
        );

        creatorToTokenIds[msg.sender].add(++currTokenId);

        tokens[currTokenId] = DataTypes.TokenInfo(
            _image,
            _name,
            _symbol,
            tokenAddress
        );
    }

    function createAirdrop(
        address tokenAddress,
        uint amount,
        address[] memory users
    ) external {
        for (uint i = 0; i < users.length; i++) {
            CustomERC20(tokenAddress).transferFrom(
                msg.sender,
                users[i],
                amount / users.length
            );

            IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa)
                .sendNotification(
                    0x50BAfc326eb1B2DDf86f26fa9970049a46C033EF, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
                    users[i], // to recipient, put address(this) in case you want Broadcast or Subset. For Targetted put the address to which you want to send
                    bytes(
                        string(
                            // We are passing identity here: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                            abi.encodePacked(
                                "0", // this is notification identity: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                                "+", // segregator
                                "3", // this is payload type: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/payload (1, 3 or 4) = (Broadcast, targetted or subset)
                                "+", // segregator
                                "Received Airdrop!", // this is notificaiton title
                                "+", // segregator
                                "Congratulations you just received an airdrop from LaunchCoin" // notification body
                            )
                        )
                    )
                );
        }

        tokenToAirdropIds[tokenAddress].add(++currAirdropId);

        airdrops[currAirdropId] = DataTypes.AirdropInfo(
            tokenAddress,
            amount,
            block.timestamp,
            users
        );
    }

    function createPool(
        address tokenAddress,
        address pairTokenAddress
    ) external {
        address poolContractAddress = IUniswapV3Factory(UNISWAP_V3_FACTORY)
            .createPool(tokenAddress, pairTokenAddress, 500);

        tokenToPoolIds[tokenAddress].add(++currPoolId);

        pools[currPoolId] = DataTypes.PoolInfo(
            tokenAddress,
            poolContractAddress,
            pairTokenAddress
        );
    }
}
