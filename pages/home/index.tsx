import { Flex, Text, Title } from '@mantine/core';
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import classes from '@/layouts/MainLayout.module.scss';
import { Media } from '@/components/organisms/Media/Media';

const Home: React.FC = () => (
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

export default Home;
