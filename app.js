const todoForm = document.querySelector("form");
const todoInput = document.querySelector("#todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
        text: todoText,
        completed: false
    };
    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
}
function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}
function createTodoItem(todo, todoIndex) {
    const todoID = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoID}">
        <label class="custom-checkbox" for="${todoID}">
            <svg
                fill="transparent"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
            >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
        </label>
        <label for="${todoID}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg
                fill="var(--secondary-color)"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
            >
                <path
                    d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                />
            </svg>
        </button>
    `;
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()  => {
        deleteButtonItem(todoIndex);
    })
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
        
    });
    checkbox.checked = todo.completed;
    return todoLI;
}
function deleteButtonItem(todoIndex) {
    allTodos = allTodos.filter((_, index) => index !== todoIndex);
    saveTodos();
    updateTodoList();
}
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(allTodos));
}
function getTodos(){
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}