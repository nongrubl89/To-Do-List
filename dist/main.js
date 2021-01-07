!function(e){var t={};function n(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(o,s,function(t){return e[t]}.bind(null,s));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const o=(e,t)=>{const n=[];return{title:e,dateDue:t,toDos:n,getTitle:()=>e,setTodos:e=>{n.push(e)},deleteTodo:e=>{n.splice(e,1)}}},s=(e,t,n)=>({title:e,description:t,priority:n,completedTask:!1}),a=o("Home","9/15/2020"),l=s("Clean","clean the house","High");a.setTodos(l);const i=(()=>{const e=[];return{projects:e,setProjects:t=>{e.push(t)},deleteProject:t=>{e.splice(t,1),console.log(e)}}})();i.setProjects(a);const c=(()=>{const e=document.querySelector(".content"),t=t=>{t.forEach((function(t,o,s){if(0===o&&(t.projectID=0),o===s.length-1){const s=document.createElement("div");s.className="slide project-div",s.dataset.id=o,t.projectID=o;const a=document.createElement("div");a.className="title-div",a.innerHTML=`<h4>${t.getTitle()}</h4>`;const l=document.createElement("div");l.className="date-div",l.innerHTML=`<h4>${t.dateDue}</h4>`;const c=document.createElement("div");c.dataset.number=o,c.style.display="none",s.appendChild(a),s.appendChild(l),e.appendChild(s);const r=document.createElement("button");r.className="img-button delete-project-button",r.addEventListener("click",()=>{event.target.parentNode.parentNode.remove(),i.deleteProject(o)}),s.appendChild(r);const d=document.createElement("button");d.id="add-task",d.className="img-button add-task-button",d.addEventListener("click",()=>{n(t,s)}),s.appendChild(d);const p=document.createElement("button");p.className="img-button show-tasks",p.addEventListener("click",()=>{"show-tasks"===p.className&&!1===c.hasChildNodes()?(console.log(c.hasChildNodes()),p.className="img-button show-tasks"):p.className="img-button hide-tasks",0!==t.toDos.length?"none"===c.style.display?(s.className="project-div-expanded",c.style.display="grid",shiftDivsDown(),"project-div"===s.className&&(c.style.display="none")):"grid"===c.style.display&&(s.className="project-div",c.style.display="none",shiftDivsUp()):alert("No tasks in project")}),s.appendChild(p),s.appendChild(c)}}))},n=(t,n)=>{const o=document.createElement("div");o.id="overlay",e.appendChild(o);const i=document.createElement("div");i.className="new-task-form",i.id="task-form-in-div";const c=a("newTaskNameInput","form-group input-group form-control","Task Name");c.id="task-name-input",i.appendChild(c);const r=a("newTaskDescriptionInput","form-group input-group form-control","Describe this task");r.id="describe",i.appendChild(r);["Low","Medium","High"].forEach(e=>{const t=document.createElement("div");t.className=e,t.innerHTML=`<input type = "radio" name='priority' class = 'radio'\n            \n            id = ${e} />\n            <label for = ${e}>${e} priority</label>`,i.appendChild(t)});const d=document.createElement("div");d.className="task-button-div";const p=document.createElement("button");p.innerHTML="Close",p.className="collapse-task-form",d.appendChild(p),p.addEventListener("click",()=>{o.style.display="none"});const u=document.createElement("button");u.innerHTML="Add task to "+t.getTitle(),u.className="new-task-button",d.appendChild(u),i.appendChild(d),o.appendChild(i),u.addEventListener("click",()=>{event.preventDefault();const e=document.querySelector('input[name="priority"]:checked').id;if(e||alert("Please Select Priority"),r.value&&c.value){let a=s(c.value,r.value,e);t.setTodos(a),l(n,t),i.style.display="none",o.style.display="none"}else alert("Please Fill In Both Fields!")})},a=(e,t,n)=>((e=document.createElement("input")).className=t,e.type="text",e.placeholder=n,e.value="",e),l=(e,t)=>{console.log(e);const n=t.projectID;console.log(n);let o=t.toDos,s=document.querySelector(`[data-number='${n}']`);s.className="task-list-div",o.forEach((function(t,n,o){if(n===o.length-1){const n=document.createElement("div");n.className="list-items",n.innerHTML=`<p class = 'task-list-item'>${t.title}</p> \n                <p class='description-list-item'>${t.description}</p> \n                <div class='priority-list-item'></div>`,s.appendChild(n);const o=document.querySelector(".priority-list-item");console.log(o),"High"===t.priority?o.className="dot high-priority":"Medium"===t.priority?o.className="dot medium-priority":"Low"===t.priority&&(o.className="dot low-priority");const a=document.createElement("button");a.className="img-button completed-button",n.appendChild(a),"project-div-expanded"===e.className?s.style.display="grid":s.style.display="none",a.addEventListener("click",()=>{!0===t.completedTask?t.completedTask=!1:t.completedTask=!0,"img-button completed-button"===a.className?a.className="img-button completed-button-complete":a.className="img-button completed-button"})}}))};return{renderProjects:t,renderNewProjectButton:()=>{const e=document.querySelector(".sidebar"),n=document.createElement("div");n.innerHTML='<h3 class ="header">Add a project</h3>',n.className="col-sm-4",n.id="new-project-form-div",e.appendChild(n);const s=a("newProjectInput","form-group input-group form-control","Project Name");n.appendChild(s),n.appendChild((()=>{const e=document.createElement("div");return e.innerHTML="\n<form class ='form-group'>\n    <div class='input-group date' id='datetimepicker1'>\n            <input type='text' placeholder='Due Date' class=\"form-control\" data-date='due' />\n                <span class=\"input-group-addon\">\n                    <span class=\"glyphicon glyphicon-calendar\"></span>\n                </span>\n            </div> \n            <script type=\"text/javascript\">\n            \n            <\/script>",e})()),$((function(){$(".date").datetimepicker()}));const l=document.querySelectorAll(".form-control")[1],c=document.createElement("button");c.id="new-project-button",c.innerHTML="Create New Project",n.appendChild(c),c.addEventListener("click",()=>{if(s.value&&l.value){let e=l.value;const n=o(s.value,e.substr(0,e.indexOf(" ")));i.setProjects(n),t(i.projects),e="",s.value=""}else alert("Please fill in both fields")})}}})();let r=i.projects;c.renderProjects(r),c.renderNewProjectButton(),console.log(i)}]);