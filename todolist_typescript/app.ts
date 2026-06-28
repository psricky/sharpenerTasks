interface Task {
    id: number;
    name: string;
    dueDate: string;
    completed: boolean;
}

let Tasks: Task[] = [];

const TaskName = document.getElementById("taskName") as HTMLInputElement;
const DueDate = document.getElementById("dueDate") as HTMLInputElement;
const AddBtn = document.getElementById("addBtn") as HTMLButtonElement;
const TaskList = document.getElementById("taskList") as HTMLUListElement;

// Load tasks from localStorage
function LoadTasks(): void {

    const stored = localStorage.getItem("tasks");

    if (stored) {
        Tasks = JSON.parse(stored);
    }

    renderTasks();
}

// Save tasks
function SaveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(Tasks));
}

// Add task
function AddTask(): void {

    if (TaskName.value.trim() === "") {
        alert("Enter task name");
        return;
    }

    const task: Task = {

        id: Date.now(),

        name: TaskName.value,

        dueDate: DueDate.value,

        completed: false
    };

    Tasks.push(task);

    SaveTasks();

    renderTasks();

    TaskName.value = "";
    DueDate.value = "";
}

// Render tasks
function RenderTasks(): void {

    TaskList.innerHTML = "";

    Tasks.forEach((task: Task) => {

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
            SaveTasks();
            RenderTasks();
        });

        const span = document.createElement("span");
        span.textContent = `${task.name} (Due: ${task.dueDate})`;

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            DeleteTask(task.id);
        });

        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);

        TaskList.appendChild(li);

    });

}

// Delete task
function DeleteTask(id: number): void {

    Tasks = Tasks.filter(task => task.id !== id);

    SaveTasks();

    RenderTasks();

}

AddBtn.addEventListener("click", AddTask);

LoadTasks();