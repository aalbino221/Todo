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
    return task;
}

function newProjectIndex(name,description) {
    let project = new makeProject(name,description);
    return project;
}

export {newTask, newProjectIndex}