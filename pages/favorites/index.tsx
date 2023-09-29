import { Flex, Title } from '@mantine/core';
import React from 'react';
import { createApolloClient } from '@/apollo-client';
import { FETCH_FAVORITES_MEDIA } from '@/graphql/queries';
import { IMedia } from '@/models/interfaces/media.interface';
import { FavoriteWrapper } from '@/components/organisms/Favorite/Favorite';

export async function getStaticProps() {
    const client = createApolloClient();
    const { data } = await client.query({
        query: FETCH_FAVORITES_MEDIA,
    });

    return {
        props: {
            favorites: data.getFavorites,
        },
    };
}

export type FavoritesType = { favorites: Array<IMedia> };

const Favorites: React.FC<FavoritesType> = ({ favorites }) => (<>
        <Flex direction="column" gap="sm" justify="center" maw={960} mx="auto">
            <Title>Favourites media</Title>
            <FavoriteWrapper />
        </Flex>
                                                               </>);

export default Favorites;
