// NAVBAR FUNCTION
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".detailNav");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// SLIDER FUNCTION
const slider = document.querySelector(".wrapper");
const pagination = document.querySelector(".pagination");

let isDown = false;
let startX;
let scrollLeft;

function updateDots() {
  pagination.innerHTML = "";
  const screenWidth = window.innerWidth;
  const itemsPerView = screenWidth < 600 ? 1 : 2; // 1 image per view on mobile, 2 on desktop
  const totalSlides = document.querySelectorAll(".item").length;
  const totalDots = Math.ceil(totalSlides / itemsPerView);

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.setAttribute("data-index", i);
    pagination.appendChild(dot);
  }

  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"));
      slider.scrollLeft = index * slider.clientWidth;

      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });

  slider.addEventListener("scroll", () => {
    let activeIndex = Math.round(slider.scrollLeft / slider.clientWidth);
    dots.forEach((d) => d.classList.remove("active"));
    dots[activeIndex]?.classList.add("active");
  });
}

// Dragging Functionality
slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
});

slider.addEventListener("mouseup", () => {
  isDown = false;
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

// Touch Support
let touchStartX = 0;
let touchScrollLeft = 0;

slider.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].pageX;
  touchScrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchmove", (e) => {
  const touchMoveX = e.touches[0].pageX;
  const move = (touchMoveX - touchStartX) * 2;
  slider.scrollLeft = touchScrollLeft - move;
});

// Update dots on load and resize
window.addEventListener("load", updateDots);
window.addEventListener("resize", updateDots);
