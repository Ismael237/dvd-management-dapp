import { Box, DataList, HStack, Table, useBreakpointValue } from "@chakra-ui/react"
import { useDvds } from "@hooks/useDvds";
import { DvdListLoader } from "../dvd-list-loader";
import { DvdListEmptyState } from "../dvd-list-empty-state";
import { formatEther } from "ethers";
import { useWallet } from "@hooks/useWallet";
import { DvdEdit } from "../dvd-edit";
import { DvdDelete } from "../dvd-delete";
import { DvdBuy } from "../dvd-buy";
import { DvdView } from "../dvd-view";
import { DVD } from "@core/domain/entities/DVD";
import { DvdPurchaseListLoader } from "../dvd-purchase-list-loader";

function DvdMobileCard({ dvd }: { dvd: DVD }) {
    const { isOwner } = useWallet();
    const isAvailable = dvd.statut === "available";

    return (
        <Box
            p={4}
            mb={4}
            borderWidth="1px"
            borderColor="gray.700"
            borderRadius="lg"
            bg="white"
        >
            <DataList.Root orientation="horizontal" mb={4}>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight="bold">ID:</DataList.ItemLabel>
                    <DataList.ItemValue>{dvd.d_id}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight="bold">Title:</DataList.ItemLabel>
                    <DataList.ItemValue>{dvd.d_title}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight="bold">Quantity:</DataList.ItemLabel>
                    <DataList.ItemValue>{dvd.statut}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight="bold">Price:</DataList.ItemLabel>
                    <DataList.ItemValue>{formatEther(dvd.price)} ETH</DataList.ItemValue>
                </DataList.Item>
            </DataList.Root>

            <Box>
                {isAvailable ? (
                    isOwner() ? (
                        <HStack gap={2}>
                            <DvdEdit dvdData={dvd} />
                            <DvdDelete id={dvd.d_id} title={dvd.d_title} />
                        </HStack>
                    ) : (
                        <DvdBuy id={dvd.d_id} title={dvd.d_title} price={dvd.price} />
                    )
                ) : (
                    <DvdView dvd={dvd} />
                )}
            </Box>
        </Box>
    );
}


function DvdListActionCell({ dvd }: { dvd: DVD }) {
    const { isOwner } = useWallet();
    const isAvailable = dvd.statut === "available";
    return (
        <Table.Cell>
            {isAvailable ? (
                isOwner() ? (
                    <HStack gap={2}>
                        <DvdEdit dvdData={dvd} />
                        <DvdDelete id={dvd.d_id} title={dvd.d_title} />
                    </HStack>
                ) : (
                    <DvdBuy id={dvd.d_id} title={dvd.d_title} price={dvd.price} />
                )
            ) : (<DvdView dvd={dvd} />)}
        </Table.Cell>
    );
}

function DvdListRow({ dvd }: { dvd: DVD }) {
    return (
        <Table.Row key={dvd.d_id}>
            <Table.Cell>{dvd.d_id}</Table.Cell>
            <Table.Cell>{dvd.d_title}</Table.Cell>
            <Table.Cell>{dvd.numCopy}</Table.Cell>
            <Table.Cell>{formatEther(dvd.price)} ETH</Table.Cell>
            <DvdListActionCell dvd={dvd} />
        </Table.Row>
    );
}

export function DvdList() {
    const { dvds, loading, } = useDvds();

    const isMobile = useBreakpointValue({ base: true, md: false });

    if (isMobile) {
        return (
            <Box h="100%" p={2}>
                {loading ? (
                    <DvdPurchaseListLoader />
                ) : dvds.length === 0 ? (
                    <DvdListEmptyState />
                ) : (
                    dvds.map((dvd, i) => <DvdMobileCard key={i} dvd={dvd} />)
                )}
            </Box>
        );
    }

    return (
        <Box h="100%">
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>ID</Table.ColumnHeader>
                        <Table.ColumnHeader>Title</Table.ColumnHeader>
                        <Table.ColumnHeader>Quantity</Table.ColumnHeader>
                        <Table.ColumnHeader>Price</Table.ColumnHeader>
                        <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {loading ? (
                        <DvdListLoader />
                    ) : (dvds.map((dvd, i) => (<DvdListRow key={i} dvd={dvd} />)))}
                </Table.Body>
            </Table.Root>
            {(!loading && dvds.length === 0) && (<DvdListEmptyState />)}
        </Box>
    )
}