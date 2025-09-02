const singleTasks = document.querySelectorAll(".single-task");
const circles = document.querySelectorAll(".circle");
const taskTexts = document.querySelectorAll(".task-text");
const taskTextArray = [...taskTexts];
const errorMsg = document.querySelector("#error-msg");
let innerStatusBar = document.querySelector("#inner-status-bar");
const doneNumber = document.querySelector("#done-number");
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
innerStatusBar.style.width = `${(completedGoalsCount / 3) * 100}%`;
doneNumber.textContent = "";
circles.forEach((circle, i) => {
  circle.addEventListener("click", () => {
    const allfieldFilled = taskTextArray.every((task) => {
      return task.value;
    });
    if (allfieldFilled == false) {
      errorMsg.classList.add("error-shown");
    } else {
      errorMsg.classList.remove("error-shown");
      circle.parentElement.classList.toggle("completed");
      allGoals[circle.nextElementSibling.id].completed =
        !allGoals[circle.nextElementSibling.id].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      innerStatusBar.style.width = `${completedGoalsCount / 3 * 100}%`;
      if (completedGoalsCount == 0) {
        doneNumber.textContent = "";
      }
      doneNumber.textContent = `${completedGoalsCount}/3 completed`;

      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    }
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

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
   
  });
});
