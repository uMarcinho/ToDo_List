document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    fetch('http://localhost/project-root/api/tasks.php')
        .then(response => response.json())
        .then(data => {
            const tasksDiv = document.getElementById('tasks');
            tasksDiv.innerHTML = '';
            data.forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.className = 'task';
                taskDiv.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <button class="edit" onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                `;
                tasksDiv.appendChild(taskDiv);
            });
        });
}

function saveTask() {
    const id = document.getElementById('task-id').value;
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost/project-root/api/tasks.php?id=${id}` : 'http://localhost/project-root/api/tasks.php';
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    }).then(() => {
        document.getElementById('task-id').value = '';
        document.getElementById('task-title').value = '';
        document.getElementById('task-description').value = '';
        loadTasks();
    });
}

function editTask(id) {
    fetch(`http://localhost/project-root/api/tasks.php?id=${id}`)
        .then(response => response.json())
        .then(task => {
            document.getElementById('task-id').value = task.id;
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-description').value = task.description;
        });
}

function deleteTask(id) {
    fetch(`http://localhost/project-root/api/tasks.php?id=${id}`, {
        method: 'DELETE'
    }).then(() => {
        loadTasks();
    });
}
