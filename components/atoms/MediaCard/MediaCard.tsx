import { IconHeart, IconStar } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import React, { useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import classes from './MediaCard.module.scss';
import { setMediaSelected } from '@/store/dataSlice';

type MediaCardType = {
    id: number
    title: string,
    releaseDate: string,
    image: string
    // image?: string
    // show: boolean
};
export const MediaCard: React.FC<MediaCardType> = (
    { id, title, releaseDate, image }) => {
    const [loadingBtn, setLoadingBtn] = useState(false);
    const router = useRouter();
    const imageURL = `http://image.tmdb.org/t/p/w500/${image}`;
    // const data = useSelector(data);
    const dispatch = useDispatch();
    const userDispatch = () => {
        dispatch(setMediaSelected(id));
    };

    const voteAverage = 7.900;

    const onShowDetailsHandler = (e) => {
        e.preventDefault();
        setLoadingBtn(true);
        userDispatch();

        router.push({ pathname: '/[id]', query: { id } });
    };

    const icon = <IconStar style={{ width: 20, height: 20 }} />;
    const voteAvg = voteAverage.toFixed(1);

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={imageURL} alt={title} height={180} />
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group justify="center" className={classes.sectionGroup}>
                    <Text fz="lg" justify="center" fw={500} className={classes.title}>
                        {title}
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
