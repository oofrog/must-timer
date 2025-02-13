const mustTimer = document.querySelector(".must-timer");
const mustForm = document.querySelector(".must-form");
const mustInput = document.querySelector(".must-form input");

let newMustObj = {};

function countDown() {
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
  if (newMustObj.text !== undefined) {
    mustTimer.innerText = `${hours}:${minutes}:${seconds}`;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const newMust = mustInput.value;
  mustInput.value = "";
  newMustObj = {
    text: newMust,
    time: Date.now(),
  };
}

mustForm.addEventListener("submit", handleSubmit);

setInterval(countDown, 500);
