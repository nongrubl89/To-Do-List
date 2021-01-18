import { renderInterface } from './interface';

const ProjectList = () => {
  const projects = [];
  const setProjects = (Project) => {
    projects.push(Project);
  };

  const deleteProject = (index) => {
    projects.splice(index, 1);
    console.log(projects);
  };

  //   regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
  const addProjToDatabase = (project, i) => {
    const index = i.toString();
    const user = firebase.auth().currentUser;
    const listDoc = db.collection(user.email).doc(index);
    listDoc.set({title: project.title, dateDue:project.dateDue})
    // listDoc.set(projects)

  };

  const getProjFromDatabase = () => {
    const user = firebase.auth().currentUser;
    db.collection(user.email).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          const projectList = [];
          projectList.push(doc.data());
          projectList.forEach(project=>{
                    const newProj = Project(project.title, project.dateDue);
                    projects.push(newProj);
                    renderInterface.renderProjects(projects);
          })
      });
  });
  };

  const deleteProjFromDatabase =(i)=>{
    const user = firebase.auth().currentUser;
    const index = i.toString();
    db.collection(user.email).doc(index).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

  }
  return {
    projects,
    setProjects,
    deleteProject,
    addProjToDatabase,
    getProjFromDatabase,
    deleteProjFromDatabase
  };
};

const Project = (title, dateDue) => {
  const getTitle = () => title;
  const toDos = [];
  const setTodos = (ListItem) => {
    toDos.push(ListItem);
  };
  const deleteTodo = (index) => {
    toDos.splice(index, 1);
  };
  return { title, dateDue, toDos, getTitle, setTodos, deleteTodo };
};
//make listItem an instance of project
const ListItem = (title, description, priority) => {
  let completedTask = false;
  return { title, description, priority, completedTask };
};

const Home = Project('Sample', '9/15/2020');
console.log(Home);
// // Home.setTodos(newTodo);
const ProjectManager = ProjectList();
// ProjectManager.setProjects(Home);

export { ListItem, Project, ProjectManager };
