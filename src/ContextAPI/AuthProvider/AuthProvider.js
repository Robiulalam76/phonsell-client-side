import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, signInWithPopup } from "firebase/auth";
import app from '../../Firebase/Firebase.config';

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const auth = getAuth(app)


    //// signup with email password
    const signupWithEmailPassword = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login with email password
    const loginWithEmailPassword = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    // set user Display name and image
    const updateUser = (profile) => {
        setLoading(true)
        return updateProfile(auth.currentUser, profile)
    }


    // signup with google
    const signupWithGoogle = (provider) => {
        return signInWithPopup(auth, provider)
    }

    // user Logout
    const logout = () => {
        setLoading(true)
        localStorage.removeItem('access-token')
        return signOut(auth)
    }


    // load user to useEffact
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
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
        signupWithGoogle,
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