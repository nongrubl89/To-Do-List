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

                const titleDiv = document.createElement('div');
                titleDiv.className = 'title-div';
                titleDiv.innerHTML = `<h4>${project.getTitle()}</h4>
                <h5>Due: ${project.dateDue}</h5>`

                const taskList = document.createElement('ul');
                taskList.dataset.number=index;
                taskList.style.display='none';
                projectDiv.appendChild(taskList);
                console.log(taskList);
            
                projectDiv.appendChild(titleDiv);
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
                    // addTaskButton.className === 'add-task-button' ?
                    //     addTaskButton.className = 'minus-task-button' :
                    //     addTaskButton.className = 'add-task-button';
                    // createNewTaskForm(project, projectDiv);
                    createNewTaskForm(project, projectDiv);

                })

                const showTasksButton = document.createElement('button');
                showTasksButton.id='show-tasks';
                showTasksButton.innerHTML='show tasks';
                showTasksButton.addEventListener('click',()=>{
                    taskList.style.display='block';
                })

                projectDiv.appendChild(addTaskButton);
                projectDiv.appendChild(deleteButton);
                projectDiv.appendChild(showTasksButton);

                addHover(deleteButton, createHoverDiv('deleteHover', 'Delete this project', titleDiv));
                addHover(addTaskButton, createHoverDiv('addTaskHover', 'Add a new task', titleDiv));
                

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
        console.log(calendar);

        const newProjectButton = document.createElement('button');
        newProjectButton.innerHTML = 'Create New Project';
        newProjectFormDiv.appendChild(newProjectButton);

        newProjectButton.addEventListener('click', () => {
            addColRow();
            const calendarValue = calendar.value;
            const newProjectObject = Project(newProjectInput.value, calendarValue.substr(0, calendarValue.indexOf(' ')));
            ProjectManager.setProjects(newProjectObject);
            console.log(newProjectObject);
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
        console.log(project);
        const overlayDiv = document.createElement('div');
        overlayDiv.id='overlay';
        container.appendChild(overlayDiv);
        console.log(overlayDiv);

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
        console.log(project.id);
        let taskItems = project.toDos;
        const taskList = document.get
        // projectDiv.appendChild(taskList);
        taskItems.forEach(function (taskItem, index, array) {

            if (index === array.length - 1) {
                taskList.innerHTML = `<li>${taskItem.title}: ${taskItem.description}</li>`
                taskList.className='task-list';

                const completedButton = document.createElement('button');
                completedButton.className = 'completed-button';

                taskList.appendChild(completedButton);
                taskList.style.display='none';
                

                completedButton.addEventListener('click', () => {
                    taskItem.completedTask === true ? taskItem.completedTask = false : taskItem.completedTask = true;
                    completedButton.className === 'completed-button' ?
                        completedButton.className = 'completed-button-complete' :
                        completedButton.className = 'completed-button';
                        return taskList;
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