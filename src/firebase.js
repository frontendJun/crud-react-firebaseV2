import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCMCOSE3VKf8YEkPTkYh2MjAHSGY5MAKcQ",
    authDomain: "test11111-906bd.firebaseapp.com",
    databaseURL: "https://test11111-906bd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test11111-906bd",
    storageBucket: "test11111-906bd.appspot.com",
    messagingSenderId: "807157246123",
    appId: "1:807157246123:web:4c5b0e3a18841931492fee"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
