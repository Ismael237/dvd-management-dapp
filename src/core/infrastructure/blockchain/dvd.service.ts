import { DVD } from "@core/domain/entities/DVD";
import { BaseContract, BigNumberish, JsonRpcProvider, JsonRpcSigner, parseEther, TransactionResponse } from "ethers";
import abi from "@utils/contract/contract.abi.json";

export interface RawDVD extends Omit<DVD, "statut"> {
    statut: 0 | 1;
}

interface IDvdManagement extends BaseContract {
    getOwnerAddress(): Promise<string>;
    addDvD(title: string, numCopy: number, price: bigint): Promise<TransactionResponse>;
    deleteDvD(id: number): Promise<TransactionResponse>;
    updateDvD(id: number, title: string, numCopy: number): Promise<TransactionResponse>;
    getAllDvD(): Promise<RawDVD[]>;
    buyDvd(id: number, options?: { value: BigNumberish }): Promise<TransactionResponse>;
}


export class DvdService {
    private contract: IDvdManagement;
    private provider: JsonRpcProvider;

    constructor(
        contractAddress: string,
        providerUrl: string,
    ) {
        this.provider = new JsonRpcProvider(providerUrl);
        this.contract = new BaseContract(
            contractAddress,
            this.getAbi(),
            this.provider,
        ) as IDvdManagement;
    }

    async setSigner(signer: JsonRpcSigner) {
        this.contract = this.contract.connect(signer) as IDvdManagement;
    }

    private getAbi() {
        return abi;
    }

    async getAllDvd(): Promise<DVD[]> {
        const rawDvds = await this.contract.getAllDvD();

        return rawDvds.map((dvd: RawDVD) => ({
            d_id: dvd.d_id,
            d_title: dvd.d_title,
            numCopy: dvd.numCopy,
            statut: Number(dvd.statut) === 0 ? "available" : "sold",
            currentOwner: dvd.currentOwner,
            price: dvd.price.toString(),
        }));
    }

    async addDvd(
        title: string,
        numCopy: number,
        price: number
    ): Promise<boolean> {
        const parsedPrice = parseEther(price.toString());
        const tx = await this.contract.addDvD(title, numCopy, parsedPrice);
        await tx.wait();
        return true;
    }

    async updateDvd(
        id: number,
        title: string,
        numCopy: number
    ): Promise<boolean> {
        const tx = await this.contract.updateDvD(id, title, numCopy);
        await tx.wait();
        return true;
    }

    async deleteDvd(id: number): Promise<boolean> {
        const tx = await this.contract.deleteDvD(id);
        await tx.wait();
        return true;
    }

    async buyDvd(
        id: number,
        price: string
    ): Promise<boolean> {
        const tx = await this.contract.buyDvd(id, {
            value: price,
        });
        await tx.wait();
        return true;
    }

    async getOwnerAddress(): Promise<string> {
        return await this.contract.getOwnerAddress();
    }
}


const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const PROVIDER_URL = import.meta.env.VITE_PROVIDER_URL;

export const dvdService = new DvdService(CONTRACT_ADDRESS, PROVIDER_URL);
