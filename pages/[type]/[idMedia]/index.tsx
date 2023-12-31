import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { notifications } from '@mantine/notifications';
import MediaDetail from '@/components/molecules/MediaDetail';

import { createApolloClient } from '@/apollo-client';
import { IMediaDetail } from '@/models/interfaces/media/mediaDetail.interface';
import { FETCH_DETAIL_MEDIA } from '@/graphql/queries';
import { MainLayout } from '@/layouts/MainLayout';

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        if (!params) return { props: { detailMedia: {} } };
        const client = createApolloClient;
        const movieParam = params?.type === 'media';
        const idMediaParam: string = params ? String(params?.idMedia) : '';
        const { data } = await client.query({
            query: FETCH_DETAIL_MEDIA(idMediaParam, movieParam),
        });

        return {
            props: { detailMedia: data.detailMedia },
        };
    } catch (error) {
        notifications.show({
            title: 'Error',
            message: 'Fail fetching external api',
        });
        return { props: { detailMedia: [] } };
    }
};

export type DetailType = { detailMedia: IMediaDetail };
const Detail: React.FC<DetailType> = ({ detailMedia }) =>
    <MainLayout>
        <MediaDetail detailMedia={detailMedia} />
    </MainLayout>;
export default Detail;
