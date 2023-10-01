import { Card, Image, Text, Group, Badge, Button, Anchor } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { IconStar } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { UserCredential } from 'firebase/auth';
import classes from './MediaCardDetail.module.scss';
import TableCardDetail from '@/components/atoms/TableCardDetail/TableCardDetail';
import { IFavMedia } from '@/models/interfaces/favMedia.interface';
import { saveFavorite } from '@/services/media/media.service';
import { onFavouredMedia, selectFavourites } from '@/store/dataSlice';
import { useAuth } from '@/context/auth';

export const MediaCardDetail =
    ({ id, name, releaseDate, posterPath, overview,
        homepage, voteAverage, tagline, actors }) => {
    const imageURL = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${posterPath}`;

    const icon = <IconStar style={{ width: 20, height: 20 }} />;
    const voteAvg = voteAverage.toFixed(1);
    const [setFav, setIsMarkAsFav] = useState<boolean>(false);
    const [loadingFavBtn, setLoadingFavBtn] = useState<boolean>(true);
    const dispatch = useDispatch();
    const favourites = useSelector(selectFavourites);
    const { userLogged } : UserCredential = useAuth();

    useEffect(() => {
        if (favourites.length === 0) {
            setLoadingFavBtn(false);
            return;
        }
        const isFav = favourites.some(md => md.id === id);
        if (isFav) {
            setIsMarkAsFav(true);
            setLoadingFavBtn(false);
        }
    }, [favourites]);

    const onFavoriteHandler = async () => {
        const body: IFavMedia = {
            id,
            uid: userLogged.uid,
            isFav: setFav,
        };
        await saveFavorite(body);

        const newFav = { id, name, releaseDate, posterPath, voteAverage };
        dispatch(onFavouredMedia(newFav));

        setIsMarkAsFav(!setFav);
    };

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
                <Group />
                <Button color="red" variant="outline" radius="md" onClick={onFavoriteHandler} loading={loadingFavBtn}>
                    {!setFav && <Text>Add to favorite</Text>}
                    {setFav && <Text>Remove from favorite</Text>}
                </Button>
                {homepage && <Anchor href={homepage} target="_blank" mt="10">
                                {homepage}
                             </Anchor>}
                <Text mt="xl" mb="md" ta="center" c="dimmed" fz="md" fw={700}>
                    Cast members
                </Text>
                <TableCardDetail data={actors} p={40} />
            </Card>
        </>
    );
};
