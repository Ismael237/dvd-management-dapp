import { Button } from "@components/chakra/button";
import { WalletDialog } from "../wallet-dialog";
import { useDisclosure } from "@chakra-ui/react";
import { useWallet } from "@hooks/useWallet";
import { LuWallet } from "react-icons/lu";

export function WalletConnectPrompt() {
    const { loading } = useWallet();
    const {
        open: isWalletDialogOpen,
        onOpen: onOpenWalletDialog,
        onClose: onCloseWalletDialog,
    } = useDisclosure();
    const handleConnectWallet = async () => {
        onOpenWalletDialog();
    }
    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={handleConnectWallet}
                loading={loading}
                loadingText="Connecting..."
            >
                <LuWallet />Connect Wallet
            </Button>
            <WalletDialog
                isOpen={isWalletDialogOpen}
                onClose={onCloseWalletDialog}
            />
        </>
    )
}
