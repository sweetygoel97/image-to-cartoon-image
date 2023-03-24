// var admin = require("firebase-admin");

// var serviceAccount = require('../serviceAccountKey.json')

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// serverKet:AAAAAG6NYvY:APA91bFgzmnrcnEtwSHNKUITcx5r8-PWrn23_WGal-_r6nqjNm2S83ddNeHfrWYbe57ETjvkZ636XweDtZFEj8TP9_VdquBjQKSDyk9Mojab7sUKrT-PSx8sPH0xxsTQoCxIJZVNjoOI
// key-pair=BKcRn-ObXwPv_uNHMdWHW9qT3m2nqXMVfdXfmKrNdvDVcibrBtmAqSsVhfUsq1qc54e1DmQPZ_t4_73p9udlJn4



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);