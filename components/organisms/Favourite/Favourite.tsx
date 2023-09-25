import React, { useEffect, useState } from 'react';
import { MediaSearch } from '@/components/atoms/MediaSearch/MediaSearch';
import { MediaGrid } from '@/components/molecules/MediaGrid/MediaGrid';
import { IMedia } from '@/models/interfaces/media.interface';
import { fetchFavourites } from '@/services/movie/movie.service';

export const Favourite: React.FC = () => {
    // const dispatch = useDispatch();
    const [favourite, setFavourite] = useState<Array<IMedia>>([]);

    const getFavourites = async (search?: string) => {
        //todo change aoi
        const response: Array<IMedia> = await fetchFavourites(search);
        setFavourite(response);
        // dispatch(setMedia(response));
    };

    const onChange = (search: string) => {
        // eslint-disable-next-line no-void
        void getFavourites(search);
    };

    useEffect(() => {
        // eslint-disable-next-line no-void
        void getFavourites();
    }, []);
    return (
        <>
            <MediaSearch onChange={onChange} />
            <MediaGrid media={favourite} />
        </>
    );
};
