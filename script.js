const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed || false;
    checkbox.addEventListener('change', () => toggleTaskStatus(index));

    const taskText = document.createElement('span');
    taskText.textContent = task.name;

    const dueDate = document.createElement('span');
    dueDate.textContent = task.dueDate;
    dueDate.className = 'due-date';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '<i class="delete-button-icon">&#10006;</i>';
    deleteButton.addEventListener('click', () => deleteTask(index));

    card.appendChild(checkbox);
    card.appendChild(taskText);
    card.appendChild(dueDate);
    card.appendChild(deleteButton);
    taskList.appendChild(card);

    
    const isOverdue = isTaskOverdue(task.dueDate);
    const isChecked = checkbox.checked;

    if (isOverdue && !isChecked) {
      card.classList.add('overdue');
    } else if (!isChecked) {
      card.classList.add('not-completed');
    } else {
      card.classList.add('completed');
    }
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const dueDateInput = document.getElementById('dueDateInput');
  const taskName = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (taskName !== '') {
    const newTask = {
      name: taskName,
      dueDate: dueDate,
      completed: false
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    dueDateInput.value = '';
    displayTasks();
  }
}
