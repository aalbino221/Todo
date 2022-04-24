import { parseISO, add , isBefore , set } from 'date-fns'

let allTasks = [
    {name: 'All Tasks',
    tasks: [
        {title:"Tarefa 1",description:"Tarefa teste 1",dueDate:'2022-04-21',priority:"L",project:"none",check: false},
        {title:"Tarefa 2",description:"Tarefa teste 2",dueDate:'2022-04-22',priority:"L",project:"none",check: false},
        {title:"Tarefa 3",description:"Tarefa teste 3",dueDate:'2022-04-22',priority:"H",project:"none",check: false},
        {title:"Tarefa 4",description:"Tarefa teste 4",dueDate:'2022-04-29',priority:"H",project:"none",check: true},
        {title:"Tarefa 5",description:"Tarefa teste 5",dueDate:'2022-04-20',priority:"H",project:"none",check: 'failed'},
        {title:"Tarefa 6",description:"Tarefa teste 6",dueDate:'2022-04-28',priority:"H",project:"Projeto 1",check: false},
        {title:"Tarefa 7",description:"Tarefa teste 7",dueDate:'2022-04-28',priority:"H",project:"Projeto 2",check: false}
    ]
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
    {name: 'Projeto 2',
    tasks: []
    },
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
    endWeek = add(endWeek, {days:7})
    endWeek = resetHours(endWeek);  
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

function organize() {
    failed();
    today();
    thisWeek();
    important();
    completed();
    project();
}

organize();
console.log(allTasks)