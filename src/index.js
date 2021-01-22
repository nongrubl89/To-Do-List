import { loginController } from './loginController.js';
import { loginForm } from './loginForm.js';
// import {loginController} from './loginController.js'
var firebaseConfig = {
    apiKey: "AIzaSyAibsUQIBX1Q83isNBlJ6gALa1ie7rYjJg",
    authDomain: "to-do-list-6932f.firebaseapp.com",
    projectId: "to-do-list-6932f",
    storageBucket: "to-do-list-6932f.appspot.com",
    messagingSenderId: "1043747409433",
    appId: "1:1043747409433:web:3113d842d94604348ba488"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log('firebase init');
loginController.authListener();



