import { createSlice } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/Firebase/FirebaseConfig';
import { toast } from 'react-toastify';


const notify = () => toast("Wow so easy!");


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
        },
        loading(state) {
            state.loading = true;
        },
        message(state, action) {
            state.loading = false;
            state.auth_message = action.payload
        }
    }
})

const adminCheck = () => {

}

const getUser = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(authSlice.actions.loading());
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.uid);
                dispatch(authSlice.actions.loggedIn(user));
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                dispatch(authSlice.actions.message(errorMessage));
                notify()
            });
    }
}

export const { loggedIn, loading } = authSlice.actions;
export { getUser };
export default authSlice.reducer;