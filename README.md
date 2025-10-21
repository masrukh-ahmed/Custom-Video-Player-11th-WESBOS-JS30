Perfect 👍 you’ve already got both parts beautifully detailed — so I’ll now merge them into a **single, polished README** that reads like a proper developer’s project documentation. It’ll feel cohesive (as one continuous journey), with light structure and clear transitions between your “learning” and “implementation” phases.

Here’s the **combined final README** for your **JS30 Challenge #11 — HTML Video Player** 👇

---

# 🎥 HTML Video Player – JS30 Challenge #11

This project is part of the **[JavaScript30 Challenge by Wes Bos](https://javascript30.com/)** — specifically **Challenge 11: Custom HTML5 Video Player**.

Over the course of this challenge, I built the video player in **two separate phases**:

1. **Part 1 — Concept & Logic Focus:** Understanding how HTML5 video works at its core and implementing all base functionalities manually.
2. **Part 2 — Independent Rebuild:** Rebuilding the entire player with a modern, custom design and extra features — without relying on the tutorial’s CSS or prewritten logic.

---

## 🎬 Part 1 — Understanding the Core Functionality

In this first part, my goal was to **understand how the HTML5 video element and its API work** and to manually implement core player features like play/pause, skip, volume control, playback rate, and the progress bar — _without any libraries or frameworks_.

I kept the **default Wes Bos design** to focus completely on the **logic**.
![1st Design Demo GIF Format](resources/1st_design_demo.gif)

---

### 🧠 What I Learned

### 1. HTML Video Element Attributes

From exploring the `<video>` tag, I learned about:

- `autoplay`
- `loop`
- `controls`
- `muted`
- And how to provide a **backup video source** in case the main one fails.

Example:

```html
<video autoplay loop muted>
  <source src="video.mp4" type="video/mp4" />
  <source src="backup-video.webm" type="video/webm" />
  Your browser does not support the video tag.
</video>
```

---

### 2. Play/Pause Toggle Logic

```js
function playPauseVideo() {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = "❚❚";
  } else {
    video.pause();
    playPauseBtn.textContent = "▶";
  }
}
```

🧩 **Mistake I made:**
I initially wrote `video.paused()` as if it were a function, but it’s actually a **property**, not a method.
The correct usage is `video.paused` (no parentheses).
This became clear when I explored the video object using `console.dir(video)`.

---

### 3. Skip Buttons Using Data Attributes

```js
const skipBtns = document.querySelectorAll("button[data-skip]");

function skip() {
  const skipTime = Number(this.dataset.skip); // dataset values are strings
  video.currentTime += skipTime;
}

skipBtns.forEach((button) => button.addEventListener("click", skip));
```

💡 Learned how to use `data-*` attributes to make buttons dynamic and connect them to logic seamlessly.

---

### 4. Volume Slider Functionality

At first, I used `this.value` inside the event listener, but it kept giving me `NaN` or `undefined`.
Then I realized that in some contexts (especially inside callback functions), `this` might not refer to the input element.
So I switched to using the **event object** instead (`e.target.value`).

```js
const volumeSlider = document.querySelector("input[name='volume']");

function changeVolume(e) {
  const vol = parseFloat(e.target.value);
  video.volume = vol; // accepts values only between 0 and 1
}

volumeSlider.addEventListener("input", changeVolume);
```

🧠 **New Concept:**
Using the **`input` event listener** provides both _click + drag_ functionality for input range sliders — no need for `mousedown`, `mousemove`, and `mouseup` logic like we used in the Canvas challenge.

_(I had a leftover flag variable `isChange`, but later realized it was unnecessary here.)_

---

### 5. Playback Rate Slider

This was similar to the volume control, but used the `.playbackRate` property of the video element.

```js
const playbackRateSlider = document.querySelector("input[name='playbackRate']");

function playbackRate(e) {
  const rate = parseFloat(e.target.value);
  video.playbackRate = rate;
}

playbackRateSlider.addEventListener("input", playbackRate);
```

---

### 6. Video Progress Bar & Timeline Click

This was the **most interesting part** of the challenge.

I learned about:

- The `timeupdate` event → fires as the video plays.
- The `offsetX` property → tells us how far the user clicked from the left edge of an element.
- The `duration` and `currentTime` properties → used to calculate and set playback progress.

```js
const videoProgressBar = document.querySelector(".progress__filled");
const videoTimeLine = document.querySelector(".progress");

function videoProgress() {
  const timeStamp = video.currentTime;
  const duration = video.duration;
  const percentage = ((timeStamp / duration) * 100).toFixed(2);
  videoProgressBar.style.flexBasis = `${percentage}%`;
}

function clickTimeLine(e) {
  const pointerPosi = e.offsetX;
  const fullLength = e.currentTarget.offsetWidth;
  const percentage = pointerPosi / fullLength;

  // Mistake I made: used video.duration instead of video.currentTime here initially
  video.currentTime = percentage * video.duration;
  videoProgressBar.style.flexBasis = `${percentage * 100}%`;
}

video.addEventListener("timeupdate", videoProgress);
videoTimeLine.addEventListener("click", clickTimeLine);
```

💡 **Lesson:**
I initially tried adding an `input` event listener for dragging functionality here (like the sliders), but it didn’t work — because the timeline isn’t an `<input>` element.
This taught me when and why different event listeners apply to different element types.

---

### 📘 Summary — Part 1

This phase focused on **conceptual clarity and understanding**.
I wanted to know _why_ each step worked the way it did before thinking about design or UX polish.

The next part focuses on **building a new version from scratch**, integrating all I learned, and adding personal creativity.

---

## 🎞️ Part 2 — Custom Implementation (Independent Rebuild)

### 🧭 Overview

In this phase, I challenged myself to **rebuild the entire video player from scratch**, without reusing the tutorial’s CSS.
The focus was on:

- Building a **modern, sleek UI**
- Experimenting with layout control
- Adding **extra functionalities** like fullscreen, volume icons, and formatted video time.

---

### 🎨 Design Goals

- Make the UI more **visually appealing**.
- Create my own **custom control layout**.
- Learn to manually manage **alignment, spacing, and responsiveness**.
- Add **new functional elements** like fullscreen toggle, current/duration time, and responsive volume icons.

> 🧩 While I achieved all functional goals, my version wasn’t as responsive as the tutorial — because I handled layout manually instead of using the provided responsive CSS structure.

## ![2nd Design Demo GIF Format](resources/2nd_design_demo.gif)

### 🧠 What I Learned

#### **1. Universal CSS Selector and Element Group Styling**

Discovered that the `*` selector can apply styles to **all child elements** — something I found by experimentation while aligning items inside the video controls.

```css
.right-options {
  justify-content: end;
}
.right-options * {
  margin-left: 2.5%;
  align-items: center;
}
```

This helped me apply consistent spacing and alignment across all control icons and sliders without targeting them individually.

---

#### **2. `padStart()` for Time Formatting**

When creating the **video duration and current time display**, I learned how to use `.padStart()` to maintain a consistent time format with leading zeros.

```js
function changeVideoTimeFormat(timeInSeconds) {
  let totalSeconds = Math.floor(timeInSeconds);
  let minutes = String(Math.floor(totalSeconds / 60));
  let hours = String(Math.floor(totalSeconds / 3600));
  let seconds = String(totalSeconds % 60);
  let newTimeFormat;

  if (hours > 0) {
    newTimeFormat = `${hours.padStart(2, "0")}:${minutes.padStart(
      2,
      "0"
    )}:${seconds.padStart(2, "0")}`;
  } else {
    newTimeFormat = `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  }

  return newTimeFormat;
}
```

This gave me a deeper understanding of **string manipulation methods** in JavaScript and how small utilities can make UI data look cleaner.

---

#### **3. Added Functional Features**

I extended the base functionality with:

- **Fullscreen Mode**
- **Current Time / Duration Display**
- **Dynamic Volume Icon** (changes depending on volume level)

Although I successfully implemented fullscreen behavior, I decided **not to modify the default controls** that appear in fullscreen — since I’m limiting myself to about two days per JS30 challenge (to focus on fluency over perfection).

---

#### **4. Fullscreen Implementation**

I learned about the `requestFullscreen()` and `exitFullscreen()` methods, and how to toggle between the two.

```js
function handleFullScreen() {
  if (video.fullscreenElement) {
    document.exitFullscreen();
  } else {
    video.requestFullscreen();
  }
}
```

This helped me understand **DOM fullscreen APIs** and the browser’s built-in behavior with video elements.

---

#### **5. Accurate Timeline Click Handling**

The biggest challenge in this version was making the **timeline click detection consistent**.
I discovered that using `offsetX` doesn’t always return reliable values when clicking over child elements — so I fixed it using `getBoundingClientRect()` with `clientX`.

```js
function handleClickTimeUpdate(e) {
  let rect = videoTimeLine.getBoundingClientRect();
  let clickPosi = e.clientX - rect.left;
  let timelineLength = rect.width;
  let percentage = (clickPosi / timelineLength).toFixed(5);

  video.currentTime = percentage * video.duration;
  videoProgressBar.style.flex = percentage;
}
```

This taught me **how coordinate systems and element boundaries work** in the DOM.

---

#### **6. Custom Hover Effect for Controls**

Wes Bos handled hover visibility with pure CSS, but I didn’t fully understand that part — so I implemented my own solution with JavaScript by toggling a `.hover-effect` class.

```js
const videoControlsWrapper = document.querySelector(".controls-wrapper");

video.addEventListener("mouseover", () => {
  videoControlsWrapper.classList.add("hover-effect");
});
video.addEventListener("mouseout", () => {
  videoControlsWrapper.classList.remove("hover-effect");
});
videoControlsWrapper.addEventListener("mouseover", () => {
  videoControlsWrapper.classList.add("hover-effect");
});

if (video.paused) {
  videoControlsWrapper.classList.add("hover-effect");
}
```

This gave me a better understanding of **event propagation**, **hover management**, and **conditional UI behavior**.

### 🔍 Reflection

This second phase helped me:

- Strengthen **independent problem-solving**
- Understand **DOM geometry and event flow**
- Practice **UI-state synchronization** between CSS and JS
- Realize the trade-offs between **manual control** vs **responsive design frameworks**

Even though my version wasn’t as fluid, it gave me a **much deeper grasp** of how real-world video players are built from the ground up.
