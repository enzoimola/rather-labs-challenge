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
import { createUser } from '@/services/media/media.service';

type AuthContextType = {
    isAuthenticated: boolean,
    signup: (email: string, password: string) => void,
    login: (email: string, password: string) => void,
    userLogged: User | null,
    logout: () => void,
};

export const authContext = createContext<AuthContextType>({
    isAuthenticated: false,
    signup: () => {},
    login: () => {},
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

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUserLogged(currentUser);
        });
    }, []);
    const signup = async (email: string, password: string): Promise<void> => {
        try {
            const userResp: UserCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await createUser({ email, password, uid: userResp.user.uid });
        } catch (e: unknown) {
            throw new Error('This email is already taken');
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        try {
            // eslint-disable-next-line max-len
            const { user }: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('uid', user.uid);
        } catch (e: unknown) {
            console.log(e);
            throw new Error('Invalid credentials');
        }
    };

    const logout = async (): Promise<void> => {
        await signOut(auth);
        localStorage.removeItem('uid');
    };

    const isAuthenticated: boolean = !!userLogged;

    return (
            <authContext.Provider
              value={{ isAuthenticated, signup, login, userLogged, logout }}
            >
                {children}
            </authContext.Provider>
    );
};

export const ProtectRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    if ((!isAuthenticated && router.pathname !== '/auth/login')) {
        return <NotAllowedAccess />;
    }
    return <>{children}</>;
};
