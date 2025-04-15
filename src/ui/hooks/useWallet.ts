import { useWalletStore } from "@core/domain/usecases/wallet.usecase";

export const useWallet = () => {
    const { data, loading, error, connect, disconnect } = useWalletStore();

    function isOwner() {
        return data?.isOwner ?? false;
    }

    function isLoggedIn() {
        return data && data?.account !== null;
    }

    function getAccount() {
        return data?.account ?? null;
    }

    return { data, loading, error, connect, disconnect, isOwner, getAccount, isLoggedIn };
};
