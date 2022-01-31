import React, { useState, useEffect } from "react";
import loginCss from './LoginScreen.module.scss'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Loader from '../../components/Loader/Loader';
import logo from '../../Assists/logo.png'

import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../store/Reducers/AuthReducer';



function Login() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { data, isLoggedIn, loading, auth_message } = useSelector(state => state.Authentication);

    const [values, setValues] = useState({ showPassword: false, });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        let credential = {
            email, password
        }
        dispatch(getUser(credential))
    }

    const handleClickShowPassword = () => { setValues({ showPassword: !values.showPassword, }); };

    return (
        <>
            <div className={`${loginCss.main}`}>
                <div className={`${loginCss.img_container}`}>
                    <img src={logo} alt="" className={`img-fluid mx-auto d-block`} />
                </div>
                <div className={loginCss.inputConatiner}>
                    <div>
                        <FormControl sx={{ m: 1, width: '70%' }} variant="outlined" color="success" >
                            <InputLabel htmlFor="outlined-adornment-email success">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                type={'email'}
                                label="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>

                    </div>
                    <div>
                        <FormControl sx={{ m: 1, width: '70%' }} variant="outlined" color="success">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                            onClick={handleClickShowPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </div>
                    <div className={`mt-3`}>
                        {loading ?
                            <Loader />
                            :
                            <Button variant="contained" color="success" onClick={handleLogin} style={{ width: 100 }}>
                                Login
                            </Button>
                        }
                    </div>
                </div>
            </div>
            {/* <Modalfun message={message} /> */}
        </>
    )
}

export default Login;

{/* {loading ? <Loader loading={loading} />
                                            :
                                            <Button style={{ width: '120px', }} variant="contained" color="success" onClick={handleLogin}>
                                                Login
                                            </Button>
                                        } */}