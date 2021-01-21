import { renderInterface } from './interface.js';
import { ProjectManager } from './projectManager.js';
import { loginForm } from './loginForm.js';

const loginController = (() => {
  const sidebar = document.querySelector('.sidebar');
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
        const navBar = document.querySelector('.login-nav');
        navBar.innerHTML = `<div class ='logged-in'><p>${user.email}<p><br><button id ='logout' class ='main-button'>Log Out</button></div>`;
        var uid = user.uid;
        console.log(uid);
        sidebar.addEventListener('click', ()=>{
          if (event.target.id ==='logout'){
            logOutUser()
          }
        })
      } else {
        console.log('could not log in');
      }
    });

    const logOutUser =()=>{
      firebase.auth().signOut().then(() => {
        console.log('sign out success')
        // loginForm.removeInterface();

      }).catch((error) => {
        console.log(error)
      });
    }
  };

  return { createUser, logInUser, onLoginUser };
})();

export { loginController };
