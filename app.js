const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const summary = document.getElementById('summary');

let currentFilter = 'all';

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

function setFilter(filterValue) {
    currentFilter = filterValue;
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.done;
        if (currentFilter === 'completed') return task.done;
        return true; // default 'all'
    });

    filteredTasks.forEach((task, index) => {
        const item = document.createElement('li');
        item.textContent = task.done ? `Selesai: ${task.text}` : task.text;

        // Agar index tetap akurat saat toggle, cari index asli di array 'tasks'
        const originalIndex = tasks.indexOf(task);
        item.onclick = () => toggleTask(originalIndex);

        taskList.appendChild(item);
    });
    summary.textContent = `${filteredTasks.length} tugas ditampilkan (${currentFilter})`;
}

function autoSortTasks() {
    tasks.sort((a, b) => {
        if (a.done === b.done) return 0; // Jika status sama, tidak perlu diubah
        return a.done ? 1 : -1; // Tugas yang belum selesai (done: false) akan berada di atas
    });
    renderTasks();
}
