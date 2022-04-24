/*newTask.js*/
let allTasks = [
    {name: 'All Tasks',
    tasks: [{title:"eu",description:"sou um cara legal",dueDate:"11/05"},{title:"Com bons",description:"Sentimentos",dueDate:"11/05",project:"none"}]
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
        addContent: function (z,j) {
            console.log("i am firing-  addContent")

            let content = document.querySelector(".content");
            let currentTask = allTasks[z].tasks[j];
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
        changeContent: function(a,b) {
            let home = document.querySelector(".home").children;
            let contentCenter = document.querySelector(".content");
            for (let i = b; i < allTasks.length ; i++) {
                if (home[a].dataset.name == null) {continue}
                if (home[a].dataset.name == allTasks[i-1].name) {

                    contentCenter.remove();

                    let center = document.querySelector(".center");
                    let content = document.createElement("div");
                    content.classList.add("content");
                    center.append(content);

                    let currentTab = document.createElement("p");
                    currentTab.classList.add("currentTab");
                    currentTab.textContent = home[a].dataset.name;
                    content.append(currentTab);

                    for (let j = 0; j < allTasks[i].tasks.length; j++) {
                        let z = i;
                        console.log("1");
                        listeners.methods.addContent(z,j);
                    }
                }
            }
        }
    }

    static change = {
        changeAll: function () {
            
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
        let projects = document.querySelector(".projects").children;
        for (let i = 1; i < home.length ; i++) {
            home[i].addEventListener("click", () => listeners.methods.changeContent(i,1))
        }
        for (let i = 2; i < projects.length ; i++) {
            projects[i].addEventListener("click", () => listeners.methods.changeContent(i,2))
        }
    }
}

listeners.newTask();
listeners.navBar();
listeners.changeTab();
