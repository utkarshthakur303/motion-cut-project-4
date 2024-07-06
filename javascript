document.addEventListener('DOMContentLoaded', loadTasks);

const addTaskBtn = document.getElementById('add-task');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText === '') return;
    const task = { text: taskText, completed: false };
    createTaskElement(task);
    saveTask(task);
    newTaskInput.value = '';
}

function createTaskElement(task) {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.addEventListener('click', () => toggleTaskCompletion(task, li));

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(task, taskText));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task, li));

    li.appendChild(taskText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function toggleTaskCompletion(task, li) {
    task.completed = !task.completed;
    li.classList.toggle('completed');
    saveTasks();
}

function editTask(task, taskText) {
    const newTaskText = prompt('Edit task:', task.text);
    if (newTaskText !== null) {
        task.text = newTaskText;
        taskText.textContent = task.text;
        saveTasks();
    }
}

function deleteTask(task, li) {
    taskList.removeChild(li);
    removeTask(task);
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.text !== task.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        const task = {
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => createTaskElement(task));
}
