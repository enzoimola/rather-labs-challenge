import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI,
        cache: new InMemoryCache(),
    });
