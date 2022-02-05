import { createSlice } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../../config/Firebase/FirebaseConfig';
import { signOut } from "firebase/auth";


const initialState = {
    data: {},
    isLoggedIn: false,
    loading: false,
    auth_message: "",
}

export const authSlice = createSlice({
    name: 'Authentication',
    initialState,
    reducers: {
        loggedIn(state, action) {
            state.loading = false;
            state.isLoggedIn = true;
            state.data = action.payload;
        },
        loading(state) {
            state.loading = true;
        },
        error(state, action) {
            state.loading = false;
            state.auth_message = action.payload
        },
        logout(state) {
            state.loading = false;
            state.isLoggedIn = false;
        }
    }
})

const adminCheck = (uid) => {
    return async (dispatch) => {
        const docRef = doc(db, "USERS", `${uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:",);
            if (docSnap.data().type === 'admin') {
                dispatch(authSlice.actions.loggedIn());
                toast.success(`Login Successfull`);
            } else {
                dispatch(authSlice.actions.error());
                toast.error(`Invalid Credentials`);
            }
        } else {
            console.log("No such document!");
            toast.error(`No user Found`);
        }
    }
}


const getUser = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(authSlice.actions.loading());
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.uid);
                dispatch(adminCheck(user.uid));
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                dispatch(authSlice.actions.error(errorMessage));
                toast.error(`Error: ${errorMessage}`);
            });
    }
}

const logoutAction = () => {
    return async (dispatch) => {
        dispatch(authSlice.actions.loading());
        await signOut(auth).then(() => {
            dispatch(logout())
            console.log("Signout Successfull");
            toast.success('Signout Successfully');
        }).catch((error) => {
            console.log(error);
            toast.error('Signout failed');
        });
    }
}

export const { loggedIn, loading, error, logout } = authSlice.actions;
export { getUser, adminCheck, logoutAction };
export default authSlice.reducer;