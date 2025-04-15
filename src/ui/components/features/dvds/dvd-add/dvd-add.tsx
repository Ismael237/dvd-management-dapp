import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@components/chakra/button";
import { DvdModal } from "../dvd-modal";
import { DvdForm } from "../dvd-form";
import { LuPlus } from "react-icons/lu";

export function DvdAdd() {
    const { open, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                onClick={onOpen}
            >
                <LuPlus />Add new DVD
            </Button>
            <DvdModal
                body={<DvdForm onClose={onClose} />}
                isOpen={open}
                onClose={onClose}
            />
        </>
    )
}