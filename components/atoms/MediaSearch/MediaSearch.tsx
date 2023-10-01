'use client';

import { TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useDebouncedState } from '@mantine/hooks';

type MediaSearchType = {
    onChange: (search: string) => void
};
export const MediaSearch: React.FC<MediaSearchType> = ({ onChange }) => {
    const [search, setSearch] = useDebouncedState('', 500);
    const [backspacePressed, setBackspacePressed] = useState<boolean>(false);

    useEffect(() => {
        onChange(backspacePressed, search);
    }, [search]);

    return (
        <TextInput
          defaultValue={search}
          radius="xl"
          size="md"
          placeholder="Find Movies and TV Shows by their titles"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => setBackspacePressed(e.key === 'Backspace')}
        />);
};
