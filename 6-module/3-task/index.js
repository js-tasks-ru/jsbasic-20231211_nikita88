export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlide = 0;
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    this.render();
  }

  render() {
    let html = `
      <div class="carousel__arrow carousel__arrow_right" style="display: ${
      this.slides.length > 1 ? 'block' : 'none'
    }">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left" style="display: none">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this.slides
          .map(
            (slide, index) => `
              <div class="carousel__slide" data-id="${slide.id}" style="display: ${
              index === 0 ? 'flex' : 'none'
            }">
                <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
                <div class="carousel__caption">
                  <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                  <div class="carousel__title">${slide.name}</div>
                  <button class="carousel__button" data-id="${slide.id}">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                  </button>
                </div>
              </div>
            `
          )
          .join('')}
      </div>
    `;

    this.elem.innerHTML = html;

    let carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    let carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
    let carouselInner = this.elem.querySelector('.carousel__inner');

    carouselArrowRight.addEventListener('click', () => {
      this.currentSlide++;
      carouselInner.style.transform = `translateX(-${this.currentSlide * 500}px)`;

      if (this.currentSlide === this.slides.length - 1) {
        carouselArrowRight.style.display = 'none';
      }

      carouselArrowLeft.style.display = 'block';
    });

    carouselArrowLeft.addEventListener('click', () => {
      this.currentSlide--;
      carouselInner.style.transform = `translateX(-${this.currentSlide * 500}px)`;

      if (this.currentSlide === 0) {
        carouselArrowLeft.style.display = 'none';
      }

      carouselArrowRight.style.display = 'block';
    });

    let carouselButtons = this.elem.querySelectorAll('.carousel__button');
    carouselButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        let productId = event.target.closest('.carousel__slide').dataset.id;
        let productAddEvent = new CustomEvent('product-add', {
          detail: productId,
          bubbles: true,
        });
        this.elem.dispatchEvent(productAddEvent);
      });
    });
  }
}