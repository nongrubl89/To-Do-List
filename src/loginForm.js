import { renderInterface } from './interface.js';
import { ProjectManager } from './projectManager.js';
import { loginController } from './loginController.js';
const loginForm = (() => {
  const sidebar = document.querySelector('.sidebar');
  
  const initialLoginDiv = () => {
    const loginDiv = document.createElement('div');
    loginDiv.id = 'login-div';
    loginDiv.innerHTML = `<h3 class='header'>To-Do List</h3><button class='main-button' id ='log-in'>Login</button><br><button class='main-button' id ='sign-up'>Sign Up</button><button class='main-button' id ='guest-user'>Continue As Guest</button>`;
    sidebar.appendChild(loginDiv);
    sidebar.addEventListener('click', (e) => {
      e.preventDefault();
      if (event.target.id === 'log-in') {
        createLoginDiv(loginDiv, 'Login', 'submit-login');
      }
      if (event.target.id === 'sign-up') {
        createLoginDiv(loginDiv, 'Sign-Up', 'submit-signup');
      }
      if (event.target.id === 'guest-user') {
        console.log('clicked');
        loginDiv.style.display = 'none';
        const projects = ProjectManager.projects;
        console.log(projects);
        renderInterface.renderProjects(projects);
        renderInterface.renderNewProjectButton();
      }
    });
  };

  const createLoginDiv = (loginDiv, word, submit) => {
    loginDiv.innerHTML = `<h3 class='header'>To-Do List</h3><form class ='col-sm-25'>
  <label for="email">Email:</label><br>
  <input class= 'form-control' type="text" id="email" placeholder= 'E-mail' name="email" value=""><br>
  <label for="password">Password:</label><br>
  <input class ='form-control' type="password" id="pword"  placeholder ='Password' name="pword" value=""><br><br>
  <input class='main-button' type="submit" value=${word} id =${submit}>
</form> `;
    sidebar.addEventListener('click', (e) => {
      e.preventDefault();
      if (event.target.id === 'submit-login') {
        event.preventDefault();
        loginDiv.style.display = 'none';
        loginController.logInUser(
          loginDiv.childNodes[1][0].value,
          loginDiv.childNodes[1][1].value
        );
        console.log('logged in');
        // loginController.onLoginUser();
        renderInterface.renderNewProjectButton();
        createLoginNav(firebase.auth().currentUser.email);
        ProjectManager.getProjFromDatabase();
      }
      if (event.target.id === 'submit-signup') {
        event.preventDefault();
        loginDiv.style.display = 'none';
        loginController.createUser(
          loginDiv.childNodes[1][0].value,
          loginDiv.childNodes[1][1].value
        );
        alert('user created');
      }
    });
  };

  const createLoginNav = (user) =>{
    const navBar = document.querySelector('.login-nav');
        navBar.innerHTML = `<div class ='logged-in'><p>${user}<p><br><button id ='logout' class ='main-button'>Log Out</button></div>`;
  }

  // const removeInterface = ()=>{
  //   // console.log(sidebar.firstChild)
  //   // while (sidebar.firstChild){
  //   //   sidebar.remove(sidebar.firstChild);
  //   // }
  //   
  //   for (let i = container.childNodes.length - 1; i >= 0; i--) {
  //     container.removeChild(node.childNodes[i]);
  //  }

  // }

  return { initialLoginDiv, createLoginNav};
})();

export { loginForm };
