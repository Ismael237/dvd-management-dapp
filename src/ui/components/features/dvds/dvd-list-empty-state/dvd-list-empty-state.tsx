import {
    Box,
    Flex,
    Text,
    Icon,
    Button
} from "@chakra-ui/react";
import { LuDisc3, LuListRestart } from "react-icons/lu";

export function DvdListEmptyState({ onRefresh }: { onRefresh?: () => void }) {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            w="full"
            py={12}
            px={4}
        >
            <Box
                mb={4}
                p={4}
                borderRadius="full"
                bg="gray.100"
            >
                <Icon size="2xl" color="gray.400">
                    <LuDisc3 />
                </Icon>
            </Box>

            <Text
                fontSize="xl"
                fontWeight="medium"
                color="gray.800"
                mb={2}
            >
                No DVDs found
            </Text>

            <Text
                fontSize="md"
                color="gray.500"
                textAlign="center"
                maxW="md"
                mb={6}
            >
                There are currently no DVDs available in the inventory.
                Check back later or contact the administrator.
            </Text>

            {onRefresh && (
                <Button
                    colorPalette="blue"
                    onClick={onRefresh}
                    size="md"
                >
                    <LuListRestart />Refresh List
                </Button>
            )}
        </Flex>
    );
}