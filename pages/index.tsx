import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createApolloClient } from '@/apollo-client';
import { FETCH_FAVORITES_MEDIA, FETCH_MEDIA } from '../graphql/queries';
import { IMedia } from '@/models/interfaces/media.interface';
import { setFavoritesMedia, setMedia } from '@/store/dataSlice';
import { MainLayout } from '@/layouts/MainLayout';
import { IFavMedia } from '@/models/interfaces/favMedia.interface';

export async function getStaticProps() {
    const client = createApolloClient();
    const { data: dataMedia } = await client.query({
        query: FETCH_MEDIA,

    });
    const { data: dataFav } = await client.query({
        query: FETCH_FAVORITES_MEDIA,
    });

    return {
        props: {
            media: dataMedia.media,
            favorites: dataFav.getFavorites,
        },
    };
}
export type MediaType = { media: Array<IMedia>, favorites: Array<IFavMedia> };

const HomePage: React.FC<MediaType> = ({ media, favorites }) => {
    const dispatch = useDispatch();
    const mediaFetched = useSelector((data) => data);

    console.log('favorites');
    console.log(favorites);

    useEffect(() => {
        dispatch(setMedia(media));
    }, []);

    useEffect(() => {
        const idSet = new Set(favorites.map(item => item.id));

        const commonItems = media.filter(item => idSet.has(item.id));
        console.log('Cambio favoritos!! ');
        console.log(commonItems);
        dispatch(setFavoritesMedia(commonItems));
    }, [favorites]);

    useEffect(() => {
        console.log('escuchando favorites stoore desde index !!');
        console.log(mediaFetched.data.favorites);
    }, [mediaFetched.data.favorites]);

    return (<MainLayout />);
};

export default HomePage;
