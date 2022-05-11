let todos = [];

let input = document.querySelector(".write-task");
let btn = document.querySelector(".addBtn");
let list = document.querySelector(".list");
let doneTask = document.querySelector(".done-list");

addEventListener("click", (e) => {
  if (e.target === btn) {
    const newToDo = {};
    newToDo.id = generateID();
    newToDo.content = input.value;
    newToDo.date = new Date();
    todos.push(newToDo);
    createItem(newToDo.content, newToDo.id);
    input.value = "";
    displayEmpty();
    btn.disabled = true;
    btn.style.backgroundColor = "black";
  }

  if (e.target.className === "deleteBtn") {
    const idOfDelItem = e.target.parentElement.id;
    for (let i = 0; i < todos.length; i++) {
      if (idOfDelItem === todos[i].id) {
        todos.splice(i, 1);
      }
    }
    e.target.parentElement.remove();
    displayEmpty();
  }

  if (e.target.className === "inputCheckbox") {
    const doneLi = e.target.parentElement.parentElement;
    doneLi.classList.add("done");
    doneTask.appendChild(doneLi);
    displayEmpty();
  }

  if (e.target.className === "editBtn") {
    let textToEdit = e.target.parentElement.children[0].children[1];
    textToEdit.parentElement.children[0].style.display = "none";
    e.target.parentElement.children[1].style.display = "none";
    e.target.parentElement.children[2].style.display = "none";
    e.target.closest(".taskList").querySelector(".date").remove();
    textToEdit.classList.add("editTask");
    textToEdit.removeAttribute("readonly");
    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Сохранить";
    saveBtn.className = "saveBtn";
    textToEdit.parentElement.parentElement.appendChild(saveBtn);
  }

  if (e.target.className === "saveBtn") {
    let newText = e.target.parentElement.children[0].children[1];
    const idOfSavedItem = e.target.parentElement.id;
    const formattedDate = document.createElement("span");
    formattedDate.className = "date";
    formattedDate.textContent = formatDate();
    for (let i = 0; i < todos.length; i++) {
      if (idOfSavedItem === todos[i].id) {
        todos[i].content = newText.value;
      }
    }
    newText.classList.remove("editTask");
    newText.parentElement.children[0].style.display = "";
    e.target.parentElement.children[1].style.display = "";
    e.target.parentElement.children[2].style.display = "";
    e.target.parentElement.children[3].style.display = "none";
    e.target
      .closest(".taskList")
      .querySelector(".leftDiv")
      .appendChild(formattedDate);
    newText.readOnly = true;
    e.target.remove();
  }
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const newToDo = {};
    newToDo.id = generateID();
    newToDo.content = input.value;
    newToDo.date = new Date();
    todos.push(newToDo);
    createItem(newToDo.content, newToDo.id);
    input.value = "";
    displayEmpty();
    btn.disabled = true;
    btn.style.backgroundColor = "black";
  }
});

input.addEventListener("input", () => {
  if (input.value !== "") {
    btn.disabled = false;
    btn.style.backgroundColor = "#F44336";
  } else {
    btn.disabled = true; //этот ЭЛЗ нужен если инпут ввели и не отправили, а стерли, то кнопку сделать черной и дизейблд.
    btn.style.backgroundColor = "black";
  }
});

function generateID() {
  return "task" + parseInt(Math.random() * 100 + todos.length / 0.031);
}

function createItem(value, id) {
  const listItem = document.createElement("li");
  const leftDiv = document.createElement("div");
  const inputCheckbox = document.createElement("input");
  const textInput = document.createElement("input");
  const formattedDate = document.createElement("span");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  leftDiv.className = "leftDiv";
  listItem.className = "taskList";
  listItem.setAttribute("id", id);
  inputCheckbox.className = "inputCheckbox";
  inputCheckbox.type = "checkbox";
  textInput.className = "textOfTask";
  textInput.type = "text";
  textInput.readOnly = "true";
  textInput.value = value;
  formattedDate.className = "date";
  formattedDate.textContent = formatDate();
  editBtn.className = "editBtn";
  deleteBtn.className = "deleteBtn";
  list.appendChild(listItem);
  listItem.appendChild(leftDiv);
  leftDiv.appendChild(inputCheckbox);
  leftDiv.appendChild(textInput);
  leftDiv.appendChild(formattedDate);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);
  setTimeout(() => alert(`🛎 Не забудь: ${value}`), 10000);
}

function displayEmpty() {
  if (list.childElementCount !== 1) {
    let emptyMessage = document.querySelector(".empty");
    emptyMessage.style.display = "none";
  } else {
    let emptyMessage = document.querySelector(".empty");
    emptyMessage.style.display = "inline-block";
  }
}

function formatDate() {
  let date = new Date();
  let myDate = [
    adjustZero(date.getDate()),
    adjustZero(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
  return myDate + " " + date.getHours() + ":" + adjustZero(date.getMinutes());
}

function adjustZero(number) {
  return number.toString().padStart(2, "0");
}
