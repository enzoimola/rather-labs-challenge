import React, { useEffect, useState } from 'react';
import { Container, Skeleton } from '@mantine/core';
import { MediaSearch } from '@/components/atoms/MediaSearch/MediaSearch';
import { MediaGrid } from '@/components/molecules/MediaGrid/MediaGrid';
import { IMedia } from '@/models/interfaces/media.interface';
import { fetchMedia } from '@/services/movie/movie.service';

export const Media: React.FC = () => {
    // const dispatch = useDispatch();
    const [media, setMedia] = useState<Array<IMedia>>([]);
    const [loadingPage, setLoadingPage] = useState<boolean>(true);

    const getMovies = async (search?: string) => {
        const response: Array<IMedia> = await fetchMedia(search);
        setMedia(response);
        // dispatch(setMedia(response));
    };

    const onChange = (search: string) => {
        // eslint-disable-next-line no-void
        void getMovies(search);
    };

    useEffect(() => {
        setLoadingPage(false);
        // eslint-disable-next-line no-void
        void getMovies();
    }, []);

    if (loadingPage) {
        return (
            <>
                <Container m={10} direction="column" gap="sm" justify="center" w={960} mx="auto">
                    <Skeleton height={300} radius="xl" />
                    <Skeleton height={50} circle mb="xl" mt="xl" />
                    <Skeleton height={20} radius="xl" />
                    <Skeleton height={20} mt={6} radius="xl" />
                    <Skeleton height={20} mt={6} radius="xl" />
                    <Skeleton height={20} mt={6} radius="xl" width="70%" />
                </Container>
            </>
        );
    }

    return (
        <>
            <MediaSearch onChange={onChange} />
            <MediaGrid media={media} />
        </>
    );
};
