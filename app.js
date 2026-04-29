const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const summary = document.getElementById('summary');

const tasks = [];

function addTask() {
  // Bug awal untuk repo hotfix: input kosong masih bisa masuk.
  const text = taskInput.value;
  tasks.push({ text, done: false });
  taskInput.value = '';
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const item = document.createElement('li');
    item.textContent = task.done ? `Selesai: ${task.text}` : task.text;
    item.onclick = () => toggleTask(index);
    taskList.appendChild(item);
  });
  summary.textContent = `${tasks.length} tugas`;
}
