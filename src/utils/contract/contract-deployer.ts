import { ContractFactory, JsonRpcProvider, Wallet } from 'ethers';
import { readFileSync } from 'fs';
import { join } from 'path';

const root = import.meta.dirname;
const contractAbi = JSON.parse(readFileSync(join(root, 'contract.abi.json')).toString());
const contractByteCode = readFileSync(join(root, 'contract.bin')).toString();

const providerUrl = process.env.VITE_PROVIDER_URL;
const secretKey = process.env.SECRET_KEY;

const provider = new JsonRpcProvider(providerUrl);
const wallet = new Wallet(secretKey!, provider);
const account = wallet.connect(provider);

const factory = new ContractFactory(contractAbi, contractByteCode, account);

async function main() {
    try {
        const contract = await factory.deploy();

        console.log(await contract.getAddress());
    } catch (error) {
        console.error('Deployment failed:', error);
    }
}

main();