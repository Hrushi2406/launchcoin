import { ethers } from "ethers";
import { supportedNetworks } from "./network_config";

const infinity = 115792089237316195423570985008687907853269984665640564039457584007913129639935;

const formatAddress = (address) => {
  return address === undefined
    ? ""
    : address.substring(0, 4) + "...." + address.slice(-4);
};

const formatBigNum = (num) => ethers.utils.formatEther(num);

const contractAddress = supportedNetworks[1313161555].address;

const copyToClipboard = (address) => {
  navigator.clipboard.writeText(address);
};

export {
  formatBigNum,
  formatAddress,
  contractAddress,
  copyToClipboard,
  infinity,
};
