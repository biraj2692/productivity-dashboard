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

function motivationQuoteContent() {
  let quote = document.querySelector(".motivation-quote h1");
  let author = document.querySelector(".motivation-author h2");
  async function fetchQuote() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();
    quote.innerHTML = data.quote;
    author.innerHTML = "~ " + data.author;
  }
  fetchQuote();
}

function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h2");
  let start = document.querySelector(".pomo-timer .start");
  let pause = document.querySelector(".pomo-timer .pause");
  let reset = document.querySelector(".pomo-timer .reset");
  let period = document.querySelector(".pomo-timer h3");

  let timerInterval;
  let totalSeconds = 25 * 60;
  let isWorkSession = true;
  function updateTime() {
    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;

    timer.innerHTML = `${String(mins).padStart("2", 0)}:${String(secs).padStart(
      "2",
      0
    )}`;
  }
  updateTime();

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      totalSeconds = 25 * 60;
      period.innerHTML = `Work Session`;
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTime();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          period.innerHTML = `Break Session`;
          timer.innerHTML = `05:00`;
        }
      }, 1);
    } else {
      period.innerHTML = `Break Session`;
      totalSeconds = 5 * 60;

      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTime();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          period.innerHTML = `Work Session`;
          timer.innerHTML = `25:00`;
        }
      }, 1);
    }
  }
  function pauseTimer() {
    clearInterval(timerInterval);
  }
  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 25 * 60;
    updateTime();
  }

  start.addEventListener("click", startTimer);
  pause.addEventListener("click", pauseTimer);
  reset.addEventListener("click", resetTimer);
}

let headerTime = document.querySelector(".header1 h2");
let headerDate = document.querySelector(".header1 h1");
async function weatherFeature() {
  let res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=2929e7bf63564c5c9fe35412251707&q=Ahmedabad&aqi=no`
  );
  console.log(res);
}
let fullDate = null;
function dateTime() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  fullDate = new Date();
  console.log(fullDate);

  let day = daysOfWeek[fullDate.getDay()];
  let hours = fullDate.getHours();
  let min = fullDate.getMinutes();
  let sec = fullDate.getSeconds();
  let month = monthNames[fullDate.getMonth()];
  let year = fullDate.getFullYear();
  let date = fullDate.getDate();

  headerDate.innerHTML = `${date} ${month}, ${year}`;
  if (hours > 12) {
    headerTime.innerHTML = `${day}, ${hours - 12} : ${min} : ${sec} PM`;
  } else {
    headerTime.innerHTML = `${day}, ${hours} : ${min} : ${sec} AM`;
  }
}

setInterval(() => {
  dateTime();
}, 1000);


openfeature();
motivationQuoteContent();
todoList();
dailyPlannerList();
pomodoroTimer();
