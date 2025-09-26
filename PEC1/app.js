console.log('App loaded');

//SELECTOS BASICOS

const form = document.querySelector('.task-form form');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('tasks');
const listTemplate = document.getElementById('task-template');
const feedback = document.getElementById('feedback');

const state = {
    tasks: []
};

//UTILIDADES
function uid(){
    return crypto.randomUUID ? crypto.randomUUID(): String(Date.now() + Math.random());
}

function announce(msg){
    if(!feedback)return;
    feedback.textContent = msg;
}

//RENDER DE UNA TAREA (CLONAR E INSERTAR)
function renderTask(task){
    const clone = listTemplate.content.cloneNode(true);
    const li = clone.querySelector('li');
    li.dataset.id = task.id;

    const textEl = li.querySelector('.task-text');
    
    textEl.textContent = task.text;

    if (task.completed) li.classList.add('completed');

    taskList.appendChild(clone);
}

// --- Handler de submit ---
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const raw = taskInput.value.trim();
  if (!raw) {
    announce('Por favor, escribe una tarea.');
    taskInput.focus();
    return;
  }

  const task = { id: uid(), text: raw, completed: false };
  state.tasks.push(task);
  renderTask(task);

  // Limpieza + UX
  taskInput.value = '';
  taskInput.focus();
  announce('Tarea añadida.');
});


// --- Delegación de eventos en la lista ---
taskList.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const li = e.target.closest('li');
  if (!li) return;

  const id = li.dataset.id;
  if (!id) return;

  if (btn.classList.contains('complete-btn')) {
    toggleComplete(id, li, btn);
  } else if (btn.classList.contains('delete-btn')) {
    deleteTask(id, li);
  }
});

// Marcar / desmarcar completada
function toggleComplete(id, li, btn) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;

  task.completed = !task.completed;
  li.classList.toggle('completed', task.completed);

  // Accesibilidad mínima en el botón
  btn.setAttribute('aria-pressed', task.completed ? 'true' : 'false');
  btn.setAttribute('aria-label', task.completed ? 'Mark task as pending' : 'Mark task as completed');

  announce(task.completed ? 'Tarea marcada como completada.' : 'Tarea marcada como pendiente.');
}

// Eliminar tarea
function deleteTask(id, li) {
  // Quitar del estado
  state.tasks = state.tasks.filter(t => t.id !== id);

  // Gestionar foco antes de eliminar (mejor UX)
  const nextFocus =
    (li.nextElementSibling && li.nextElementSibling.querySelector('button')) ||
    (li.previousElementSibling && li.previousElementSibling.querySelector('button')) ||
    taskInput;

  li.remove();
  announce('Tarea eliminada.');

  // Devolver foco de forma predecible
  if (nextFocus) nextFocus.focus();
}