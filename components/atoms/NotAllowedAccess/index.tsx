import { Title, Text, Button, Container, Group } from '@mantine/core';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import classes from './NotAllowedAccess.module.scss';

const NotFoundTitle: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const onGoLoginHandler = () => {
        setLoading(true);
        router.replace('/').then();
    };
    return (
        <Container className={classes.root}>
            <div className={classes.label}>403</div>
            <Title className={classes.title}>You have found a secret place.</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                Unfortunately, this is a 403 page, and access is denied. It seems you don&apost;t have the
                required credentials to explore further.
            </Text>
            <Group justify="center">
                <Button size="md" onClick={onGoLoginHandler} loading={loading}>
                    Take me back to login page
                </Button>
            </Group>
        </Container>
    );
};
export default NotFoundTitle;
