import { parseISO, add , isBefore , set } from 'date-fns';
import { allTasksIndex, controller} from './index'

function resetHours (date) { /*RESETA AS HORAS*/
    let resetedDate = set(date, {hours: 0, minutes:0, seconds: 0})
    return resetedDate;
}

function dateString (date) { /*CONVERTE PARA DATA*/
    let resetedDate = date.getFullYear()+ '-0'+ (date.getMonth()+1) + '-'+ date.getDate();
    return resetedDate;
}

function newElement(type,name) {
    let doc = document.createElement(type);
    (name != undefined)? doc.classList.add(name): '';
    return doc;
}

let allTasks = [];

function copy () {
    allTasks = allTasksIndex
}

class listeners {
    static changeMain = {
        changeTab: function () {
            let home = document.querySelector(".home").children;
            let projects = document.querySelector(".projects").children;
            for (let i = 1 ; i < home.length; i++) {
                let dataName = home[i].dataset.name;
                home[i].addEventListener("click", () => listeners.changeContent.changeTabContent(i,".home",dataName));
            };
            for (let i = 2; i < projects.length ; i++) {
                let dataName = projects[i].dataset.name;
                projects[i].addEventListener("click", ()=> listeners.changeContent.changeTabContent(i,".projects",dataName));
            }
        },
        changeTabDinamic: function () {
            let projects = document.querySelector(".projects").children;
            let home = document.querySelector(".home").children;
            let tab = '';
            let dataName;
            let z = 0;
            for (let i = 1 ; i < home.length; i++) {
                if (home[i].dataset.selected == 'true') {
                    tab = '.home';
                    z = i;
                    dataName = home[i].dataset.name;}
            }
            for (let i = 2; i < projects.length ; i++) {
                if (projects[i].dataset.selected == 'true') {
                    tab = '.projects';
                    z = i;
                    dataName = projects[i].dataset.name;}
            }
            listeners.changeContent.changeTabContent(z,tab,dataName);
        }
    }

    static changeContent = {
        changeTabContent: function (i,type,data) {
            let parent = document.querySelector(`${type}`).children;
            listeners.changeContent.changeSelected(data);
            for (let j = 0 ; j < allTasks.length ; j++) {
                if (parent[i] == undefined) {return};
                if (allTasks[j].name == parent[i].dataset.name) {
                    document.querySelector(".content").innerHTML = `<p class="currentTab">${parent[i].dataset.name}</p`;
                    listeners.changeContent.newTaskBtn();
                    console.log(document.querySelectorAll(".task"));
                    console.log(allTasks);
                    for (let l = 0 ; l < allTasks[j].tasks.length ; l ++) {
                        listeners.changeContent.addContent(allTasks[j].tasks[l],l);
                    }
                }
            }
        },
        changeSelected: function (dataName) {
            let home = document.querySelector(".home").children;
            let project = document.querySelector(".projects").children;
            let change = document.querySelector(`[data-name='${dataName}']`)
            for (let i = 0; i < home.length ; i++) {
                home[i].dataset.selected = 'false';
            }
            for (let i = 0; i < project.length; i++) {
                project[i].dataset.selected = 'false';
            }
            if (change == null) {return};
            change.dataset.selected ='true';
        },
        newTaskBtn: function () {
            let content = document.querySelector(".content")
            let newBtn = newElement("div","task");
            newBtn.setAttribute("id","newTask");
            newBtn.innerHTML = '<i class="fa-solid fa-plus"></i> New';
            content.append(newBtn);
            document.querySelector("#newTask").addEventListener("click", listeners.taskMethods.newTask );
        },
        addContent: function (key) {
            let currentTab = document.querySelector(".currentTab").textContent;
            if(key.check == 'failed' && currentTab != 'Failed') {return}
            let content = document.querySelector(".content");
            let currentTask = key;
            let task = newElement("div","task");
            task.dataset.name =  currentTask.title;
            let data = currentTask.title;

                (currentTask.priority == 'L')? task.style.borderLeft = 'solid 4px DarkGreen' : '';
                (currentTask.priority == 'M')? task.style.borderLeft = 'solid 4px GoldenRod' : '';
                (currentTask.priority == 'H')? task.style.borderLeft = 'solid 4px FireBrick' : '';
                (currentTask.check == true)? task.style.borderLeft = 'solid 4px #2a3744': '';

                let taskCheck = newElement("div","task-check")
                    if (currentTask.check == true) {
                    taskCheck.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
                    }
                    else if (currentTask.check == 'failed') {
                        taskCheck.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
                    }
                    else {taskCheck.innerHTML = '<i class="fa-regular fa-circle"></i>'};

                let taskTitle = newElement("p","task-title");
                taskTitle.textContent = currentTask.title;

                let taskRight = newElement("div","task-right");

                    let taskDate = newElement("div","task-date");
                            let taskDateIcon = newElement("div");
                            taskDate.append(taskDateIcon);
                            let today = new Date();
                            today = dateString(today);  
                            let endWeek = new Date();
                            endWeek = add(endWeek, {days:7})
                            endWeek = resetHours(endWeek);
                            endWeek = set(endWeek, {hours:23,minutes:59,seconds:59})
                            let dueDate = parseISO(currentTask.dueDate);
                            (isBefore(dueDate,endWeek) && currentTask.check == false) ? taskDateIcon.innerHTML = '<i class="fa-solid fa-hourglass-empty"></i>' : '';
                            (currentTask.dueDate == today && currentTask.check == false) ? taskDateIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>' :  '';
                            (currentTask.check == true) ? taskDateIcon.innerHTML = '<i class="fa-solid fa-check-double"></i> ' : '';
                            (currentTask.check == 'failed') ? taskDateIcon.innerHTML = '<i class="fa-solid fa-calendar-xmark"></i>' : '';
                            (taskDateIcon.innerHTML == '') ? taskDateIcon.innerHTML = '<i class="fa-solid fa-hourglass-empty"></i>' : '';
                            taskDateIcon.style.marginRight = '3px';

                            let taskDueDate = newElement("div","task-dueDate");
                               dueDate = dueDate.getDate()+'/0'+(dueDate.getMonth()+1);
                            taskDueDate.textContent = dueDate;

                    let taskDetails = newElement("p","task-details")
                    taskDetails.textContent = "DETAILS";

                    let taskDelete = newElement("p","task-delete")
                    taskDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';

            taskCheck.addEventListener("click",() => listeners.changeContent.taskCheck(data));
            taskDelete.addEventListener("click",()=> listeners.changeContent.taskDelete(data));
            taskDetails.addEventListener("click",()=> listeners.changeContent.taskDetails(data));

            taskDate.append(taskDueDate);
            taskRight.append(taskDate,taskDetails,taskDelete);
            task.append(taskCheck,taskTitle,taskRight);
            content.append(task);
        },
        taskDetails: function (data){
            let taskChange;
            for (let key of allTasks[0].tasks) {
                if (data == key.title) {
                    taskChange = key;
                }
            }
            document.querySelector(".modal").style.display = 'flex';
            document.querySelector("#input-title").value = taskChange.title;
            document.querySelector("#input-description").value = taskChange.description;
            document.querySelector("#input-date").value = taskChange.dueDate;
            document.querySelector("#input-priority").value = taskChange.priority; 
            document.querySelector("#input-project").value = taskChange.project;

            let newBtn = document.querySelector("#new");
            newBtn.value = "Edit";
            newBtn.removeEventListener("click",listeners.taskMethods.addTask);

            function editTask () {
                taskChange.title = document.querySelector("#input-title").value;
                taskChange.description = document.querySelector("#input-description").value;
                taskChange.dueDate = document.querySelector("#input-date").value ;
                taskChange.priority = document.querySelector("#input-priority").value;
                taskChange.project = document.querySelector("#input-project").value;
                listeners.taskMethods.closeTask();
                newBtn.removeEventListener("click",editTask);
                newBtn.addEventListener("click",listeners.taskMethods.addTask);
                controller.organize();
                copy();
                console.log(allTasks)
                listeners.changeMain.changeTabDinamic();
            }
            newBtn.addEventListener("click",editTask);
        },
        taskCheck: function (data) {
            let taskChange;
            for (let key of allTasks[0].tasks) {
                if (data == key.title) {
                    taskChange = key;
                }
            }
            if (taskChange == undefined) {return};
            if (taskChange.check == false) {
                taskChange.check = true;
                controller.organize();
                listeners.changeMain.changeTabDinamic();
                return;
            }
            if (taskChange.check == true) {
                taskChange.check = false;
                controller.organize();
                listeners.changeMain.changeTabDinamic();
                return;
            }
        },
        taskDelete: function (data) {
                console.log(data);
                controller.removeTask(data);
                controller.organize();
                copy();
                listeners.changeMain.changeTabDinamic();
        },
    }

    static taskMethods = {
        addTask: function () {
            let title = document.querySelector("#input-title").value;
            let description = document.querySelector("#input-description").value;;
            let dueDate = document.querySelector("#input-date").value;
            let priority = document.querySelector("#input-priority").value;
            let projeto = document.querySelector("#input-project").value;
            let check = false;
            for (let key of allTasks[0].tasks) {
                if (title == key.title) { document.querySelector("#input-title").dataset.validity = 'true';
                    setTimeout(() => {document.querySelector("#input-title").dataset.validity = 'false'},2000);
                    let selected = document.querySelector("#input-title");
                    let value = document.querySelector("#input-title").value;
                    let number = Number(value[value.length-1]);
                    if (isNaN(number)) {selected.value = selected.value + '-1'
                    return}
                    else {
                        let valueLength = value.length-1;
                        let str = value.slice(0,valueLength);
                        selected.value = str + (number+1);
                        return
                    }
                }
            }
            if (dueDate == '' || title == '') {
                (dueDate == '')? document.querySelector("#input-date").dataset.validity = 'true' : '';
                (title == '')? document.querySelector("#input-title").dataset.validity = 'true': '';
                setTimeout(() => {document.querySelector("#input-title").dataset.validity = 'false'},2000)
                setTimeout(() => {document.querySelector("#input-date").dataset.validity = 'false'},2000)
                return
            };
            controller.addTask(title,description,dueDate,priority,check,projeto);
            listeners.taskMethods.closeTask();
        },
        closeTask: function () {
            document.querySelector(".modal").style.display = 'none';
            document.querySelector(".modal-project").style.display = 'none';
            let buttonNew = document.querySelector("#new");
            buttonNew.value = 'New';
        },
        newTask: function() {
            document.querySelector(".modal").style.display = 'flex';
            document.querySelector("#myForm").reset();
            let inputProject = document.querySelector("#input-project");
            inputProject.innerHTML = '';
            let none = newElement("option");
            none.textContent = 'None';
            none.value = 'none';
            inputProject.append(none);
            let currentTab = document.querySelector(".currentTab");
            for (let i = 6 ; i < allTasks.length ; i++) {
                let option = newElement("option");
                option.textContent = allTasks[i].name;
                option.value = allTasks[i].name;
                inputProject.append(option);
                }

            let options = inputProject.children;
            for (let x = 1 ; x < options.length ; x++) {
                if (options[x].value == currentTab.textContent) {
                    options[x].setAttribute("selected","default")
                }
            }
        },
    }

    static eventListeners = {
        navBar: function () {
            function collapse() {
                if (document.querySelector("#header-bar").dataset.counter == '1') {
                    document.querySelector(".navbar").style.display='none';
                    document.querySelector(".separe").style.display='none'
                    document.querySelector("#header-bar").dataset.counter = '0';
                }
                else {document.querySelector(".navbar").style.display= 'flex';
                    document.querySelector(".separe").style.display='flex'
                    document.querySelector("#header-bar").dataset.counter = '1';
                }
            }
            document.querySelector("#header-bar").addEventListener("click",collapse)
        },
        newProjectListener: function() {
            let newBtn = document.querySelector(".new");
            let closeProject = document.querySelector("#close-project");
            let newProjectBtn = document.querySelector("#new-project");
            newBtn.addEventListener("click",listeners.projectMethods.newProjectItem);
            newProjectBtn.addEventListener("click",listeners.projectMethods.newProject);
            closeProject.addEventListener("click",() => {
                document.querySelector(".modal-project").style ="none";
                document.querySelector("#form-project").reset();
            })
        }
    }

    static projectMethods = {
        newProjectItem: function () {
            let projectModal = document.querySelector(".modal-project");
            projectModal.style.display="flex";
        },
        newProject: function () {
            let name = document.querySelector("#input-title-project").value;
            let description = document.querySelector("#input-description-project").value;
            if (name == '') {
                document.querySelector("#input-title-project").dataset.validity = 'true';
                setTimeout(() => {document.querySelector("#input-title-project").dataset.validity = 'false'},2000)
                return
            };
            for (let key of allTasks) {
                if (name == key.name) { document.querySelector("#input-title-project").dataset.validity = 'true';
                    setTimeout(() => {document.querySelector("#input-title-project").dataset.validity = 'false'},2000);
                    let selected = document.querySelector("#input-title-project");
                    let value = document.querySelector("#input-title-project").value;
                    let number = Number(value[value.length-1]);
                    if (isNaN(number)) {selected.value = selected.value + '-1'
                    return}
                    else {
                        let valueLength = value.length-1;
                        let str = value.slice(0,valueLength);
                        selected.value = str + (number+1);
                        return
                    }
                }
            }
            controller.addProject(name,description);
            let projectModal = document.querySelector(".modal-project");
            projectModal.style ="none";
            document.querySelector("#form-project").reset();
            listeners.projectMethods.updateProjects();
            controller.organize();
        },
        removeProject: function (data) {
            controller.removeProject(data);
            let projects = document.querySelector(".projects").children;
            for (let j = 2 ; j < projects.length; j++) {
                if (projects[j].textContent == data) {
                    projects[j].remove();}
            }
            let home = document.querySelector(".home").children
            controller.organize();
            home[1].dataset.selected = 'true';
            listeners.changeMain.changeTab();
            listeners.changeMain.changeTabDinamic();
        },
        updateProjects: function () {
            copy();
            let project = document.querySelector(".projects").children; 
            let projectBody = document.querySelector(".projects");
            for (let i = project.length-1 ; i > 1 ; i--) {
                project[i].remove()
            }
            for (let j = 6; j < allTasks.length ; j++) {
                let projectAssign = newElement("div","project-item");
                projectAssign.dataset.name = allTasks[j].name;
                projectAssign.dataset.selected = 'false';
                let icon = newElement("div","icon");
                icon.innerHTML = '<i class="fa-solid fa-box-archive"></i>';
                let content = newElement("p");
                content.textContent = allTasks[j].name;
                let deleProj = newElement("div","delProj");
                    deleProj.innerHTML = '<i class="fa-solid fa-trash" id="delete-project"></i>';
                projectAssign.append(icon,content,deleProj);
                projectBody.append(projectAssign);
                let data = allTasks[j].name;
                deleProj.addEventListener("click",()=> listeners.projectMethods.removeProject(data));
            }
            listeners.changeMain.changeTab();
        }
    }    
}

function initializeDom() {
    copy();
    listeners.taskMethods.newTask();
    let modalClose = document.querySelector("#close");
    let modalNew = document.querySelector("#new");
    modalClose.addEventListener("click", listeners.taskMethods.closeTask);
    modalNew.addEventListener("click", listeners.taskMethods.addTask);
    listeners.taskMethods.closeTask();
    listeners.eventListeners.newProjectListener();
    listeners.eventListeners.navBar();
    listeners.changeMain.changeTab();
    listeners.changeMain.changeTabDinamic();
}

export {initializeDom,copy ,listeners}