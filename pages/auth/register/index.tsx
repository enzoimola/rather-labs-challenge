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
import classes from '../login/Login.module.scss';
import { useAuth } from '@/context/auth';

const Register: React.FC = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
        const passwordRef = useRef<HTMLInputElement | null>(null);
        const [error, setError] = useState('');
        const [userRegistered, setUserRegistered] = useState<boolean>(false);
        const [loadingRegisterBtn, setRegisterLoadingBtn] = useState<boolean>(false);
        const router = useRouter();
        const { signup } = useAuth();
        const checkValidEmail = (emailInput: string) => /\S+@\S+\.\S+/.test(emailInput);
        const [loadingBackBtn, setBackLoadingBtn] = useState(false);
        const onBackHandler = (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            setBackLoadingBtn(true);
            router.push('/auth/login');
        };

        const registerUser = async () => {
            const { current: email } = emailRef;
            const { current: password } = passwordRef;
            if (email?.value && password?.value) {
                try {
                    await signup(email.value, password.value);
                    setUserRegistered(true);
                } catch (e) {
                    notifications.show({
                        title: 'Error',
                        message: String(e),
                    });
                } finally {
                    setRegisterLoadingBtn(false);
                }
            }
        };

        const handleRegisterSubmit = async (e: React.SyntheticEvent) => {
            e.preventDefault();
            const { current: email } = emailRef;
            const { current: password } = passwordRef;
            setRegisterLoadingBtn(false);

            const checkedEmail: boolean = checkValidEmail(email!.value);
            const checkedPassword: boolean = password!.value.length > 5;

            setError(!checkedEmail ? 'Email is invalid, please type an valid email' :
                !checkedPassword ? 'Password should include at least 6 characters' : '');

            if (checkedEmail && checkedPassword) {
                setRegisterLoadingBtn(true);
                await registerUser();
            }
        };

        const registerForm = (<>
                <form onSubmit={handleRegisterSubmit}>
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
                {!userRegistered && registerForm}
                {userRegistered && msgUserRegister}
            </Paper>

                </Container>);
    };
export default Register;
