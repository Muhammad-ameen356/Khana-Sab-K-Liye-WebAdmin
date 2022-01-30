import React, { useContext } from 'react';
import { Route, Switch } from "react-router-dom";
import Authcontext from '../Context/AuthContext'
import Login from '../screens/Login/LoginScreen';
import AdminScreen from '../screens/AdminScreen/AdminScreen'
import { useSelector } from 'react-redux'



const IfLogIn = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" >
                    <AdminScreen />
                </Route>
            </Switch>
        </div>
    )
}

const IfNotLogIn = () => {
    return (
        <div>
            <Switch>
                <Route path="/" >
                    <Login />
                </Route>
            </Switch>
        </div>
    )
}

const AuthHandler = () => {
    const { data, isLoggedIn, loading, auth_message } = useSelector(state => state.Authentication);
    console.log(isLoggedIn);

    return isLoggedIn ? <IfLogIn /> : <IfNotLogIn />
}

export default AuthHandler;