import { Box, Flex, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";

export function DvdPurchaseListLoader() {
    const skeletonCards = Array(6).fill(0);

    return (
        <SimpleGrid columns={1} gap={4} h="100%">
            {skeletonCards.map((_, index) => (
                <Box
                    key={index}
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor="gray.500"
                    bg="white"
                    p={4}
                >
                    <Stack gap={4}>
                        <Flex justify="space-between">
                            <Skeleton height="24px" width="140px" />
                            <Skeleton height="20px" width="70px" />
                        </Flex>

                        <Stack gap={3} mt={2}>
                            <Flex justify="space-between">
                                <Skeleton height="16px" width="60px" />
                                <Skeleton height="16px" width="40px" />
                            </Flex>

                            <Flex justify="space-between">
                                <Skeleton height="16px" width="70px" />
                                <Skeleton height="16px" width="60px" />
                            </Flex>
                        </Stack>
                    </Stack>
                </Box>
            ))}
        </SimpleGrid>
    );
}