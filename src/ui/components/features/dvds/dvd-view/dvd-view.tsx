import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@components/chakra/button";
import { DvdModal } from "../dvd-modal";
import { DvdDetails } from "../dvd-details";
import { DVD } from "@core/domain/entities/DVD";

export function DvdView({ dvd }: { dvd: DVD }) {
    const { open, onOpen, onClose } = useDisclosure();
     
    return (
        <>
            <Button
                variant="surface"
                size="sm"
                aria-label="Purchased"
                onClick={onOpen}
            >
                Purchased
            </Button>
            <DvdModal
                body={<DvdDetails dvd={dvd} />}
                isOpen={open}
                onClose={onClose}
            />
        </>
    )
}