import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCOv0exu9_phq13OiOXewi8LrGnG2jrcWc",
    authDomain: "br-paid-panel-e236f.firebaseapp.com",
    databaseURL: "https://br-paid-panel-e236f-default-rtdb.firebaseio.com",
    projectId: "br-paid-panel-e236f",
    storageBucket: "br-paid-panel-e236f.firebasestorage.app",
    messagingSenderId: "804027782315",
    appId: "1:804027782315:web:a1d66a7cbe5787ec29d3ee",
    measurementId: "G-L35633T1SB"
};

const app = initializeApp(firebaseConfig);

let analytics = null;
try {
    analytics = getAnalytics(app);
} catch (e) {
    analytics = null;
}

const db = getDatabase(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
