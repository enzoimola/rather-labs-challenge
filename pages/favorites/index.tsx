import { Flex, Title } from '@mantine/core';
import { Media } from '@/components/organisms/Media/Media';

export default function Favorites() {
    return (
        <>
            <Flex direction="column" gap="sm" justify="center" maw={960} mx="auto">
                <Title>Favourites media</Title>
                <Media />
            </Flex>
        </>
    );
}
