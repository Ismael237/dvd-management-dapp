import { WalletConnectPrompt } from "../wallet-connect-prompt";
import { useWallet } from "@hooks/useWallet";
import { WalletConnectedButton } from "../wallet-connected-button";

export function WalletConnectionHandler() {
    const { isLoggedIn } = useWallet();

    return (
        <>
            {isLoggedIn() ? (
                <WalletConnectedButton />
            ) : (
                <WalletConnectPrompt />
            )}
        </>
    )
}
