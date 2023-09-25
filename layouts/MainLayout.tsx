'use client';

import { Flex, Text, Title } from '@mantine/core';

import { Media } from '@/components/organisms/Media/Media';

export const MainLayout = () => (
        <Flex direction="column" gap="sm" justify="center" maw={960} mx="auto">
            <Title align="center">Welcome to RLabs Media!</Title>
            <Text align="center"> Explore, Search, and Discover: Your Gateway to the World of Cinema</Text>
            <Media />
        </Flex>
    );
