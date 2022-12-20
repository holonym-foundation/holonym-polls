import { ethers } from "ethers";

const provider = new ethers.providers.AlchemyProvider(
  process.env.NODE_ENV == "development" ? "optimism-goerli" : "optimism",
  process.env.ALCHEMY_API_KEY
);

export { provider };
