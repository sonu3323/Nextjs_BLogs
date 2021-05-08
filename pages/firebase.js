import firebase from "firebase/app"

import "firebase/auth"

import "firebase/storage";

import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB-_ZNgdcwC-1gu9tATexk_SbgL4sbMs0I",
    authDomain: "nextjs-blog-79c38.firebaseapp.com",
    projectId: "nextjs-blog-79c38",
    storageBucket: "nextjs-blog-79c38.appspot.com",
    messagingSenderId: "225467979394",
    appId: "1:225467979394:web:6482233be144809da3469b"
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }


const auth = firebase.auth();

const db = firebase.firestore();

const storage = firebase.storage();

export {db , storage, auth}