import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@components/chakra/button";
import { DvdModal } from "../dvd-modal";
import { DvdForm } from "../dvd-form";
import { DVD } from "@core/domain/entities/DVD";

interface DvdEditProps {
    dvdData: DVD;
}

export function DvdEdit({ dvdData }: DvdEditProps) {
    const { open, onOpen, onClose } = useDisclosure();
    const { d_id, d_title, numCopy } = dvdData;
     
    const data = {
        id: d_id,
        title: d_title,
        copies: numCopy
    }

    return (
        <>
            <Button
                variant="surface"
                size="sm"
                aria-label="Edit"
                onClick={onOpen}
            >
                Edit
            </Button>
            <DvdModal
                body={<DvdForm dvdData={data} onClose={onClose} />}
                isOpen={open}
                onClose={onClose}
            />
        </>
    )
}