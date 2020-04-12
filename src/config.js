import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyAtBU6Yjowpn21S5C3UI1CyY17QbDlSUgU",
    authDomain: "berry-harvest-bd6d6.firebaseapp.com",
    databaseURL: "https://berry-harvest-bd6d6.firebaseio.com",
    projectId: "berry-harvest-bd6d6",
    storageBucket: "berry-harvest-bd6d6.appspot.com",
    messagingSenderId: "587429720888",
    appId: "1:587429720888:web:c8669f369c1a2d024047cd",
    measurementId: "G-FY1BC552V8"
};
firebase.initializeApp(config);
export const emailProvider = new firebase.auth.EmailAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;