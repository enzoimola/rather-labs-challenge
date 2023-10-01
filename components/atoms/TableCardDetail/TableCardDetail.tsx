import cx from 'clsx';
import React, { useState } from 'react';
import { Table, ScrollArea, Group, Avatar, Text } from '@mantine/core';
import classes from './TableCardDetail.module.scss';
import { ICastMember } from '@/models/interfaces/mediaDetail.interface';

const TableCardDetail: React.FC<Array<ICastMember>> = (dataTable) => {
    const [scrolled, setScrolled] = useState(false);
    const { data } = dataTable;
    const rows = data.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>
                <Group gap="sm">
                    {row.profilePath && <Avatar size={26} src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${row.profilePath}`} radius={26} />}
                    {!row.profilePath && <Avatar size={26} radius={26} />}
                    <Text size="sm" fw={500}>
                        {row.name}
                    </Text>
                </Group>
            </Table.Td>
            <Table.Td>{row.character}</Table.Td>
            <Table.Td>{row.knowForDepartment}</Table.Td>
            <Table.Td>{row.popularity}</Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table miw={700} className={classes.stickyTable} striped highlightOnHover>
                <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Character</Table.Th>
                        <Table.Th>Department</Table.Th>
                        <Table.Th>Popularity</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
};

export default TableCardDetail;
