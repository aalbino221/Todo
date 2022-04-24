import { parseISO, add , isBefore , set } from 'date-fns'
import './styles.css';

/*----------------------------------------ORGTASK.JS----------------------------------------*/
let allTasks = [
    {name: 'All Tasks',
    tasks: [
        //{title:"Tarefa 1",description:"Tarefa teste 1",dueDate:'2022-04-21',priority:"L",project:"none",check: false},
        //{title:"Tarefa 2",description:"Tarefa teste 2",dueDate:'2022-04-22',priority:"L",project:"none",check: false},
        //{title:"Tarefa 3",description:"Tarefa teste 3",dueDate:'2022-04-22',priority:"M",project:"none",check: false},
        //{title:"Tarefa 4",description:"Tarefa teste 4",dueDate:'2022-04-29',priority:"M",project:"none",check: true},
        //{title:"Tarefa 5",description:"Tarefa teste 5",dueDate:'2022-04-20',priority:"M",project:"none",check: 'failed'},
        //{title:"Tarefa 6",description:"Tarefa teste 6",dueDate:'2022-04-28',priority:"M",project:"Projeto 1",check: false},
        //{title:"Tarefa 7",description:"Tarefa teste 7",dueDate:'2022-04-28',priority:"H",project:"Projeto 2",check: false},
        //{title:"Tarefa 8",description:"Tarefa teste 8",dueDate:'2022-04-28',priority:"H",project:"Projeto 3",check: false}
    ]
    },
    {name: 'Today',
        tasks: []
    },
    {name: 'This Week',
        tasks: []
    },
    {name: 'Important',
        tasks: []
    },
    {name: 'Completed',
        tasks: []
    },
    {name: 'Failed',
        tasks: []
    },
    //{name: 'Projeto 1',
    //tasks: []
    //},
    //{name: 'Projeto 2',
    //tasks: []
    //},
];

function resetHours (date) {
    let resetedDate = set(date, {hours: 0, minutes:0, seconds: 0})
    return resetedDate;
}

function dateString (date) {
    let resetedDate = date.getFullYear()+ '-0'+ (date.getMonth()+1) + '-'+ date.getDate();
    return resetedDate;
}

function today() {
    let today = new Date();
    today = dateString(today);
    for (let task of allTasks[0].tasks) {
        let dueDate = task.dueDate;
        (dueDate == today && task.check == false) ? allTasks[1].tasks.push(task) : '';
    }
}


function thisWeek() {
    let endWeek = new Date();
    endWeek = resetHours(endWeek);
    endWeek = add(endWeek, {days:7});
    endWeek = set(endWeek,{hours:23, minutes:59, seconds: 59})
    for (let task of allTasks[0].tasks) {
        let dueDate = parseISO(task.dueDate);
        (isBefore(dueDate,endWeek) && task.check == false) ? allTasks[2].tasks.push(task) :  '';
    }
}

function important() {
    for (let task of allTasks[0].tasks) {
        (task.priority == 'H' && task.check == false) ? allTasks[3].tasks.push(task): '';
    }
}

function completed() {
    for (let task of allTasks[0].tasks) {
        (task.check == true) ? allTasks[4].tasks.push(task) : '';
    }
}

function failed() {
    let today = new Date();
    today = add(today, {days:-1});
    today = set(today, {hours:23, minutes:59, seconds:59});
    for (let task of allTasks[0].tasks) {
        let dueDate = parseISO(task.dueDate);
        if ((task.check  == false || task.check == 'failed') && isBefore(dueDate,today)) {
            task.check = 'failed';
            allTasks[5].tasks.push(task);
        }
    }
}

function project() {
    for (let task of allTasks[0].tasks) {
        for (let i = 6 ; i < allTasks.length ; i++) {
            if (allTasks[i].name == task.project) {
                allTasks[i].tasks.push(task)
            }
        }
    }
}

function reset() {
    for (let q = 1; q < allTasks.length ; q++) {
    allTasks[q].tasks = [];
    }
}

function initTask() {
    let tasksArray = JSON.parse(localStorage.getItem("task"));
    if (tasksArray == null) {return};
    for (let key of tasksArray) {
        allTasks[0].tasks.push(key);
    }
}

function initProject() {
    let projectArray =  JSON.parse(localStorage.getItem("projects"));
    if (projectArray == null) {return};
    for (let key of projectArray) {
        let tempKey = key.tasks;
        key.tasks = '';
        newProjectIndex(key.name,key.description);
        key.tasks = tempKey;
    }
}

function storeProject() {
    let projectName = [];
    for (let i = 6 ; i < allTasks.length ; i++) {
            projectName.push(allTasks[i])
    }
    if (projectName == '') {
        localStorage.setItem("projects",[])
    };
    localStorage.setItem("projects",JSON.stringify(projectName));
}

function storeTask() {
    let taskArray = allTasks[0].tasks;
    if (taskArray.length == 0) {
        localStorage.setItem("task",[])
    };
    localStorage.setItem("task",JSON.stringify(taskArray));
}

function organize() {
    reset();
    failed();
    today();
    thisWeek();
    important();
    completed();
    project();
    storeTask();
    storeProject();
}


/*----------------------------------------END----------------------------------------*/



/*----------------------------------------NEWTASK.js----------------------------------------*/

class makeTask {
    constructor(title,description,dueDate,priority,check = false,project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.check = check;
        this.project = project;
    }
}

class makeProject {
    constructor(name,description) {
        this.name = name;
        this.description = description;
        this.tasks = [];
    }
}

function newTask(title,description,dueDate,priority,check = false,projeto) {
    let task = new makeTask(title,description,dueDate,priority,check = false,projeto);
    allTasks[0].tasks.push(task);
}

function newProjectIndex(name,description) {
    let project = new makeProject(name,description);
    allTasks.push(project)
}

/*END*/

/*----------------------------------------INDEX.JS*----------------------------------------*/

class controller {
    static addTask(title,description,dueDate,priority,check,projeto) {
            newTask(title,description,dueDate,priority,check,projeto);
            organize();
            listeners.changeTabDinamic();
    }
}

/*----------------------------------------END----------------------------------------*/



/*----------------------------------------DOM.JS----------------------------------------*/

class listeners {
    static selectors = {
        /*HEADER*/
        headerBar: document.querySelector("#header-bar"),

        /*NAVBAR*/
        navBar: document.querySelector(".navbar"),
        navAll: document.querySelector(".all"),
        navToday: document.querySelector(".today"),
        navWeek: document.querySelector(".week"),
        navImportant: document.querySelector(".important"),
        navCompleted: document.querySelector(".completed"),
        navFailed: document.querySelector(".failed"),
        navNew: document.querySelector(".new"),
        
        /*CONTENT*/
        content: document.querySelector(".content"),

        /*MODAL*/
        newTask: document.querySelector("#newTask"),
        modal: document.querySelector(".modal"),
        modalClose: document.querySelector("#close"),
        modalNew: document.querySelector("#new"),
        myForm: document.querySelector("#myForm"),

        /*MODAL-VALUES*/
        inputTitle: document.querySelector("#input-title"),
        inputDescription: document.querySelector("#input-description"),
        inputDate: document.querySelector("#input-date"),
        inputPriority: document.querySelector("#input-priority")
    }

    static methods = {
        newElement: function(type,name) {
            let doc = document.createElement(type);
            doc.classList.add(name);
            return doc;
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
            newProjectIndex(name,description);
            let projectModal = document.querySelector(".modal-project");
            projectModal.style ="none";
            document.querySelector("#form-project").reset();
            listeners.change.updateProjects();
            organize();
        },
        newProjectItem: function () {
            let projectModal = document.querySelector(".modal-project");
            projectModal.style.display="flex";
            let closeProject = document.querySelector("#close-project");
            let newProjectBtn = document.querySelector("#new-project");
            closeProject.addEventListener("click",() => {
                projectModal.style ="none";
                document.querySelector("#form-project").reset();
            })
            newProjectBtn.addEventListener("click",listeners.methods.newProject);
        },
        newProjectListener: function() {
            let newBtn = document.querySelector(".new");
            newBtn.addEventListener("click",listeners.methods.newProjectItem);
        },

        newTask: function() {
            listeners.selectors.modal.style.display = 'flex';
            listeners.selectors.myForm.reset();
            let inputProject = document.querySelector("#input-project");
            inputProject.innerHTML = '';
            let none = document.createElement("option");
            none.textContent = 'None';
            none.value = 'none';
            inputProject.append(none);
            let currentTab = document.querySelector(".currentTab");

            for (let i = 6 ; i < allTasks.length ; i++) {
                let option = document.createElement("option");
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
        closeTask: function() {
            listeners.selectors.modal.style.display = 'none';
            let buttonNew = document.querySelector("#new");
            buttonNew.value = 'New';
        },
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
            listeners.methods.closeTask();
        },
        collapse:  function() {
            if (listeners.selectors.headerBar.dataset.counter == '1') {
                listeners.selectors.navBar.style.display='none';
                document.querySelector(".separe").style.display='none'
                listeners.selectors.headerBar.dataset.counter = '0';
            }
            else {listeners.selectors.navBar.style.display= 'flex';
                document.querySelector(".separe").style.display='flex'
                listeners.selectors.headerBar.dataset.counter = '1';
            }
        },
        newTaskSelect: function() {
            let newTask = document.querySelector("#newTask");
            let modalClose = document.querySelector("#close");
            let modalNew = document.querySelector("#new");
            newTask.addEventListener("click", listeners.methods.newTask );
            modalClose.addEventListener("click", listeners.methods.closeTask);
            modalNew.addEventListener("click", listeners.methods.addTask);
        },
        newTaskBtn: function () {
            let content = document.querySelector(".content")
            let newBtn = listeners.methods.newElement("div","task");
            newBtn.setAttribute("id","newTask");
            newBtn.innerHTML = '<i class="fa-solid fa-plus"></i> New';
            content.append(newBtn);
            this.newTaskSelect();
        },
        
        addContent: function (key) {
            let currentTab = document.querySelector(".currentTab").textContent;
            if(key.check == 'failed' && currentTab != 'Failed') {return}
            let content = document.querySelector(".content");
            let currentTask = key;
            let task = document.createElement("div");
            task.classList.add("task");
            task.dataset.name =  currentTask.title;
            let data = currentTask.title;

                (currentTask.priority == 'L')? task.style.borderLeft = 'solid 4px DarkGreen' : '';
                (currentTask.priority == 'M')? task.style.borderLeft = 'solid 4px GoldenRod' : '';
                (currentTask.priority == 'H')? task.style.borderLeft = 'solid 4px FireBrick' : '';
                (currentTask.check == true)? task.style.borderLeft = 'solid 4px #2a3744': '';

                let taskCheck = document.createElement("div");
                taskCheck.classList.add("task-check");
                    if (currentTask.check == true) {
                    taskCheck.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
                    }
                    else if (currentTask.check == 'failed') {
                        taskCheck.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
                    }
                    else {taskCheck.innerHTML = '<i class="fa-regular fa-circle"></i>'};
                taskCheck.addEventListener("click",() => listeners.taskMethods.taskCheck(data));

                let taskTitle = document.createElement("p");
                taskTitle.classList.add("task-title");
                taskTitle.textContent = currentTask.title;

                let taskRight = document.createElement("div");
                taskRight.classList.add("task-right");

                    let taskDate = document.createElement("div");
                    taskDate.classList.add("task-date");
                            let taskDateIcon = document.createElement("div");
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

                            let taskDueDate = document.createElement("div");
                            taskDueDate.classList.add("task-dueDate");
                            let taskDateCont = parseISO(currentTask.dueDate);
                                taskDateCont = taskDateCont.getDate()+'/0'+(taskDateCont.getMonth()+1);
                            taskDueDate.textContent = taskDateCont;

                    let taskDetails = document.createElement("p");
                    taskDetails.classList.add("task-details");
                    taskDetails.textContent = "DETAILS";
                    taskDetails.addEventListener("click",()=> listeners.taskMethods.taskDetails(data));

                    let taskDelete = document.createElement("p");
                    taskDelete.classList.add("task-delete");
                    taskDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
                    taskDelete.addEventListener("click",()=> listeners.taskMethods.taskDelete(data));

            taskDate.append(taskDueDate);
            taskRight.append(taskDate,taskDetails,taskDelete);
            task.append(taskCheck,taskTitle,taskRight);
            content.append(task);
        },

        changeContent: function(a,parent) {
            let contentCenter = document.querySelector(".content");
            contentCenter.remove();

            let center = document.querySelector(".center");
            let content = document.createElement("div");
            content.classList.add("content");
            center.append(content);

            let currentTab = document.createElement("p");
            currentTab.classList.add("currentTab");
            currentTab.textContent = parent[a].dataset.name;

            content.append(currentTab);
        }
    }

    static change = {
        changeSelected: function (dataName) {
            if(dataName == 'S') {return};
            let home = document.querySelector(".home").children;
            let project = document.querySelector(".projects").children;
            let change = document.querySelector(`[data-name='${dataName}']`)
            for (let i = 0; i < home.length ; i++) {
                home[i].dataset.selected = 'false';
            }
            for (let i = 0; i < project.length; i++) {
                project[i].dataset.selected = 'false';
            }
            change.dataset.selected ='true';
        },
        changeTabContent: function (i,type,data) {
            let parent = document.querySelector(`${type}`).children;
            listeners.change.changeSelected(data);
            for (let j = 0 ; j < allTasks.length ; j++) {
                if (parent[i] == undefined) {return};
                if (allTasks[j].name == parent[i].dataset.name) {
                    listeners.methods.changeContent(i,parent,type);
                    listeners.methods.newTaskBtn();
                    for (let l = 0 ; l < allTasks[j].tasks.length ; l ++) {
                        listeners.methods.addContent(allTasks[j].tasks[l],l);
                    }
                }
            }
        },
        updateProjects: function () {
            let project = document.querySelector(".projects").children; 
            let projectBody = document.querySelector(".projects")
            for (let i = project.length-1 ; i > 1 ; i--) {
                project[i].remove()
            }
            for (let j = 6; j < allTasks.length ; j++) {
                let projectAssign = document.createElement("div");
                projectAssign.classList.add("project-item");
                projectAssign.dataset.name = allTasks[j].name;
                projectAssign.dataset.selected = 'false';
                let icon = document.createElement("div");
                icon.classList.add("icon");
                icon.innerHTML = '<i class="fa-solid fa-box-archive"></i>';
                let content = document.createElement("p");
                content.textContent = allTasks[j].name;
                let deleProj = document.createElement("div");
                    deleProj.classList.add("delProj");
                    deleProj.innerHTML = '<i class="fa-solid fa-trash" id="delete-project"></i>';
                projectAssign.append(icon);
                projectAssign.append(content);
                projectAssign.append(deleProj);
                projectBody.append(projectAssign);
                let data = allTasks[j].name;
                deleProj.addEventListener("click",()=> listeners.projectMethods.removeProject(data));
            }
            listeners.changeProject();
        }
    }

    static projectMethods  = {
        removeProject: function (data) {
            for(let a = 6 ; a < allTasks.length ; a++) {
                if (allTasks[a].name == data) {
                    allTasks.splice(a,1);
                    for (let b = 0 ; b < allTasks[0].tasks.length ; b++) {
                        if (data == allTasks[0].tasks[b].project) {
                            allTasks[0].tasks.splice(b,1);
                        }
                    }
                }
            }
            let projects = document.querySelector(".projects").children;
            for (let j = 2; j < projects.length; j++) {
                projects[j].remove();
            }
            organize();
            document.querySelector(".all").dataset.selected = 'true';
            listeners.changeProject();
            listeners.changeTabDinamic();
        }
    }

    static taskMethods = {
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
                organize();
                listeners.changeTabDinamic();
                return;
            }
            if (taskChange.check == true) {
                taskChange.check = false;
                organize();
                listeners.changeTabDinamic();
                return;
            }
        },
        taskDetails: function (data){
            let taskChange;
            for (let key of allTasks[0].tasks) {
                if (data == key.title) {
                    taskChange = key;
                }
            }
            function values () {
            document.querySelector(".modal").style.display = 'flex';
            document.querySelector("#input-title").value = taskChange.title;
            document.querySelector("#input-description").value = taskChange.description;
            document.querySelector("#input-date").value = taskChange.dueDate;
            document.querySelector("#input-priority").value = taskChange.priority; 
            document.querySelector("#input-project").value = taskChange.project;
            }
            values();
            let newBtn = document.querySelector("#new");
            newBtn.value = "Edit";
            newBtn.removeEventListener("click",listeners.methods.addTask);
            function editTask () {
                (taskChange.title == document.querySelector("#input-title").value) ? '' : taskChange.title = document.querySelector("#input-title").value;
                (taskChange.description == document.querySelector("#input-description").value) ? '' : taskChange.description = document.querySelector("#input-description").value;
                (taskChange.dueDate == document.querySelector("#input-date").value) ? '' : taskChange.dueDate = document.querySelector("#input-date").value ;
                (taskChange.priority == document.querySelector("#input-priority").value) ? '': taskChange.priority = document.querySelector("#input-priority").value;
                (taskChange.project == document.querySelector("#input-project").value) ? '' : taskChange.project = document.querySelector("#input-project").value;
                listeners.methods.closeTask();
                newBtn.removeEventListener("click",editTask);
                newBtn.addEventListener("click",listeners.methods.addTask)
                organize();
                listeners.changeTabDinamic();
            }
            newBtn.addEventListener("click",editTask);
        },
        taskDelete: function (data) {
            for (let i = 0 ; i < allTasks[0].tasks.length ; i++) {
                if (data == allTasks[0].tasks[i].title) {
                    allTasks[0].tasks.splice(i,1);
                    organize();
                    listeners.changeTabDinamic();
                }
            }
        },
    }

    static navBar() {
        this.selectors.headerBar.addEventListener("click", listeners.methods.collapse)
    }
    static changeTabDinamic() {
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
        listeners.change.changeTabContent(z,tab,dataName);

    }
    static changeTab() {
        let home = document.querySelector(".home").children;
        for (let i = 1 ; i < home.length; i++) {
            let dataName = home[i].dataset.name;
            home[i].addEventListener("click", () => listeners.change.changeTabContent(i,".home",dataName));
        }
    }
    static changeProject() {
        let projects = document.querySelector(".projects").children;

        for (let i = 2; i < projects.length ; i++) {
            let dataName = projects[i].dataset.name;
            projects[i].addEventListener("click", ()=> listeners.change.changeTabContent(i,".projects",dataName));
        }
    }
}

initProject();
initTask();
organize();

listeners.methods.newTask();
listeners.methods.closeTask();
listeners.methods.newProjectListener();
listeners.navBar();
listeners.changeTab();
listeners.changeProject();
listeners.change.updateProjects();
listeners.changeTabDinamic();

/*----------------------------------------CONTROLADOR----------------------------------------
class controller {
    addTask(title,description,dueDate,priority,i = null) {
        newTask(title,description,dueDate,priority,i = null);
    }
}----------------------------------------*END----------------------------------------*/
