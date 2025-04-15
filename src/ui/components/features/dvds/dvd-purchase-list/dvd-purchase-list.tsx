import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useWallet } from "@hooks/useWallet";
import { DvdPurchaseListItem } from "../dvd-purchase-list-item";
import { DvdPurchaseListLoader } from "../dvd-purchase-list-loader";
import { DvdPurchaseListEmptyState } from "../dvd-purchase-list-empty-state";
import { useDvds } from "@hooks/useDvds";
import { DvdPurchaseListOwnerNotice } from "../dvd-purchase-list-owner-notice";

export function DvdPurchaseList() {

    const { isOwner, getAccount } = useWallet();
    const { dvds, loading } = useDvds();
    const account = getAccount();
    const purchases = dvds.filter(dvd => dvd.currentOwner === account);

    return (
        <Flex
            bg="gray.50"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            w="full" h="100%"
            flexDirection="column"
        >
            <Box
                px={2} py={4}
                w="full"
                borderBottom="1px solid"
                borderColor="gray.200"
            >
                <Text
                    textStyle="sm"
                    fontWeight="bold"
                    color="gray.800"
                >Your Purchases</Text>
            </Box>
            <Box w="full" h="100%" p={2} overflowY="scroll">
                {loading ? (
                    <DvdPurchaseListLoader />
                ) : isOwner() ? (
                    <DvdPurchaseListOwnerNotice />
                ) : (!purchases || purchases.length === 0) ? (
                    <DvdPurchaseListEmptyState />
                ) : (
                    <SimpleGrid columns={1} gap={4}>
                        {purchases.map((dvd) => (
                            <DvdPurchaseListItem key={dvd.d_id} dvd={dvd} />
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </Flex>
    );
}