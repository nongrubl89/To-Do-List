
import { loginForm } from './loginForm.js';
import {ProjectManager} from './ProjectManager.js';
import { renderInterface } from './interface';


const loginController = (() => {
  const sidebar = document.querySelector('.sidebar');
  const createUser = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('user created');
        loginForm.initialLoginDiv();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error);
        // loginForm.initialLoginDiv();
        // ..
      });
  };

  const logInUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user.email);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        loginForm.initialLoginDiv();
      });

  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        renderInterface.renderNewProjectButton();
        console.log('auth listener signed in')
        loginForm.createLoginNav(firebase.auth().currentUser.email);
        ProjectManager.getProjFromDatabase();
        
      } else {
        console.log('auth listener signed out');
        loginForm.initialLoginDiv();
      }
    });
  };

  return { createUser, logInUser, authListener };
})();

export { loginController };
