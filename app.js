let taskInput = document.querySelector("#taskInput")
let addButton = document.querySelector("#addButton")
let taskList = document.querySelector("#taskList")

window.addEventListener("DOMContentLoaded", restoreList)

addButton.addEventListener("click", addTask)
taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask()
    }
})

function addTask() {
    const taskText = taskInput.value.trim()
    if (taskText !== "") {
        const li = createTaskElement(taskText, false)
        taskList.appendChild(li)
        storage()
        taskInput.value = ""
    }
}

taskList.addEventListener("change", function (e) {
    if (e.target.type === "checkbox") {
        storage()
    }
})

taskList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.remove()
        storage()
    }
})

function storage() {
    const tasks = []
    taskList.querySelectorAll("li").forEach(li => {
        const checkbox = li.querySelector("input[type='checkbox']")
        const text = li.textContent.trim()
        tasks.push({
            text: text,
            checked: checkbox.checked
        })
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function restoreList() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.forEach(task => {
        const li = createTaskElement(task.text, task.checked)
        taskList.appendChild(li)
    })
}

function createTaskElement(taskText, checked) {
    const li = document.createElement("li")
    const check = document.createElement("input")
    check.type = "checkbox"
    check.checked = checked
    li.appendChild(check)
    li.appendChild(document.createTextNode(" " + taskText))
    return li
}

