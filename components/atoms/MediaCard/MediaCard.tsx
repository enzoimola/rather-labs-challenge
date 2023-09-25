import { IconHeart } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import React, { useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import classes from './MediaCard.module.scss';
import { setMediaSelected } from '@/store/dataSlice';

const mockdata = {
    image:
        'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    title: 'Verudela Beach',
    country: 'Croatia',
    description:
        'Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.',
    badges: [
        { emoji: '☀️', label: 'Sunny weather' },
        { emoji: '🦓', label: 'Onsite zoo' },
        { emoji: '🌊', label: 'Sea' },
        { emoji: '🌲', label: 'Nature' },
        { emoji: '🤽', label: 'Water sports' },
    ],
};

type MediaCardType = {
    id: number
    title: string,
    releaseDate: string,
    image: string
    // image?: string
    // show: boolean
};
export const MediaCard: React.FC<MediaCardType> = ({ id, title, releaseDate, image }) => {
    const { badges } = mockdata;
    const [loadingBtn, setLoadingBtn] = useState(false);
    const router = useRouter();
    const imageURL = `http://image.tmdb.org/t/p/w500/${image}`;
    // const data = useSelector(data);
    const dispatch = useDispatch();
    const userDispatch = () => {
        dispatch(setMediaSelected(id));
    };

    const features = badges.map((badge) => (
        <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
            {badge.label}
        </Badge>
    ));

    const onShowDetailsHandler = (e) => {
        e.preventDefault();
        setLoadingBtn(true);
        userDispatch();

        router.push({ pathname: '/[id]', query: { id } });
    };

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={imageURL} alt={title} height={180} />
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group justify="apart" className={classes.sectionGroup}>
                    <Text fz="lg" fw={500} className={classes.title}>
                        {title}
                    </Text>
                    <Badge size="xs" variant="light">
                        {moment(releaseDate).format('MMM Do YY')}
                    </Badge>
                </Group>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} c="dimmed">
                    Perfect for you, if you enjoy
                </Text>
                <Group gap={7} mt={5}>
                    {features}
                </Group>
            </Card.Section>

            <Group mt="xs">
                <Button radius="md" style={{ flex: 1 }} onClick={onShowDetailsHandler} loading={loadingBtn}>
                    Show details
                </Button>
                <ActionIcon variant="default" radius="md" size={36}>
                    <IconHeart className={classes.like} stroke={1.5} />
                </ActionIcon>
            </Group>
        </Card>
    );
};
