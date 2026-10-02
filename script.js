/* ==========================================================
   SCRIPT.JS

   👇👇👇  PASTE YOUR IMAGE LINKS HERE  👇👇👇
   Replace the text between the quotes with a real image URL
   (or a file path like "images/us1.jpg" if the picture is
   in the same folder as this project).
   Nothing else in the code needs to change!

   1.  rohit   -> Rohit Sharma image URL
   2.  me      -> YOUR image URL
   3.  collage -> your big collage for the second page
   ========================================================== */

const IMAGES = {
  rohit:   "https://w0.peakpx.com/wallpaper/705/885/HD-wallpaper-rohit-sharma-best-happy-moments-rohit-sharma-happy-moments-cricketer-hitman.jpg",   // 1. Rohit Sharma
  me:      "meraphoto.jpeg",             // 2. Me

  collage: "knnn.jpeg"        // 3. Big collage
};

/* ==========================================================
   ⚙️ Settings you can tweak (times are in milliseconds)
   ========================================================== */
const DELAY_AFTER_ROHIT_SECOND_CLICK = 2200;  // wait before moving to screen 2
const DELAY_AFTER_ME_CLICK           = 2400;  // wait before moving to screen 2
const FADE_TIME                      = 700;   // must match the .screen transition in style.css

/* ==========================================================
   1. Put the image links into the page
   ========================================================== */
document.querySelectorAll("img[data-slot]").forEach(function (img) {
  const url = IMAGES[img.dataset.slot];
  const frame = img.closest(".photo-frame");
  const isPlaceholder = !url || url.indexOf("PASTE_") === 0;

  if (isPlaceholder) {
    // No link yet -> show the cute pastel placeholder instead
    frame.classList.add("empty");
  } else {
    img.src = url;
    // If the link is broken, fall back to the placeholder
    img.addEventListener("error", function () { frame.classList.add("empty"); });
  }
});

/* ==========================================================
   2. Screen 1 logic
   ========================================================== */
const btnRohit  = document.getElementById("btnRohit");
const btnMe     = document.getElementById("btnMe");
const msgBig    = document.getElementById("msgBig");
const msgSmall  = document.getElementById("msgSmall");
const screen1   = document.getElementById("screen1");
const screen2   = document.getElementById("screen2");

let rohitClicks = 0;     // counts Rohit clicks (only ever goes up, never resets)
let finished    = false; // becomes true once we're heading to screen 2

function showMessage(big, small) {
  msgBig.textContent = big;
  msgSmall.textContent = small || "";
  // restart the little "pop" animation every time
  [msgBig, msgSmall].forEach(function (el) {
    el.classList.remove("pop");
    void el.offsetWidth;
    el.classList.add("pop");
  });
}

function lockButtons() {
  btnRohit.disabled = true;
  btnMe.disabled = true;
}

// Fade screen 1 out, then fade screen 2 in
function goToScreen2(delay) {
  setTimeout(function () {
    screen1.classList.remove("visible");
    setTimeout(function () {
      screen1.classList.remove("active");
      screen2.classList.add("active");
      window.scrollTo(0, 0);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { screen2.classList.add("visible"); });
      });
      burstHearts();
    }, FADE_TIME);
  }, delay);
}

// Click "Choose him" (Rohit Sharma)
btnRohit.addEventListener("click", function () {
  if (finished) return;
  rohitClicks++;

  if (rohitClicks === 1) {
    showMessage("ok bro", "TRY AGAIN");
  } else {
    finished = true;
    lockButtons();
    showMessage("why am I even asking :)", "");
    goToScreen2(DELAY_AFTER_ROHIT_SECOND_CLICK);
  }
});

// Click "Choose me" (works instantly, even on the first click)
btnMe.addEventListener("click", function () {
  if (finished) return;
  finished = true;
  lockButtons();
  showMessage("I know right!", "");
  goToScreen2(DELAY_AFTER_ME_CLICK);
});

// Fade in screen 1 when the page opens
screen1.classList.add("active");
requestAnimationFrame(function () {
  requestAnimationFrame(function () { screen1.classList.add("visible"); });
});

/* ==========================================================
   3. Floating hearts & sparkles
   ========================================================== */
const floaties = document.getElementById("floaties");
const SYMBOLS  = ["💗", "💕", "🤍", "✨", "♡"];

function makeFloaty() {
  const el = document.createElement("span");
  el.className = "floaty";
  el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  el.style.left = Math.random() * 100 + "%";
  el.style.fontSize = (12 + Math.random() * 16) + "px";
  el.style.animationDuration = (9 + Math.random() * 9) + "s";
  el.style.animationDelay = (Math.random() * 6) + "s";
  floaties.appendChild(el);
}

// Keep it subtle: only 16 floating things at once
for (let i = 0; i < 16; i++) makeFloaty();

// A small extra burst of hearts when screen 2 appears
function burstHearts() {
  for (let i = 0; i < 10; i++) makeFloaty();
}
