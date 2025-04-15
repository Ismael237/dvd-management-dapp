import { useState, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { BasicDialog } from "./basic-dialog";
import type { BasicDialogProps } from "./basic-dialog";

export type ConfirmDialogParams = Omit<BasicDialogProps, 'isOpen' | 'onClose' | 'onConfirm'>;

const confirmAction = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    current: (_p: ConfirmDialogParams): Promise<boolean> => Promise.resolve(true),
};

// eslint-disable-next-line react-refresh/only-export-components
export function confirm(props: ConfirmDialogParams): Promise<boolean> {
    return confirmAction.current(props);
}

export function ConfirmDialogGlobal() {
    const { open, onOpen, onClose } = useDisclosure();
    const [dialogProps, setDialogProps] = useState<ConfirmDialogParams | null>(null);
    const resolveRef = useRef<(value: boolean) => void>(() => { });

    confirmAction.current = (props: ConfirmDialogParams): Promise<boolean> => {
        return new Promise((resolve) => {
            setDialogProps(props);
            resolveRef.current = resolve;
            onOpen();
        });
    };

    const handleConfirm = () => {
        resolveRef.current(true);
        onClose();
    };

    const handleClose = () => {
        resolveRef.current(false);
        onClose();
    };

    return (
        <BasicDialog
            isOpen={open}
            onClose={handleClose}
            onConfirm={handleConfirm}
            title={dialogProps?.title ?? "Confirmation"}
            body={dialogProps?.body ?? null}
            cancelText={dialogProps?.cancelText ?? "Annuler"}
            confirmText={dialogProps?.confirmText ?? "Confirmer"}
        />
    );
}
