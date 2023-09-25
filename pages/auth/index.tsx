import {
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import { useRef, useState } from 'react';
import classes from './Auth.module.scss';

const Auth = () => {
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState('');
    const checkValidEmail = (emailInput) => /\S+@\S+\.\S+/.test(emailInput);
    function handleLoginSubmit(e) {
        e.preventDefault();
        console.log('on login', email.current.value);
        const checkedEmail = checkValidEmail(email.current.value);

        setError(!checkedEmail ? 'Email is invalid, please type an valid email' : null);

        if (checkedEmail) {
            //todo navigate to main page
        }
    }

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
                <Button fullWidth mt="xl" type="submit" value="Submit">
                    Sign in
                </Button>
            </form>

        </Paper>
            </Container>);
};

export default Auth;
