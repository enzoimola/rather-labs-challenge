import React, { useEffect, useState } from 'react';
import { Container, Skeleton } from '@mantine/core';
import { useSelector } from 'react-redux';
import { MediaSearch } from '@/components/atoms/MediaSearch/MediaSearch';
import { MediaGrid } from '@/components/molecules/MediaGrid/MediaGrid';
import { IMedia } from '@/models/interfaces/media.interface';
import { selectMedia } from '@/store/dataSlice';

export const Media: React.FC = () => {
    const [media, setMedia] = useState<Array<IMedia>>([]);
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const mediaFetched = useSelector(selectMedia);

    const getMovies = (search?: string) => {
        if (!search) {
            setMedia(mediaFetched);
            return;
        }
        const result = media.filter((md) => md.name.toLowerCase().includes(search.toLowerCase()));
        setMedia(result);
    };

    const onChange = (search: string) => getMovies(search);

    useEffect(() => {
        setMedia(mediaFetched);
        setLoadingPage(false);
    }, [mediaFetched]);

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
