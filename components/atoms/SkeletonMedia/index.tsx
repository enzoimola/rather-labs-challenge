import { Container, Skeleton } from '@mantine/core';
import React from 'react';

const SkeletonMedia = () => (
    <Container m={10} w={960} mx="auto">
        <Skeleton height={300} radius="xl" />
        <Skeleton height={50} circle mb="xl" mt="xl" />
        <Skeleton height={20} radius="xl" />
        <Skeleton height={20} mt={6} radius="xl" />
        <Skeleton height={20} mt={6} radius="xl" />
        <Skeleton height={20} mt={6} radius="xl" width="70%" />
    </Container>
);

export default SkeletonMedia;
