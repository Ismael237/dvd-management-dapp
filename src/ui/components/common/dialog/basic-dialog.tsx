import { Dialog, Button, Portal, CloseButton } from "@chakra-ui/react"
import { ReactNode } from "react";

export type BasicDialogProps = {
    title: string,
    body: ReactNode,
    cancelText: string,
    confirmText: string,
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
}

export function BasicDialog({
    body,
    cancelText,
    confirmText,
    isOpen,
    onClose,
    onConfirm,
    title
}: BasicDialogProps) {
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
                            <Dialog.Title>{title}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {body}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">{cancelText}</Button>
                            </Dialog.ActionTrigger>
                            <Button colorPalette="red" onClick={onConfirm}>{confirmText}</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root >
    )
}