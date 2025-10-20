// js/music.js

document.addEventListener("DOMContentLoaded", async () => {
  let audio = document.getElementById("bgMusic");

  // If audio tag doesn't exist on this page, create one
  if (!audio) {
    audio = document.createElement("audio");
    audio.id = "bgMusic";
    audio.src = "music/bg-music.mp3"; // same song path on all pages
    audio.loop = true;
    audio.preload = "auto";
    document.body.appendChild(audio);
  }

  // Restore play state if coming from previous page
  if (sessionStorage.getItem("musicPlaying") === "true") {
    try {
      await audio.play();
    } catch (err) {
      console.warn("Autoplay blocked by browser:", err);
    }
  }

  // Save state when user leaves page
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("musicCurrentTime", audio.currentTime);
    sessionStorage.setItem("musicPlaying", !audio.paused);
  });

  // Continue from same time if possible
  const savedTime = sessionStorage.getItem("musicCurrentTime");
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }
});
