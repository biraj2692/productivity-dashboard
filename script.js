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


let formButton = document.querySelector(".add-tasks form")
let taskTitle = document.querySelector("form input")
let taskDescription = document.querySelector("form textarea")
let taskCheckBox = document.querySelector("form #checkbox")
let currentTasks = [
    {
        title:'' ,
        des:'',
        imp:true,

    }
] 
formButton.addEventListener('submit', (e) =>{
    e.preventDefault();
    taskTitle.value
    taskDescription.value
    taskCheckBox.checked
})

console.log(formButton);

let allTasks = document.querySelector(".all-tasks")