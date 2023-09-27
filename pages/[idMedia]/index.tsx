import { gql } from '@apollo/client';
import React from 'react';
import { GetStaticPaths } from 'next';
import MediaDetail from '@/components/molecules/MediaDetail';

import { createApolloClient } from '@/apollo-client';
import { IMediaDetail } from '@/models/interfaces/mediaDetail.interface';

export const getStaticPaths: GetStaticPaths<DetailType> = async () => ({
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
});

export async function getStaticProps({ params }) {
    const client = createApolloClient();
    const { data } = await client.query({
        query: gql`
            query {
              detailMedia (id:${params.idMedia},isMovie: true ) {
                id,
                name,
                posterPath
                releaseDate,
                voteAverage,
                overview,
                tagline
              }
            }
    `,
    });

    return {
        props: {
            detailMedia: data.detailMedia,
        },
    };
}

export type DetailType = { detailMedia: IMediaDetail };
const Detail: React.FC<DetailType> = ({ detailMedia }) => {
    console.log(detailMedia);
    return <MediaDetail detailMedia={detailMedia} />;
};
export default Detail;
