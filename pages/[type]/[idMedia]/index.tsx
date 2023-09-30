import React from 'react';
import { GetStaticPaths } from 'next';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import MediaDetail from '@/components/molecules/MediaDetail';

import { createApolloClient } from '@/apollo-client';
import { IMediaDetail } from '@/models/interfaces/mediaDetail.interface';
import { FETCH_DETAIL_MEDIA } from '@/graphql/queries';
import { MainLayout } from '@/layouts/MainLayout';
import { useAuth } from '@/context/auth';

export const getStaticPaths: GetStaticPaths<DetailType> = async () => ({
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
});

export async function getStaticProps({ params }) {
    const router = useRouter();
    const { logout } = useAuth();

    try {
        const client = createApolloClient();
        const movieParam = params.type === 'media';
        const { data } = await client.query({
            query: FETCH_DETAIL_MEDIA(params.idMedia, movieParam),
        });

        return {
            props: { detailMedia: data.detailMedia },
        };
    } catch (error) {
        notifications.show({
            title: 'Error',
            message: 'Fail fetching external api',
        });
        await logout();
        router.replace('/auth/login').then();
        return { props: { detailMedia: [] } };
    }
}

export type DetailType = { detailMedia: IMediaDetail };
const Detail: React.FC<DetailType> = ({ detailMedia }) =>
    <MainLayout>
        <MediaDetail detailMedia={detailMedia} />
    </MainLayout>;
export default Detail;
