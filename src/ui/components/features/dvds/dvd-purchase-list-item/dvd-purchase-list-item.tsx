import { Badge, Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { DVD } from "@core/domain/entities/DVD";
import { formatEther } from "ethers";

interface DvdPurchaseListItemProps {
    dvd: DVD
}

export function DvdPurchaseListItem({ dvd }: DvdPurchaseListItemProps) {

    return (
        <Box
            border="1px solid"
            borderColor="gray.200"
            bg="white" borderRadius="md"
            width="100%"
            p={2}
        >
            <Flex direction="column">
                <Flex justify="space-between" mb={1}>
                    <Heading size="md" truncate>{dvd.d_title}</Heading>
                    <Badge colorPalette="green" alignSelf="flex-start">
                        Purchased
                    </Badge>
                </Flex>

                <Stack gap={1} mt={2}>
                    <Flex justify="space-between">
                        <Text fontSize="sm" color="gray.500">ID:</Text>
                        <Text fontSize="sm">{dvd.d_id}</Text>
                    </Flex>

                    <Flex justify="space-between">
                        <Text fontSize="sm" color="gray.500">Price:</Text>
                        <Text fontSize="sm">{formatEther(dvd.price)} ETH</Text>
                    </Flex>
                </Stack>
            </Flex>
        </Box>
    );
}