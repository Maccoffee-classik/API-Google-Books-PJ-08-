export const slider = () => {
  const slides = document.querySelectorAll<HTMLElement>(".slider__img");
  const dots = document.querySelectorAll<HTMLElement>(
    ".slider__pagination-item"
  );

  let currentSlide: number = 0;
  let maxSlides: number = slides.length;

  //SHOWING THE CURRENT SLIDE
  const showSlide = (slide: number): void => {
    slides.forEach((s, i) => {
      const slideEl = s as HTMLElement; // ✅ cast to HTMLElement
      slideEl.style.display = i === slide ? "block" : "none";
    });
  };

  //UPDATING ACTIVE DOTS
  const updateActiveDot = (slide: number): void => {
    dots.forEach((dot, i) => {
      dot.classList.toggle("slider__pagination-item--active", i === slide);
    });
  };

  //SLIDES SWITCHING
  const switchSlides = (): void => {
    if (currentSlide === maxSlides - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    showSlide(currentSlide);
  };

  //DOTS SWITCHING
  const switchDots = (): void => {
    updateActiveDot(currentSlide);
  };

  //CLICK EVENT TO CHANGE SLIDES
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentSlide = i;
      showSlide(currentSlide);
      updateActiveDot(currentSlide);
    });
  });

  //AUTOSWITCHING
  const autoSwitching = setInterval((): void => {
    switchSlides();
    switchDots();
  }, 5000);
};