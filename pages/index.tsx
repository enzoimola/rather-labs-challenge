import React from 'react';
import { Flex, Text, Title } from '@mantine/core';
import { MainLayout } from '@/layouts/MainLayout';
import { Media } from '@/components/organisms/Media/Media';
import classes from '@/layouts/MainLayout.module.scss';

const HomePage: React.FC = () => (
    <MainLayout>
        <Flex direction="column" gap="sm" justify="center" maw={960} mx="auto">
            <Title className={classes.text}>Welcome to RLabs Media!</Title>
            <Text className={classes.text}>
                Explore, Search, and Discover: Your Gateway to the World of Cinema
            </Text>
            <Media />
        </Flex>
    </MainLayout>
);

export default HomePage;
