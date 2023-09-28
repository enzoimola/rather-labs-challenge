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
import classes from '../login/Login.module.scss';
import { useAuth } from '@/context/auth';

const Login = () => {
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState('');
    const [userRegisted, setUserRegisted] = useState<boolean>(false);
    const [loadingRegisterBtn, setRegisterLoadingBtn] = useState<boolean>(false);
    const router = useRouter();
    const { signup } = useAuth();

    const checkValidEmail = (emailInput) => /\S+@\S+\.\S+/.test(emailInput);
    const [loadingBackBtn, setBackLoadingBtn] = useState(false);
    const onBackHandler = () => {
        setBackLoadingBtn(true);
        router.push('/auth/login');
    };

    const registerUser = async () => {
        try {
            await signup(email.current.value, password.current.value);
            setUserRegisted(true);
        } catch (e) {
            console.log(e);
        }
        setRegisterLoadingBtn(false);
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setRegisterLoadingBtn(false);

        const checkedEmail = checkValidEmail(email.current.value);
        const checkedPassword = password.current.value.length > 5;

        setError(!checkedEmail ? 'Email is invalid, please type an valid email' :
            !checkedPassword ? 'Password should include at least 6 characters' : null);

        if (checkedEmail && checkedPassword) {
            setRegisterLoadingBtn(true);
            await registerUser();
        }
    };

    const registerForm = (<><form onSubmit={handleRegisterSubmit}>
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

            <Button fullWidth mt="xl" type="submit" value="Submit" loading={loadingRegisterBtn}>
                Register
            </Button>
                            </form>
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              size="xs"
              onClick={() => router.push('/auth/login')}
              mt={20}
            >
                Already have an account? Login
            </Anchor>
                          </>

    );

    const msgUserRegister = (<>
        <Title order={4} ta="center" className={classes.title}>
            Registration successful!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={20}>
            Please proceed to the login page to log in to your account.
        </Text>
        <Button
          onClick={onBackHandler}
          fullWidth
          mt="xl"
          loading={loadingBackBtn}
        >
            Go to login
        </Button>
                             </>);

    return (<Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
            Welcome to RLabs Media!

        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={20}>
            {' Create an account to Explore the Best in Cinema '
                }
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            {!userRegisted && registerForm}
            {userRegisted && msgUserRegister}
        </Paper>

            </Container>);
};

export default Login;
