import { Skeleton, Table } from "@chakra-ui/react";

function TableCellLoader() {
    return (
        <Table.Cell>
            <Skeleton
                height="20px"
                width="100%"
            />
        </Table.Cell>
    );
}

function TableRowLoader() {
    return (
        <Table.Row>
            <TableCellLoader />
            <TableCellLoader />
            <TableCellLoader />
            <TableCellLoader />
            <TableCellLoader />
        </Table.Row>
    );
}

export function DvdListLoader() {
    return (
        <>
            <TableRowLoader />
            <TableRowLoader />
            <TableRowLoader />
            <TableRowLoader />
        </>
    )

}