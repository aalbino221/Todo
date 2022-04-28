import { parseISO, add , isBefore , set } from 'date-fns';

class orgTask {
    static orgArray = {
        today: function (allTasks) {
            let today = new Date();
            today = today.getFullYear()+ '-0'+ (today.getMonth()+1) + '-'+ today.getDate();
            for (let task of allTasks[0].tasks) {
                let dueDate = task.dueDate;
                (dueDate == today && task.check == false) ? allTasks[1].tasks.push(task) : '';
            }
        },
        thisWeek: function(allTasks) {
            let endWeek = new Date();
            endWeek = set(endWeek, {hours: 0, minutes:0, seconds: 0})
            endWeek = add(endWeek, {days:7});
            endWeek = set(endWeek,{hours:23, minutes:59, seconds: 59})
            for (let task of allTasks[0].tasks) {
                let dueDate = parseISO(task.dueDate);
                (isBefore(dueDate,endWeek) && task.check == false) ? allTasks[2].tasks.push(task) :  '';
            }
        },
        important: function(allTasks) {
            for (let task of allTasks[0].tasks) {
                (task.priority == 'H' && task.check == false) ? allTasks[3].tasks.push(task): '';
            }
        },
        completed: function(allTasks) {
            for (let task of allTasks[0].tasks) {
                (task.check == true) ? allTasks[4].tasks.push(task) : '';
            }
        },
        failed: function (allTasks) {
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
        },
        project: function(allTasks) {
            for (let i = 6 ; i < allTasks.length ; i++) {
                    allTasks[i].tasks = [];
            }
            for (let task of allTasks[0].tasks) {
                for (let i = 6 ; i < allTasks.length ; i++) {
                    if (allTasks[i].name == task.project) {
                        allTasks[i].tasks.push(task)
                    }
                }
            }
        },
        reset: function (allTasks) {
            for (let q = 1; q < 6 ; q++) {
                allTasks[q].tasks = [];
                }
        }
    }
    static storage = {
        storeProject: function (allTasks) {
            let projectName = [];
            for (let i = 6 ; i < allTasks.length ; i++) {
                    projectName.push(allTasks[i])
            }
            if (projectName == '') {
                localStorage.setItem("projects",[])
            };
            localStorage.setItem("projects",JSON.stringify(projectName));
        },
        storeTask: function (allTasks) {
            let taskArray = allTasks[0].tasks;
            if (taskArray.length == 0) {
                localStorage.setItem("task",[])
            };
            localStorage.setItem("task",JSON.stringify(taskArray));
        }
    }
    static remove = {
        removeTask: function (allTasks,data) {
            for (let i = 0 ; i < allTasks[0].tasks.length ; i++) {
                if (data == allTasks[0].tasks[i].title) {
                    allTasks[0].tasks.splice(i,1);
                }
            }
        },
        removeProject: function (allTasks,data) {
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
        }
    }
}

function removeTasks(array,data) {
    orgTask.remove.removeTask(array,data);
}

function removeProjects(array,data) {
    orgTask.remove.removeProject(array,data);
}

function organizeOrg(array) {
    orgTask.orgArray.reset(array);
    orgTask.orgArray.failed(array);
    orgTask.orgArray.today(array);
    orgTask.orgArray.thisWeek(array);
    orgTask.orgArray.important(array);
    orgTask.orgArray.completed(array);
    orgTask.orgArray.project(array);
    orgTask.storage.storeTask(array);
    orgTask.storage.storeProject(array);
}

export {organizeOrg, removeTasks, removeProjects};