import { IconHeart, IconStar, IconHeartFilled } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { UserCredential } from 'firebase/auth';
import classes from './MediaCard.module.scss';
import { IMedia } from '@/models/interfaces/media.interface';
import { saveFavorite } from '@/services/media/media.service';
import { IFavMedia } from '@/models/interfaces/favMedia.interface';
import { onFavouredMedia, selectFavourites } from '@/store/dataSlice';
import { useAuth } from '@/context/auth';

export const MediaCard: React.FC<IMedia> = (
    { id, name, releaseDate, posterPath, voteAverage, isMovie }) => {
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [setUnfav, setIsMarkAsFav] = useState<boolean>(false);
    const router = useRouter();
    const imageURL = posterPath ? `http://image.tmdb.org/t/p/w500${posterPath}` : '/no-media-image.jpg';
    const favourites = useSelector(selectFavourites);
    const dispatch = useDispatch();
    const { userLogged } : UserCredential = useAuth();

    useEffect(() => {
        const isFav = favourites.some(md => md.id === id);
        if (isFav) {
            setIsMarkAsFav(true);
        }
    }, []);

    const onShowDetailsHandler = (e) => {
        e.preventDefault();
        setLoadingBtn(true);
        const isMovieParam = isMovie ? 'media' : 'tv-show';

        router.push({ pathname: '/[isMovieParam]/[id]', query: { id, isMovieParam } });
    };

    const icon = <IconStar style={{ width: 20, height: 20 }} />;
    const voteAvg = !voteAverage ? 0 : voteAverage.toFixed(1);

    const onFavoriteHandler = async () => {
        const body: IFavMedia = {
            id,
            uid: userLogged.uid,
        };
        await saveFavorite(body);

        const newFav = { id, name, releaseDate, posterPath, voteAverage };
        dispatch(onFavouredMedia(newFav));

        setIsMarkAsFav(!setUnfav);
    };

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={imageURL} alt={name} height={180} pos="absolute" className={classes.bgImage} />
                <Image src={imageURL} alt={name} height={180} className={classes.image} />
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
                <ActionIcon variant="default" radius="md" size={36} onClick={onFavoriteHandler}>
                    {!setUnfav && <IconHeart className={classes.like} stroke={1.5} />}
                    {setUnfav && <IconHeartFilled className={classes.like} stroke={1.5} />}
                </ActionIcon>
            </Group>
        </Card>
    );
};
