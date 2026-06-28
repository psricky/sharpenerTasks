"use strict";
let tasks = [];
const taskName = document.getElementById("taskName");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
// Load tasks from localStorage
function loadTasks() {
    const stored = localStorage.getItem("tasks");
    if (stored) {
        tasks = JSON.parse(stored);
    }
    renderTasks();
}
// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Add task
function addTask() {
    if (taskName.value.trim() === "") {
        alert("Enter task name");
        return;
    }
    const task = {
        id: Date.now(),
        name: taskName.value,
        dueDate: dueDate.value,
        completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskName.value = "";
    dueDate.value = "";
}
// Render tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed");
        }
        const leftDiv = document.createElement("div");
        leftDiv.className = "task-info";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });
        const span = document.createElement("span");
        span.textContent = `${task.name} (Due: ${task.dueDate})`;
        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });
        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}
addBtn.addEventListener("click", addTask);
loadTasks();
