import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQHCOkiwefCZEUpS15nYkPmZqQlqJI8Ow",
  authDomain: "laundry-application-bbb87.firebaseapp.com",
  projectId: "laundry-application-bbb87",
  storageBucket: "laundry-application-bbb87.appspot.com",
  messagingSenderId: "524267637009",
  appId: "1:524267637009:web:71e580c3c084f7d52424b0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
