import { ListItem, Project, ProjectManager } from './projectManager.js'
import { DateTime } from './dateTime.js'

const renderInterface = (() => {
    const container = document.querySelector('.container');
    let columnCounter = 2;
    let rowCounter = 1;

    //shows each project and renders the project div in the dom
    const renderProjects = (projects) => {
       
        projects.forEach(function (project, index, array) {
            if (index === 0) {
                project.projectID = 0;
                renderInterface.renderNewProjectButton();
            }
            if (index === array.length - 1) {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project-div';
                projectDiv.dataset.id = index;
                projectDiv.style.gridColumnStart = columnCounter;
                projectDiv.style.gridRowStart = rowCounter;
                project.projectID=index;

                const titleDiv = document.createElement('div');
                titleDiv.className = 'title-div';
                titleDiv.innerHTML = `<h4>${project.getTitle()}</h4>
                <h5>Due: ${project.dateDue}</h5>`

                const taskList = document.createElement('ul');
                taskList.dataset.number=index;
                taskList.style.display='none';
                console.log(taskList);
                const buttonDiv = document.createElement('div');
                buttonDiv.className='button-div';
            
                projectDiv.appendChild(titleDiv);
                projectDiv.appendChild(buttonDiv);
                container.appendChild(projectDiv);

                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-project-button';
                deleteButton.addEventListener('click', () => {
                    event.target.parentNode.remove();
                    ProjectManager.deleteProject(index);

                })


                const addTaskButton = document.createElement('button');
                addTaskButton.id = 'add-task'
                addTaskButton.className = 'add-task-button';
                addTaskButton.addEventListener('click', () => {
                    createNewTaskForm(project, projectDiv);

                })

                const showTasksButton = document.createElement('button');
                showTasksButton.className='show-tasks';
                showTasksButton.addEventListener('click',()=>{
                    showTasksButton.className==='show-tasks'?
                    showTasksButton.className='hide-tasks':
                    showTasksButton.className='show-tasks';
                    if(taskList.children.length===0){
                        alert ('No tasks in project')
                    }
                    if(taskList.style.display==='none'){
                        taskList.style.display='block';
                    } else if (taskList.style.display==='block'){
                        taskList.style.display='none';
                    }
                })

                buttonDiv.appendChild(addTaskButton);
                buttonDiv.appendChild(deleteButton);
                buttonDiv.appendChild(showTasksButton);
                projectDiv.appendChild(taskList);

                addHover(deleteButton, createHoverDiv('deleteHover', 'Delete this project', titleDiv));
                addHover(addTaskButton, createHoverDiv('addTaskHover', 'Add a new task', titleDiv));
                addHover(showTasksButton, createHoverDiv('showTasksHover', 'Show all tasks', titleDiv));

            }

        });

    }

    const createHoverDiv = (title, str, divToAppend) => {
        title = document.createElement('div');
        title.className = 'hover-div';
        title.innerHTML = str;
        divToAppend.appendChild(title);
        return title;
    }

    const addHover = (ele, divToDisplay) => {
        ele.onmouseover = function () {
            divToDisplay.style.display = 'block';
        }
        ele.onmouseout = function () {
            divToDisplay.style.display = 'none';
        }
    }

    //creates the text box and button for a new project
    const renderNewProjectButton = () => {

        const newProjectFormDiv = document.createElement('div');
        newProjectFormDiv.className = ('col-sm-4');
        newProjectFormDiv.id = ('new-project-form-div');
        container.appendChild(newProjectFormDiv);


        const newProjectInput = document.createElement('input');
        newProjectInput.className = ('form-group form-control new-project-input')
        newProjectInput.type = 'text';
        newProjectInput.value = '';
        newProjectInput.placeholder = 'New Project Name';
        newProjectFormDiv.appendChild(newProjectInput);

        newProjectFormDiv.appendChild(DateTime());
        $(function () {
            $('.date').datetimepicker();
        });
        const calendar = document.querySelectorAll('.form-control')[1];

        const newProjectButton = document.createElement('button');
        newProjectButton.innerHTML = 'Create New Project';
        newProjectFormDiv.appendChild(newProjectButton);

        newProjectButton.addEventListener('click', () => {
            addColRow();
            const calendarValue = calendar.value;
            const newProjectObject = Project(newProjectInput.value, calendarValue.substr(0, calendarValue.indexOf(' ')));
            ProjectManager.setProjects(newProjectObject);
            renderProjects(ProjectManager.projects);

        })
    }

    //adds one to the column and row counters to place divs on the page
    const addColRow = () => {
        columnCounter += 1;
        if (columnCounter === 5) {
            columnCounter = 2;
            rowCounter += 2;
        }
    }

    //creates a form where a new task is entered on the project div
    const createNewTaskForm = (project, projectDiv) => {
        
        const overlayDiv = document.createElement('div');
        overlayDiv.id='overlay';
        container.appendChild(overlayDiv);

        const newTaskForm = document.createElement('div');
        newTaskForm.className = "new-task-form";
        newTaskForm.id = 'task-form-in-div'

        const newTaskNameInput = document.createElement('input');
        newTaskNameInput.className = ('form-group input-group form-control')
        newTaskNameInput.type = 'text';;
        newTaskNameInput.placeholder = 'Task Name';
        newTaskNameInput.value = '';
        newTaskForm.appendChild(newTaskNameInput);

        const newTaskDescriptionInput = document.createElement('input');
        newTaskDescriptionInput.className = ('form-group input-group form-control')
        newTaskDescriptionInput.type = 'text';
        newTaskDescriptionInput.placeholder = 'Describe Task';
        newTaskDescriptionInput.value = '';
        newTaskForm.appendChild(newTaskDescriptionInput);

        const collapseTaskButton = document.createElement('button');
        collapseTaskButton.innerHTML='X';
        newTaskForm.appendChild(collapseTaskButton);
        collapseTaskButton.addEventListener('click',()=>{
            overlayDiv.display='none';
        })

        const newTaskButton = document.createElement('button');
        newTaskButton.innerHTML = 'Add task to ' + project.getTitle();
        newTaskForm.appendChild(newTaskButton);

        overlayDiv.appendChild(newTaskForm);


        newTaskButton.addEventListener('click', () => {
            event.preventDefault();
            if (!newTaskDescriptionInput.value || !newTaskNameInput.value) {
                alert('Please Fill In Both Fields!')
            } else {
                let newListItem = ListItem(newTaskNameInput.value, newTaskDescriptionInput.value);
                project.setTodos(newListItem);
                createListItemDisplay(projectDiv, project);
                newTaskForm.style.display = 'none';
                overlayDiv.style.display='none';
            }
        })
    }

    //this is called when the add task button is clicked
    const createListItemDisplay = (projectDiv, project) => {
        const index = project.projectID;
        console.log(index);
        let taskItems = project.toDos;
        let taskList = document.querySelector(`[data-number='${index}']`);
        console.log(taskList);
        
        taskItems.forEach(function (taskItem, index, array) {

            if (index === array.length - 1) {
                const taskItemToAppend = document.createElement('li');
                taskItemToAppend.innerHTML= `${taskItem.title} : ${taskItem.description}`;
                taskList.appendChild(taskItemToAppend);
                
                const completedButton = document.createElement('button');
                completedButton.className = 'completed-button';

                taskItemToAppend.appendChild(completedButton);
                taskList.style.display='none';

                completedButton.addEventListener('click', () => {
                    taskItem.completedTask === true ? taskItem.completedTask = false : taskItem.completedTask = true;
                    completedButton.className === 'completed-button' ?
                        completedButton.className = 'completed-button-complete' :
                        completedButton.className = 'completed-button';
                        
                })
            }
            
        })
    }

    return { renderProjects, renderNewProjectButton }
})();

export { renderInterface }

// if (!projectDiv.contains(form)) {
//     projectDiv.appendChild(newTaskForm);
//     console.log(projectDiv)
// }
// else if (projectDiv.contains(form)) {
//     form.style.display = 'none';
//     console.log(form);
//     console.log(newTaskForm);
// } else {
//     form.style.display = 'block';
// }