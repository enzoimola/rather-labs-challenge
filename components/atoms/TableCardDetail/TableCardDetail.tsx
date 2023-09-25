import cx from 'clsx';
import { useState } from 'react';
import { Table, ScrollArea, Group, Avatar, Text } from '@mantine/core';
import classes from './TableCardDetail.module.scss';

type TableDataType = {
    id: number,
    name: string,
    logo_path: string,
    origin_country: string
};
export function TableCardDetail(dataTable: Array<TableDataType>) {
    const [scrolled, setScrolled] = useState(false);
    const rows = dataTable.data.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={26} src={`http://image.tmdb.org/t/p/w500/${row.logo_path}`} radius={26} />
                    <Text size="sm" fw={500}>
                        {row.name}
                    </Text>
                </Group>
            </Table.Td>
            <Table.Td>{row.origin_country}</Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table miw={700}>
                <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Country</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
}
