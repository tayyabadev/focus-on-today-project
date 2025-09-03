const errorMsg = document.querySelector("#error-msg");
let innerStatusBar = document.querySelector("#inner-status-bar");
const doneNumber = document.querySelector("#done-number");
const addTask = document.querySelector("#add-task");

const taskContainer = document.querySelector("#inner-task-container");
let inspiringTexts = document.querySelector("#inspiring-text");

let totalGoals = 0;
let completedGoalsCount = 0;

let quotes = [
  "Raise the bar by completing your goals!",
  "A journey of a thousand miles begins with a single step",
  "Just a step away, keep going!",
  "Congratulations! Be proud of what you've achieved.",
];


const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

const progressBarFun = () => {
  totalGoals = Object.values(allGoals).filter((goal) => goal.name).length;
  completedGoalsCount = Object.values(allGoals).filter(
    (goal) => goal.completed
  ).length;

  innerStatusBar.style.width =
    totalGoals > 0 ? `${(completedGoalsCount / totalGoals) * 100}%` : "0%";

  doneNumber.textContent =
    totalGoals > 0 ? `${completedGoalsCount}/${totalGoals} completed` : "";
};

progressBarFun();


addTask.addEventListener("click", () => {
  const div = document.createElement("div");
  div.classList.add("single-task");


  const taskId = "task-" + Date.now();

  div.innerHTML = `
    <div class="circle"><img src="Vector 1.png" alt="check mark"></div>
    <input type="text" id="${taskId}" class="task-text" placeholder="Add new goal...">
    <button class="delete-button del-btn">delete</button>
  `;

  taskContainer.appendChild(div);

  
  allGoals[taskId] = { name: "", completed: false };
  localStorage.setItem("allGoals", JSON.stringify(allGoals));
});


taskContainer.addEventListener("click", (e) => {

  const circle = e.target.closest(".circle");
  if (circle) {
    const input = circle.nextElementSibling;

    if (!allGoals[input.id] || allGoals[input.id].name === "") {
      errorMsg.classList.add("error-shown");
      return;
    }

    circle.parentElement.classList.toggle("completed");
    allGoals[input.id].completed = !allGoals[input.id].completed;

    progressBarFun();

    let quoteIndex = Math.min(
      quotes.length - 1,
      Math.floor((completedGoalsCount / totalGoals) * (quotes.length - 1))
    );
    inspiringTexts.textContent = quotes[quoteIndex];

    if (completedGoalsCount == 0) {
      doneNumber.textContent = "";
    }

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  }

  if (e.target.classList.contains("delete-button")) {
    const taskDiv = e.target.parentElement;
    const input = taskDiv.querySelector(".task-text");

    taskContainer.removeChild(taskDiv);

    delete allGoals[input.id];

    
    progressBarFun();
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  }
});

taskContainer.addEventListener("input", (e) => {
  if (e.target.classList.contains("task-text")) {
    const text = e.target;

    if (allGoals[text.id]?.completed) {
      text.value = allGoals[text.id].name;
      return;
    }

    allGoals[text.id] = { name: text.value, completed: false };

    progressBarFun();

    let quoteIndex = Math.min(
      quotes.length - 1,
      Math.floor((completedGoalsCount / totalGoals) * (quotes.length - 1))
    );
    inspiringTexts.textContent = quotes[quoteIndex];

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  }
});

taskContainer.addEventListener("focusin", (e) => {
  if (e.target.classList.contains("task-text")) {
    errorMsg.classList.remove("error-shown");
  }
});

Object.keys(allGoals).forEach((id) => {
  const div = document.createElement("div");
  div.classList.add("single-task");

  div.innerHTML = `
    <div class="circle"><img src="Vector 1.png" alt="check mark"></div>
    <input type="text" id="${id}" class="task-text" value="${allGoals[id].name}" placeholder="Add new goal...">
    <button class="delete-button del-btn">delete</button>
  `;

  if (allGoals[id].completed) {
    div.classList.add("completed");
  }

  taskContainer.appendChild(div);
});
