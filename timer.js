const mustTimer = document.querySelector(".must-timer");
const mustForm = document.querySelector(".must-form");
const mustInput = document.querySelector(".must-form input");

const MUST_KEY = "mustTodo";

let newMustObj = {};

function countDown() {
  if ("text" in newMustObj) {
    const setTime = newMustObj.time + 1000 * 60 * 60 * 24;
    const now = Date.now();
    const diff = setTime - now;

    const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
      2,
      "0"
    );
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
      2,
      "0"
    );
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
    mustTimer.innerText = `${hours}:${minutes}:${seconds}`;
  }
}

function saveMust() {
  localStorage.setItem(MUST_KEY, JSON.stringify(newMustObj));
}

function deleteMust(event) {
  const div = event.target.parentElement;
  div.remove();
  newMustObj = {};
  saveMust();
  mustTimer.innerText = "24:00:00";
  mustInput.classList.remove("hidden");
}

function paintMust() {
  mustInput.classList.add("hidden");
  const div = document.createElement("div");
  div.classList.add("must-todo");
  const span = document.createElement("span");
  span.innerText = newMustObj.text;
  const button = document.createElement("button");
  button.innerText = "OK";
  button.addEventListener("click", deleteMust);
  div.appendChild(span);
  div.appendChild(button);
  document.body.appendChild(div);
}

function handleSubmit(event) {
  event.preventDefault();
  const newMust = mustInput.value;
  mustInput.value = "";
  newMustObj = {
    text: newMust,
    time: Date.now(),
  };
  paintMust();
  saveMust();
}

mustForm.addEventListener("submit", handleSubmit);

setInterval(countDown, 1000);

const savedMust = localStorage.getItem(MUST_KEY);
if (savedMust !== null) {
  const parseMust = JSON.parse(savedMust);
  newMustObj = parseMust;
  paintMust();
}
