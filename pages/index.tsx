import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createApolloClient } from '@/apollo-client';
import { FETCH_MEDIA } from '../graphql/queries';
import { IMedia } from '@/models/interfaces/media.interface';
import { setMedia } from '@/store/dataSlice';
import { MainLayout } from '@/layouts/MainLayout';

export async function getStaticProps() {
    const client = createApolloClient();
    const { data } = await client.query({
        query: FETCH_MEDIA,
    });

    return {
        props: {
            media: data.media,
        },
    };
}
export type MediaType = { media: Array<IMedia> };

const HomePage: React.FC<MediaType> = ({ media }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMedia(media));
    }, []);

    return (<MainLayout />);
};

export default HomePage;
