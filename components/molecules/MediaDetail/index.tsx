import { Button, Container, Flex, Group, Skeleton, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CardDetail } from '@/components/atoms/CardDetail/CardDetail';
import { IMediaDetail } from '@/models/interfaces/mediaDetail.interface';
import classes from './MediaDetail.module.scss';
import { DetailType } from '@/pages/[idMedia]';

const MediaDetail: React.FC<DetailType> = ({ detailMedia }) => {
    const [media, setMedia] = useState<IMediaDetail>();
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const setMediaDetail = (detail: IMediaDetail) => {
        setLoading(false);
        setMedia(detail);
    };

    useEffect(() => {
        setMediaDetail(detailMedia);
    }, [detailMedia]);
    console.log('media', media?.id);
    console.log(detailMedia);

    const msgNoData = <>
            <Group justify="center" my={10} flex>
                <Text>There is no data to show</Text>
            </Group>
            <Group justify="center" my={10} flex>
                <Button radius="md" onClick={() => router.push('/')}>
                    Back to home
                </Button>
            </Group>
                      </>;

    if (!media?.id) {
        return (
            <Container m={10} direction="column" gap="sm" justify="center" maw={960} mx="auto">
                <Skeleton height={300} radius="xl" />
                {!loading && msgNoData}
                <Skeleton height={50} circle mb="xl" mt="xl" />
                <Skeleton height={20} radius="xl" />
                <Skeleton height={20} mt={6} radius="xl" />
                <Skeleton height={20} mt={6} radius="xl" />
                <Skeleton height={20} mt={6} radius="xl" width="70%" />
            </Container>
        );
    }

    return (
        <Flex direction="column" gap="sm" justify="center" maw={960} mx="auto">
            <Button
              onClick={() => router.push('/')}
              variant="default"
              className={classes.backHome}
              mt={10}
              px={5}
            >
                Back to home
            </Button>

            <CardDetail
              title={media?.name}
              id={media?.id}
              releaseDate={media?.releaseDate}
              image={media?.posterPath}
              summary={media?.overview}
              tagline={media?.tagline}
              voteAverage={media?.voteAverage}
            />
        </Flex>
    );
};

export default MediaDetail;
