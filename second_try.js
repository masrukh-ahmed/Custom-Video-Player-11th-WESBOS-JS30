const video = document.querySelector(".video-mp4"); // fetching the video first
//functionality for the current time and video duration -----------------------------------------------------------------------

function changeVideoTimeFormat(timeInSeconds) {
  let totalSeconds = Math.floor(timeInSeconds);
  let minutes = String(Math.floor(totalSeconds/60));
  let hours = String(Math.floor(totalSeconds/3600));
  let seconds = String(totalSeconds%60);
  let newTimeFormat;
  if (hours > 0) {
    newTimeFormat = `${hours.padStart(2,'0')}:${minutes.padStart(2,'0')}:${seconds.padStart(2,'0')}`;
  } else {
    newTimeFormat = `${minutes.padStart(2,'0')}:${seconds.padStart(2,'0')}`;
  }
  return newTimeFormat;
}

let videoDuration = document.querySelector(".video-duration");
videoDuration.textContent = changeVideoTimeFormat(video.duration);

let currentTime = document.querySelector(".current-time");
video.addEventListener("timeupdate", () => {
  currentTime.textContent = changeVideoTimeFormat(video.currentTime);
  videoDuration.textContent = changeVideoTimeFormat(video.duration);
})

//functionlaity for the play pause toggle button ----------------------------------------------------------------------
const playPauseToggleBtn = document.querySelector(".mid-options .fa-solid");

function playPause() {
  if (video.paused) {
    video.play();
    playPauseToggleBtn.classList.remove("fa-circle-play");
    playPauseToggleBtn.classList.add("fa-circle-pause");
  } else {
    video.pause();
    playPauseToggleBtn.classList.remove("fa-circle-pause");
    playPauseToggleBtn.classList.add("fa-circle-play");
  }
}
playPauseToggleBtn.addEventListener("click", playPause);
video.addEventListener("click", playPause);

//functionality for the skip buttons ----------------------------------------------------------------------------------------
const skipBtns = Array.from(document.querySelectorAll(".skip-btns"));

function handleSkip(e) {
  let skipValue = parseFloat(e.target.dataset.skip);
  video.currentTime += skipValue;
}

skipBtns.forEach(button => {
  button.addEventListener("click", handleSkip);
});

//functionality for the volume sliders -------------------------------------------------------------------------------------
const volumeSlider = document.querySelector("#volume-slider");
let volIcon = document.querySelector(".left-options .fa-solid");

function handleVolume() {
  video.volume = this.value;

  if (this.value == 0) {
    volIcon.classList.remove("fa-volume-high");
    volIcon.classList.add("fa-volume-mute");
  } else {
    volIcon.classList.remove("fa-volume-mute");
    volIcon.classList.add("fa-volume-high");
  }
}
volumeSlider.addEventListener("input", handleVolume);

//functionality for the playback rate slider ----------------------------------------------------------------------------------
const playbackSlider = document.querySelector('.playback-rate-slider');

function handlePlayBackRate() {
  video.playbackRate = this.value;
}
playbackSlider.addEventListener("input", handlePlayBackRate);

//functionality for the fullscreen button ------------------------------------------------------------------------------------
const fullscreenBtn = document.querySelector(".full-screen-btn");

function handleFullScreen() {
  if (video.fullscreenElement) {
    document.exitFullscreen();
  } else {
    video.requestFullscreen();
  }
}

fullscreenBtn.addEventListener("click", handleFullScreen);


//functionality for the video time line 
let videoProgressBar = document.querySelector(".progress-filled");
let videoTimeLine = document.querySelector(".video-timeline");

function videoProgress() {
  let currentTime = (video.currentTime);
  let duration = (video.duration);
  let percentage = ((currentTime/duration).toFixed(5));
  videoProgressBar.style.flex = percentage;
}

function handleClickTimeUpdate(e) {
  // let pointerPosi = e.offsetX; //why can't i write e.target.offsetX here like below
  // console.log(pointerPosi);
  // let timelineLength = e.target.offsetWidth;
  let rect = videoTimeLine.getBoundingClientRect(); //this process is more consistent in finding the click position of the pointer on the timeline bar
  let clickPosi = e.clientX - rect.left;
  let timelineLength = rect.width;
  let percentage = (clickPosi/timelineLength).toFixed(5);
  video.currentTime = percentage*video.duration;
  videoProgressBar.style.flex = percentage;
}

video.addEventListener("timeupdate", videoProgress);
videoTimeLine.addEventListener("click", handleClickTimeUpdate)

//applying hover effect for the video controls when mouse is moving over video
const videoControlsWrapper = document.querySelector(".controls-wrapper");
video.addEventListener("mouseover", () => {
  videoControlsWrapper.classList.add("hover-effect");
})
video.addEventListener("mouseout", () => {
  videoControlsWrapper.classList.remove("hover-effect");
})
videoControlsWrapper.addEventListener("mouseover", () => {
  videoControlsWrapper.classList.add("hover-effect");
})

if(video.paused) {
  videoControlsWrapper.classList.add("hover-effect");
}