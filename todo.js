function checkValid() {
  const input = document.getElementById("taskField");
  if (input.value.length == 0) {
    input.style.borderColor = "red";
    alert(`Pleas enter a Task..`);
    return false;
  } else {
    input.style.borderColor = "black";
    return true;
  }
}

function addTask(input) {
  if (checkValid() === true) {
    const taskListOnStorage = localStorage.getItem("taskList");
    let taskList = [];
    let newTask = {
        task : document.getElementById("taskField").value,
        priority : document.getElementById('taskPriority').value,
    }
    if (taskListOnStorage === null) {
      taskList.push(newTask);
    } else {
      taskList = JSON.parse(taskListOnStorage);
      taskList.push(newTask);
    }
    localStorage.setItem("taskList", JSON.stringify(taskList));
    showNewTask(newTask);
    document.getElementById("taskField").value = ''
  }
}

function createTaskWrapper() {
  if (document.getElementById("taskWrapper") === null) {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", "taskWrapper");
    wrapper.setAttribute("onclick", "deletTask()");
    document.body.appendChild(wrapper);
  }
}

function showNewTask(taskValue) {
  const taskLine = document.createElement("div");
  taskLine.setAttribute('class', 'task')
  const task = document.createElement("div");
  const taskPrioriry = document.createElement("div");
  taskPrioriry.setAttribute('class', 'priority')
  const taskText = document.createTextNode(taskValue.task);
  const taskPriorityText = document.createTextNode(taskValue.priority);
  task.appendChild(taskText);
  taskPrioriry.appendChild(taskPriorityText);
  taskLine.appendChild(taskPrioriry);
  taskLine.appendChild(task);
  if (document.getElementById("taskWrapper") === null) {
    createTaskWrapper();
  }
  const wrapper = document.getElementById("taskWrapper");
  wrapper.appendChild(taskLine);
}

function showSavedTasks() {
  const taskListOnStorage = localStorage.getItem("taskList");
  if (taskListOnStorage === null || JSON.parse(taskListOnStorage).length == 0) {
    return;
  } else {
    createTaskWrapper();
    taskList = JSON.parse(taskListOnStorage);
    for (let task in taskList) {
      showNewTask(taskList[task]);
    }
  }
}

function deletTask() {
  const taskTriger = event.target;
  let taskForIndexing = taskTriger;
  let taskIndex = 0;
  while (taskForIndexing != null) {
    taskForIndexing = taskForIndexing.previousSibling;
    taskIndex++;
  }
  console.log(taskIndex)
  console.log(taskTriger.parentNode)

  taskTriger.parentNode.remove()
  if (document.getElementById("taskWrapper").childElementCount == 0) {
    document.getElementById("taskWrapper").remove();
  }
  const taskListOnStorage = localStorage.getItem("taskList");
  let taskList = JSON.parse(taskListOnStorage);
  taskList.splice(taskIndex, 1);
  localStorage.setItem("taskList", JSON.stringify(taskList));
}
