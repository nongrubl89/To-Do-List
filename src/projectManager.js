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
  const addProjToDatabase = (project) => {
    const user = firebase.auth().currentUser;
    const listDoc = db.collection('master').doc(user.email);
    listDoc
      .update(
        {
          projects: firebase.firestore.FieldValue.arrayUnion({
            title: project.title,
            dateDue: project.dateDue,
          }),
        },
        { merge: true }
      )
      .then(() => console.log('added to db'));
  };

  const getProjFromDatabase = () => {
    const user = firebase.auth().currentUser;
    let docRef = db.collection('master').doc(user.email);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          const projectList = doc.data().projects;
          renderInterface.renderProjects(projectList);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  };
  return {
    projects,
    setProjects,
    deleteProject,
    addProjToDatabase,
    getProjFromDatabase,
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
