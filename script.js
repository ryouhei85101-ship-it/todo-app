const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// データ配列
let tasks = [];

// 初期読み込み
loadTasks();

// 追加ボタン
addBtn.addEventListener("click", () => {
  if (input.value === "") return;

  const task = {
    text: input.value,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  input.value = "";
});

// 保存
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 読み込み
function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
    renderTasks();
  }
}

// 描画
function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    // 完了切り替え
    span.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // 削除
    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";
    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}