import './styles.css';
import  { organizeOrg, removeTasks, removeProjects } from './orgTask';
import {newTask, newProjectIndex} from './newTask';
import {listeners, initializeDom, copy} from './dom';

let allTasksIndex = [
{name: 'All Tasks', tasks: [] }, {name: 'Today',tasks: [] }, {name: 'This Week',tasks: [] },{name: 'Important',tasks: [] },{name: 'Completed',tasks: [] },{name: 'Failed',tasks: [] },];

class controller {
    static addTask(title,description,dueDate,priority,check,projeto) {
        let task = newTask(title,description,dueDate,priority,check,projeto);
        allTasksIndex[0].tasks.push(task);
        controller.organize();
        copy();
        listeners.changeMain.changeTabDinamic();
    }
    static addProject(name,description) {
        let project = newProjectIndex(name,description);
        allTasksIndex.push(project);
        controller.organize();
        copy();
        listeners.changeMain.changeTabDinamic();
    }
    static organize() {
        let array = allTasksIndex;
        organizeOrg(array)
    }
    static removeTask(data) {
        let array = allTasksIndex;
        removeTasks(array,data);
    }
    static removeProject(data) {
        let array = allTasksIndex;
        removeProjects(array,data);
    }
}

function init() {
    function initTask() {
        let tasksArray = JSON.parse(localStorage.getItem("task"));
        if (tasksArray == null) {return};
        for (let key of tasksArray) {
            allTasksIndex[0].tasks.push(key);
        }
    }

    function initProject() {
        let projectArray =  JSON.parse(localStorage.getItem("projects"));
        if (projectArray == null) {return};
        for (let key of projectArray) {
            let tempKey = key.tasks;
            key.tasks = '';
            controller.addProject(key.name,key.description);
            key.tasks = tempKey;
        }
        listeners.projectMethods.updateProjects();
    }

    initTask();
    initProject();
}

function initialize () {
    init();
    initializeDom();
}

export {allTasksIndex , controller}

initialize();