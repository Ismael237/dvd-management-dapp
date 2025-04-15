import { Dialog, Portal, CloseButton } from "@chakra-ui/react"
import { WalletList } from "../wallet-list";

export type WalletDialogProps = {
    isOpen: boolean,
    onClose: () => void,
}

export function WalletDialog({
    isOpen,
    onClose,
}: WalletDialogProps) {
    return (
        <Dialog.Root
            lazyMount
            open={isOpen}
            onOpenChange={onClose}
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Connect Wallet</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <WalletList />
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root >
    )
}