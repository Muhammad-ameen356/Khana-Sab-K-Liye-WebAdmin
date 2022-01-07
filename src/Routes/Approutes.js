import React from 'react';
import { Route, Switch } from "react-router-dom";
import Login from '../screens/Login/LoginScreen';


const IfLogIn = () => {
    return (
        <div>

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

const Approutes = () => {
    return (
        <div>

        </div>
    )
}

export default Approutes
