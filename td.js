// DOM Elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");
const addButton = document.getElementById("input-button");

// Function to add a task
function addTask() {
    const task = inputBox.value.trim();

    // Check if the input is empty
    if (!task) {
        alert("Please write down a task");
        return;
    }

    // Create a new <li> element for the task
    const li = document.createElement("li");

    // Set the inner HTML of the new task element
    li.innerHTML = `
        <label>
            <input type="checkbox" class="task-checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
    `;

    // Append the new task to the task list
    listContainer.appendChild(li);

    // Clear the input field
    inputBox.value = "";

    // Event Listeners for Task Actions
    const checkbox = li.querySelector(".task-checkbox");
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    // Toggle completed state
    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    // Edit the task
    editBtn.addEventListener("click", function () {
        const newTask = prompt("Edit task:", li.querySelector("span").textContent);
        if (newTask !== null && newTask.trim() !== "") {
            li.querySelector("span").textContent = newTask.trim();
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    // Delete the task
    deleteBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
            updateCounters();
        }
    });

    // Update counters after task is added
    updateCounters();
}

// Function to update task counters
function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const totalTasks = document.querySelectorAll("#list-container li").length;
    const uncompletedTasks = totalTasks - completedTasks;

    // Update counter elements
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

// Add Event Listener to Add Button
addButton.addEventListener("click", addTask);
