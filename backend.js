const taskInput = document.getElementById('taskInput');
const taskPriority = document.getElementById('taskPriority');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const startTimerButton = document.getElementById('startTimerButton');
const resetTimerButton = document.getElementById('resetTimerButton');
const timeDisplay = document.getElementById('timeDisplay');
const completedCount = document.getElementById('completedCount');
const pomodoroDurationInput = document.getElementById('pomodoroDuration');
const breakDurationInput = document.getElementById('breakDuration');

// Initialize task list and timer values
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let isTimerRunning = false;
let timerInterval;
let timeLeft;
let pomodoroDuration = 25 * 60; // default 25 minutes
let breakDuration = 5 * 60; // default 5 minutes
let completedPomodoros = parseInt(localStorage.getItem('completedPomodoros')) || 0;

// Function to render tasks on the page
function renderTasks() {
    taskList.innerHTML = ''; // Clear the current list
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${task.name} - ${task.priority}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskName = taskInput.value.trim();
    const taskPriorityValue = taskPriority.value;

    if (taskName !== '') {
        const newTask = { name: taskName, priority: taskPriorityValue };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to localStorage
        taskInput.value = ''; // Clear the input field
        renderTasks(); // Re-render the task list
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update localStorage
    renderTasks(); // Re-render the task list
}

// Function to update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to start the timer
function startTimer() {
    if (isTimerRunning) return;

    isTimerRunning = true;
    timeLeft = pomodoroDuration;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            completedPomodoros++;
            localStorage.setItem('completedPomodoros', completedPomodoros);
            completedCount.textContent = completedPomodoros;
            alert('Pomodoro complete! Time for a break.');
            startBreak();
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

// Function to start the break timer
function startBreak() {
    timeLeft = breakDuration;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            alert('Break is over. Start a new Pomodoro!');
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timeLeft = pomodoroDuration;
    updateTimerDisplay();
}

// Update Pomodoro and Break durations when changed by user
pomodoroDurationInput.addEventListener('input', () => {
    pomodoroDuration = pomodoroDurationInput.value * 60; // convert minutes to seconds
    resetTimer();
});

breakDurationInput.addEventListener('input', () => {
    breakDuration = breakDurationInput.value * 60; // convert minutes to seconds
    resetTimer();
});

// Add event listener to the Add Task button
addTaskButton.addEventListener('click', addTask);

// Add event listener to start and reset timer buttons
startTimerButton.addEventListener('click', startTimer);
resetTimerButton.addEventListener('click', resetTimer);

// Render tasks when the page loads
renderTasks();

// Display completed Pomodoros count
completedCount.textContent = completedPomodoros;