import { AppShell } from '@mantine/core';
import { Header } from '@/components/molecules/Header/Header';
import { MainLayout } from '@/layouts/MainLayout';

export function Welcome() {
    return (
        <AppShell
          header={{ height: 60 }}
          padding="md"
        >
            <AppShell.Main pt={10}>
                <MainLayout />
            </AppShell.Main>
        </AppShell>
    );
}
