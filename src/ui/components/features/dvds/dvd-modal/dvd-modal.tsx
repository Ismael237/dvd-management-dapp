import { CloseButton, Dialog, Portal } from "@chakra-ui/react";

export function DvdModal({
    body,
    isOpen,
    onClose,
}: {
    body: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <Dialog.Root
            closeOnInteractOutside={false}
            size="xs" lazyMount
            open={isOpen}
            onOpenChange={onClose}
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Body>
                            {body}
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}