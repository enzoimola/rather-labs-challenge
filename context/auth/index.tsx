import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import { auth } from '../../firebase.js';
import { checkUser, createUser } from '@/services/media/media.service';

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth content');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
    }, []);
    const signup = async (email: string, password: string): Promise<void> => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await createUser({ email, password });
        } catch (e: unknown) {
            throw new Error('This email is already taken');
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            await checkUser(email);
        } catch (e: unknown) {
            throw new Error("The user doesn't exist, please go to register user");
        }
    };

    const logout = async (): Promise<void> => {
        await signOut(auth);
    };

    return (
        <authContext.Provider value={{ signup, login, user, logout }}>
            {children}
        </authContext.Provider>
    );
};
