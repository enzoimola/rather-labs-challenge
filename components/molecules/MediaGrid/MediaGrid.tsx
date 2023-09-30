import { Grid } from '@mantine/core';
import React from 'react';
import { MediaCard } from '@/components/atoms/MediaCard/MediaCard';
import { IMedia } from '@/models/interfaces/media.interface';

type MediaGridType = {
    media: Array<IMedia>
};
export const MediaGrid: React.FC<MediaGridType> = ({ media }) => (
        <Grid>
            {media.map((m: IMedia) => (
                <Grid.Col key={m.id} span={{ base: 12, md: 4 }}>
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
