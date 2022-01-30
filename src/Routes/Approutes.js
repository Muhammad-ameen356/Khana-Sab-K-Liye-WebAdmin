import React, { useEffect, useState, } from 'react'
import { BrowserRouter as Router, } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Authcontext from "../Context/Authcontext";
import AuthHandler from "../Authentication/AuthHandler";
import { auth, db } from '../config/Firebase/FirebaseConfig'
import Loader from "../Components/Loader/Loader"

const Approutes = () => {
    const [toggle, setToogle] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogout = () => {
        signOut(auth).then(() => {
            console.log("Signout Successfull");
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Router>
            <Authcontext.Provider value={{
                isLoggedIn: toggle,
                onLogout: onLogout,
                setToogle: setToogle,
                open: open,
                setOpen: setOpen,
                loading: loading,
                setLoading: setLoading,
            }} >
                {
                    loading ? <div style={{ width: "100%", height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <Loader /> </div> : <AuthHandler />
                }
            </Authcontext.Provider>
        </Router>
    );
};

export default Approutes;
