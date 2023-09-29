import { AppShell } from '@mantine/core';

import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '@/components/molecules/Header/Header';
import { createApolloClient } from '@/apollo-client';
import { FETCH_FAVORITES_MEDIA, FETCH_MEDIA } from '@/graphql/queries';
import { setFavoritesMedia, setMedia } from '@/store/dataSlice';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const client = createApolloClient();
    const dispatch = useDispatch();
    const fetchFavourites = async () => {
        const { data: media } = await client.query({
            query: FETCH_MEDIA,
        });

        const { data: favorites } = await client.query({
            query: FETCH_FAVORITES_MEDIA('zaIyMbALWOSLogDTbV5oGXESh6u1'),
        });

        const idSet = new Set(favorites.getFavorites.map(item => item.id));
        const commonItems = media.media.filter(item => idSet.has(item.id));
        dispatch(setMedia(media.media));
        dispatch(setFavoritesMedia(commonItems));
    };

    useEffect(() => {
        fetchFavourites().then();
    }, []);

    return (
        <AppShell
          header={{ height: 60 }}
          padding="md"
        >
            <AppShell.Header>
                <Header />
            </AppShell.Header>
            <AppShell.Main pt={10}>
                {children}
            </AppShell.Main>
        </AppShell>
    );
};
