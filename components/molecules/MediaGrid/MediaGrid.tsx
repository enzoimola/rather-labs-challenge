import { Grid } from '@mantine/core';
import React from 'react';
import { useRouter } from 'next/router';
import { MediaCard } from '@/components/atoms/MediaCard/MediaCard';
import { IMedia } from '@/models/interfaces/media.interface';

type MediaGridType = {
    media: Array<IMedia>
};
export const MediaGrid: React.FC<MediaGridType> = ({ media }) => {
    const router = useRouter();

    const spanBase = router.pathname === ('/favorites') ?
                        media.length === 1 ? 12 : media.length === 2 ? 6 : 4 : 4;

    return (
        <Grid>
            {media.map((m: IMedia) => (
                <Grid.Col key={m.id} span={{ xs: 6, base: 12, lg: spanBase }}>
                    <MediaCard
                      id={m.id}
                      name={m.name}
                      posterPath={m.posterPath}
                      releaseDate={m.releaseDate}
                      voteAverage={m.voteAverage}
                      isMovie={m.isMovie}
                    />
                </Grid.Col>
            ))}
        </Grid>
    );
};
