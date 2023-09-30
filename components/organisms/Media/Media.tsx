import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MediaSearch } from '@/components/atoms/MediaSearch/MediaSearch';
import { MediaGrid } from '@/components/molecules/MediaGrid/MediaGrid';
import { IMedia } from '@/models/interfaces/media.interface';
import { selectMedia } from '@/store/dataSlice';
import SkeletonMedia from '@/components/atoms/SkeletonMedia';
import { PageNoData } from '@/components/atoms/PageNoData/PageNoData';

export const Media: React.FC = () => {
    const [media, setMedia] = useState<Array<IMedia>>([]);
    const [loadingGrid, setLoadingGrid] = useState<boolean>(true);
    const [noDataFound, setNoDataFound] = useState<boolean>(false);
    const mediaFetched = useSelector(selectMedia);

    const getMovies = (search?: string) => {
        if (!search) {
            setMedia(mediaFetched);
            return;
        }
        const result = media.filter((md) => md.name.toLowerCase().includes(search.toLowerCase()));
        setNoDataFound(result.length === 0);
        setMedia(result);
    };

    const onChange = (search: string) => getMovies(search);

    useEffect(() => {
        setMedia(mediaFetched);
        setLoadingGrid(false);
    }, [mediaFetched]);

    return (
        <>
            <MediaSearch onChange={onChange} />
            {!loadingGrid && <MediaGrid media={media} />}
            {(!loadingGrid && media.length === 0 && !noDataFound) && <SkeletonMedia />}
            {noDataFound && <PageNoData
              text="No films or TV shows matching your search were found."
              title={"It seems we're in the Upside Down."}
              returnBack={false}
            />}

        </>
    );
};
