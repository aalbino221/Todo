let allTasks = [
    {name: 'All Tasks',
    tasks: []
    },
    {name: 'Today',
        tasks: []
    },
    {name: 'this Week',
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
    {name: 'Projeto 1',
    tasks: []
    },
]

class makeTask {
    constructor(title,description,dueDate,priority,check) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.check = check;
    }
}

function newTask(title,description,dueDate,priority,i = null) {
    let task = new makeTask(title,description,dueDate,priority,check);
    allTasks[0].tasks.push(task);
    if (i != null) {
        allTasks[i].tasks.push(task);
    };
}


console.log(allTasks);