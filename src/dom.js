import { isThisWeek } from "date-fns";

/*newTask.js*/
let allTasks = [
    {name: 'All Tasks',
    tasks: [{title:"eu",description:"sou um cara legal",dueDate:'2022-04-21'},{title:"Com bons",description:"Sentimentos",dueDate:'2022-04-21',project:"none"}]
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
        addContent: function (i) {
            console.log("i am firing-  addContent")

            let content = document.querySelector(".content");
            let currentTask = allTasks[0].tasks[i];
            let task = document.createElement("div");
            task.classList.add("task");

                let taskCheck = document.createElement("div");
                taskCheck.classList.add("task-check");
                    if (currentTask.check == true) {
                    taskCheck.innerHTML = '<i class="fa-solid fa-circle-check"></i>'}
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
                            taskDueDate.textContent = currentTask.dueDate;
                        
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

        changeContent: function(a) {
            let home = document.querySelector(".home").children;
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
            let change = document.querySelector(`.${selected}`)
            listeners.selectors.navAll.removeAttribute('id');
            listeners.selectors.navToday.removeAttribute('id');
            listeners.selectors.navWeek.removeAttribute('id');
            listeners.selectors.navImportant.removeAttribute('id');
            listeners.selectors.navCompleted.removeAttribute('id');
            listeners.selectors.navFailed.removeAttribute('id');
            change.setAttribute("id","selected");
        },
        changeAll: function () {
            listeners.change.changeSelected('all');
            listeners.methods.changeContent(1);
            for (let i = 0; i < allTasks[0].tasks.length; i++) {
                listeners.methods.addContent(i);
            }
        },
        changeToday: function () {
            listeners.change.changeSelected('today');
            listeners.methods.changeContent(2);
            let today = new Date();
            today = today.getFullYear()+ '-'+ (today.getMonth()+1) + '-'+ today.getDate();
            for (let i = 0; i < allTasks[0].tasks.length; i++) {
                let dueDate = allTasks[0].tasks[i].dueDate;
                dueDate = parseISO(dueDate);
                dueDate = dueDate.getFullYear() +'-'+ (dueDate.getMonth()+1) + '-'+ dueDate.getDate();

                (dueDate == today)? listeners.methods.addContent(i): '';
            }
        }

    }

    static newTask() {
        this.selectors.newTask.addEventListener("click", listeners.methods.newTask );
        this.selectors.modalClose.addEventListener("click", listeners.methods.closeTask);
        this.selectors.modalNew.addEventListener("click", listeners.methods.addTask);
    }
    static navBar() {
        this.selectors.headerBar.addEventListener("click", listeners.methods.collapse)
    }
    static changeTab() {
        let home = document.querySelector(".home").children;
        home[1].addEventListener("click",listeners.change.changeAll);
        home[2].addEventListener("click",listeners.change.changeToday);
    }
    static changeProject() {
        for (let i = 2; i < projects.length ; i++) {
            projects[i].addEventListener("click", () => listeners.methods.changeContent(i,2))
        }
    }
}

listeners.newTask();
listeners.navBar();
listeners.changeTab();
listeners.changeProject;

