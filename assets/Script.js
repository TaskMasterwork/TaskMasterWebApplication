const tasks = [];
function createTask(title, description, priority, dueDate, assignee) {
    const task = {
        id: tasks.length + 1,
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate,
        assignee: assignee,
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
            <p><strong>Due Date:</strong> ${task.dueDate || "Not set"}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <p><strong>Assignee:</strong> ${task.assignee || "Unassigned"}</p>
            <button onclick="assignTask(${task.id})">Assign</button>
            <button onclick="updateStatus(${task.id})">Update Status</button>`;
        const currentDate = new Date();
        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
        if (dueDate && dueDate < currentDate) {
            taskItem.innerHTML += `<p class="text-danger">Overdue!</p>`;
        }

        taskList.appendChild(taskItem);
    }
}
document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const priority = document.getElementById("task-priority").value;
    const dueDate = document.getElementById("task-due-date").value;
    const assignee = document.getElementById("task-assignee").value;
    createTask(title, description, priority, dueDate, assignee);
    document.getElementById("task-form").reset();
});
displayTasks();
