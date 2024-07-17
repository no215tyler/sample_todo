// DOM取得
const form = document.getElementById("form");
const input = document.getElementById('input');
const ul = document.getElementById('ul');
// localStorageから保存情報を取得
const todos = JSON.parse(localStorage.getItem('todos'));

// localStorageにタスク情報が保存されていたら登録する（リロード時の処理）
if (todos) {
  todos.forEach(todo => {
    add(todo);
  })
}

// イベントリスナー
form.addEventListener('submit',(e) => {
  e.preventDefault();
  add();
});

// タスクの追加処理
function add (todo) {
  let todoText = input.value;
  // リロード時の処理（localStorageの保存タスクを予め登録するための記述）
  if (todo) {
    todoText = todo.text;
  }

  // 空文字はタスク登録できない
  if (todoText) {
    const li = document.createElement('li');
    li.innerText = todoText;
    li.classList.add("list-group-item");

    // リロード時の処理（タスク完了状態を反映）
    if (todo && todo.completed) {
      li.classList.add('text-decoration-line-through');
    }

    li.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      li.remove();
      saveData();
    })

    li.addEventListener('click', () => {
      li.classList.toggle('text-decoration-line-through');
      saveData();
    });

    ul.appendChild(li);
    input.value = '';
    saveData();
  }
};

// タスク情報のデータ保存
function saveData() {
  const lists = document.querySelectorAll('li');
  // 全てのタスクを保存する配列
  let todos = [];
  lists.forEach(list => {
    // タスクと完了状態のオブジェクト
    let todo = {
      text: list.innerText,
      completed: list.classList.contains('text-decoration-line-through')
    };
    todos.push(todo);
  })
  // 現在の状態をlocalStorageに保存
  localStorage.setItem('todos', JSON.stringify(todos));
};
