import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCs5jy-UIWVUulzLfIG7YDpN6WWZ_qjurY",
    authDomain: "fir-store-crud.firebaseapp.com",
    projectId: "fir-store-crud",
    storageBucket: "fir-store-crud.appspot.com",
    messagingSenderId: "1047873374470",
    appId: "1:1047873374470:web:b06ad241a40182f62d7687"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)