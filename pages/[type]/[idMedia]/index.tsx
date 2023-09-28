import React from 'react';
import { GetStaticPaths } from 'next';
import MediaDetail from '@/components/molecules/MediaDetail';

import { createApolloClient } from '@/apollo-client';
import { IMediaDetail } from '@/models/interfaces/mediaDetail.interface';
import { FETCH_DETAIL_MEDIA } from '@/graphql/queries';

export const getStaticPaths: GetStaticPaths<DetailType> = async () => ({
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
});

export async function getStaticProps({ params }) {
    const client = createApolloClient();
    const movieParam = params.type === 'movie';
    const { data } = await client.query({
        query: FETCH_DETAIL_MEDIA(params.idMedia, movieParam),
    });

    return {
        props: {
            detailMedia: data.detailMedia,
        },
    };
}

export type DetailType = { detailMedia: IMediaDetail };
const Detail: React.FC<DetailType> = ({ detailMedia }) => <MediaDetail detailMedia={detailMedia} />;
export default Detail;
