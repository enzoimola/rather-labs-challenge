import {
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import classes from './Header.module.scss';

export const Header = () => {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const router = useRouter();
    const [loadingLogoutBtn, setLoadingLogoutBtn] = useState(false);

    const onLogoutHandler = () => {
        setLoadingLogoutBtn(true);
        router.replace('/auth');
    };

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">

                    <Group h="100%" gap={0} visibleFrom="sm">
                       <Link href={{ pathname: '/' }} className={classes.link}>Home</Link>
                       <Link href={{ pathname: '/favorites' }} className={classes.link}>Favourites</Link>
                    </Group>

                    <Group visibleFrom="sm">
                        <Button
                          onClick={onLogoutHandler}
                          loading={loadingLogoutBtn}
                        >Log out
                        </Button>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
              opened={drawerOpened}
              onClose={closeDrawer}
              size="100%"
              padding="md"
              title="Rather Labs"
              hiddenFrom="sm"
              zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />
                    <Link href={{ pathname: '/' }} className={classes.link}>Home</Link>
                    <Divider my="sm" />
                    <Link href={{ pathname: '/favorites' }} className={classes.link}>Favourites</Link>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        <Button
                          onClick={onLogoutHandler}
                          loading={loadingLogoutBtn}
                        >Log out
                        </Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
};
