// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage ,ref,getDownloadURL,uploadBytesResumable} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyC9UQbQHy3gcWW-R2sY1tfTpKlPT_tf_3g",
  authDomain: "image-upload-5c127.firebaseapp.com",
  projectId: "image-upload-5c127",
  storageBucket: "image-upload-5c127.appspot.com",
  messagingSenderId: "1854759670",
  appId: "1:1854759670:web:a40ae091900e516b0342d7",
  measurementId: "G-Z2LWY4BTHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage();

const analytics = getAnalytics(app);