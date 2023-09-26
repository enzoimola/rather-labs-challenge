import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase.js';

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
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const login = async (email: string, password: string): Promise<void> => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async (): Promise<void> => {
        await signOut(auth);
    };

    return (
        <authContext.Provider value={{ signup, login, user, logout }}>{children}</authContext.Provider>
    );
};
