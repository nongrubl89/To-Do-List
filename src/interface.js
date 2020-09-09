import{ListItem, Project, Home, Work, ProjectManager} from './projectManager.js'
import{DateTime} from './dateTime.js'

const renderInterface=(()=>{
    const container = document.querySelector('.container');
   
    //shows each project and renders the project div in the dom
    const renderProjects=(projects)=>{
        
        projects.forEach(function(project, index, array){
            // if(project)return;
            if(index===0){
                project.projectID=0;
            }
            if (index === array.length - 1){  
            const projectDiv = document.createElement('div');
            projectDiv.className='project-div';

            const titleDiv=document.createElement('div');
            titleDiv.className='title-div';
            titleDiv.innerHTML=`<h4>${project.getTitle()}</h4>
            <h4>Due: ${project.dateDue}</h4>
            `
            projectDiv.appendChild(titleDiv);
            container.appendChild(projectDiv);

            let addHover = document.createElement('div');
            addHover.className='hover-div';
            addHover.innerHTML='Add a new task';
            titleDiv.appendChild(addHover);

            const deleteButton = document.createElement('button');
            deleteButton.className='delete-project-button';
            deleteButton.innerHTML='Delete this Project';
            deleteButton.addEventListener('click',()=>{
                event.target.parentNode.remove();
                ProjectManager.deleteProject(index);
                
            })

            
            const addTaskButton = document.createElement('button');
            addTaskButton.className='add-task-button';
            addTaskButton.innerHTML='+';
            addTaskButton.addEventListener('click',()=>{
                createNewTaskForm(project, projectDiv);
                
            })

            projectDiv.appendChild(addTaskButton);
            projectDiv.appendChild(deleteButton);
        }
        addHover(); 
        });
    }

    const addHover=()=>{
        const addTaskButton = document.querySelector('.add-task-button');
        console.log(addTaskButton);
        const hoverDiv = document.querySelector('.hover-div');
        console.log(hoverDiv);
        addTaskButton.onmouseover=function(){
            hoverDiv.style.display='block';
        }
        addTaskButton.onmouseout=function(){
            hoverDiv.style.display='none';
        }
    }

    //creates the text box and button for a new project
    const renderNewProjectButton=()=>{

        const newProjectForm = document.createElement('FORM');
        newProjectForm.setAttribute("id", "new-project-form");
        container.appendChild(newProjectForm);

        const newProjectInput = document.createElement('input');
        newProjectInput.setAttribute('type','text');
        newProjectInput.setAttribute('value','');
        newProjectInput.setAttribute('placeholder','New Project Name')
        newProjectForm.appendChild(newProjectInput);

        newProjectForm.appendChild(DateTime());
                $(function () {
                    $('#datetimepicker1').datetimepicker();
                    });
        const calendar = document.getElementById('due');

        const newProjectButton=document.createElement('button');
        newProjectButton.innerHTML='Create New Project';
        container.appendChild(newProjectButton);

        newProjectButton.addEventListener('click',()=>{
            const calendarValue = calendar.value;
            const newProjectObject = Project(newProjectInput.value, calendarValue.substr(0,calendarValue.indexOf(' ')));
            ProjectManager.setProjects(newProjectObject);
            console.log(newProjectObject);
            renderProjects(ProjectManager.projects);
            
        })
    }

    const createNewTaskForm=(project, projectDiv)=>{
        const newTaskForm = document.createElement('FORM');
                // const projectDiv = event.target.parentNode;
                newTaskForm.setAttribute("id", "new-project-form");
                projectDiv.appendChild(newTaskForm);

                const newTaskNameInput = document.createElement('input');
                newTaskNameInput.setAttribute('type','text');
                newTaskNameInput.setAttribute('placeholder', 'Task Name')
                newTaskNameInput.setAttribute('value','');
                newTaskForm.appendChild(newTaskNameInput);

                const newTaskDescriptionInput = document.createElement('input');
                newTaskDescriptionInput.setAttribute('type','text');
                newTaskDescriptionInput.setAttribute('placeholder', 'Describe Task')
                newTaskDescriptionInput.setAttribute('value','');
                newTaskForm.appendChild(newTaskDescriptionInput);
                
                const newTaskButton= document.createElement('button');
                newTaskButton.innerHTML='Add task to '+ project.getTitle();
                projectDiv.appendChild(newTaskButton);
                newTaskButton.addEventListener('click',()=>{
                    
                    if (!newTaskDescriptionInput.value||!newTaskNameInput.value) {
                        alert('Please Fill In Both Fields!')
                    } else {
                    let newListItem = ListItem(newTaskNameInput.value, newTaskDescriptionInput.value);
                    project.setTodos(newListItem);
                    createListItemDisplay(projectDiv, project);
                    newTaskNameInput.style.display='none';
                    newTaskDescriptionInput.style.display='none';
                    newTaskButton.style.display='none';
                    
                }})
    }

    //this is called when the add task button is clicked
    const createListItemDisplay=(projectDiv, project)=>{
        let taskItems = project.toDos;
        taskItems.forEach(function(taskItem, index, array){
            
            if (index === array.length - 1) { 
            const taskList = document.createElement('ul');
            const task = document.createElement('li');
            task.innerHTML= taskItem.title
            taskList.appendChild(task);
            
            const completedButton = document.createElement('button');
            completedButton.className='completed-button';
            
            task.appendChild(completedButton);
            projectDiv.appendChild(taskList);
            
            completedButton.addEventListener('click',()=>{
            taskItem.completedTask===true?taskItem.completedTask=false:taskItem.completedTask = true;
            completedButton.className==='completed-button'? 
            completedButton.className='completed-button-complete':
            completedButton.className='completed-button';
        }) 
            }
        
    })}

    return{renderProjects,renderNewProjectButton}
})();


export {renderInterface}

