'use client';

import { TextInput } from '@mantine/core';
import React, { useEffect } from 'react';
import { useDebouncedState } from '@mantine/hooks';

type MediaSearchType = {
    onChange: (search: string) => void
};
export const MediaSearch: React.FC<MediaSearchType> = ({ onChange }) => {
    const [search, setSearch] = useDebouncedState('', 500);

    useEffect(() => {
        onChange(search);
    }, [search]);

    return (
        <TextInput
          defaultValue={search}
          radius="xl"
          size="md"
          placeholder="Search movies or TV shows by gender or title"
          onChange={(e) => setSearch(e.target.value)}
        />);
};
