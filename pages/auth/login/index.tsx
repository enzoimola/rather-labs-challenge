import {
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Text,
    Container,
    Button, Anchor,
} from '@mantine/core';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import classes from './Login.module.scss';
import { useAuth } from '@/context/auth';

const Login = () => {
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState('');
    const [firebaseError, setFirebasError] = useState('');
    const [loadingBtn, setLoadingBtn] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const checkValidEmail = (emailInput) => /\S+@\S+\.\S+/.test(emailInput);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoadingBtn(false);

        const checkedEmail = checkValidEmail(email.current.value);
        const checkedPassword = password.current.value.length > 5;

        setError(!checkedEmail ? 'Email is invalid, please type an valid email' :
            !checkedPassword ? 'Password should include at least 6 characters' : null);

        if (checkedEmail && checkedPassword) {
            setLoadingBtn(true);
            try {
                await login(email.current.value, password.current.value);
                router.push({ pathname: '/' });

                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (e) {
                console.log(e.message);
                // todo add notificacion msg
                password.current.value = null;
            }
            // router.push({ pathname: '/' });
            setLoadingBtn(false);
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
                  ref={email}
                  required
                />
                <PasswordInput label="Password" placeholder="Your password" ref={password} required mt="md" />

                <Text className={classes.error} c="dimmed" size="sm" ta="center" mt={10}>
                    {error && error}
                </Text>

                <Button fullWidth mt="xl" type="submit" value="Submit" loading={loadingBtn}>
                    Login
                </Button>
            </form>

            <Anchor component="button" type="button" c="dimmed" size="xs" onClick={() => router.push('/auth/register')} mt={20}>
                Don't have an account? Register
            </Anchor>
        </Paper>

            </Container>);
};

export default Login;
