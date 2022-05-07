let todos = []; 

let input = document.querySelector(".write-task");
let btn = document.querySelector(".addBtn");
let list = document.querySelector(".list");
let doneTask = document.querySelector(".done-list")


addEventListener("click", (e) => {
    if(e.target === btn) {
        filltodos();
        createItem(input.value);
        input.value = "";
        displayEmpty();
        btn.disabled = true;
        btn.style.backgroundColor="black";
        
    }

    if(e.target.className === "deleteBtn") {
        e.target.parentElement.remove();
        displayEmpty();
        
    }
    
    if(e.target.className === "inputCheckbox") {
        const doneLi = e.target.parentElement.parentElement;
        doneLi.classList.add("done") 
        doneTask.appendChild(doneLi);
        displayEmpty();
    }

    if(e.target.className === "editBtn") {
        let textToEdit = e.target.parentElement.children[0].children[1];
        textToEdit.parentElement.children[0].style.display = "none";
        e.target.parentElement.children[1].style.display = "none";
        e.target.parentElement.children[2].style.display = "none";
        textToEdit.classList.add("editTask");
        textToEdit.removeAttribute("readonly");
        const saveBtn = document.createElement("button"); 
        saveBtn.innerHTML = "Сохранить";
        saveBtn.className = "saveBtn"; 
        textToEdit.parentElement.parentElement.appendChild(saveBtn);
    }

    if(e.target.className === "saveBtn") {
        let newText = e.target.parentElement.children[0].children[1];
        newText.classList.remove("editTask");
        newText.parentElement.children[0].style.display = "";
        e.target.parentElement.children[1].style.display = "";
        e.target.parentElement.children[2].style.display = "";
        e.target.parentElement.children[3].style.display = "none";
        newText.readOnly = true;
        e.target.remove();
    }
    
})

input.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        filltodos();
        createItem(input.value);
        input.value = "";
        displayEmpty();
        btn.disabled = true;
        btn.style.backgroundColor="black";
    }
})

input.addEventListener("input", () => {
    if(input.value !== "") {
        btn.disabled = false;
        btn.style.backgroundColor="#F44336";
    } else {
        btn.disabled = true;//этот ЭЛЗ нужен если инпут ввели и не отправили, а стерли, то кнопку сделать черной и дизейблд.
        btn.style.backgroundColor="black";
    }
});

function generateID() {
    return  "task" + parseInt(Math.random() * 100 + todos.length/0.031);
}

function filltodos() {
    let newToDo = {};
    newToDo.id = generateID();
    newToDo.content = input.value;
    newToDo.date = new Date();
    todos.push(newToDo);
}

function createItem(value) {
    let formattedDate = formatDate();
    let listItem = document.createElement("li");
    let leftDiv = document.createElement("div");
    let inputCheckbox = document.createElement("input");
    let textInput = document.createElement("input");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    leftDiv.className = "leftDiv";
    listItem.className = "taskList";
    inputCheckbox.className = "inputCheckbox";
    inputCheckbox.type = "checkbox";
    // inputCheckbox.setAttribute("id", "inputChBox");
    textInput.className = "textOfTask";
    textInput.type = "text";
    textInput.readOnly = "true";
    textInput.value = value + " " + formattedDate;
    editBtn.className = "editBtn";
    deleteBtn.className = "deleteBtn";
    list.appendChild(listItem);
    listItem.appendChild(leftDiv);
    leftDiv.appendChild(inputCheckbox);
    leftDiv.appendChild(textInput);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
    // setTimeout(() => alert(`🛎 Не забудь: ${value}`), 10000);
}

function displayEmpty() {
    if(list.childElementCount !== 1) {
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
                    padTo2Digits(date.getDate()),
                    padTo2Digits(date.getMonth() + 1),
                    date.getFullYear()
                ].join("/");
    return myDate + " " + date.getHours() + ":" + date.getMinutes();   

}

function padTo2Digits (number) {
    return number.toString().padStart(2, "0");
} 

