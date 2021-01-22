import { ListItem, Project, ProjectManager } from './projectManager.js';
import { DateTime } from './dateTime.js';
import { loginForm } from './loginForm.js';
import { doc } from 'prettier';

const renderInterface = (() => {
  const container = document.querySelector('.content');
  const sidebar = document.querySelector('.sidebar');

  //shows each project and renders the project div in the dom
  const renderProjects = (projects) => {
    projects.forEach(function (project, index, array) {
      if (index === 0) {
        project.projectID = 0;
      }
      if (index === array.length - 1) {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'slide project-div';
        projectDiv.dataset.id = index;
        project.projectID = index;

        const titleDiv = document.createElement('div');
        titleDiv.className = 'title-div';
        titleDiv.innerHTML = `<h4>${project.getTitle()}</h4>`;

        const dateDiv = document.createElement('div');
        dateDiv.className = 'date-div';
        dateDiv.innerHTML = `<h4>${project.dateDue}</h4>`;

        const taskList = document.createElement('div');
        taskList.dataset.number = index;
        taskList.style.display = 'none';

        projectDiv.appendChild(titleDiv);
        projectDiv.appendChild(dateDiv);
        container.appendChild(projectDiv);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'img-button delete-project-button';
        deleteButton.addEventListener('click', () => {
          event.target.parentNode.remove();
          ProjectManager.deleteProject(index);
          ProjectManager.deleteProjFromDatabase(project.title);
        });

        projectDiv.appendChild(deleteButton);

        const addTaskButton = document.createElement('button');
        addTaskButton.id = 'add-task';
        addTaskButton.className = 'img-button add-task-button';
        addTaskButton.addEventListener('click', () => {
          createNewTaskForm(project, projectDiv);
        });

        projectDiv.appendChild(addTaskButton);

        const showTasksButton = document.createElement('button');
        showTasksButton.className = 'img-button show-tasks';
        showTasksButton.addEventListener('click', () => {
          if (
            showTasksButton.className === 'show-tasks' &&
            taskList.hasChildNodes() === false
          ) {
            showTasksButton.className = 'img-button show-tasks';
          } else {
            showTasksButton.className = 'img-button hide-tasks';
          }

          if (project.toDos.length === 0) {
            alert('No tasks in project');
            return;
          }

          if (taskList.style.display === 'none') {
            projectDiv.className = 'project-div-expanded';
            taskList.style.display = 'grid';

            if (projectDiv.className === 'project-div') {
              taskList.style.display = 'none';
            }
          } else if (taskList.style.display === 'grid') {
            projectDiv.className = 'project-div';
            taskList.style.display = 'none';
          }
        });

        projectDiv.appendChild(showTasksButton);
        projectDiv.appendChild(taskList);
        if(firebase.auth().currentUser){
          ProjectManager.addProjToDatabase(project, project.title);
          console.log('user project added')
          } else {console.log('using app as guest')}
      }
    });
    const logOutButton = document.getElementById('logout');
      logOutButton.addEventListener('click', ()=> {firebase.auth().signOut().then(()=>{
        console.log('user signed out')
        while (container.firstChild) {
        container.removeChild(container.lastChild);
      }  while (sidebar.firstChild) {
        sidebar.removeChild(sidebar.lastChild);
      }
    }).catch((error)=> console.log(error))}, false)
  };

  //creates the text box and button for a new project
  const renderNewProjectButton = () => {
    const newProjectFormDiv = document.createElement('div');
    newProjectFormDiv.innerHTML = `<h3 class ="header">Add a project</h3>`;
    newProjectFormDiv.className = 'col-sm-4';
    newProjectFormDiv.id = 'new-project-form-div';
    sidebar.appendChild(newProjectFormDiv);

    const newProjectInput = createDomInput(
      'newProjectInput',
      'form-group input-group form-control',
      'Project Name'
    );
    newProjectFormDiv.appendChild(newProjectInput);

    newProjectFormDiv.appendChild(DateTime());
    $(function () {
      $('.date').datetimepicker();
    });
    const calendar = document.querySelector('.cal-val');

    const newProjectButton = document.createElement('button');
    newProjectButton.id = 'new-project-button';
    newProjectButton.className = 'main-button';
    newProjectButton.innerHTML = 'Create New Project';
    newProjectFormDiv.appendChild(newProjectButton);

    newProjectButton.addEventListener('click', () => {
      if (!newProjectInput.value || !calendar.value) {
        alert('Please fill in both fields');
      } else {
        let calendarValue = calendar.value;
        const newProjectObject = Project(
          newProjectInput.value,
          calendarValue.substr(0, calendarValue.indexOf(' '))
        );
        calendar.value = '';
        newProjectInput.value = '';
        ProjectManager.setProjects(newProjectObject);
        renderProjects(ProjectManager.projects);
      }
    });
  };
  

  //creates a form where a new task is entered on the project div
  const createNewTaskForm = (project, projectDiv) => {
    const overlayDiv = document.createElement('div');
    overlayDiv.id = 'overlay';
    container.appendChild(overlayDiv);

    const newTaskForm = document.createElement('div');
    newTaskForm.className = 'new-task-form';
    newTaskForm.id = 'task-form-in-div';

    const newTaskNameInput = createDomInput(
      'newTaskNameInput',
      'form-group input-group form-control',
      'Task Name'
    );
    newTaskNameInput.id = 'task-name-input';
    newTaskForm.appendChild(newTaskNameInput);

    const newTaskDescriptionInput = createDomInput(
      'newTaskDescriptionInput',
      'form-group input-group form-control',
      'Describe this task'
    );
    newTaskDescriptionInput.id = 'describe';
    newTaskForm.appendChild(newTaskDescriptionInput);

    const newTaskPriority = ['Low', 'Medium', 'High'];
    newTaskPriority.forEach((priority) => {
      const radios = document.createElement('div');
      radios.className = priority;
      radios.innerHTML = `<input type = "radio" name='priority' class = 'radio'
            
            id = ${priority} />
            <label for = ${priority}>${priority} priority</label>`;
      newTaskForm.appendChild(radios);
    });

    const taskFormButtonDiv = document.createElement('div');
    taskFormButtonDiv.className = 'task-button-div';
    const collapseTaskButton = document.createElement('button');
    collapseTaskButton.innerHTML = 'Close';
    collapseTaskButton.className = 'main-button collapse-task-form';
    taskFormButtonDiv.appendChild(collapseTaskButton);
    collapseTaskButton.addEventListener('click', () => {
      overlayDiv.style.display = 'none';
    });

    const newTaskButton = document.createElement('button');
    newTaskButton.innerHTML = 'Add task to ' + project.getTitle();
    newTaskButton.className = 'main-button new-task-button';
    taskFormButtonDiv.appendChild(newTaskButton);
    newTaskForm.appendChild(taskFormButtonDiv);

    overlayDiv.appendChild(newTaskForm);

    newTaskButton.addEventListener('click', () => {
      event.preventDefault();
      const priorityBtns = document.querySelector(
        'input[name="priority"]:checked'
      ).id;
      if (!priorityBtns) {
        alert('Please Select Priority');
      }
      if (!newTaskDescriptionInput.value || !newTaskNameInput.value) {
        alert('Please Fill In Both Fields!');
      } else {
        let newListItem = ListItem(
          newTaskNameInput.value,
          newTaskDescriptionInput.value,
          priorityBtns
        );
        project.setTodos(newListItem);
        createListItem(projectDiv, project);
        newTaskForm.style.display = 'none';
        overlayDiv.style.display = 'none';
      }
    });
  };

  //creates an input elemnt for all forms on the page
  const createDomInput = (elementName, classNames, inputPlaceholder) => {
    elementName = document.createElement('input');
    elementName.className = classNames;
    elementName.type = 'text';
    elementName.placeholder = inputPlaceholder;
    elementName.value = '';
    return elementName;
  };

  //creates the list items and sets the display to none
  const createListItem = (projectDiv, project) => {
    console.log(projectDiv);
    const index = project.projectID;
    console.log(index);
    let taskItems = project.toDos;
    let taskList = document.querySelector(`[data-number='${index}']`);
    taskList.className = 'task-list-div';

    taskItems.forEach(function (taskItem, index, array) {
      if (index === array.length - 1) {
        const taskItemToAppend = document.createElement('div');
        taskItemToAppend.className = 'list-items';
        taskItemToAppend.innerHTML = `<p class = 'task-list-item'>${taskItem.title}</p> 
                <p class='description-list-item'>${taskItem.description}</p> 
                <div class='priority-list-item'></div>`;
        taskList.appendChild(taskItemToAppend);
        const priorityDot = document.querySelector('.priority-list-item');
        console.log(priorityDot);

        if (taskItem.priority === 'High') {
          priorityDot.className = 'dot high-priority';
        } else if (taskItem.priority === 'Medium') {
          priorityDot.className = 'dot medium-priority';
        } else if (taskItem.priority === 'Low') {
          priorityDot.className = 'dot low-priority';
        }

        const completedButton = document.createElement('button');
        completedButton.className = 'img-button completed-button';

        taskItemToAppend.appendChild(completedButton);
        projectDiv.className === 'project-div-expanded'
          ? (taskList.style.display = 'grid')
          : (taskList.style.display = 'none');

        completedButton.addEventListener('click', () => {
          taskItem.completedTask === true
            ? (taskItem.completedTask = false)
            : (taskItem.completedTask = true);
          completedButton.className === 'img-button completed-button'
            ? (completedButton.className =
                'img-button completed-button-complete')
            : (completedButton.className = 'img-button completed-button');
        });
      }
    });
  };

  return { renderProjects, renderNewProjectButton };
})();

export { renderInterface };
