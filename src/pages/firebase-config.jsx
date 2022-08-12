import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCePIqbhL6Pj3B7fnOpub-Zo38jDBwadys",
  authDomain: "richpanel-auth.firebaseapp.com",
  projectId: "richpanel-auth",
  storageBucket: "richpanel-auth.appspot.com",
  messagingSenderId: "665726897847",
  appId: "1:665726897847:web:cae85da13abb2aadf70732",
  measurementId: "G-R6W76774GJ",
};

const appuser = initializeApp(firebaseConfig);

export const auth = getAuth(appuser);
