import { Button, Flex } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MediaCardDetail } from '@/components/atoms/MediaCardDetail/MediaCardDetail';
import { IMediaDetail } from '@/models/interfaces/media/mediaDetail.interface';
import classes from './MediaDetail.module.scss';
import { DetailType } from '@/pages/[type]/[idMedia]';
import { PageNoData } from '@/components/atoms/PageNoData/PageNoData';
import SkeletonMedia from '@/components/atoms/SkeletonMedia';

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

    const onBackHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setBackLoadingBtn(true);
        router.push('/');
    };

    if (loadingPage) {
        return (<SkeletonMedia />);
    }

    if (!media?.id) {
        return (
            <PageNoData
              text="It seems that the movie or TV show does not exist."
              title="No film or TV show matching."
              returnBack
            />
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
              homepage={media?.homepage}
            />
        </Flex>
    );
};

export default MediaDetail;
