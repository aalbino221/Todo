import './styles.css';
import { isEqual , parseISO, add , isBefore , set } from 'date-fns'


/*newTask.js*/
let allTasks = [
    {name: 'All Tasks',
    tasks: [
        {title:"eu",description:"sou um cara legal",dueDate:'2022-04-21',priority:"L",project:"none",check: false},
        {title:"Com bons",description:"Sentimentos",dueDate:'2022-04-22',priority:"L",project:"none",check: false},
        {title:"Com muito bons",description:"Sentimentos",dueDate:'2022-04-29',priority:"H",project:"none",check: false},
        {title:"Com legalizado",description:"Sentimentos",dueDate:'2022-04-29',priority:"H",project:"none",check: true},
        {title:"Estou de olho nela",description:"Sentimentos",dueDate:'2022-04-20',priority:"H",project:"none",check: 'failed'}
    ]
    },
    {name: 'Projeto 1',
    tasks: []
    },
]

class makeTask {
    constructor(title,description,dueDate,priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

function newTask(title,description,dueDate,priority,i = null) {
    let task = new makeTask(title,description,dueDate,priority);
    allTasks[0].tasks.push(task);
    if (i != null) {
        allTasks[i].tasks.push(task);
    };
}

/*END*/

/*INDEX.JS*/

class controller {
    static addTask(title,description,dueDate,priority,check,i = null) {
            newTask(title,description,dueDate,priority,check,i = null);
    }
}

/*END*/


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
        newTask: function() {
            listeners.selectors.modal.style.display = 'flex';
        },
        closeTask: function() {
            listeners.selectors.modal.style.display = 'none';
            listeners.selectors.myForm.reset();
        },
        addTask: function () {
            let title = listeners.selectors.inputTitle.value;
            let description = listeners.selectors.inputDescription.value;
            let dueDate = listeners.selectors.inputDate.value;
            let priority = listeners.selectors.inputPriority.value;
            controller.addTask(title,description,dueDate,priority);
            listeners.methods.closeTask();
        },
        collapse:  function() {
            if (listeners.selectors.headerBar.dataset.counter == '1') {
                listeners.selectors.navBar.style.display='none';
                listeners.selectors.headerBar.dataset.counter = '0';
            }
            else {listeners.selectors.navBar.style.display= 'flex';
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
        
        addContent: function (i, check = 'default') {
            console.log("i am firing-  addContent")

            let content = document.querySelector(".content");
            let currentTask = allTasks[0].tasks[i];
            let task = document.createElement("div");
            task.classList.add("task");

                let taskCheck = document.createElement("div");
                taskCheck.classList.add("task-check");
                    if (currentTask.check == true) {
                    taskCheck.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
                    }
                    else if (check == 'failed') {
                        taskCheck.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
                    }
                    else {taskCheck.innerHTML = '<i class="fa-regular fa-circle"></i>'}

                let taskTitle = document.createElement("p");
                taskTitle.classList.add("task-title");
                taskTitle.textContent = currentTask.title;

                let taskRight = document.createElement("div");
                taskRight.classList.add("task-right");

                    let taskDate = document.createElement("div");
                    taskDate.classList.add("task-date");
                            let taskDueDate = document.createElement("div");
                            taskDueDate.classList.add("task-dueDate");
                            let taskDateCont = parseISO(currentTask.dueDate);
                                taskDateCont = taskDateCont.getDate() + '/0'+(taskDateCont.getMonth()+1);
                            taskDueDate.textContent = taskDateCont;

                    let taskDetails = document.createElement("p");
                    taskDetails.classList.add("task-details");
                    taskDetails.textContent = "DETAILS";

                    let taskDelete = document.createElement("p");
                    taskDelete.classList.add("task-delete");
                    taskDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';

            taskDate.append(taskDueDate);
            taskRight.append(taskDate,taskDetails,taskDelete);
            task.append(taskCheck,taskTitle,taskRight);
            content.append(task);
        },

        changeContent: function(a, choice = ".home") {
            let home = document.querySelector(choice).children;
            let contentCenter = document.querySelector(".content");
            contentCenter.remove();

            let center = document.querySelector(".center");
            let content = document.createElement("div");
            content.classList.add("content");
            center.append(content);

            let currentTab = document.createElement("p");
            currentTab.classList.add("currentTab");
            currentTab.textContent = home[a].dataset.name;
            content.append(currentTab);
        }
    }

    static change = {
        changeSelected: function (selected) {
            let home = document.querySelector(".home").children;
            let project = document.querySelector(".projects").children;
            let change = document.querySelector(`${selected}`);
            for (let i = 0; i < home.length ; i++) {
                home[i].dataset.selected = 'false';
            }
            for (let i = 0; i < project.length; i++) {
                project[i].dataset.selected = 'false';
            }
            change.dataset.selected ='true';
        },
        changeAll: function () {
            listeners.change.changeSelected('.all');
            listeners.methods.changeContent(1);
            listeners.methods.newTaskBtn();
            for (let i = 0; i < allTasks[0].tasks.length; i++) {
                let check = allTasks[0].tasks[i].check;
                if (check != false) {continue}
                listeners.methods.addContent(i);
            }
        },
        changeToday: function () {
            listeners.change.changeSelected('.today');
            listeners.methods.changeContent(2);
            listeners.methods.newTaskBtn();
            let today = new Date();
            today = today.getFullYear()+ '-'+ (today.getMonth()+1) + '-'+ today.getDate();
            for (let i = 0; i < allTasks[0].tasks.length; i++) {
                let dueDate = allTasks[0].tasks[i].dueDate;
                dueDate = parseISO(dueDate);
                dueDate = dueDate.getFullYear() +'-'+ (dueDate.getMonth()+1) + '-'+ dueDate.getDate();
                let check = allTasks[0].tasks[i].check;
                (dueDate == today && check == false)? listeners.methods.addContent(i): '';
            }
        },
        changeWeek: function () {
            listeners.change.changeSelected('.week');
            listeners.methods.changeContent(3);
            listeners.methods.newTaskBtn();
            let endWeek = new Date();
            endWeek = add(endWeek, {days:7});
            for (let i = 0; i < allTasks[0].tasks.length; i++) {
                let dueDate = allTasks[0].tasks[i].dueDate;
                dueDate = parseISO(dueDate);
                let check = allTasks[0].tasks[i].check;
                (isBefore(dueDate,endWeek) && check == false)? listeners.methods.addContent(i): '';
            }
        },
        changeImportant: function () {
            listeners.change.changeSelected('.important');
            listeners.methods.changeContent(4);
            listeners.methods.newTaskBtn();
            for (let i = 0; i < allTasks[0].tasks.length; i++) {
                let priority = allTasks[0].tasks[i].priority;
                let check = allTasks[0].tasks[i].check;
                (priority == 'H' && check  == false)? listeners.methods.addContent(i): '';
            }
        },
        changeCompleted: function () {
            listeners.change.changeSelected('.completed');
            listeners.methods.changeContent(5);
            listeners.methods.newTaskBtn();
            for (let i = 0; i < allTasks[0].tasks.length; i++) {
                let check = allTasks[0].tasks[i].check;
                (check == true)? listeners.methods.addContent(i): '';
            }
        },
        changeFailed: function () {
            listeners.change.changeSelected('.failed');
            listeners.methods.changeContent(6);
            listeners.methods.newTaskBtn();
            let today = new Date();
            today = add(today, {days:-1});
            today = set(today, {hours:23, minutes:59});
            console.log(today);
            for (let i = 0; i < allTasks[0].tasks.length; i++) {
                let dueDate = allTasks[0].tasks[i].dueDate;
                dueDate = parseISO(dueDate);
                let check = allTasks[0].tasks[i].check;
                if (check == 'failed' && isBefore(dueDate,today)) {
                    listeners.methods.addContent(i,'failed');
                };
            }
        },
        changeProject: function(i) {
            listeners.methods.changeContent(2,".projects");
            listeners.change.changeSelected(i);
            listeners.methods.newTaskBtn();
        }
    }

    static navBar() {
        this.selectors.headerBar.addEventListener("click", listeners.methods.collapse)
    }
    static changeTab() {
        let home = document.querySelector(".home").children;
        home[1].addEventListener("click",listeners.change.changeAll);
        home[2].addEventListener("click",listeners.change.changeToday);
        home[3].addEventListener("click",listeners.change.changeWeek);
        home[4].addEventListener("click",listeners.change.changeImportant);
        home[5].addEventListener("click",listeners.change.changeCompleted);
        home[6].addEventListener("click",listeners.change.changeFailed);
    }
    static changeProject() {
        let projects = document.querySelector(".projects").children;
        for (let i = 2; i < projects.length ; i++) {
            let id = '#' + projects[i].id;
            projects[i].addEventListener("click", ()=> listeners.change.changeProject(id))
        }
    }
}

listeners.navBar();
listeners.changeTab();
listeners.changeProject();
listeners.change.changeAll();



/*let today = new Date();
today = today.getFullYear()+ '-'+ (today.getMonth()+1) + '-'+ today.getDate();
console.log(today);

let dueDate = '2022-04-21';
dueDate = parseISO(dueDate);
dueDate = dueDate.getFullYear() +'-'+ (dueDate.getMonth()+1) + '-'+ dueDate.getDate();
console.log(dueDate == today)

/*CONTROLADOR
class controller {
    addTask(title,description,dueDate,priority,i = null) {
        newTask(title,description,dueDate,priority,i = null);
    }
}*/
