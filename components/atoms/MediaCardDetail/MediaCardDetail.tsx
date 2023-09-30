import { Card, Image, Text, Group, Badge } from '@mantine/core';
import React from 'react';
import moment from 'moment/moment';
import { IconStar } from '@tabler/icons-react';
import classes from './MediaCardDetail.module.scss';
import TableCardDetail from '@/components/atoms/TableCardDetail/TableCardDetail';

export const MediaCardDetail =
    ({ name, releaseDate, posterPath, overview,
        voteAverage, tagline, actors }) => {
    const imageURL = `http://image.tmdb.org/t/p/w500/${posterPath}`;

    const icon = <IconStar style={{ width: 20, height: 20 }} />;
    const voteAvg = voteAverage.toFixed(1);

    return (
        <>
            <Group className={classes.titleWrapper}>
                <Text fz="xl" fw={700} justify="center" align="center">
                    {name}
                </Text>
                <Text fz="md" fw={500} justify="center" align="center">
                    {tagline}
                </Text>
            </Group>
            <Card withBorder padding="lg" className={classes.card}>
                <Card.Section>
                    <Image src={imageURL} alt={name} height={180} pos="absolute" className={classes.bgImage} />
                    <Image src={imageURL} alt={name} height={180} className={classes.image} />
                </Card.Section>

                <Group justify="space-between" mt="md">
                    <Group>
                        <Badge
                          color="yellow"
                          variant="filled"
                          size="lg"
                          leftSection={icon}
                        >
                            <Text fz="md" fw={700} className={classes.ratingIcon}>
                                {voteAvg}
                            </Text>
                        </Badge>
                    </Group>

                    <Group gap={5}>
                        <Badge size="lg" variant="transparent">
                            {moment(releaseDate).format('MMMM Do YYYY, h:mm a')}
                        </Badge>
                    </Group>
                </Group>
                <Text mt="sm" mb="xl" c="dimmed" fz="sm">
                    {overview}
                </Text>

                <Text mt="xl" mb="md" ta="center" c="dimmed" fz="md" fw={700}>
                    Cast members
                </Text>
                <TableCardDetail data={actors} p={40} />
            </Card>
        </>
    );
};
