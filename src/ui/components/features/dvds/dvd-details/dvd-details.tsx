import { Badge, Box, Flex, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import { formatEther } from "ethers";
import { LuDollarSign, LuPackage, LuUser } from "react-icons/lu";
import { DVD } from "@core/domain/entities/DVD";

interface DvdDetailsProps {
    dvd: DVD;
}

export function DvdDetails({ dvd }: DvdDetailsProps) {
    return (
        <Flex direction="column" gap={4} pt={4}>
            <Box>
                DVD Details
                <Badge ml={2} colorPalette="green">Purchased</Badge>
            </Box>
            <Box>
                <Text fontSize="2xl" fontWeight="bold">{dvd.d_title}</Text>
                <Text color="gray.500">ID: {dvd.d_id}</Text>
            </Box>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                    <Flex align="center" mb={2}>
                        <Icon as={LuDollarSign} mr={2} color="green.500" />
                        <Text fontWeight="medium">Purchase Price</Text>
                    </Flex>
                    <Text>{formatEther(dvd.price)} ETH</Text>
                </GridItem>

                <GridItem colSpan={2}>
                    <Flex align="center" mb={2}>
                        <Icon as={LuUser} mr={2} color="purple.500" />
                        <Text fontWeight="medium">Owner</Text>
                    </Flex>
                    <Text fontSize="sm" fontFamily="monospace" bg="gray.100" p={2} borderRadius="md">
                        {dvd.currentOwner}
                    </Text>
                </GridItem>
            </Grid>

            <Box mt={2} p={4} bg="gray.50" borderRadius="md">
                <Flex align="center" mb={2}>
                    <Icon as={LuPackage} mr={2} color="orange.500" />
                    <Text fontWeight="medium">Media Information</Text>
                </Flex>
                <Text>Format: DVD</Text>
                <Text>Region: All</Text>
                <Text>Condition: New</Text>
            </Box>
        </Flex>
    )
}