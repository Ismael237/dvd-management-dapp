import { Flex, Icon, Text } from "@chakra-ui/react";
import { LuInfo } from "react-icons/lu";

export function DvdPurchaseListOwnerNotice() {

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            h="full"
            p={6}
            textAlign="center"
        >
            <Icon as={LuInfo} w={10} h={10} color="blue.400" mb={4} />
            <Text fontSize="lg" fontWeight="medium" color="gray.700" mb={2}>
                Admin View
            </Text>
            <Text color="gray.600">
                As the owner, DVDs are assigned to you by default.
                You can view and manage all DVDs in the dashboard.
            </Text>
        </Flex>
    );
}