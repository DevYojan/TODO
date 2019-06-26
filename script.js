const addButton = document.querySelector("#add");
const inputText = document.querySelector("#text");
let todos = document.querySelector(".todos");
let allTodos = [];

function displayTodos() {
  if (allTodos.length == 0) {
    todos.innerHTML = "You don't have any tasks right now.";
    return false;
  }

  let div = document.createElement("div");
  let htmlText = "";

  for (let i = 0; i < allTodos.length; i++) {
    if (!allTodos[i].completed) {
      htmlText += `
      <div class="todo" data-number="${i}">
        <span id="todoText" style="text-decoration: ${
          allTodos[i].completed
            ? "line-through; font-style: italic; color: grey"
            : "none"
        }">${allTodos[i].text}</span>
        <span class="buttons">
          <button class="delete" data-number="${i}"><i class="fas fa-trash no-event"></i></button>
          <button class="completed" data-number="${i}"><i class="fas fa-check-square no-event"></i></button>
        </span>
      </div>
      `;
    }
  }

  for (let i = 0; i < allTodos.length; i++) {
    if (allTodos[i].completed) {
      htmlText += `
      <div class="todo" data-number="${i}">
        <span id="todoText" style="text-decoration: ${
          allTodos[i].completed
            ? "line-through; font-style: italic; color: grey"
            : "none"
        }">${allTodos[i].text}</span>
        <span class="buttons">
          <button class="delete" data-number="${i}"><i class="fas fa-trash no-event"></i></button>
          <button class="completed" data-number="${i}"><i class="fas fa-check-square no-event"></i></button>
        </span>
      </div>
      `;
    }
  }

  div.innerHTML = htmlText;
  todos.innerHTML = "";
  todos.append(div);
}

displayTodos();

function addTodo() {
  const inputValue = inputText.value;

  if (inputValue == "") {
    return false;
  }

  let newTodo = {
    text: inputValue,
    completed: false
  };

  allTodos.unshift(newTodo);
  displayTodos();

  inputText.value = "";
}

addButton.addEventListener("click", addTodo);
inputText.addEventListener("keyup", function(e) {
  if (e.keyCode == 13) {
    addTodo();
  }
});

todos.addEventListener("click", function(e) {
  if (e.target && e.target.classList.contains("delete")) {
    let currentButton = e.target;
    let todoIndex = currentButton.dataset.number;
    allTodos.splice(todoIndex, 1);
    displayTodos();
  } else if (e.target && e.target.classList.contains("completed")) {
    let currentButton = e.target;
    let todoIndex = currentButton.dataset.number;

    allTodos[todoIndex].completed = !allTodos[todoIndex].completed;

    displayTodos();
  }
});
