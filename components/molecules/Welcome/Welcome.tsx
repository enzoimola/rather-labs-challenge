import { AppShell, useMantineColorScheme } from '@mantine/core';
import { useEffect } from 'react';
import { Header } from '@/components/molecules/Header/Header';
import { MainLayout } from '@/layouts/MainLayout';

export function Welcome() {
    return (
        <AppShell
          header={{ height: 60 }}
          padding="md"
        >
            <AppShell.Header>
                <Header />
            </AppShell.Header>

            <AppShell.Main>
                <MainLayout />
            </AppShell.Main>
        </AppShell>
    );
}
