const form = document.getElementById("form");
const input = document.getElementById("input");
const todos = document.getElementById("todos");

const addTodo = (todo) => {
  let todoText = input.value;

  if (todo) todoText = todo.text; //From LocalStorage

  if (todoText) {
    const todoEl = document.createElement("li");

    if (todo && todo.completed) todoEl.classList.add("completed"); //From LocalStorage

    todoEl.innerText = todoText;

    // Mark as Complete the todo in left click
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      addToLS();
    });

    // Delete the todo in right click
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      addToLS();
    });

    todos.appendChild(todoEl);
  }
  input.value = "";

  addToLS(); // Add to LocalStorage
};

// Function to Add todos to LocalStorage
const addToLS = () => {
  const todosEl = document.querySelectorAll("li");
  const todos = [];
  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

// **** MAIN FUNCTIONALITY **** //

const storedTodos = JSON.parse(localStorage.getItem("todos"));

if (storedTodos) {
  storedTodos.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});
