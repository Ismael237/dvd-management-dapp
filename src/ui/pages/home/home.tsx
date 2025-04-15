import { Header } from "@components/layout/header/header"
import { Box, Flex, Text } from "@chakra-ui/react"
import { DvdList } from "@components/features/dvds"
import { useEffect } from "react"
import { useDvds } from "@hooks/useDvds"
import { toaster } from "@components/chakra/toaster"
import { isErrorWithMessage } from "@utils/error"
import { useWallet } from "@hooks/useWallet";
import { DvdAdd } from "@components/features/dvds/dvd-add"

export function Home() {
    const { fetchDvds } = useDvds();
    const { isOwner } = useWallet();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchDvds();
            } catch (error: unknown) {
                if (isErrorWithMessage(error)) {
                    toaster.error({
                        description: error.message,
                    });
                }
            }
        };
        fetchData();
    }, [fetchDvds]);

    return (
        <Flex flexDirection="column" bg="gray.50" minH="100vh" h="100%">
            <Header />
            <Box
                px={[2, 4, 8, 12]} py={4}
                h="100%"
            >
                <Flex alignItems="flex-end" justifyContent="space-between" pb={4}>
                    <Box>
                        <Text
                            fontSize="xl" mb={1}
                            fontWeight="bold"
                        >
                            DVDs
                        </Text>
                    </Box>
                    {isOwner() && <DvdAdd />}
                </Flex>
                <Flex
                    h="100%" border="1px solid"
                    bg="white" rounded="md"
                    borderColor="gray.200"
                    flexDirection="column"
                    px={4} py={4}
                >
                    <DvdList />
                </Flex>
            </Box>
        </Flex>
    )
}
