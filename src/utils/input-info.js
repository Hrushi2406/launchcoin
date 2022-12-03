export const inputInfo = {
  name: {
    label: "Name",
    tooltip: "Name of your project",
    placeholder: "Project Name",
    type: "text",
  },

  symbol: {
    label: "Symbol",
    tooltip: "Your token will be called as (at least 3 letters required)",
    placeholder: "Coin Symbol",
    type: "text",
  },

  initialSupply: {
    label: "Initial Supply",
    tooltip: "Amount of tokens you want to mint at the time of creation",
    placeholder: "Initial Supply",
    type: "number",
  },

  canMint: {
    label: "Can Mint",
    tooltip: "Tick If you want to mint tokens in future",
    placeholder: "Can Mint",
    type: "checkbox",
  },

  canBurn: {
    label: "Can Burned",
    tooltip:
      "Should burn the token. Token can be burned by anyone who has token",
    placeholder: "Can Burned",
    type: "checkbox",
  },

  maxSupply: {
    label: "Max Supply",
    tooltip: "Total supply of coin",
    placeholder: "Maximum Supply",
    type: "number",
  },

  isTaxable: {
    label: "Should be Taxable",
    tooltip:
      "Percentage of token on transaction will be either burned or will fund treasury ",
    placeholder: "Is Taxable",
    type: "checkbox",
  },

  burned: {
    label: "Burned",
    tooltip:
      "The tax amount will be burned automatically after each transaction",
    placeholder: "Burned",
    type: "radio",
  },

  treasury: {
    label: "Treasury",
    tooltip:
      "The tax amount will be added to treasury automatically after each transaction",
    placeholder: "Treasury",
    type: "radio",
  },

  taxFeePer: {
    label: "Taxiation Fee (in %)",
    tooltip:
      "Percentage of token on transaction will be either burned or will fund treasury ",
    placeholder: "0.0001 ",
    type: "number",
  },
};
