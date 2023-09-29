import { Flex, Title } from '@mantine/core';
import React from 'react';
import { FavoriteWrapper } from '@/components/organisms/Favorite/Favorite';
import { MainLayout } from '@/layouts/MainLayout';

const Favorites: React.FC = () => (
    <MainLayout>
        <Flex direction="column" gap="sm" justify="center" maw={960} mx="auto">
            <Title>Favourites media</Title>
            <FavoriteWrapper />
        </Flex>
    </MainLayout>
);

export default Favorites;
