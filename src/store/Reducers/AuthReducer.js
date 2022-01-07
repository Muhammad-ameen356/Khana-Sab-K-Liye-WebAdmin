import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/Firebase/FirebaseConfig';


const initialState = {
    data: {},
    isLoggedIn: false,
    loading: false,
}


const getUser = createAsyncThunk(
    // 'posts/getPosts',
    async () => {
        console.log("abc")
        const res = signInWithEmailAndPassword(auth, "ameen@gmail.com", "11223344")
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.uid);
                console.log(typeof user);
                // state.data = user.uid
            })
        return res
    })


export const authSlice = createSlice({
    name: 'Authentication',
    initialState,
    reducers: {
        loggedIn(state, action) {
            state.loading = true;
            if (action) {
                signInWithEmailAndPassword(auth, action.payload.email, action.payload.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log(user.uid);
                        console.log(typeof user);
                        state.data = user.uid
                    })
                // .catch((error) => {
                //     const errorCode = error.code;
                //     const errorMessage = error.message;
                //     console.log(errorMessage)
                //     // state.loading = false;
                // });
            }
        },
        loading(state) {
            state.loading(true);
        }
    }
})
export const { loggedIn, loading } = authSlice.actions;
export { getUser };
export default authSlice.reducer