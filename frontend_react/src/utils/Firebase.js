import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
const config = {
    apiKey: "AIzaSyC4d5-RHeATuvN18IZbbzKFCL_jAg5q9lQ",
    authDomain: "awesomeproject2-6f99a.firebaseapp.com",
    databaseURL: "https://awesomeproject2-6f99a.firebaseio.com",
    projectId: "awesomeproject2-6f99a",
    storageBucket: "awesomeproject2-6f99a.appspot.com",
    messagingSenderId: "344679997098"
};

export default firebase.initializeApp(config);