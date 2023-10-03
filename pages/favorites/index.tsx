import { Flex, Text, Title } from '@mantine/core';
import React from 'react';
import { FavoriteWrapper } from '@/components/organisms/Favorite/Favorite';
import { MainLayout } from '@/layouts/MainLayout';
import classes from '@/layouts/MainLayout.module.scss';

const Favorites: React.FC = () => (
    <MainLayout>
        <Flex direction="column" gap="sm" justify="center" maw={960} mx="auto">
            <Title className={classes.text}>Favorite Media</Title>
            <Text className={classes.text}>
                Here, you can find a list of your favorite movies and TV show
            </Text>
            <FavoriteWrapper />
        </Flex>
    </MainLayout>
);

export default Favorites;
