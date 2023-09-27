import { Grid } from '@mantine/core';
import React from 'react';
import { MediaCard } from '@/components/atoms/MediaCard/MediaCard';
import { IMedia } from '@/models/interfaces/media.interface';
import { MediaNoData } from '@/components/atoms/MediaNoData/MediaNoData';

type MediaGridType = {
    media: Array<IMedia>
};
export const MediaGrid: React.FC<MediaGridType> = ({ media }) => (
        <Grid>
            {media.length === 0 && <MediaNoData text="No films or TV shows matching your search were found." title={"It seems we're in the Upside Down."} returnBack={false} />}
            {media.map((m: IMedia) => (
                <Grid.Col key={m.id} span={4}>
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
