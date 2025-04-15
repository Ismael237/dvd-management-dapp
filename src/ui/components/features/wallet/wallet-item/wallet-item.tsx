import React from 'react';
import { Flex, Text, Badge, HStack, Box } from '@chakra-ui/react';
import { DetectedWallet } from '../wallet-list';

type WalletItemProps = {
    wallet: DetectedWallet;
    onSelect: (wallet: DetectedWallet) => void;
};

export const WalletItem: React.FC<WalletItemProps> = ({ wallet, onSelect }) => {
    const Icon = wallet.icon;
    return (
        <Flex
            px={4} py={4}
            bg="blue.100"
            borderRadius="md"
            cursor="pointer"
            alignItems="center"
            justifyContent="space-between"
            onClick={() => onSelect(wallet)}
            data-wallet-name={wallet.name}
            data-wallet-detected={wallet.isInstalled}
            _hover={{
                bg: "blue.200"
            }}
        >
            <HStack gap={4}>
                <Box
                    borderRadius="full"
                    bg="white" p={1}
                >
                    <Icon size={40} />
                </Box>
                <Text fontSize="xl" fontWeight="bold">{wallet.name}</Text>
            </HStack>
            {wallet.isInstalled && <Badge>detected</Badge>}
        </Flex>
    );
};