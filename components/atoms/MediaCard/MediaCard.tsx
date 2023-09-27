import { IconHeart, IconStar } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import React, { useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import classes from './MediaCard.module.scss';
import { IMedia } from '@/models/interfaces/media.interface';

export const MediaCard: React.FC<IMedia> = (
    { id, name, releaseDate, posterPath, voteAverage }) => {
    const [loadingBtn, setLoadingBtn] = useState(false);
    const router = useRouter();
    const imageURL = posterPath ? `http://image.tmdb.org/t/p/w500${posterPath}` : '/no-media-image.jpg';

    const onShowDetailsHandler = (e) => {
        e.preventDefault();
        setLoadingBtn(true);

        router.push({ pathname: '/[id]', query: { id } });
    };

    const icon = <IconStar style={{ width: 20, height: 20 }} />;
    const voteAvg = !voteAverage ? 0 : voteAverage.toFixed(1);

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={imageURL} alt={name} height={180} />
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group justify="center" className={classes.sectionGroup}>
                    <Text fz="lg" justify="center" fw={500} className={classes.title}>
                        {name}
                    </Text>
                </Group>
            </Card.Section>

            <Card.Section className={classes.section}>

                <Group justify="space-between" mt={20}>

                        <Badge
                          color="yellow"
                          variant="filled"
                          size="lg"
                          leftSection={icon}
                        >
                            <Text fz="md" fw={700}>
                            {voteAvg}
                            </Text>
                        </Badge>

                    <Badge size="lg" variant="light">
                        {moment(releaseDate).format('MMM Do YY')}
                    </Badge>
                </Group>
            </Card.Section>

            <Group mt="xs">
                <Button variant="outline" radius="md" style={{ flex: 1 }} onClick={onShowDetailsHandler} loading={loadingBtn}>
                    Show details
                </Button>
                <ActionIcon variant="default" radius="md" size={36}>
                    <IconHeart className={classes.like} stroke={1.5} />
                </ActionIcon>
            </Group>
        </Card>
    );
};
