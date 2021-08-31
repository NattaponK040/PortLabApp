import firebase from '@firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAKYFWx_6QzL1Q8DuyF0R_2IhcmEjeRovg",
    authDomain: "portfolio-6ea3b.firebaseapp.com",
    databaseURL: "https://portfolio-6ea3b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "portfolio-6ea3b",
    storageBucket: "portfolio-6ea3b.appspot.com",
    messagingSenderId: "45565255729",
    appId: "1:45565255729:web:9bd3d909f34cf0ba923510"
};
export default firebase.initializeApp(firebaseConfig)