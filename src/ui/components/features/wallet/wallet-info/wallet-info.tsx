import { Box, CloseButton, Drawer, Flex, IconButton, Portal, Skeleton, Text } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import { useWallet } from "@hooks/useWallet";
import { DvdPurchaseList } from "@components/features/dvds/dvd-purchase-list";
import { walletService } from "@core/infrastructure/blockchain/wallet.service";
import { useCallback, useEffect, useState } from "react";
import { BigNumberish, formatEther } from "ethers";
import { truncateText } from "@utils/string";
import { Tooltip } from "@components/chakra/tooltip";

export function WalletInfo({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { getAccount, disconnect } = useWallet();
    const [balance, setBalance] = useState<BigNumberish>(0);
    const [loading, setLoading] = useState(true);

    const handleDisconnect = () => {
        onClose();
        disconnect();
    }

    const fetchBalance = useCallback(async () => {
        try {
            const account = getAccount();
            if (!account) {
                setLoading(false);
                return;
            }
            
            const balance = await walletService.getBalance(account);
            setBalance(balance);
        } catch (error) {
            console.error("Failed to fetch balance:", error);
        } finally {
            setLoading(false);
        }
    }, [getAccount]);

    useEffect(() => {
        let isMounted = true;
        
        if (isOpen && isMounted) {
            fetchBalance();
        }
        
        return () => {
            isMounted = false;
        };
    }, [isOpen, fetchBalance]);


    return (
        <Drawer.Root
            open={isOpen}
            onOpenChange={onClose}
            trapFocus={false}
        >
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header px={4}>
                            <Drawer.Title>My information</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body px={4} py={2} display="flex" flexDirection="column" maxH="100%">
                            <Box
                                w="100%"
                                mb={4}
                            >
                                <Flex alignItems="center" justifyContent="space-between">
                                    <Skeleton height="8" loading={loading}>
                                        <Text
                                            textStyle="2xl"
                                            fontWeight="bold"
                                            color="gray.800"
                                        >{truncateText(formatEther(balance.toString()), 11, 0, false)} ETH</Text>
                                    </Skeleton>
                                    <Tooltip showArrow content="Disconnect wallet">

                                        <IconButton
                                            aria-label="Disconnect wallet"
                                            variant="outline"
                                            rounded="full"
                                            size="sm" colorPalette="red"
                                            onClick={handleDisconnect}
                                        >
                                            <LuLogOut />
                                        </IconButton>
                                    </Tooltip>
                                </Flex>
                            </Box>
                            <DvdPurchaseList />
                        </Drawer.Body>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}
