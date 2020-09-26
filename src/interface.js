import { ListItem, Project, ProjectManager } from './projectManager.js'
import { DateTime } from './dateTime.js'

const renderInterface = (() => {
    const container = document.querySelector('.project-container');
    let columnCounter = 1;
    let rowCounter = 1;

    //shows each project and renders the project div in the dom
    const renderProjects = (projects) => {
       
        projects.forEach(function (project, index, array) {
            if (index === 0) {
                project.projectID = 0;
                // renderInterface.renderNewProjectButton();
            }
            if (index === array.length - 1) {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project-div';
                projectDiv.dataset.id = index;
                projectDiv.style.bac
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
                        projectDiv.className='expanded-project-div';
                        taskList.style.display='block';
                    } else if (taskList.style.display==='block'){
                        projectDiv.className='project-div';
                        taskList.style.display='none';
                        while(taskList.firstChild){
                            taskList.removeChild(taskList.firstChild);
                          }
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
        const sidebar=document.querySelector('.sidebar');
        const newProjectFormDiv = document.createElement('div');
        newProjectFormDiv.className = ('col-sm-4');
        newProjectFormDiv.id = ('new-project-form-div');
        sidebar.appendChild(newProjectFormDiv);


        const newProjectInput = createDomInput('newProjectInput', 'form-group input-group form-control', 'Project Name');
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
            if(!newProjectInput.value||!calendar.value){
                alert('Please fill in both fields')
            } else{
            addColRow();
            let calendarValue = calendar.value;
            const newProjectObject = Project(newProjectInput.value, calendarValue.substr(0, calendarValue.indexOf(' ')));
            ProjectManager.setProjects(newProjectObject);
            renderProjects(ProjectManager.projects);
            calendarValue='';
            newProjectInput.value='';
            }
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

        const newTaskNameInput = createDomInput('newTaskNameInput', 'form-group input-group form-control', 'Task Name');
        newTaskForm.appendChild(newTaskNameInput);

        
        const newTaskDescriptionInput = createDomInput('newTaskDescriptionInput', 'form-group input-group form-control', 'Describe this task');
        newTaskForm.appendChild(newTaskDescriptionInput)


        const newTaskPriority = ['Low','Medium','High'];
        newTaskPriority.forEach(priority=> {
            const radios=document.createElement('div');
            radios.innerHTML=`<input type = "radio" name='priority' class = 'radio'
            
            id = ${priority} />
            <label for = ${priority}>${priority} priority</label>`
            newTaskForm.appendChild(radios);
            
        });
        

        const collapseTaskButton = document.createElement('button');
        collapseTaskButton.innerHTML='X';
        newTaskForm.appendChild(collapseTaskButton);
        collapseTaskButton.addEventListener('click',()=>{
            console.log('click');
            overlayDiv.style.display='none';
        })

        const newTaskButton = document.createElement('button');
        newTaskButton.innerHTML = 'Add task to ' + project.getTitle();
        newTaskForm.appendChild(newTaskButton);

        overlayDiv.appendChild(newTaskForm);


        newTaskButton.addEventListener('click', () => {
            event.preventDefault();
            const priorityBtns = document.querySelector('input[name="priority"]:checked').id;
            if (!newTaskDescriptionInput.value || !newTaskNameInput.value) {
                alert('Please Fill In Both Fields!')
            } else {
                let newListItem = ListItem(newTaskNameInput.value, newTaskDescriptionInput.value, priorityBtns);
                console.log(newListItem);
                project.setTodos(newListItem);
                createListItem(projectDiv, project);
                newTaskForm.style.display = 'none';
                overlayDiv.style.display='none';
            }
        })
    }


    //creates an input elemnt for all forms on the page
    const createDomInput=(elementName, classNames, inputPlaceholder)=>{
        elementName = document.createElement('input');
        elementName.className = (classNames)
        elementName.type = 'text';
        elementName.placeholder = inputPlaceholder;
        elementName.value = '';
        return elementName;
    }
    
    //creates the list items and sets the display to none
    const createListItem = (projectDiv, project) => {
        
        console.log(projectDiv);
        const index = project.projectID;
        console.log(index);
        let taskItems = project.toDos.sort((a,b) => (a.priority > b.priority) ? 1 : ((b.priority> a.priority) ? -1 : 0));
        console.log(taskItems);
        let taskList = document.querySelector(`[data-number='${index}']`);
        console.log(taskList);
        
        taskItems.forEach(function (taskItem) {

                const taskItemToAppend = document.createElement('li');
                taskItemToAppend.innerHTML= `Task Name: ${taskItem.title}<br> Desription:${taskItem.description}`;
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
            
            
        })
    }

    return { renderProjects, renderNewProjectButton }
})();

export { renderInterface }

