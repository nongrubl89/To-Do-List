
// import{renderInterface, createToDoItemDiv} from './interface.js'



// const groceries = new ListItem('grocery shopping','go grocery shopping','Saturday','1');
// const shopping = new Project('shopping', 'Saturday');

// shopping.setTodos(groceries);

// console.log(groceries);
// console.log(shopping);

// renderInterface.createToDoItemDiv();
// import{ListItem, Project} from './projectManager.js';
import{renderInterface} from './interface.js';
import { ListItem, Project, ProjectManager, Home} from './projectManager.js';
import{DateTime} from './dateTime.js'
let projects = ProjectManager.projects;
renderInterface.renderNewProjectButton();
renderInterface.renderProjects(projects);
$(function () {
    $('#datetimepicker1').datetimepicker();
    });

console.log(ProjectManager);





// createADiv();
// let btn = document.getElementById('clickID');
// console.log(btn);

// console.log(createADiv());