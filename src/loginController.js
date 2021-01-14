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
        // renderInterface.renderNewProjectButton();
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
        renderInterface.renderNewProjectButton();
        console.log(user);
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
        const navBar = document.querySelector('.nav');
        navBar.innerHTML = user.email;
        var uid = user.uid;
        console.log(uid);
      } else {
        console.log('could not log in');
      }
    });
  };

  return { createUser, logInUser, onLoginUser };
})();

export { loginController };
