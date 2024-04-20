const playBtn = document.getElementsByClassName("playbtn")[0];
const lapBtn = document.getElementsByClassName("lapbtn")[0];
const resetBtn = document.getElementsByClassName("resetbtn")[0];
const lapS = document.getElementsByClassName("laps")[0];
const clearBtn = document.getElementsByClassName("clearbtn")[0];

const innerCircle = document.getElementsByClassName("inner-circle")[0];
const sec = document.getElementsByClassName("sec")[0];
const msec = document.getElementsByClassName("msec")[0];
const min = document.getElementsByClassName("min")[0];

let secCounter = 0;
let msecCounter = 0;
let minCounter = 0;
let lapItem = 0;
let interval;

const toggleBtn = () => {
  lapBtn.classList.add("visibility");
  resetBtn.classList.add("visibility");
};

const play = () => {
  toggleBtn();
  if (playBtn.textContent === "Start") {
    playBtn.textContent = "Pause";
    interval = setInterval(updateTime, 10);
  } else {
    playBtn.textContent = "Start";
    clearInterval(interval);
  }
  if (playBtn.textContent === "Pause") {
    lapBtn.classList.remove("visibility");
    resetBtn.classList.remove("visibility");
  }
};

const updateTime = () => {
  msecCounter++;
  if (msecCounter >= 100) {
    msecCounter = 0;
    secCounter++;
  }
  if (secCounter >= 60) {
    secCounter = 0;
    minCounter++;
  }
  msec.textContent = `${msecCounter < 10 ? '0' : ''}${msecCounter}`;
  sec.textContent = `${secCounter < 10 ? '0' : ''}${secCounter} :`;
  min.textContent = `${minCounter < 10 ? '0' : ''}${minCounter} :`;
};

const reset = () => {
  clearInterval(interval);
  minCounter = 0;
  secCounter = 0;
  msecCounter = 0;
  min.textContent = "00 :";
  sec.textContent = " 00 :";
  msec.textContent = " 00";
  playBtn.textContent = "Start";
  lapBtn.classList.add("visibility");
  resetBtn.classList.add("visibility");
};

const lap = () => {
  const li = document.createElement("li");
  const number = document.createElement("span");
  const timeStamp = document.createElement("span");

  li.setAttribute("class", "lap-item");
  number.setAttribute("class", "number");
  timeStamp.setAttribute("class", "time-stamp");

  number.textContent = `#${++lapItem}`;
  timeStamp.textContent = `${minCounter} :${secCounter} :${msecCounter}`;

  li.append(number, timeStamp);
  lapS.append(li);
  clearBtn.classList.remove("laptime");
};

const clear = () => {
  lapS.innerHTML = "";
  lapS.append(clearBtn);
  clearBtn.classList.add("laptime");
};

playBtn.addEventListener("click", play);
lapBtn.addEventListener("click", lap);
resetBtn.addEventListener("click", reset);
clearBtn.addEventListener("click", clear);
