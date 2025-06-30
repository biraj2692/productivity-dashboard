function openfeature() {
  let allElem = document.querySelectorAll(".elem");
  let fullElem = document.querySelectorAll(".full-page");
  let fullElemback = document.querySelectorAll(".mdi");

  allElem.forEach((e) => {
    e.addEventListener("click", () => {
      fullElem[e.id].style.display = "block";
    });
  });

  fullElemback.forEach((back) => {
    back.addEventListener("click", () => {
      fullElem[back.id].style.display = "none";
    });
  });
}
openfeature();

function todoList() {
  let formButton = document.querySelector(".add-tasks form");
  let taskTitle = document.querySelector("form input");
  let taskDescription = document.querySelector("form textarea");
  let taskCheckBox = document.querySelector("form #checkbox");
  let currentTasks = [];

  if (localStorage.getItem("currentTasks")) {
    currentTasks = JSON.parse(localStorage.getItem("currentTasks"));
  }

  formButton.addEventListener("submit", (e) => {
    e.preventDefault();
    currentTasks.push({
      title: taskTitle.value,
      des: taskDescription.value,
      imp: taskCheckBox.checked,
    });
    renderTasks();
    taskCheckBox.checked = false;
    taskDescription.value = "";
    taskTitle.value = "";
  });

  function renderTasks() {
    localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
    let allTasks = document.querySelector(".all-tasks");

    let sum = "";
    if (currentTasks.length === 0) {
      sum = `<div class="task">
                <h5> No Tasks For Today!!! </h5>
              </div>
    `;
    } else {
      currentTasks.forEach((e, idx) => {
        sum += `<div class="task">
                <h5><span class=${e.imp}>Imp</span> ${e.title} </h5>
                <button id=${idx}>Mark as Completed</button>
              </div>`;
      });
    }
    allTasks.innerHTML = sum;
    document.querySelectorAll(".task button").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTasks.splice(btn.id, 1);
        renderTasks();
      });
    });
  }

  renderTasks();
}

todoList();

function dailyPlannerList() {
  let hourlyDayPlan = JSON.parse(localStorage.getItem("hourlyDayPlan")) || {};
  let dayPlanner = document.querySelector(".day-planner");
  let sum = "";

  let hours = Array.from(
    { length: 23 },
    (e, idx) => `${1 + idx}:00 - ${2 + idx}:00`
  );

  hours.forEach((elem, idx) => {
    let savedData = hourlyDayPlan[idx] || "";
    sum += `<div class="day-planner-time">
              <p>${elem}</p>
              <input id=${idx} type="text" name="" id="" placeholder=".." value = ${savedData}>
            </div>`;
  });
  sum += `<div class="day-planner-time">
              <p>24:00 - 1:00</p>
              <input id="24" type="text" name="" id="" placeholder=".." value= ${
                hourlyDayPlan[24] || ""
              }>
            </div>`;
  dayPlanner.innerHTML = sum;

  let dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach((elem) => {
    elem.addEventListener("input", () => {
      console.log(elem.value);
      hourlyDayPlan[elem.id] = elem.value;
      localStorage.setItem("hourlyDayPlan", JSON.stringify(hourlyDayPlan));
    });
  });
}

dailyPlannerList();
