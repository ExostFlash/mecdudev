document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-inner .slide");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;
  let interval;
  let startX = 0;
  let isDragging = false;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".carousel-dots span");
  dots[currentIndex].classList.add("active");

  function updateSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;
    document.querySelector(".carousel-inner").style.transform = `translateX(-${
      index * 100
    }%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(() => {
      updateSlide(currentIndex + 1);
    }, 3000); // Change slide every 3 seconds
  }

  prevButton.addEventListener("click", () => {
    updateSlide(currentIndex - 1);
    resetInterval();
  });

  nextButton.addEventListener("click", () => {
    updateSlide(currentIndex + 1);
    resetInterval();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      updateSlide(parseInt(dot.dataset.index));
      resetInterval();
    });
  });

  function startDrag(event) {
    startX = event.type.includes("mouse")
      ? event.clientX
      : event.touches[0].clientX;
    isDragging = true;
    clearInterval(interval);
  }

  function onDrag(event) {
    if (!isDragging) return;
    const currentX = event.type.includes("mouse")
      ? event.clientX
      : event.touches[0].clientX;
    const diffX = startX - currentX;

    if (Math.abs(diffX) > 50) {
      // Threshold for swipe
      if (diffX > 0) {
        updateSlide(currentIndex + 1);
      } else {
        updateSlide(currentIndex - 1);
      }
      isDragging = false;
      resetInterval();
    }
  }

  function endDrag() {
    isDragging = false;
  }

  document
    .querySelector(".carousel-inner")
    .addEventListener("mousedown", startDrag);
  document
    .querySelector(".carousel-inner")
    .addEventListener("mousemove", onDrag);
  document
    .querySelector(".carousel-inner")
    .addEventListener("mouseup", endDrag);
  document
    .querySelector(".carousel-inner")
    .addEventListener("mouseleave", endDrag);

  document
    .querySelector(".carousel-inner")
    .addEventListener("touchstart", startDrag);
  document
    .querySelector(".carousel-inner")
    .addEventListener("touchmove", onDrag);
  document
    .querySelector(".carousel-inner")
    .addEventListener("touchend", endDrag);

  // Initialize the interval for auto-slide
  interval = setInterval(() => {
    updateSlide(currentIndex + 1);
  }, 60000); // Change slide every 60 seconds
});
