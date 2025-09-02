const singleTasks = document.querySelectorAll(".single-task");
const circles = document.querySelectorAll(".circle");
const taskTexts = document.querySelectorAll(".task-text");
const taskTextArray = [...taskTexts];
const errorMsg = document.querySelector("#error-msg");
let innerStatusBar = document.querySelector("#inner-status-bar");
const doneNumber = document.querySelector("#done-number");
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
  innerStatusBar.style.width = `${(completedGoalsCount / totalGoals) * 100}%`;
  doneNumber.textContent = `${completedGoalsCount}/${totalGoals} completed`;
};

progressBarFun();

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => {
    if (allGoals[circle.nextElementSibling.id].name === "") {
      errorMsg.classList.add("error-shown");
      return;
    }
    circle.parentElement.classList.toggle("completed");
    allGoals[circle.nextElementSibling.id].completed =
      !allGoals[circle.nextElementSibling.id].completed;

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
  });
});
taskTexts.forEach((text, i) => {
  if (!allGoals[text.id]) {
    allGoals[text.id] = { name: "", completed: false };
  } else {
    text.value = allGoals[text.id].name;
  }
  if (allGoals[text.id].completed) {
    text.parentElement.classList.add("completed");
  }
  text.addEventListener("focus", () => {
    errorMsg.classList.remove("error-shown");
  });

  text.addEventListener("input", () => {
    if (allGoals[text.id].completed == true) {
      text.value = allGoals[text.id].name;
      return;
    }
    allGoals[text.id] = {
      name: text.value,
      completed: false,
    };

    progressBarFun();

    let quoteIndex = Math.min(
      quotes.length - 1,
      Math.floor((completedGoalsCount / totalGoals) * (quotes.length - 1))
    );
    inspiringTexts.textContent = quotes[quoteIndex];
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
