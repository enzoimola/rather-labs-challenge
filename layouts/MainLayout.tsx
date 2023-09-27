import { Flex, Text, Title } from '@mantine/core';

import React from 'react';
import { Media } from '@/components/organisms/Media/Media';
import { useAuth } from '@/context/auth';
import { IMedia } from '@/models/interfaces/media.interface';

export type MediaType = { media: IMedia };

export const MainLayout: React.FC<MediaType> = () => {
    const { user } = useAuth();

    return (
    <Flex direction="column" gap="sm" justify="center" maw={960} mx="auto">
        <Title align="center">Welcome to RLabs Media!</Title>
        <Text align="center"> Explore, Search, and Discover: Your Gateway to the World of Cinema</Text>
        <Media />
    </Flex>);
};
