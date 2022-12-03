// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import {DataTypes} from "./utils/DataTypes.sol";

/**
 * @title CustomERC20 contract
 * @author Sumit Mahajan
 * @dev Creates CustomERC20 logic for LaunchCoinApp
 **/
contract CustomERC20 is ERC20, ReentrancyGuard {
    address owner;
    uint initialSupply;
    uint maxSupply =
        0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    bool isMintAllowed;
    bool isBurnAllowed;
    DataTypes.TaxVars taxVars;

    constructor(
        string memory _name,
        string memory _symbol,
        uint _initialSupply,
        uint _maxSupply,
        bool _isMintAllowed,
        bool _isBurnAllowed,
        DataTypes.TaxVars memory _taxVars,
        address _owner
    ) ERC20(_name, _symbol) {
        require(
            _maxSupply >= _initialSupply,
            "MAX_SUPPLY_LESS_THAN_INIT_SUPPLY"
        );

        initialSupply = _initialSupply;
        maxSupply = _maxSupply;
        isMintAllowed = _isMintAllowed;
        isBurnAllowed = _isBurnAllowed;
        taxVars = _taxVars;

        owner = _owner;

        _mint(_owner, _initialSupply);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "CALLER_NOT_OWNER");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(isMintAllowed, "MINT_NOT_ALLOWED");
        require(
            totalSupply() + amount <= maxSupply,
            "MINT_EXCEEDS_MAX_SUUPPLY"
        );

        _mint(to, amount);
    }

    function burn(uint256 amount) public virtual {
        require(isBurnAllowed, "BURN_NOT_ALLOWED");

        _burn(_msgSender(), amount);
    }

    function burnFrom(address account, uint256 amount) public virtual {
        require(isBurnAllowed, "BURN_NOT_ALLOWED");

        _spendAllowance(account, _msgSender(), amount);
        _burn(account, amount);
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20) nonReentrant {
        if (!taxVars.isTaxed) {
            super._transfer(from, to, amount);
        } else {
            require(
                balanceOf(from) >=
                    amount + (amount * taxVars.taxPercentage) / 10000,
                "Error: transfer amount exceeds balance"
            );

            if (taxVars.shouldBurnTax) {
                _burn(from, (amount * taxVars.taxPercentage) / 10000);
                super._transfer(from, to, amount);
            } else {
                super._transfer(
                    from,
                    address(this),
                    (amount * taxVars.taxPercentage) / 10000
                );
                super._transfer(from, to, amount);
            }
        }
    }
}
