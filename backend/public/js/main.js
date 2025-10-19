document.addEventListener("DOMContentLoaded", () => {
  const btnYes = document.querySelector(".btn-yes");
  const btnNo = document.querySelector(".btn-no");
  const buttonsContainer = document.querySelector(".buttons");

  // Initially, No button is next to Yes button
  btnNo.style.position = "relative";
  btnNo.style.left = "0";
  btnNo.style.top = "0";

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  btnNo.addEventListener("mouseover", () => {
    const btnWidth = btnNo.offsetWidth;
    const btnHeight = btnNo.offsetHeight;

    // Get viewport dimensions
    const maxX = window.innerWidth - btnWidth - 10; // 10px padding from edge
    const maxY = window.innerHeight - btnHeight - 10;

    // Random position inside viewport
    const newLeft = getRandomNumber(0, maxX);
    const newTop = getRandomNumber(0, maxY);

    // Make button absolute for free movement
    btnNo.style.position = "absolute";
    btnNo.style.left = `${newLeft}px`;
    btnNo.style.top = `${newTop}px`;
    btnNo.style.transition = "all 0.2s ease";
    btnNo.style.zIndex = 999; // Make sure it stays on top
  });

  btnYes.addEventListener("click", () => {
    window.location.href = "date.html";
  });

  // Optional: keep button inside viewport on resize
  window.addEventListener("resize", () => {
    const btnWidth = btnNo.offsetWidth;
    const btnHeight = btnNo.offsetHeight;
    let left = parseInt(btnNo.style.left) || 0;
    let top = parseInt(btnNo.style.top) || 0;

    if(left + btnWidth > window.innerWidth) left = window.innerWidth - btnWidth - 10;
    if(top + btnHeight > window.innerHeight) top = window.innerHeight - btnHeight - 10;

    btnNo.style.left = `${left}px`;
    btnNo.style.top = `${top}px`;
  });
});
