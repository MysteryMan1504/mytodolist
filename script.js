const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const totalTasksElement = document.getElementById("totalTasks");
const completedTasksElement = document.getElementById("completedTasks");
const clearAllButton = document.getElementById("clearAllButton");
const tasks = [];

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        updateTaskList();
    }
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
}

function removeTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

function updateTaskList() {
    taskList.innerHTML = "";

    let completedCount = 0;

    for (let i = 0; i < tasks.length; i++) {
        const taskItem = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tasks[i].completed;
        checkbox.addEventListener("change", function() {
            toggleTaskStatus(i);
        });

        const taskText = document.createElement("span");
        taskText.textContent = tasks[i].text;
        taskText.style.textDecoration = tasks[i].completed ? "line-through" : "none";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", function() {
            toggleEditMode(i);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function() {
            removeTask(i);
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);

        if (tasks[i].completed) {
            completedCount++;
        }
    }

    totalTasksElement.textContent = tasks.length;
    completedTasksElement.textContent = completedCount;
}

function toggleEditMode(index) {
    const taskItem = taskList.children[index];
    const taskText = taskItem.querySelector("span");
    const editButton = taskItem.querySelector(".edit-button");

    if (taskText.contentEditable === "true") {
        taskText.contentEditable = "false";
        editButton.textContent = "Edit";
        tasks[index].text = taskText.textContent;
    } else {
        taskText.contentEditable = "true";
        editButton.textContent = "Save";
    }
}

function clearAllTasks() {
    tasks.length = 0;
    updateTaskList();
}

updateTaskList();

clearAllButton.addEventListener("click", clearAllTasks);
