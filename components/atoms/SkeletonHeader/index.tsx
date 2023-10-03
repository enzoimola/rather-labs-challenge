import { Container, Group, Skeleton } from '@mantine/core';
import React from 'react';

const SkeletonHeader = () => (
    <Container display="flex" my={10} mx={20}>
        <Group>
            <Skeleton circle height={40} radius="xl" />
            <Skeleton circle height={40} radius="xl" />
        </Group>
        <Skeleton circle height={40} radius="xl" />
    </Container>
);

export default SkeletonHeader;
