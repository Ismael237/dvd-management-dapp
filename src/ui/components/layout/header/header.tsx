import { Box, Heading } from "@chakra-ui/react"
import { WalletConnectionHandler } from "@components/features/wallet/wallet-connection-handler"

export function Header () {

    return (
        <Box
            h="64px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={[2, 4, 8, 12]} bg="white"
            borderBottom="1px solid"
            borderColor="gray.200"
        >
            <Heading as="h1" size="lg">
                <span>DVD Master</span>
            </Heading>
            <WalletConnectionHandler />
        </Box>
    )
}
