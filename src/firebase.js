import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCZXfuGk4qrhtr3vYdnB8-VdTbbf7bsyAg",
    authDomain: "crud-1-9e212.firebaseapp.com",
    projectId: "crud-1-9e212",
    storageBucket: "crud-1-9e212.appspot.com",
    messagingSenderId: "195607486734",
    appId: "1:195607486734:web:11e86e909c1473d414b75f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Inicializamos la base de datos
const db = firebase.firestore()
// La hacemos accesible para toda la aplicacion
export { db }