import { loginController } from './loginController.js';
import { loginForm } from './loginForm.js';
// import {loginController} from './loginController.js'
firebase.initializeApp(firebaseConfig);
loginForm.initialLoginDiv();
loginController.authListener();

