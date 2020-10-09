
const ProjectList = () => {
    const projects = [];
    const setProjects = (Project) => {
        projects.push(Project);
    }

    const deleteProject = (index) => {
        projects.splice(index, 1);
        console.log(projects);
    }
    return { projects, setProjects, deleteProject }
}

const Project = (title, dateDue) => {
    const getTitle = () => title;
    const toDos = [];
    const setTodos = (ListItem) => {
        toDos.push(ListItem);
    }
    const deleteTodo = (index) => {
        toDos.splice(index, 1);
    }
    return { title, dateDue, toDos, getTitle, setTodos, deleteTodo }
}
//make listItem an instance of project
const ListItem = (title, description, priority) => {
    let completedTask = false;
    return { title, description, priority, completedTask }
}

const Home = Project('Home', '9/15/2020');
const newTodo = ListItem ('Clean', 'clean the house', 'High', true);
Home.setTodos(newTodo);
const ProjectManager = ProjectList();
ProjectManager.setProjects(Home);

export { ListItem, Project, ProjectManager }