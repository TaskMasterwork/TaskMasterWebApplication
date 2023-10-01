const tasks = [];
function createTask(title, description, priority) {
    const task = {
        id: tasks.length + 1,
        title: title,
        description: description,
        priority: priority,
        assignedTo: null, 
        status: "To Do"
    };
    tasks.push(task);
    displayTasks();
}
function displayTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    for (const task of tasks) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <p><strong>Assigned To:</strong> ${task.assignedTo || "Unassigned"}</p>
            <button onclick="assignTask(${task.id})">Assign</button>
            <button onclick="updateStatus(${task.id})">Update Status</button>
            <button onclick="prioritizeTask(${task.id})">Prioritize</button>`;
        taskList.appendChild(taskItem);
    }
}
function assignTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        const assignedTo = prompt("Assign this task to:");
        if (assignedTo) {
            task.assignedTo = assignedTo;
            displayTasks();
        }
    }
}

function updateStatus(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        const status = prompt("Update task status to:");
        if (status) {
            task.status = status;
            displayTasks();
        }
    }
}

function prioritizeTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.priority = "high"; 
        displayTasks();
    }
}
document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const priority = document.getElementById("task-priority").value;
    createTask(title, description, priority);
    document.getElementById("task-form").reset();
});

displayTasks();
