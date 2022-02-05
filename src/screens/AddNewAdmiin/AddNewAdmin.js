import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import NewAdminCSS from './Addnewadmin.module.css'
import logo from '../../Assits/logo.png'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../Config/Firebase/Firebaseconfig';
import Authcontext from '../../Context/Authcontext'
import Modalfun from '../../Components/Modal/Modalfun'
import Loader from '../../Components/Loader/Loader'


const AddNewAdmin = () => {
    const history = useHistory();
    const modalCtx = useContext(Authcontext);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({ showPassword: false, });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const date = new Date();
    const timeid = date.getTime().toString();

    const addAccount = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.uid);
                dataSubmit(user.uid);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                modalCtx.setOpen(true);
                setMessage(errorMessage);
                setLoading(false);
            });
    }

    const dataSubmit = async (uid) => {
        const data = {
            name: name,
            email: email,
            uid: uid,
            id: timeid,
            type: "user"
        }
        await setDoc(doc(db, "Accounts", uid), data).then(() => {
            setName('');
            setEmail('');
            setPassword('');
            setLoading(false);
            // alert("Account Created Successfully You need to signIn Again with Your Email and Password")
            console.log("Data written successfuly");
            alert("Account Created Successfully" + "\n" + "You need to signIn Again with Your Email and Password");
            signOut(auth).then(() => {
                console.log("Signout Successfull");
            }).catch((error) => {
                console.log(error);
            });

        }).catch((err) => {
            console.log(err, "Error");
        })
    }

    const handleClickShowPassword = () => { setValues({ showPassword: !values.showPassword, }); };

    return (
        <>
            <div className={`${NewAdminCSS.main}`}>
                <div>
                    <div className={`container `}>
                        <div className={`row`}>
                            <div className={`col-lg-5 col-md-4 ${NewAdminCSS.img_container}`}>
                                <img src={logo} alt="" className={`img-fluid mx-auto d-block ${NewAdminCSS.adImg}`} />
                            </div>
                            <div className={`col-lg-7 col-md-8 ${NewAdminCSS.for_flex}`}>
                                <div className={`container`}>
                                    <form onSubmit={addAccount}>
                                        <h5 className={`text-center`}>Create New Account</h5>
                                        <div className={`mt-4 ${NewAdminCSS.email_input}`}>
                                            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" color="success" >
                                                <InputLabel htmlFor="outlined-adornment-name success">Name</InputLabel>
                                                <OutlinedInput
                                                    required
                                                    id="outlined-adornment-name"
                                                    type={'name'}
                                                    label="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </FormControl>

                                        </div>
                                        <div className={`mt-4 ${NewAdminCSS.email_input}`}>
                                            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" color="success" >
                                                <InputLabel htmlFor="outlined-adornment-email success">Email</InputLabel>
                                                <OutlinedInput
                                                    required
                                                    id="outlined-adornment-email"
                                                    type={'email'}
                                                    label="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </FormControl>

                                        </div>
                                        <div className={`mt-4`}>
                                            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" color="success">
                                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                                <OutlinedInput
                                                    required
                                                    id="outlined-adornment-password"
                                                    type={values.showPassword ? 'text' : 'password'}
                                                    value={password}
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
                                            {loading ? <Loader loading={loading} />
                                                :
                                                <Button style={{ width: '200px', }} type="submit" variant="contained" color="success" >
                                                    {/* onClick={addAccount} */}
                                                    Create Manager Account
                                                </Button>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modalfun message={message} />
        </>
    )
}

export default AddNewAdmin;