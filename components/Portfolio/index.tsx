import { providers, Contract } from "ethers";
import { useEffect, useState } from "react";

const ADDRESS = "0x2DC7693444aCd1EcA1D6dE5B3d0d8584F3870c49";
const ABI = [
    "function findOptimalSwap(address tokenIn, address tokenOut, uint256 amountIn) external view override returns (tuple(uint256 name, uint256 amountOut, bytes32[] pools, uint256[] poolFees) quote)",
];

const BASE = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

const AURA = "0xC0c293ce456fF0ED870ADd98a0828Dd4d2903DBF";
const BADGER = "0x3472A5A71965499acd81997a54BBA8D852C6E53d";
const INV = "0x41D5D79431A913C4aE7d69a668ecdfE5fF9DFB68";
const EUL = "0xd9Fcd98c322942075A5C3860693e9f4f03AAE07b";

const ONE_ETH = "1000000000000000000";

const TOKENS = [AURA, BADGER, INV, EUL];

const Portfolio = ({ provider }): JSX.Element => {
    const contract = new Contract(ADDRESS, ABI, provider);

    const [prices, setPrices] = useState<number[]>([]);

    const getPrices = async (tokens: string[]): Promise<number[]> => {
        const res = await Promise.all(
            tokens.map(async (token) => {
                const value = await contract.findOptimalSwap(
                    token,
                    BASE,
                    ONE_ETH,
                );
                return value?.[1];
            }),
        );

        return res;
    };

    useEffect(() => {
        const doTheThing = async () => {
            const tempPrices = await getPrices(TOKENS);
            setPrices(tempPrices);
        };

        doTheThing();
    });

    return (
        <div>
            <h2>Portfolio</h2>

            {prices.map((price, index) => (
                <div>
                    <h2>Address: {TOKENS[index]}</h2>
                    <p>Price: {price.toString()}</p>
                </div>
            ))}
        </div>
    );
};

export default Portfolio;
