import React, { useState } from 'react';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import classes from './PageNoData.module.scss';

export type PageNoData = {
    title: string,
    text: string,
    returnBack: boolean
};
export const PageNoData: React.FC<PageNoData> = ({ title, text, returnBack }) => {
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
            {returnBack && <Group justify="center" my={10}>
                <Button radius="md" onClick={onBackHandler} loading={loadingBtn}>
                    Go home
                </Button>
                           </Group>}
        </Container>);
};
