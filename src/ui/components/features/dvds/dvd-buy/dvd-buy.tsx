import { Button } from "@components/chakra/button";
import { toaster } from "@components/chakra/toaster";
import { confirm } from "@components/common/dialog/confirm-dialog-global";
import { useDvds } from "@hooks/useDvds";

interface DvdBuyProps {
    id: number;
    title: string;
    price: string;
}

export function DvdBuy({ id, title, price }: DvdBuyProps) {
    const { fetchDvds, buyDvd } = useDvds();

    const handleBuy = async () => {
        const isConfirmed = await confirm({
            title: `Buy "${title}"`,
            body: `Are you sure you want to buy this DVD?`,
            cancelText: "Cancel",
            confirmText: "Buy",
        });

        if (!isConfirmed) return;

        const buyPromise = buyDvd(id, price).then(() => fetchDvds());

        toaster.promise(buyPromise, {
            success: {
                title: "Successfully bought!",
                description: "You have successfully bought the DVD.",
            },
            error: {
                title: "Purchase failed",
                description: "Something went wrong during the purchase.",
            },
            loading: {
                title: "Processing...",
                description: "Buying DVD...",
            },
        });
    };

    return (
        <Button
            variant="surface"
            size="sm"
            colorPalette="blue"
            aria-label="Buy"
            onClick={handleBuy}
        >
            Buy
        </Button>
    );
}