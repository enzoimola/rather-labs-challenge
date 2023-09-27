import { Card, Image, Text, Group, Badge, Rating, Slider, Chip } from '@mantine/core';
import React from 'react';
import moment from 'moment/moment';
import { IconStar } from '@tabler/icons-react';
import classes from './CardDetail.module.scss';
import { IMediaDetail } from '@/models/interfaces/mediaDetail.interface';

export const CardDetail: React.FC<IMediaDetail> = (
    { title, releaseDate, image, summary, voteAverage, tagline }) => {
    const imageURL = `http://image.tmdb.org/t/p/w500/${image}`;

    const icon = <IconStar style={{ width: 20, height: 20 }} />;
    const voteAvg = voteAverage.toFixed(1);

    return (
        <>
            <Group className={classes.titleWrapper}>
                <Text fz="xl" fw={700} justify="center" align="center">
                    {title}
                </Text>
                <Text fz="md" fw={500} justify="center" align="center">
                    {tagline}
                </Text>
            </Group>
            <Card withBorder padding="lg" className={classes.card}>
                <Card.Section className={classes.sectionCard}>
                    <Image
                      src={imageURL}
                      alt={title}
                      className={classes.imageCard}
                      height={100}
                    />
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
                    {summary}
                </Text>

                {/*<Group gap={7} mt={5} justify="start">*/}
                {/*    {genresBadges}*/}
                {/*</Group>*/}

                {/*<Text mt="xl" mb="md" ta="center" c="dimmed" fz="md" fw={700}>*/}
                {/*    Poduction companies*/}
                {/*</Text>*/}
                {/*<TableCardDetail data={productionCompanies} p={40} />*/}
            </Card>
        </>
    );
};
