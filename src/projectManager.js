// function Project{
//     constructor(title, dueDate){
//         this.title=title;
//         this.todos=[];
//         this.dueDate=dueDate; 
//         this.projectNumber = 0;
// }
//     //push todos into array
//     setTodos(ListItem){
//         // this.todos=[];
//         this.todos.push(ListItem)
//     }
// }

const ProjectList=()=>{
    let projects=[];
    const setProjects=(Project)=>{
        projects.push(Project);
    }

    const deleteProject=(index)=>{
        projects.splice(index,1);
        console.log(projects);
    }
    return{projects, setProjects, deleteProject}
}

const Project=(title, dateDue)=>{
    const getTitle=()=>title;
    let toDos = [];
    const setTodos =(ListItem)=>{
        toDos.push(ListItem);
    }
    const deleteTodo=(index)=>{
        toDos.splice(index, 1);
    }
    return{title, dateDue, toDos, getTitle, setTodos, deleteTodo}
}
//make listItem an instance of project
const ListItem=(title, description)=>{
    let completedTask = false;
   return{title, description, completedTask}  
}

const Home = Project('Home', '9/15/2020');
const ProjectManager=ProjectList();
ProjectManager.setProjects(Home);

export {ListItem, Project, ProjectManager}