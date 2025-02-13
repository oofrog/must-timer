const mustForm = document.querySelector(".must-form");
const mustInput = document.querySelector(".must-form input");

function deleteMust(event) {
  const div = event.target.parentElement;
  div.remove();
}

function paintMust(newMustObj) {
  const mustDiv = document.createElement("div");
  mustDiv.className = "must-todo";
  const span = document.createElement("span");
  span.innerText = newMustObj.text;
  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", deleteMust);
  mustDiv.appendChild(span);
  mustDiv.appendChild(button);
  document.body.appendChild(mustDiv);
}

const mustTimer = document.querySelector(".mustTimer");

function countDown(newMustObj) {
  const targetTime = newMustObj.targetTime;
  const now = Date.now();
  const diff = targetTime - now;

  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  mustTimer.innerText = `${hours}:${minutes}:${seconds}`;
}

function handleMustSubmit(event) {
  event.preventDefault();
  const newMust = mustInput.value;
  mustInput.value = "";
  const newMustObj = {
    text: newMust,
    time: Date.now(),
  };
  paintMust(newMustObj);
  countDown(newMustObj);
}

mustForm.addEventListener("submit", handleMustSubmit);
