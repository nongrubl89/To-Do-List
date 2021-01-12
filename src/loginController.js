import { renderInterface } from './interface.js';
import { ProjectManager } from './projectManager.js';
import { loginForm } from './loginForm.js';

const loginController = (() => {
  const createUser = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('user created');
        renderInterface.renderNewProjectButton();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error);
        loginForm.initialLoginDiv();
        // ..
      });
  };

  const logInUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('sign in success');
        renderInterface.renderNewProjectButton();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        loginForm.initialLoginDiv();
      });
  };

  const onLoginUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  };

  return { createUser, logInUser };
})();

export { loginController };
