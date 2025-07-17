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

function weatherDash() {
  let headerTime = document.querySelector(".header1 h2");
  let headerDate = document.querySelector(".header1 h1");
  let header2 = document.querySelector(".header2 .temp-details");
  let headerTemp = document.querySelector(".header2 .temperature");
  let headerTempCelcius = document.querySelector(".header2 .celcius");
  let headerTempfahrenheit = document.querySelector(".header2 .fahrenheit");

  let fullDate = null;

  async function weatherFeature() {
    let res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=2929e7bf63564c5c9fe35412251707&q=Ahmedabad&aqi=no`
    );
    data = await res.json();

    header2.innerHTML = `  
            <h2>Humidity: ${data.current.humidity}%</h2>
            <h2>Wind: ${data.current.wind_kph} km/h</h2>
            <h2>${data.current.condition.text}</h2>
            `;

    headerTemp.innerHTML = `<h1>${data.current.temp_c} <span class="celcius">°C</span> |
    <span class="fahrenheit">°F</span>
  </h1>`;

    headerTemp.addEventListener("click", (e) => {
      if (e.target.classList.contains("celcius")) {
        headerTemp.innerHTML = `<h1>${data.current.temp_c} <span class="celcius">°C</span> |
        <span class="fahrenheit">°F</span>
      </h1>`;
      } else if (e.target.classList.contains("fahrenheit")) {
        headerTemp.innerHTML = `<h1>${data.current.temp_f} <span class="celcius">°C</span> |
        <span class="fahrenheit">°F</span>
      </h1>`;
      }
    });
  }
  weatherFeature();
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

    let day = daysOfWeek[fullDate.getDay()];
    let hours = fullDate.getHours();
    let min = fullDate.getMinutes();
    let sec = fullDate.getSeconds();
    let month = monthNames[fullDate.getMonth()];
    let year = fullDate.getFullYear();
    let date = fullDate.getDate();

    headerDate.innerHTML = `${date} ${month}, ${year}`;
    if (hours > 12) {
      headerTime.innerHTML = `${day}, ${hours - 12} : ${String(min).padStart(
        "2",
        0
      )} : ${String(sec).padStart("2", 0)} PM`;
    } else {
      headerTime.innerHTML = `${day}, ${hours} : ${String(min).padStart(
        "2",
        0
      )} : ${String(sec).padStart("2", 0)} AM`;
    }
  }

  setInterval(() => {
    dateTime();
  }, 1000);
}

let root = document.documentElement
let theme = document.querySelector("nav .theme")
let flag = 0;

theme.addEventListener('click', ()=>{
  // --primary-col: #fcdec0;
  // --secondary-col: #381c0a;
  // --tri1-col: #feba17;
  // --tri2-col: #74512d;

  if (flag == 0) {
    root.style.setProperty('--secondary-col', '#a8dadc')
    root.style.setProperty('--primary-col', '#003566')
    root.style.setProperty('--tri1-col', '#f1faee')
    root.style.setProperty('--tri2-col', '#457b9d')
    flag = 1;
  } else if (flag == 1) {
       root.style.setProperty('--secondary-col', '#381c0a')
    root.style.setProperty('--primary-col', '#fcdec0')
    root.style.setProperty('--tri1-col', '#74512d')
    root.style.setProperty('--tri2-col', '#feba17')
    flag = 2;
  }
  else{
    root.style.setProperty('--secondary-col', '#fcdec0')
    root.style.setProperty('--primary-col', '#381c0a')
    root.style.setProperty('--tri1-col', '#feba17')
    root.style.setProperty('--tri2-col', '#74512d')
    flag = 0;
  }

})

openfeature();
motivationQuoteContent();
todoList();
dailyPlannerList();
pomodoroTimer();
weatherDash();