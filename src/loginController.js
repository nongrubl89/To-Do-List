
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

  // const onLoginUser = () => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       loginForm.createLoginNav(user)
        
  //     } else {
  //       console.log('could not log in');
  //     }
  //   });
  // };

  return { createUser, logInUser };
})();

export { loginController };
