import React, { useState, useEffect } from "react";
import loginCss from './LoginScreen.module.scss'
import logo from '../../Assists/logo.png'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/Firebase/FirebaseConfig'
// import Authcontext from '../../Context/Authcontext'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
// import Modalfun from '../../Components/Modal/Modalfun'
// import Loader from '../../Components/Loader/Loader'
import { loggedIn } from '../../store/Reducers/AuthReducer';
import { getUser } from '../../store/Reducers/AuthReducer'

function Login() {
    const history = useHistory();

    const { data, isLoggedIn, loading } = useSelector(state => state.Authentication);
    const dispatch = useDispatch();

    const [values, setValues] = useState({ showPassword: false, });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log("pppp", data);

    const handleLogin = () => {
        console.log(email, password);

        let credential = {
            email, password
        }
        dispatch(loggedIn(credential))

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.uid);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }
    useEffect(() => {
        console.log(data, loading);
    }, [data])

    const handleClickShowPassword = () => { setValues({ showPassword: !values.showPassword, }); };

    return (
        <>
            <div className={`${loginCss.main}`}>
                {/* <h1>Login Heree</h1> */}
                <div>
                    <div className={`container`}>
                        <div className={`row`}>
                            <div className={`col-lg-5 col-md-4 ${loginCss.img_container}`}>
                                <img src={logo} alt="" className={`img-fluid mx-auto d-block ${loginCss.adImg}`} />
                            </div>
                            <div className={`col-lg-7 col-md-8 ${loginCss.for_flex}`}>
                                <div className={`container`}>
                                    {/* <h3>Login Here</h3> */}
                                    <div className={`mt-4 ${loginCss.email_input}`}>
                                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" color="success" >
                                            <InputLabel htmlFor="outlined-adornment-email success">Email</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-email"
                                                type={'email'}
                                                label="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </FormControl>

                                    </div>
                                    <div className={`mt-4`}>
                                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" color="success">
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
                                    <div className={`text-center mt-3`}>
                                        {/* {loading ? <Loader loading={loading} />
                                            :
                                            <Button style={{ width: '120px', }} variant="contained" color="success" onClick={handleLogin}>
                                                Login
                                            </Button>
                                        } */}
                                        <Button style={{ width: '120px', }} variant="contained" color="success" onClick={handleLogin}>
                                            Login
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Modalfun message={message} /> */}
        </>
    )
}

export default Login;