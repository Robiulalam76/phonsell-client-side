import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import app from '../../Firebase/Firebase.config';

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const auth = getAuth(app)


    //// signup with email password
    const signupWithEmailPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login with email password
    const loginWithEmailPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    // set user Display name and image
    const updateUser = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    // user Logout
    const logout = () => {
        return signOut(auth)
    }


    // load user to useEffact
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log(currentUser);
        })

        return () => {
            unSubscribe()
        }
    }, [])


    const authInfo = {
        user,
        loading,
        signupWithEmailPassword,
        loginWithEmailPassword,
        updateUser,
        logout
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;