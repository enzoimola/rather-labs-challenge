import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createApolloClient } from '@/apollo-client';
import { FETCH_FAVORITES_MEDIA, FETCH_MEDIA, FETCH_URL_MEDIA } from '../graphql/queries';
import { IMedia } from '@/models/interfaces/media.interface';
import { setFavoritesMedia, setMedia } from '@/store/dataSlice';
import { MainLayout } from '@/layouts/MainLayout';
import { IFavMedia } from '@/models/interfaces/favMedia.interface';
import { IURLMedia } from '@/models/interfaces/getURLMedia.interface';

export async function getStaticProps() {
    const client = createApolloClient();
    const { data: dataMedia } = await client.query({
        query: FETCH_MEDIA,

    });
    // const { data: dataFav } = await client.query({
    //     query: FETCH_FAVORITES_MEDIA,
    // });
    const { data: dataURLM } = await client.query({
        query: FETCH_URL_MEDIA,
    });

    return {
        props: {
            media: dataMedia.media,
            // favorites: dataFav.getFavorites,
            urls: dataURLM.getURLMedia,
        },
    };
}
export type MediaType = { media: Array<IMedia>, favorites: Array<IFavMedia>, urls: Array<IURLMedia> };

const HomePage: React.FC<MediaType> = ({ media, favorites, urls }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMedia(media));
    }, []);

    // useEffect(() => {
    //     const idSet = new Set(favorites.map(item => item.id));
    //     const commonItems = media.filter(item => idSet.has(item.id));
    //     dispatch(setFavoritesMedia(commonItems));
    // }, [favorites]);

    return (<MainLayout />);
};

export default HomePage;
