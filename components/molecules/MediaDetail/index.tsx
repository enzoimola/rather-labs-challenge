import { Button, Container, Flex, Skeleton } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MediaCardDetail } from '@/components/atoms/MediaCardDetail/MediaCardDetail';
import { IMediaDetail } from '@/models/interfaces/mediaDetail.interface';
import classes from './MediaDetail.module.scss';
import { DetailType } from '@/pages/[type]/[idMedia]';
import { MediaNoData } from '@/components/atoms/MediaNoData/MediaNoData';

const MediaDetail: React.FC<DetailType> = ({ detailMedia }) => {
    const [media, setMedia] = useState<IMediaDetail>();
    const [loadingBackBtn, setBackLoadingBtn] = useState(false);
    const [loadingPage, setLoadingPage] = useState<boolean>(true);

    const router = useRouter();

    const setMediaDetail = (detail: IMediaDetail) => {
        setMedia(detail);
        setLoadingPage(false);
    };

    useEffect(() => {
        setMediaDetail(detailMedia);
    }, [detailMedia]);

    const onBackHandler = (e) => {
        e.preventDefault();
        setBackLoadingBtn(true);
        router.push('/');
    };

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

    if (!media?.id) {
        return (
            <MediaNoData text="No films or TV shows matching." title={"It seems we're in the Upside Down."} returnBack={false} />
        );
    }

    return (
        <Flex direction="column" gap="sm" justify="center" maw={960} mx="auto">
            <Button
              onClick={onBackHandler}
              variant="default"
              loading={loadingBackBtn}
              className={classes.backHome}
              mt={10}
              px={5}
            >
                Back to home
            </Button>

            <MediaCardDetail
              id={media?.id}
              releaseDate={media?.releaseDate}
              posterPath={media?.posterPath}
              overview={media?.overview}
              tagline={media?.tagline}
              voteAverage={media?.voteAverage}
              name={media?.name}
              actors={media?.actors}
            />
        </Flex>
    );
};

export default MediaDetail;
