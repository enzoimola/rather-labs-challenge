import React, {
    createContext,
    PropsWithChildren,
    ReactElement,
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut, UserCredential, User,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../firebase.js';
import NotAllowedAccess from '@/components/atoms/NotAllowedAccess';

type AuthContextType = {
    isLoggedIn: boolean;
    signup: (email: string, password: string) => Promise<string>,
    login: (email: string, password: string) => void,
    userLogged: User | null,
    logout: () => void,
};

export const authContext = createContext<AuthContextType>({
    isLoggedIn: true,
    signup: async () => '',
    login: async () => {},
    userLogged: null,
    logout: () => {},
});

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth content');
    return context;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [userLogged, setUserLogged] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        setIsLoggedIn(Boolean(localStorage.getItem('uid')));
    }, [setIsLoggedIn]);

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUserLogged(currentUser);
        });
    }, []);
    const signup = async (email: string, password: string): Promise<string> => {
        try {
            const userResp: UserCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            return userResp.user.uid;
        } catch (e: unknown) {
            throw new Error('This email is already taken');
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        try {
            // eslint-disable-next-line max-len
            const { user }: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('uid', user.uid);
            setIsLoggedIn(true);
        } catch (e: unknown) {
            console.log(e);
            throw new Error('Invalid credentials');
        }
    };

    const logout = async (): Promise<void> => {
        await signOut(auth);
        localStorage.removeItem('uid');
    };

    return (
            <authContext.Provider
              value={{ isLoggedIn, signup, login, userLogged, logout }}
            >
                {children}
            </authContext.Provider>
    );
};

export const ProtectRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    if ((!isLoggedIn && router.pathname !== '/auth/login' && router.pathname !== '/auth/register')) {
        return <NotAllowedAccess />;
    }
    return <>{children}</>;
};
