import {
    Button,
    Flex,
    Heading,
    Icon,
    Text,
} from "@chakra-ui/react";
import { FiShoppingCart, FiPackage } from "react-icons/fi";

export function DvdPurchaseListEmptyState({ onBrowse }: { onBrowse?: () => void }) {

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minHeight="100px"
            textAlign="center"
            w="full" mt={12}
        >
            <Icon size="xl" colorPalette="gray">
                <FiPackage />
            </Icon>

            <Heading size="md" mt={6} mb={2}>
                No DVDs in your collection yet
            </Heading>

            <Text color="gray.500" mb={6}>
                You haven't purchased any DVDs. Start building your collection!
            </Text>

            {onBrowse && (
                <Button
                    colorScheme="blue"
                    onClick={onBrowse}
                >
                    <FiShoppingCart />Browse Available DVDs
                </Button>
            )}
        </Flex>
    );
}