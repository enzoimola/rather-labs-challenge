import React, { useState } from 'react';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import classes from './MediaNoData.module.scss';

export type NoMediaData = {
    title: string,
    text: string,
    returnBack: boolean
};
export const MediaNoData: React.FC<NoMediaData> = ({ title, text, returnBack }) => {
    const router = useRouter();
    const [loadingBtn, setLoadingBtn] = useState(false);
    const onBackHandler = () => {
        setLoadingBtn(true);
        router.push('/');
    };

    return (
        <Container className={classes.container}>
            <div className={classes.label}>Oops!</div>
            <Title className={classes.title}>{title}</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                {text}
            </Text>
            {returnBack && <Group justify="center" my={10} flex>
                <Button radius="md" onClick={onBackHandler} loading={loadingBtn}>
                    Go to home
                </Button>
                           </Group>}
        </Container>);
};
