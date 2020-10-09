import { ListItem, Project, ProjectManager } from './projectManager.js'
import { DateTime } from './dateTime.js'

const renderInterface = (() => {
    const container = document.querySelector('.project-container');

    //shows each project and renders the project div in the dom
    const renderProjects = (projects) => {
       
        projects.forEach(function (project, index, array) {
            if (index === 0) {
                project.projectID = 0;
                // projectDiv.style.gridRowStart = rowCounter;
            }
            if (index === array.length - 1) {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project-div';
                projectDiv.dataset.id = index;
                project.projectID=index;

                const titleDiv = document.createElement('div');
                titleDiv.className = 'title-div';
                titleDiv.innerHTML = `<h4>${project.getTitle()}</h4>
                <h5>Due: ${project.dateDue}</h5>`

                const taskList = document.createElement('ul');
                taskList.dataset.number=index;
                taskList.style.display='none';
                const buttonDiv = document.createElement('div');
                buttonDiv.className='button-div';
            
                projectDiv.appendChild(titleDiv);
                projectDiv.appendChild(buttonDiv);
                container.appendChild(projectDiv);

                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-project-button';
                deleteButton.addEventListener('click', () => {
                    event.target.parentNode.parentNode.remove();
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
                    if((showTasksButton.className==='show-tasks')&&(taskList.hasChildNodes()===false)){
                        console.log(taskList.hasChildNodes());
                        showTasksButton.className='show-tasks';
                    }else{
                        showTasksButton.className='hide-tasks';
                    }
                    

                    if(project.toDos.length===0){
                        alert ('No tasks in project');
                        return;
                    }
                    

                    if(taskList.style.display==='none'){
                        projectDiv.className='project-div-expanded';
                        taskList.style.display='grid';
                        shiftDivsDown();
                        
                        if(projectDiv.className==='project-div'){
                            taskList.style.display='none';
                        }  
                        
                    } else if (taskList.style.display==='grid'){
                        projectDiv.className='project-div';
                        taskList.style.display='none';
                        shiftDivsUp();
                        
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

    //creates a hover div and appends it to an element
    const createHoverDiv = (title, str, divToAppend) => {
        title = document.createElement('div');
        title.className = 'hover-div';
        title.innerHTML = str;
        divToAppend.appendChild(title);
        return title;
    }

    //adds a hover element to a div, used on the icons in each project div
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
        newProjectButton.id='new-project-button';
        newProjectButton.innerHTML = 'Create New Project';
        newProjectFormDiv.appendChild(newProjectButton);

        newProjectButton.addEventListener('click', () => {
            if(!newProjectInput.value||!calendar.value){
                alert('Please fill in both fields')
            } else{
            // addColRow();
            let calendarValue = calendar.value;
            const newProjectObject = Project(newProjectInput.value, calendarValue.substr(0, calendarValue.indexOf(' ')));
            ProjectManager.setProjects(newProjectObject);
            renderProjects(ProjectManager.projects);
            calendarValue='';
            newProjectInput.value='';
            }
        })
    }

    //shifts divs that follow the clicked div down when the expand button is clicked
    const shiftDivsDown = () => {
        const clickedDivID=event.target.parentNode.parentNode.dataset.id;
        const projDivs = document.querySelectorAll('[data-id]');
        const projDivsArray = Array.from(projDivs);
        projDivsArray.forEach(function (div, i){
            if(i!=clickedDivID){
                div.className='project-div';
            }
            if ((div.className==='project-div')&&(i>clickedDivID)){
                div.className='project-div-shifted';
            }
        })}

        //shifts divs back up 150px when the collapse button is clicked
        const shiftDivsUp=()=>{
            const projDivs = document.querySelectorAll('[data-id]');
            const projDivsArray = Array.from(projDivs);
            projDivsArray.forEach(function (div){
                if(div.className==='project-div-shifted'){
                    div.className='project-div';
                }

            })
        }
    

    //creates a form where a new task is entered on the project div
    const createNewTaskForm = (project, projectDiv) => {
        
        const overlayDiv = document.createElement('div');
        overlayDiv.id='overlay';
        container.appendChild(overlayDiv);

        const newTaskForm = document.createElement('div');
        newTaskForm.className = "new-task-form";
        newTaskForm.id = 'task-form-in-div'

        const newTaskNameInput = createDomInput
        ('newTaskNameInput', 
        'form-group input-group form-control', 
        'Task Name');
        newTaskNameInput.id='task-name-input';
        newTaskForm.appendChild(newTaskNameInput);

        
        const newTaskDescriptionInput = createDomInput
        ('newTaskDescriptionInput', 
        'form-group input-group form-control', 
        'Describe this task');
        newTaskDescriptionInput.id='describe';
        newTaskForm.appendChild(newTaskDescriptionInput)


        const newTaskPriority = ['Low','Medium','High'];
        newTaskPriority.forEach(priority=> {
            const radios=document.createElement('div');
            radios.className=priority;
            radios.innerHTML=`<input type = "radio" name='priority' class = 'radio'
            
            id = ${priority} />
            <label for = ${priority}>${priority} priority</label>`
            newTaskForm.appendChild(radios);
            
        });
        

        const collapseTaskButton = document.createElement('button');
        collapseTaskButton.className='collapse-task-form';
        newTaskForm.appendChild(collapseTaskButton);
        collapseTaskButton.addEventListener('click',()=>{
            overlayDiv.style.display='none';
        })

        const newTaskButton = document.createElement('button');
        newTaskButton.innerHTML = 'Add task to ' + project.getTitle();
        newTaskButton.className='new-task-button';
        newTaskForm.appendChild(newTaskButton);

        overlayDiv.appendChild(newTaskForm);


        newTaskButton.addEventListener('click', () => {
            event.preventDefault();
            const priorityBtns = document.querySelector('input[name="priority"]:checked').id;
            if(!priorityBtns){alert('Please Select Priority')}
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
        let taskItems = project.toDos;
        let taskList = document.querySelector(`[data-number='${index}']`);
        console.log(taskList);
        
        taskItems.forEach(function (taskItem, index, array) {
                if(index===array.length-1){
                const taskItemToAppend = document.createElement('li');
                taskItemToAppend.className='list-items';
                taskItemToAppend.innerHTML= `<div class = 'task-list-item'>${taskItem.title}</div> 
                <div class='description-list-item'>${taskItem.description}</div> 
                <div class='priority-list-item'></div>`;
                taskList.appendChild(taskItemToAppend);
                const priorityDot = document.querySelector('.priority-list-item');
                console.log(priorityDot);

                if(taskItem.priority==='High'){
                    priorityDot.className='high-priority';
                } else if(taskItem.priority==='Medium'){
                    priorityDot.className='medium-priority';
                } else if(taskItem.priority==='Low'){
                    priorityDot.className='low-priority';
                }
                
                const completedButton = document.createElement('button');
                completedButton.className = 'completed-button';

                taskItemToAppend.appendChild(completedButton);
                projectDiv.className==='project-div-expanded'? taskList.style.display='grid':taskList.style.display='none';
                

                completedButton.addEventListener('click', () => {
                    taskItem.completedTask === true ? taskItem.completedTask = false : taskItem.completedTask = true;
                    completedButton.className === 'completed-button' ?
                        completedButton.className = 'completed-button-complete' :
                        completedButton.className = 'completed-button';
                        
                  })     
            
        }})
        
    }

    return { renderProjects, renderNewProjectButton }
})();

export { renderInterface }

