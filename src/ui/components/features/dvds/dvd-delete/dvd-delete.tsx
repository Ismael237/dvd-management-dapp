import { Button } from "@components/chakra/button";
import { toaster } from "@components/chakra/toaster";
import { confirm } from "@components/common/dialog/confirm-dialog-global";
import { useDvds } from "@hooks/useDvds";

export function DvdDelete({ id, title }: { id: number, title: string }) {
    const { deleteDvd, fetchDvds } = useDvds();

    const handleDelete = async () => {
        const isConfirmed = await confirm({
            title: `Delete "${title}"`,
            body: `Are you sure you want to delete this DVD ?`,
            cancelText: "Cancel",
            confirmText: "Delete",
        });

        if (!isConfirmed) return;

        const deletionPromise = deleteDvd(id).then(() => fetchDvds());

        toaster.promise(deletionPromise, {
            success: {
                title: "Successfully deleted!",
                description: "DVD deleted successfully",
            },
            error: {
                title: "Delete failed",
                description: "Something went wrong while deleting the DVD",
            },
            loading: {
                title: "Waiting...",
                description: "Processing deletion..."
            },
        });
    };

    return (
        <>
            <Button
                variant="surface"
                size="sm" colorPalette="red"
                aria-label="Delete"
                onClick={handleDelete}
            >
                Delete
            </Button>
        </>
    )
}