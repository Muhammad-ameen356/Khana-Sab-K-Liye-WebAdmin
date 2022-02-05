import { createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from '../../config/Firebase/FirebaseConfig';
import { doc, setDoc } from "firebase/firestore";




const initialState = {
    data: {},
    loading: false,
    auth_message: "",
}

export const createManagerSlice = createSlice({
    name: 'CreateManager',
    initialState,
    reducers: {
        managerCreated(state, action) {
            state.loading = false;
            state.data = action.payload;
        },
        loading(state) {
            state.loading = true;
        },
        error(state, action) {
            state.loading = false;
            state.auth_message = action.payload
        },
    }
})


const createManagerAuth = ({ name, email, password }) => {
    let accountObj = {
        name: name,
        email: email,
        type: 'manager',
    }
    return async (dispatch) => {
        dispatch(authSlice.actions.loading());
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.uid);
                dispatch(createManagerFirestore(user.uid, accountObj));
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                dispatch(createManagerSlice.actions.error(errorMessage));
                toast.error(`Error: ${errorMessage}`);
            });
    }
}

const createManagerFirestore = (uid, accountObj) => {
    return async (dispatch) => {
        dispatch(createManagerSlice.actions.loading());
        await setDoc(doc(db, "USERS", `${uid}`), accountObj)
            .then((success) => {
                toast.success(`Manager Account Created Successfully`);
            }).catch((error) => {
                console.log(error);
                toast.error('Error');
            })
    }
}

export { createManagerAuth }
export default createManagerSlice.reducer;