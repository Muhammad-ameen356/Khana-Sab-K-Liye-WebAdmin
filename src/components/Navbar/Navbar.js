import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Css from './Navbar.module.scss';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { signOut } from "firebase/auth";
import { auth } from '../../config/Firebase/FirebaseConfig';
import { logout } from '../../store/Reducers/AuthReducer';
import { logoutAction } from '../../store/Reducers/AuthReducer'



function Navbar() {
    const dispatch = useDispatch()


    const onLogout = () => {
        dispatch(logoutAction())
    }
    return (
        <div sx={{ flexGrow: 1 }} className={Css.navbar}>
            <AppBar position="static" className={Css.navbar}>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        KHANA SAB K LIYE
                    </Typography>
                    <Button color="inherit" sx={{ fontWeight: 'bold' }} className={Css.logoutButton} onClick={onLogout} >Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;