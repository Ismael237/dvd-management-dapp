import { create } from 'zustand';
import { Wallet } from '../entities/Wallet';
import { walletService } from '@/core/infrastructure/blockchain/wallet.service';
import { executeWithErrorHandling, KnownError } from '@utils/error';
import { persist } from 'zustand/middleware';

export type AuthStateType = {
    data: Wallet | null;
    loading: boolean;
    error: KnownError | null;
};

type WalletStoreType = AuthStateType & {
    connect: (w: string) => Promise<Wallet | KnownError>;
    disconnect: () => Promise<void>;
};

const initialDataState: Wallet = {
    account: null,
    identifier: '',
    isOwner: false,
}

export const useWalletStore = create<WalletStoreType>()(
    persist(
        (set) => ({
            data: initialDataState,
            loading: false,
            error: null,
            connect: async (walletIdentifier: string) => {
                set({ loading: true });
                return executeWithErrorHandling<Wallet>(
                    () => walletService.connect(walletIdentifier),
                    (state) => set({ ...state })
                );
            },
            disconnect: async () => {
                await walletService.disconnect();
                set({ data: initialDataState });
            },
        }),
        {
            name: 'wallet',
            onRehydrateStorage: () => (state, error) => {
                if (!state) return;
                const { connect } = state;

                const { identifier } = state.data!;
                if (identifier === '') return;

                connect(identifier);

                if (error) {
                    console.log('an error happened during hydration', error)
                }
            },
        }
    )
);
