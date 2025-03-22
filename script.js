const slider = document.querySelector(".slider-container");
const dotsContainer = document.querySelector(".dots-container");
const images = slider.querySelectorAll("img");
const imagesPerSlide = 2; // Show 2 images per slide
const totalSlides = Math.ceil(images.length / imagesPerSlide);

let isDown = false;
let startX;
let scrollLeft;

// CREATE DOTS BASED ON IMAGE GROUPS
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.setAttribute("data-index", i);
  dotsContainer.appendChild(dot);
}

// UPDATE DOTS FUNCTION
const updateDots = () => {
  let index = Math.round(slider.scrollLeft / slider.clientWidth);
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
};

// DRAG TO SLIDE FUNCTIONALITY
slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  slider.style.cursor = "grabbing";
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.style.cursor = "grab";
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.style.cursor = "grab";
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
  updateDots();
});

// DOT CLICK NAVIGATION (MOVE BY 2 IMAGES)
document.que;

// NAVBAR FUNCTION
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
