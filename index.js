let czas = 60;

var dane = [];
var c1;
var c2;
time = 2000;
let z = 5;
let c = 0;
let i = 0;
const div1 = document.querySelector("#country1");
const div2 = document.querySelector("#country2");
const p1 = document.querySelector("#co1");
const p2 = document.querySelector("#co2");
let progressBar = document.getElementById("progress");
let timeLeft = 60; // total time in seconds
let progressInterval;

function EL1() {
  if (dane[c1].population > dane[c2].population) {
    correct();
  } else {
    incorrect();
  }
}
function EL2() {
  if (dane[c2].population > dane[c1].population) {
    correct();
  } else {
    incorrect();
  }
}

async function Pobierz() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const json = await res.json();

  json.forEach((element) => {
    if (element.continents == "Europe") {
      dane.push(element);
    }
  });

  random();
}
async function random() {
  c1 = Math.floor(Math.random() * dane.length);
  console.log(c1);
  c2 = Math.floor(Math.random() * dane.length);
  console.log(c2);

  console.log(dane);
  if (c1 == c2) {
    random();
  }
}
async function Wstaw() {
  const img1 = document.querySelector("#img1");
  const img2 = document.querySelector("#img2");

  img1.src = dane[c1].flags.png;
  img2.src = dane[c2].flags.png;
  p1.textContent = dane[c1].name.common;
  p2.textContent = dane[c2].name.common;
}
const btn = document.querySelector("#btn1");

btn.addEventListener("click", () => {
  startTimer(); // Start the timer when the button is clicked
  const progress = document.querySelector("#progress");
  progress.value = 100;
  const interval = setInterval(() => {
    czas--;
    progress.value = (czas / 60) * 100;
    console.log(czas);
    if (czas == 0) {
      clearInterval(interval);
      const lose = document.querySelector("#lose");
      lose.style.display = "";
      lose.textContent = "Przegrałeś!";
      btn.textContent = "Resetuj";
      btn.style.display = "";
      img1.src = "";
      img2.src = "";
      p1.textContent = "";
      p2.textContent = "";
      div1.style.backgroundColor = "";
      div2.style.backgroundColor = "";
      img1.disabled = true;
      img2.disabled = true;
    }
  }, 1000);

  div1.style.display = "block";
  div2.style.display = "block";
  div1.disabled = false;
  div2.disabled = false;
  const lose = document.querySelector("#lose");
  lose.style.display = "none";
  random();
  Wstaw();
  z = 5;
  c = 0;
  i = 0;

  btn.style.display = "none";

  div1.addEventListener("click", EL1);
  div2.addEventListener("click", EL2);
});

function correct() {
  const correct = document.querySelector("#correct");
  c++;
  timeLeft = 60;
  czas = 60;
  console.log(timeLeft);
  correct.textContent = c;

  if (dane[c1].population > dane[c2].population) {
    div1.style.backgroundColor = "green";
    div2.style.backgroundColor = "red";
    div1.disabled = true;
    div2.disabled = true;
  } else {
    div2.style.backgroundColor = "green";
    div1.style.backgroundColor = "red";
    div1.disabled = true;
    div2.disabled = true;
  }
  setTimeout(() => {
    random();
    Wstaw();
    div1.style.backgroundColor = "";
    div2.style.backgroundColor = "";
    div1.disabled = false;
    div2.disabled = false;
  }, 2000);
}
function incorrect() {
  const incorrect = document.querySelector("#incorrect");
  const lifes = document.querySelector("#zycia");
  i++;
  z--;
  incorrect.textContent = i;
  lifes.textContent = z;
  if (dane[c1].population > dane[c2].population) {
    div1.style.backgroundColor = "green";
    div2.style.backgroundColor = "red";
    div1.disabled = true;
    div2.disabled = true;
    setTimeout(() => {
      if (z > 0) {
        random();
        Wstaw();
        div1.style.backgroundColor = "";
        div2.style.backgroundColor = "";
        div1.disabled = false;
        div2.disabled = false;
      }
    }, time);
  } else {
    div2.style.backgroundColor = "green";
    div1.style.backgroundColor = "red";
    div1.disabled = true;
    div2.disabled = true;
    setTimeout(() => {
      if (z > 0) {
        random();
        Wstaw();
        div1.style.backgroundColor = "";
        div2.style.backgroundColor = "";
        div1.disabled = false;
        div2.disabled = false;
         czas = 60;
         

      }
    }, time);
  }
  if (z == 0) {
    const lose = document.querySelector("#lose");
    lose.style.display = "";
    lose.textContent = "Przegrałeś!";
    btn.textContent = "Resetuj";
    btn.style.display = "";
    img1.src = "";
    img2.src = "";
    p1.textContent = "";
    p2.textContent = "";
    div1.style.backgroundColor = "";
    div2.style.backgroundColor = "";
    img1.disabled = true;
    img2.disabled = true;
  }
}

function updateProgressBar() {
  if (timeLeft > 0) {
    timeLeft--;
    progressBar.value = 60 - timeLeft;
  } else {
    clearInterval(progressInterval);
    const lose = document.querySelector("#lose");
    lose.style.display = "";
    lose.textContent = "Przegrałeś!";
    btn.textContent = "Resetuj";
    btn.style.display = "";
    img1.src = "";
    img2.src = "";
    p1.textContent = "";
    p2.textContent = "";
    div1.style.backgroundColor = "";
    div2.style.backgroundColor = "";
    img1.disabled = true;
    img2.disabled = true;
  }
}

function startTimer() {
  timeLeft = 60;
  progressBar.value = 0;
  clearInterval(progressInterval);
  progressInterval = setInterval(updateProgressBar, 1000);
}

document.getElementById("btn1").addEventListener("click", startTimer);

Pobierz();

