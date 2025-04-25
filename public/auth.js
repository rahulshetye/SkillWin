// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmONfelStjrxOl1SnLKCOIveLPN-udJbs",
  authDomain: "skill-win-d8c81.firebaseapp.com",
  projectId: "skill-win-d8c81",
  storageBucket: "skill-win-d8c81.firebasestorage.app",
  messagingSenderId: "808700132713",
  appId: "1:808700132713:web:1ab8376f139278f89ad1f8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Persist login even when page is refreshed or reopened
setPersistence(auth, browserLocalPersistence);

export { auth, db };

// Sign-in function (creates Firestore doc if not exists)
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userRef = doc(db, "players", user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      userId: user.uid,
      currentBalance: 10,
      wins: 0,
      losses: 0,
      totalBettedAmount: 0,
      gamesPlayed: 0
    });
  }

  return user;
}

export function signOutUser() {
  return signOut(auth);
}

export function onUserChanged(callback) {
  onAuthStateChanged(auth, callback);
}

export function getCurrentUser() {
  return auth.currentUser;
}
