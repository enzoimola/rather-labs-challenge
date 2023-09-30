import { AppShell } from '@mantine/core';

import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserCredential } from 'firebase/auth';
import { Header } from '@/components/molecules/Header/Header';
import { createApolloClient } from '@/apollo-client';
import { FETCH_FAVORITES_MEDIA, FETCH_MEDIA } from '@/graphql/queries';
import { selectUserId, setFavoritesMedia, setMedia } from '@/store/dataSlice';
import SkeletonHeader from '@/components/atoms/skeletonHeader';
import SkeletonMedia from '@/components/atoms/skeletonMedia';
import { useAuth } from '@/context/auth';
import { ErrorBoundary } from '@/components/atoms/ErrorBoundary/ErrorBoundary';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const client = createApolloClient();
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const [loadingFavs, setLoadingFavs] = useState<boolean>(false);
    const { userLogged } : UserCredential = useAuth();

    const fetchFavourites = async () => {
        try {
            const { data: media } = await client.query({
                query: FETCH_MEDIA,
            });

            const { data: favorites } = await client.query({
                query: FETCH_FAVORITES_MEDIA(userId || userLogged.uid),
            });
            setLoadingFavs(favorites.getFavorites.length >= 0);

            const idSet = new Set(favorites.getFavorites.map(item => item.id));
            const commonItems = media.media.filter(item => idSet.has(item.id));
            dispatch(setMedia(media.media));
            dispatch(setFavoritesMedia(commonItems));
        } catch (e) {
            return (<ErrorBoundary />);
        }
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
                {loadingFavs && <Header />}
                {!loadingFavs && <SkeletonHeader />}
            </AppShell.Header>
            <AppShell.Main pt={80}>
                {loadingFavs && children}
                {!loadingFavs && <SkeletonMedia />}
            </AppShell.Main>
        </AppShell>
    );
};
