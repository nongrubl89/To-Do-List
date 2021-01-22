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
    const loginButton = document.getElementById('log-in');
    const signUpButton = document.getElementById('sign-up');
    const guestUserButton = document.getElementById('guest-user');
    if(loginButton){
      loginButton.addEventListener('click', (e)=>{
        e.preventDefault();
        createLoginDiv(loginDiv, 'Login', 'submit-login')
      })
    }
    if(signUpButton){
      signUpButton.addEventListener('click', (e)=>{
        e.preventDefault();
        createLoginDiv(loginDiv, 'Sign-Up', 'submit-signup')
      })
    }
    if(guestUserButton){
      guestUserButton.addEventListener('click', (e)=>{
        console.log('clicked');
        loginDiv.style.display = 'none';
            // const projects = ProjectManager.projects;
            // console.log(projects);
            // renderInterface.renderProjects(projects);
            renderInterface.renderNewProjectButton();
    })}
  };

  const createLoginDiv = (loginDiv, word, submit) => {
    loginDiv.innerHTML = `<h3 class='header'>To-Do List</h3><form class ='col-sm-25'>
  <label for="email">Email:</label><br>
  <input class= 'form-control' type="text" id="email" placeholder= 'E-mail' name="email" value=""><br>
  <label for="password">Password:</label><br>
  <input class ='form-control' type="password" id="pword"  placeholder ='Password' name="pword" value=""><br><br>
  <input class='main-button' type="submit" value=${word} id =${submit}>
</form> `;

    const submitLoginButton = document.getElementById('submit-login');
    const submitSignUpButton = document.getElementById('submit-signup');
    if(submitLoginButton){
      submitLoginButton.addEventListener('click', (e)=>{
        e.preventDefault();
        
        loginDiv.style.display = 'none';
        // renderInterface.renderNewProjectButton();
        loginController.logInUser(
          loginDiv.childNodes[1][0].value,
          loginDiv.childNodes[1][1].value
        );
      })
    }
    if(submitSignUpButton){
      submitSignUpButton.addEventListener('click', (e)=>{
                loginDiv.style.display = 'none';
        loginController.createUser(
          loginDiv.childNodes[1][0].value,
          loginDiv.childNodes[1][1].value
        );
        alert('user created');
      })
    }
  };

  const createLoginNav = (user) =>{
    const navBar = document.querySelector('.login-nav');
        navBar.innerHTML = `<div class ='logged-in'><p>${user}<p><br><button id ='logout' class ='main-button'>Log Out</button></div>`;
  }

  return { initialLoginDiv, createLoginNav};
})();

export { loginForm };
