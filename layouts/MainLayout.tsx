import { AppShell } from '@mantine/core';

import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '@/components/molecules/Header/Header';
import { createApolloClient } from '@/apollo-client';
import { FETCH_FAVORITES_MEDIA, FETCH_MEDIA } from '@/graphql/queries';
import { setFavoritesMedia, setMedia } from '@/store/dataSlice';
import SkeletonHeader from '@/components/atoms/SkeletonHeader';
import { PageNoData } from '@/components/atoms/PageNoData/PageNoData';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const client = createApolloClient();
    const dispatch = useDispatch();
    const [loadingFavs, setLoadingFavs] = useState<boolean>(false);

    // eslint-disable-next-line consistent-return
    const fetchMedia = async () => {
        try {
            const { data: media } = await client.query({
                query: FETCH_MEDIA,
            });

            const { data: favorites } = await client.query({
                query: FETCH_FAVORITES_MEDIA(localStorage.getItem('uid')),
            });
            setLoadingFavs(favorites.getFavorites.length >= 0);

            const idSet = new Set(favorites.getFavorites.map(item => item.id));
            const commonItems = media.media.filter(item => idSet.has(item.id));
            dispatch(setMedia(media.media));
            dispatch(setFavoritesMedia(commonItems));
        } catch (e) {
            return (
                <PageNoData
                  text="Something bad just happened.."
                  title={"Our servers could not handle your request. Don't worry, our development team was already notified. Try refreshing the page"}
                  returnBack
                />
                );
        }
    };

    useEffect(() => {
        fetchMedia().then();
    }, []);

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
