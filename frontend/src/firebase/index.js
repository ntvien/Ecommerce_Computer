import firebase from 'firebase/app'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDpu_1rO5bcU88qEP2GVyU_5bxMFb7qaoY",
    authDomain: "web-programing-288db.firebaseapp.com",
    projectId: "web-programing-288db",
    storageBucket: "web-programing-288db.appspot.com",
    messagingSenderId: "884822648584",
    appId: "1:884822648584:web:5518831b9990713a0baebd",
    measurementId: "G-RS8Y04Q8XK"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

export {storage};