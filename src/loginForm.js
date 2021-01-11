import { renderInterface } from './interface.js';
import { ProjectManager } from './projectManager.js';
import { loginController } from './loginController.js';
const loginForm = (() => {
  const container = document.querySelector('.content');
  const initialLoginDiv = () => {
    const loginDiv = document.createElement('div');
    loginDiv.id = 'login-div';
    loginDiv.innerHTML = `<button id ='log-in'>Login</button><br><button id ='sign-up'>Sign Up</button>`;
    container.appendChild(loginDiv);
    container.addEventListener('click', () => {
      if (event.target.id === 'log-in') {
        createLoginDiv(loginDiv, 'Log In', 'submit-login');
      }
      if (event.target.id === 'sign-up') {
        createLoginDiv(loginDiv, 'Sign-Up', 'submit-signup');
      }
    });
  };

  const createLoginDiv = (loginDiv, word, submit) => {
    loginDiv.innerHTML = `<form>
  <label for="email">Email:</label><br>
  <input type="text" id="email" name="email" value=""><br>
  <label for="password">Password:</label><br>
  <input type="text" id="pword" name="pword" value=""><br><br>
  <input type="submit" value=${word} id =${submit}>
</form> `;
    container.addEventListener('click', () => {
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
        console.log(loginDiv[email].value);
        // loginController.createUser('lisaburgnon@gmail.com', 'password');
      }
    });
  };

  return { initialLoginDiv };
})();

export { loginForm };
