!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const o=(e,t)=>{let n=[];return{title:e,dateDue:t,toDos:n,getTitle:()=>e,setTodos:e=>{n.push(e)},deleteTodo:e=>{n.splice(e,1)}}},l=o("Home","9/15/2020"),c=(()=>{let e=[];return{projects:e,setProjects:t=>{e.push(t)},deleteProject:t=>{e.splice(t,1),console.log(e)}}})();c.setProjects(l);const r=(()=>{const e=document.querySelector(".container");let t=2,n=1;const l=o=>{o.forEach((function(o,l,s){if(0===l&&(o.projectID=0,r.renderNewProjectButton()),l===s.length-1){const r=document.createElement("div");r.className="project-div",r.dataset.id=l,r.style.gridColumnStart=t,r.style.gridRowStart=n;const s=document.createElement("div");s.className="title-div",s.innerHTML=`<h4>${o.getTitle()}</h4>\n                <h5>Due: ${o.dateDue}</h5>`;const p=document.createElement("ul");p.dataset.number=l,p.style.display="none",r.appendChild(p),console.log(p),r.appendChild(s),e.appendChild(r);const u=document.createElement("button");u.className="delete-project-button",u.addEventListener("click",()=>{event.target.parentNode.remove(),c.deleteProject(l)});const m=document.createElement("button");m.id="add-task",m.className="add-task-button",m.addEventListener("click",()=>{i(o,r)});const f=document.createElement("button");f.id="show-tasks",f.innerHTML="show tasks",f.addEventListener("click",()=>{p.style.display="block"}),r.appendChild(m),r.appendChild(u),r.appendChild(f),d(u,a("deleteHover","Delete this project",s)),d(m,a("addTaskHover","Add a new task",s))}}))},a=(e,t,n)=>((e=document.createElement("div")).className="hover-div",e.innerHTML=t,n.appendChild(e),e),d=(e,t)=>{e.onmouseover=function(){t.style.display="block"},e.onmouseout=function(){t.style.display="none"}},s=()=>{t+=1,5===t&&(t=2,n+=2)},i=(t,n)=>{console.log(t);const o=document.createElement("div");o.id="overlay",e.appendChild(o),console.log(o);const l=document.createElement("div");l.className="new-task-form",l.id="task-form-in-div";const c=document.createElement("input");c.className="form-group input-group form-control",c.type="text",c.placeholder="Task Name",c.value="",l.appendChild(c);const r=document.createElement("input");r.className="form-group input-group form-control",r.type="text",r.placeholder="Describe Task",r.value="",l.appendChild(r);const a=document.createElement("button");a.innerHTML="X",l.appendChild(a),a.addEventListener("click",()=>{o.display="none"});const d=document.createElement("button");d.innerHTML="Add task to "+t.getTitle(),l.appendChild(d),o.appendChild(l),d.addEventListener("click",()=>{if(event.preventDefault(),r.value&&c.value){let d=(e=c.value,a=r.value,{title:e,description:a,completedTask:!1});t.setTodos(d),p(n,t),l.style.display="none",o.style.display="none"}else alert("Please Fill In Both Fields!");var e,a})},p=(e,t)=>{console.log(t.id);let n=t.toDos;const o=document.get;n.forEach((function(e,t,n){if(t===n.length-1){o.innerHTML=`<li>${e.title}: ${e.description}</li>`,o.className="task-list";const t=document.createElement("button");t.className="completed-button",o.appendChild(t),o.style.display="none",t.addEventListener("click",()=>(!0===e.completedTask?e.completedTask=!1:e.completedTask=!0,"completed-button"===t.className?t.className="completed-button-complete":t.className="completed-button",o))}}))};return{renderProjects:l,renderNewProjectButton:()=>{const t=document.createElement("div");t.className="col-sm-4",t.id="new-project-form-div",e.appendChild(t);const n=document.createElement("input");n.className="form-group form-control new-project-input",n.type="text",n.value="",n.placeholder="New Project Name",t.appendChild(n),t.appendChild((()=>{const e=document.createElement("div");return e.innerHTML="\n<form class ='form-group'>\n    <div class='input-group date' id='datetimepicker1'>\n            <input type='text' placeholder='Due Date' class=\"form-control\" data-date='due' />\n                <span class=\"input-group-addon\">\n                    <span class=\"glyphicon glyphicon-calendar\"></span>\n                </span>\n            </div> \n            <script type=\"text/javascript\">\n            \n            <\/script>",e})()),$((function(){$(".date").datetimepicker()}));const r=document.querySelectorAll(".form-control")[1];console.log(r);const a=document.createElement("button");a.innerHTML="Create New Project",t.appendChild(a),a.addEventListener("click",()=>{s();const e=r.value,t=o(n.value,e.substr(0,e.indexOf(" ")));c.setProjects(t),console.log(t),l(c.projects)})}}})();let a=c.projects;r.renderProjects(a),$((function(){$("#datetimepicker1").datetimepicker()})),console.log(c)}]);