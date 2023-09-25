import { Button, Container, Flex, Skeleton, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { CardDetail } from '@/components/atoms/CardDetail/CardDetail';
import { fetchMovieDetail } from '@/services/movie/movie.service';
import { IMediaDetail } from '@/models/interfaces/mediaDetail.interface';
import classes from './MediaDetail.module.scss';

const MediaDetail = () => {
    const [media, setMedia] = useState<IMediaDetail>();
    const [loading, setLoading] = useState<boolean>(true);
    const mediaData = useSelector((data) => data);
    const router = useRouter();

    const getMediaDetail = async (id: number) => {
        const response: IMediaDetail = await fetchMovieDetail(id);
        setMedia(response);
        setLoading(false);
    };

    useEffect(() => {
        console.log('mediaData');
        console.log(mediaData);
        // eslint-disable-next-line no-void
        void getMediaDetail(565770);
    }, []);

    if (loading) {
        return (
            <>
                <Container m={10} direction="column" gap="sm" justify="center" maw={960} mx="auto">
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
        <Flex direction="column" gap="sm" justify="center" maw={960} mx="auto">
            <Button
              variant="default"
              className={classes.backHome}
              mt={10}
              px={5}
              onClick={() => { router.back(); }}
            >
                Back
            </Button>

            <CardDetail
              title={media?.title}
              id={media?.id}
              releaseDate={media?.release_date}
              image={media?.poster_image}
              summary={media?.overview}
              genres={media?.genres}
              productionCompanies={media?.productionCompanies}
              tagline={media?.tagline}
            />
        </Flex>
    );
};

export default MediaDetail;
