import React, { useEffect, useState, } from 'react'
import { BrowserRouter as Router, } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import AuthHandler from "../Authentication/AuthHandler";
import { auth, db } from '../config/Firebase/FirebaseConfig'
import Loader from "../components/Loader/Loader";
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux'
import { logout, loggedIn, loading as reducerLoading } from '../store/Reducers/AuthReducer';



const Approutes = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.Authentication);


    useEffect(() => {
        dispatch(reducerLoading())
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(user.email);
                adminCheckOnLoad(uid)
            } else {
                dispatch(logout())
            }
        });
    }, [])

    const adminCheckOnLoad = async (uid) => {
        const docRef = doc(db, "USERS", `${uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:",);
            if (docSnap.data().type === 'admin') {
                dispatch(loggedIn())
            } else {
                dispatch(logout())
            }
        } else {
            console.log("No such document!");
        }
    }

    return (
        <Router>
            {
                loading ? <div style={{ width: "100%", height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <Loader /> </div> : <AuthHandler />
            }
        </Router>
    );
};

export default Approutes;
