//functionality for the play/pause toggle button----------------------------------------------------
const video = document.querySelector(".viewer");
const playPauseBtn = document.querySelector(".toggle");

function playPauseVideo() {
  if (video.paused) {  //did a mistake here mention it in readme description
    video.play();
    playPauseBtn.textContent = "❚❚";
  } else {
    video.pause();
    playPauseBtn.textContent = "▶";
  }
}

video.addEventListener('click', playPauseVideo);
playPauseBtn.addEventListener('click', playPauseVideo);

//functionality for the skip buttons----------------------------------------------------------
const skipBtns = Array.from(document.querySelectorAll("button[data-skip]"));

function skip() {
  let skipTime = Number(this.dataset.skip); //this returns value in string format so need to turn it into a number
  video.currentTime += skipTime;
}

skipBtns.forEach((button) => {
  button.addEventListener('click', skip);
})

//functionality for the volume slider---------------------------------------------------------
const volumeSlider = document.querySelector("input[name='volume']");
// let isChange = true; //flag

function changeVolume(e) {
  // if (isChange == false) return;
  let vol = parseFloat(e.target.value); //ran into a issue here so had to make use of event
  console.log(vol);
  video.volume = vol;
  //video's volume property accepts only values between 0 and 1
}

volumeSlider.addEventListener("input", function (e) {
  //input event listener better to use than implementing the mouseup/down event listener with mousemove
  //for applying the touch and drag feature for these types of sliders
  // isChange = true;
  changeVolume(e);
});

//functionality for the playback speed slider--------------------------------------------------
const playbackRateSlider = document.querySelector("input[name='playbackRate']");

function playbackRate(e) {
  let rate = parseFloat(e.target.value);
  console.log(rate);
  video.playbackRate = rate;
}

playbackRateSlider.addEventListener("input", playbackRate);

//functionality for the video progress bar-----------------------------------------------------
let videoProgressBar = document.querySelector(".progress__filled");
let videoTimeLine = document.querySelector(".progress");

function videoProgress(){
  let timeStamp = video.currentTime;
  let duration = video.duration;
  let percentage = parseFloat(((timeStamp/duration)*100).toFixed(2)); //rounding to 2 decimal place but it returns string so converted it to float
  videoProgressBar.style.flexBasis = `${percentage}%`;
  // console.log(percentage);
}

function clickTimeLine(e) {
  let pointerPosi = e.offsetX; // distance from the left edge where you clicked
  let fullLength = e.currentTarget.offsetWidth;
  let percentage = pointerPosi/fullLength;
  video.currentTime = (percentage)*video.duration; //did a mistake here writing duration instead of currentTime
  // videoProgressBar.style.setProperty("flex-basis", `${percentage*100}%`);
  videoProgressBar.style.flexBasis = `${percentage * 100}%`;


}   

videoTimeLine.addEventListener("click", clickTimeLine);

video.addEventListener("timeupdate", videoProgress);