import React, { useEffect, useState } from 'react';
import { MediaSearch } from '@/components/atoms/MediaSearch/MediaSearch';
import { MediaGrid } from '@/components/molecules/MediaGrid/MediaGrid';
import { IMedia } from '@/models/interfaces/media.interface';
import { fetchMedia } from '@/services/movie/movie.service';

export const Media: React.FC = () => {
    // const dispatch = useDispatch();
    const [media, setMedia] = useState<Array<IMedia>>([]);

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
        // eslint-disable-next-line no-void
        void getMovies();
    }, []);
    return (
        <>
            <MediaSearch onChange={onChange} />
            <MediaGrid media={media} />
        </>
    );
};
