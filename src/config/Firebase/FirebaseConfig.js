import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9TW2NWPVnkR01G8xWAncBqMERyHPnnuM",
    authDomain: "ameen-khanasabkliye.firebaseapp.com",
    projectId: "ameen-khanasabkliye",
    storageBucket: "ameen-khanasabkliye.appspot.com",
    messagingSenderId: "1007097194578",
    appId: "1:1007097194578:web:b14f5791273be79d83978b",
    measurementId: "G-Y34KDKRQ37"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }


