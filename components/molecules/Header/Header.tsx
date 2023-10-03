import {
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem, Indicator,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notifications } from '@mantine/notifications';
import classes from './Header.module.scss';
import { useAuth } from '@/context/auth';
import { selectFavourites } from '@/store/dataSlice';
import { IMedia } from '@/models/interfaces/media/media.interface';

export const Header = () => {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const router = useRouter();
    const [loadingLogoutBtn, setLoadingLogoutBtn] = useState(false);
    const { logout } = useAuth();
    const favs: Array<IMedia> = useSelector(selectFavourites);

    const onLogoutHandler = async () => {
        setLoadingLogoutBtn(true);
        try {
            await logout();
            router.replace('/auth/login').then();
        } catch (e: any) {
            notifications.show({
                title: 'Error',
                message: 'Api fail, please try again',
            });
        }
    };

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">

                    <Group h="100%" gap={0} visibleFrom="sm">
                       <Link href={{ pathname: '/' }} className={classes.link}>Home</Link>
                        {favs.length > 0 && <Link href={{ pathname: '/favorites' }} className={classes.link}>
                            <Indicator color="red" size={15} label={favs.length}>
                                Favourites
                            </Indicator>
                                            </Link>}
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
                    {favs.length > 0 && <Link href={{ pathname: '/favorites' }} className={classes.link}>
                        <Indicator color="red" size={15} label={favs.length}>
                            Favourites
                        </Indicator>
                                        </Link>}
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
