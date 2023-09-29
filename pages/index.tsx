import React from 'react';
import { Flex, Text, Title } from '@mantine/core';
import { IMedia } from '@/models/interfaces/media.interface';
import { MainLayout } from '@/layouts/MainLayout';
import { IURLMedia } from '@/models/interfaces/getURLMedia.interface';
import { Media } from '@/components/organisms/Media/Media';

export type MediaType = {
    media: Array<IMedia>,
    urls: Array<IURLMedia>
};

const HomePage: React.FC<MediaType> = () => (
    <MainLayout>
        <Flex direction="column" gap="sm" justify="center" maw={960} mx="auto">
            <Title align="center">Welcome to RLabs Media!</Title>
            <Text align="center"> Explore, Search, and Discover: Your Gateway to the World of Cinema</Text>
            <Media />
        </Flex>
    </MainLayout>
);

export default HomePage;
