"use strict";

document.addEventListener('DOMContentLoaded', loadTasks);

// Se añade un manejador de eventos al formulario para que ejecute la función getTarea cuando se envíe
document.getElementById('taskForm').addEventListener('submit', getTarea);

function getTarea(event) {
    // Previene el comportamiento por defecto del formulario (evita el que se recargue la página)
    event.preventDefault();

    //Creo las variables y guardo los datos del formulario
    let taskName = document.getElementById('taskName').value;
    let priority = document.getElementById('priority').value;

    let task = {
        name: taskName,
        priority: priority,
        completed: false
    };

    // Añadir la tarea a la lista y al localStorage
    addTaskToList(task);
    saveTask(task);

    document.getElementById('taskForm').reset();
}

function addTaskToList(task) {


    // Crea un nuevo elemento de lista (<li>) para la tarea
    let listItem = document.createElement('li');
    // Establece el contenido del nuevo elemento de lista con el nombre y la prioridad de la tarea
    listItem.textContent = `Tarea: ${task.name} , Prioridad: ${task.priority}`;

    let buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'task-buttons';

    //Creo el boton de borrar
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function () {
        taskList.removeChild(listItem);
        removeTask(task.name);
    });

    //Creo el boton de terminar
    let completeButton = document.createElement('button');
    completeButton.textContent = 'Terminar';
    completeButton.className = 'complete-button';

    // Añadir un listener al botón de terminar para marcar la tarea como completada
    completeButton.addEventListener('click', function () {
        listItem.className = 'completeTask';
        completeButton.disabled = true;
        task.completed = true;
        updateTask(task);
    });
    if (task.completed) {
        listItem.classList.add('completeTask');
        completeButton.disabled = true;
    }


    // Añadir los botones al contenedor de botones
    buttonsContainer.appendChild(completeButton);
    buttonsContainer.appendChild(deleteButton);
    // Añadir el contenedor de botones al elemento de lista
    listItem.appendChild(buttonsContainer);
    // Añadir el elemento de lista a la lista de tareas
    taskList.appendChild(listItem);
}
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTaskToList);
}

function removeTask(taskName) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.name !== taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(updatedTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.name === updatedTask.name ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}