import { Card, Image, Text, Group, Badge } from '@mantine/core';
import React, { useState } from 'react';
import moment from 'moment/moment';
import classes from './CardDetail.module.scss';
import { TableCardDetail } from '@/components/atoms/TableCardDetail/TableCardDetail';

const stats = [
    { title: 'Distance', value: '27.4 km' },
    { title: 'Avg. speed', value: '9.6 km/h' },
    { title: 'Score', value: '88/100' },
];

type GenresType = {
    id: number,
    name: string,
};
export const CardDetail: React.FC<MediaCardType> = (
    { title, releaseDate, image, summary, genres, productionCompanies }) => {
    const imageURL = `http://image.tmdb.org/t/p/w500/${image}`;

    const badgeColors: Array<string> = ['yellow', 'teal', 'cyan', 'violet', 'orange'];

    const genresBadges = genres?.map((badge, index) => (
        <Badge variant="light" color={badgeColors[index % badgeColors.length]} key={badge.id}>
            {badge.name}
        </Badge>
    ));

    return (
        <Card withBorder padding="lg" className={classes.card}>
            <Card.Section className={classes.sectionCard}>
                <Image
                  src={imageURL}
                  alt={title}
                  className={classes.imageCard}
                  height={100}
                />
            </Card.Section>

            <Group justify="space-between" mt="xl">
                <Text fz="md" fw={700} className={classes.title}>
                    {title}
                </Text>
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
    );
};
