import { AppShell } from '@mantine/core';

import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QueryResult, useQuery } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { useRouter } from 'next/router';
import { Header } from '@/components/molecules/Header/Header';
import { FETCH_FAVORITES_MEDIA, FETCH_MEDIA } from '@/graphql/queries';
import { selectFavourites, setFavoritesMedia, setMedia } from '@/store/dataSlice';
import SkeletonHeader from '@/components/atoms/SkeletonHeader';
import { PageNoData } from '@/components/atoms/PageNoData/PageNoData';
import { IMedia } from '@/models/interfaces/media/media.interface';
import { IFavsUser } from '@/models/interfaces/media/favMedia.interface';

type GetFavoritesType = {
    getFavorites: Array<IFavsUser>;
};

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loadingFavs, setLoadingFavs] = useState<boolean>(true);
    const favouritesStorage = useSelector(selectFavourites);
    const [uid, setUid] = useState<string>('');

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        setUid(localStorage.getItem('uid') || '');
    }, [setUid]);

    const { data: media, loading: loadingMediaQuery, error: errorMedia }:
        QueryResult<{ media: Array<IMedia>, loadingMedia: boolean, error: ApolloError }> =
            useQuery(FETCH_MEDIA, {
                onCompleted: (resp) => {
                    dispatch(setMedia(resp.media));
                },
            });

    const { data: favorites, loading: loadingFavQuery, error: errorFavorites }:
        QueryResult<{ favorites: GetFavoritesType, loadingFav: boolean, error: ApolloError }> =
            useQuery(FETCH_FAVORITES_MEDIA(uid && uid));

    useEffect(() => {
        if (!favorites || !media) return;

        // @ts-ignore
        const { getFavorites } = favorites;

        setLoadingFavs(getFavorites.length >= 0);

        const idSet = new Set(getFavorites.map((item: IFavsUser) => item.id));
        const commonItems = media.media.filter(item => idSet.has(item.id));
        dispatch(setMedia(media.media));
        dispatch(setFavoritesMedia(commonItems));
    }, [loadingFavQuery || loadingMediaQuery]);

    useEffect(() => {
        dispatch(setFavoritesMedia(favouritesStorage));
    }, [favouritesStorage]);

    const ShowPageNoData =
        <PageNoData
          text="Something bad just happened.."
          title={"Our servers could not handle your request. Don't worry, our development team was already notified. Try refreshing the page"}
          returnBack
        />;

    if ((!loadingFavQuery && !loadingMediaQuery) && errorMedia && (errorMedia && !errorFavorites)) {
        return (ShowPageNoData);
    }

    if ((!loadingFavQuery && !loadingMediaQuery) && router.pathname === '/favorites' && errorFavorites) {
        return (ShowPageNoData);
    }

    return (
        <AppShell
          header={{ height: 60 }}
          padding="md"
        >
            <AppShell.Header>
                {loadingFavs && <Header />}
                {!loadingFavs && <SkeletonHeader />}
            </AppShell.Header>
            <AppShell.Main pt={80}>
                {children}
            </AppShell.Main>
        </AppShell>
    );
};
