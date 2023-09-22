'use client';

import { Flex, Title } from '@mantine/core';

import { Media } from '@/components/organisms/Media/Media';

export const MainLayout = () => (
        <Flex direction="column" gap="sm" justify="center" maw={960} mx="auto">
            <Title>Main</Title>
            <Media />
        </Flex>
    );
