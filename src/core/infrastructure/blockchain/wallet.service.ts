import { Wallet } from '@core/domain/entities/Wallet';
import { BrowserProvider, Eip1193Provider, JsonRpcSigner } from 'ethers';
import { dvdService } from './dvd.service';
import { BigNumberish } from 'ethers';

export class WalletService {
    private provider: BrowserProvider | null = null;
    private signer: JsonRpcSigner | null = null;
        
    checkWallet(wallet: string): boolean {
        if (wallet  == 'metamask' && 'ethereum' in window) {
            return true;
        }
        return false;
    }

    getProvider(wallet: string): Eip1193Provider | undefined {
        if (wallet  == 'metamask' && 'ethereum' in window) {
            const provider = window.ethereum;
            if (provider) {
                return provider;
            }
        }
        return undefined;
    }
    
    getSigner(): JsonRpcSigner | null {
        if (!this.signer) throw new Error("Ethereum signer not available");
        return this.signer;
    }

    async getBalance(address: string): Promise<BigNumberish> {
        if (!this.provider) throw new Error("Ethereum provider not available");
        return await this.provider.getBalance(address);
    }

    async connect(walletIdentifier: string): Promise<Wallet> {
        const provider = this.getProvider(walletIdentifier);
        
        if (provider) {
            this.provider = new BrowserProvider(provider);
            if (!this.provider) throw new Error("Ethereum provider not available");
            this.signer = await this.provider.getSigner();
            await dvdService.setSigner(this.signer);
            const walletAddress = await this.signer.getAddress();
            const contractOwner = await dvdService.getOwnerAddress();
            return {
                account: walletAddress,
                identifier: walletIdentifier,
                isOwner: walletAddress === contractOwner,
            };
        } else {
            throw new Error("No Ethereum provider detected.");
        }
    }

    async disconnect(): Promise<void> {
        this.signer = null;
    }
}

export const walletService = new WalletService();