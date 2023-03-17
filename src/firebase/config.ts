import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCRyJZtOb-PImr_F-wufooW-edwR_n5OLs",
    authDomain: "anifufu-c43eb.firebaseapp.com",
    projectId: "anifufu-c43eb",
    storageBucket: "anifufu-c43eb.appspot.com",
    messagingSenderId: "316721496116",
    appId: "1:316721496116:web:2dbc5048e37248c4e8ca61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
