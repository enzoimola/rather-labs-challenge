import {
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Text,
    Container,
    Button, Anchor,
} from '@mantine/core';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';
import classes from './Login.module.scss';
import { useAuth } from '@/context/auth';

const Login: React.FC = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState('');
    const [loadingBtn, setLoadingBtn] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const checkValidEmail = (emailInput: string) => /\S+@\S+\.\S+/.test(emailInput);

    const handleLoginSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const { current: email } = emailRef;
        const { current: password } = passwordRef;
        setLoadingBtn(false);

        const checkedEmail: boolean = checkValidEmail(email!.value);
        const checkedPassword: boolean = password!.value?.length > 5;

        setError(!checkedEmail ? 'Email is invalid, please type an valid email' :
            !checkedPassword ? 'Password should include at least 6 characters' : '');

        if (checkedEmail && checkedPassword && email && password) {
            setLoadingBtn(true);
            try {
                await login(email.value, password.value);
                router.push({ pathname: '/' }).then();
            } catch (err: unknown) {
                notifications.show({
                    title: 'Error',
                    message: String(err),
                });
                password.value = '';
            } finally {
                setLoadingBtn(false);
            }
        }
    };

    return (<Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
            Welcome back to RLabs Media!

        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={20}>
            🎬 Log in to Explore the Best in Cinema 🍿
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={handleLoginSubmit}>
                <TextInput
                  label="Email"
                  placeholder="you@ratherlabs.dev"
                  ref={emailRef}
                  required
                />
                <PasswordInput label="Password" placeholder="Your password" ref={passwordRef} required mt="md" />

                <Text className={classes.error} c="dimmed" size="sm" ta="center" mt={10}>
                    {error && error}
                </Text>

                <Button fullWidth mt="xl" type="submit" value="Submit" loading={loadingBtn}>
                    Login
                </Button>
            </form>

            <Anchor
              component="button"
              type="button"
              c="dimmed"
              size="xs"
              onClick={() => router.push('/auth/register')}
              mt={20}
            >
                Don&apos;t have an account? Register
            </Anchor>
        </Paper>

            </Container>);
};

export default Login;
