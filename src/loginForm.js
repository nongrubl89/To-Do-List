import { renderInterface } from './interface.js';
import { ProjectManager } from './projectManager.js';
import { loginController } from './loginController.js';
const loginForm = (() => {
  const sidebar = document.querySelector('.sidebar');
  const initialLoginDiv = () => {
    const loginDiv = document.createElement('div');
    loginDiv.id = 'login-div';
    // loginDiv.className = 'col-sm-4';
    loginDiv.innerHTML = `<h3 class='header'>To-Do List</h3><button class='main-button' id ='log-in'>Login</button><br><button class='main-button' id ='sign-up'>Sign Up</button><button class='main-button' id ='guest-user'>Continue As Guest</button>`;
    sidebar.appendChild(loginDiv);
    sidebar.addEventListener('click', () => {
      if (event.target.id === 'log-in') {
        createLoginDiv(loginDiv, 'Log In', 'submit-login');
      }
      if (event.target.id === 'sign-up') {
        createLoginDiv(loginDiv, 'Sign-Up', 'submit-signup');
      }
      if (event.target.id === 'guest-user') {
        console.log('clicked');
        loginDiv.style.display = 'none';
        renderInterface.renderNewProjectButton();
      }
    });
  };

  const createLoginDiv = (loginDiv, word, submit) => {
    loginDiv.innerHTML = `<h3 class='header'>To-Do List</h3><form class ='col-sm-25'>
  <label for="email">Email:</label><br>
  <input class= 'form-control' type="text" id="email" placeholder= 'E-mail' name="email" value=""><br>
  <label for="password">Password:</label><br>
  <input class ='form-control' type="text" id="pword"  placeholder ='Password' name="pword" value=""><br><br>
  <input class='main-button' type="submit" value=${word} id =${submit}>
</form> `;
    sidebar.addEventListener('click', () => {
      if (event.target.id === 'submit-login') {
        event.preventDefault();
        loginDiv.style.display = 'none';
        const projects = ProjectManager.projects;
        renderInterface.renderProjects(projects);
        renderInterface.renderNewProjectButton();
        console.log('logging in');
      }
      if (event.target.id === 'submit-signup') {
        event.preventDefault();
        loginDiv.style.display = 'none';
        loginController.createUser(
          loginDiv.childNodes[0][0].value,
          loginDiv.childNodes[0][1].value
        );
      }
    });
  };

  return { initialLoginDiv };
})();

export { loginForm };
