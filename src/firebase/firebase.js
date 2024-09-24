import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAAG9jaLMdLYU_WT2P9GxLMZ7nEXETazFQ",
  authDomain: "steam-liblary.firebaseapp.com",
  databaseURL:
    "https://steam-liblary-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "steam-liblary",
  storageBucket: "steam-liblary.appspot.com",
  messagingSenderId: "26110097202",
  appId: "1:26110097202:web:c1c92f2b52aa6da901892b",
  measurementId: "G-M628R68ZC2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
