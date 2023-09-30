import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MediaSearch } from '@/components/atoms/MediaSearch/MediaSearch';
import { MediaGrid } from '@/components/molecules/MediaGrid/MediaGrid';
import { IMedia } from '@/models/interfaces/media.interface';

export const FavoriteWrapper: React.FC = () => {
    const [media, setMedia] = useState<Array<IMedia>>([]);
    const mediaFetched = useSelector((data) => data);

    const getMovies = (search?: string) => {
        if (!search) {
            setMedia(mediaFetched.data.favorites);
            return;
        }
        const result = media.filter((md) => md.name.toLowerCase().includes(search.toLowerCase()));
        setMedia(result);
    };

    const onChange = (search: string) => {
        getMovies(search);
    };

    useEffect(() => {
        setMedia(mediaFetched.data.favorites);
    }, [mediaFetched]);

    return (
        <>
            <MediaSearch onChange={onChange} />
            <MediaGrid media={media} />
        </>
    );
};
