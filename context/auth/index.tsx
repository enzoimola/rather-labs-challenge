import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut, UserCredential,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { auth } from '../../firebase.js';
import { getUser, createUser } from '@/services/media/media.service';
import { setUserId } from '@/store/dataSlice';
import NotAllowedAccess from '@/components/atoms/NotAllowedAccess';

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth content');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [userLogged, setUserLogged] = useState(null);
    const dispatch = useDispatch();

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
            dispatch(setUserId(user.uid));

            return await getUser(user.uid);
        } catch (e: unknown) {
            console.log(e);
            throw new Error('Invalid credentials');
        }
    };

    const logout = async (): Promise<void> => {
        await signOut(auth);
        localStorage.removeItem('uid');
    };

    const isAuthenticated = (): boolean => localStorage.getItem('uid');

    return (
            <authContext.Provider
              value={{ isAuthenticated, signup, login, userLogged, logout }}
            >
                {children}
            </authContext.Provider>
    );
};

export const ProtectRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    if ((!isAuthenticated && router.pathname !== '/auth/login')) {
        return <NotAllowedAccess />;
    }
    return children;
};
