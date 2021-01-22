
import { loginForm } from './loginForm.js';


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
        console.log('sign in success');
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
        console.log('auth listener signed in')
        
      } else {
        console.log('auth listener signed out');
      }
    });
  };

  return { createUser, logInUser, authListener };
})();

export { loginController };
