import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MediaSearch } from '@/components/atoms/MediaSearch/MediaSearch';
import { MediaGrid } from '@/components/molecules/MediaGrid/MediaGrid';
import { IMedia } from '@/models/interfaces/media.interface';
import SkeletonMedia from '@/components/atoms/SkeletonMedia';
import { PageNoData } from '@/components/atoms/PageNoData/PageNoData';

export const FavoriteWrapper: React.FC = () => {
    const [media, setMedia] = useState<Array<IMedia>>([]);
    const mediaFetched = useSelector((data) => data);
    const [loadingGrid, setLoadingGrid] = useState<boolean>(true);
    const [noDataFound, setNoDataFound] = useState<boolean>(false);

    const getMovies = (search?: string) => {
        if (!search) {
            setMedia(mediaFetched.data.favorites);
            setNoDataFound(false);
            return;
        }
        const result = media.filter((md) => md.name.toLowerCase().includes(search.toLowerCase()));
        setNoDataFound(result.length === 0);
        setMedia(result);
    };

    const onChange = (search: string) => { getMovies(search); };

    useEffect(() => {
        setMedia(mediaFetched.data.favorites);
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
