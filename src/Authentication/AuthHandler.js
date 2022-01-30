import React from 'react';
import { Route, Switch } from "react-router-dom";
import Authcontext from '../Context/Authcontext'
import Login from '../screens/Login/LoginScreen';
import AdminScreen from '../screens/AdminScreen/AdminScreen'


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
                <Route exact path="/" >
                    <Login />
                </Route>
            </Switch>
        </div>
    )
}

const AuthHandler = () => {
    const authCtx = useContext(Authcontext);
    return authCtx.isLoggedIn ? <IfLogIn /> : <IfNotLogIn />
}

export default AuthHandler;