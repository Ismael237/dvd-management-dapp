import { Box, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { useWallet } from "@hooks/useWallet";
import { LuChevronDown } from "react-icons/lu";
import { WalletInfo } from "../wallet-info/wallet-info";
import { truncateText } from "@utils/string";
import { MetamaskIcon } from "@components/common/icon/metamask-icon";

export function WalletConnectedButton() {
    const { data } = useWallet();
    const { account } = data!;
    const { open, onOpen, onClose } = useDisclosure();

    const handleClick = () => {
        if (open) {
            onClose();
        } else {
            onOpen();
        }
    };

    return (
        <>
            <Flex
                borderRadius="full"
                alignItems="center"
                colorPalette="blue"
                layerStyle="outline.solid"
                _hover={{
                    layerStyle: "fill.subtle",
                }}
                p={1}
                cursor="pointer"
                onClick={handleClick}
            >
                <Box
                    borderRadius="full"
                    bg="white" p={1}
                    mr={2} borderWidth={1} borderColor="blue.200"
                >
                    <MetamaskIcon size={24} />
                </Box>
                <Text
                    textStyle="xs"
                    mr={2}
                >
                    {truncateText(account!, 5, 0, false)}
                </Text>
                <Icon size="md">
                    <LuChevronDown />
                </Icon>
            </Flex>
            <WalletInfo
                isOpen={open}
                onClose={onClose}
            />
        </>
    )
}
