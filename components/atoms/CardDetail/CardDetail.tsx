import { Card, Image, Text, Group, Badge } from '@mantine/core';
import React from 'react';
import moment from 'moment/moment';
import classes from './CardDetail.module.scss';
import { TableCardDetail } from '@/components/atoms/TableCardDetail/TableCardDetail';

export const CardDetail: React.FC<MediaCardType> = (
    { title, releaseDate, image, summary, genres, productionCompanies, tagline }) => {
    const imageURL = `http://image.tmdb.org/t/p/w500/${image}`;

    const badgeColors: Array<string> = ['yellow', 'teal', 'cyan', 'violet', 'orange'];

    const genresBadges = genres?.map((badge, index) => (
        <Badge variant="light" color={badgeColors[index % badgeColors.length]} key={badge.id}>
            {badge.name}
        </Badge>
    ));

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

                <Group justify="end" mt="xl">
                    {/*<Text fz="md" fw={700} className={classes.title}>*/}
                    {/*    {title}*/}
                    {/*</Text>*/}
                    <Group gap={5}>
                        <Badge size="md" variant="transparent">
                            {moment(releaseDate).format('MMMM Do YYYY, h:mm a')}
                        </Badge>
                    </Group>
                </Group>
                <Text mt="sm" mb="xl" c="dimmed" fz="sm">
                    {summary}
                </Text>
                <Group gap={7} mt={5} justify="start">
                    {genresBadges}
                </Group>

                <Text mt="xl" mb="md" ta="center" c="dimmed" fz="md" fw={700}>
                    Poduction companies
                </Text>
                <TableCardDetail data={productionCompanies} p={40} />
            </Card>
        </>
    );
};
