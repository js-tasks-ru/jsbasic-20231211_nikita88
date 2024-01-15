import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');

    this.render();
    this.addEventListeners();
  }

  render() {
    let html = `
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        ${this.categories
          .map(
            (category) =>
              `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`
          )
          .join('')}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;

    this.elem.innerHTML = html;
  }

  addEventListeners() {
    this.elem.addEventListener('click', (event) => {
      if (event.target.classList.contains('ribbon__item')) {
        event.preventDefault();
        this.selectCategory(event.target);
      } else if (event.target.classList.contains('ribbon__arrow_left')) {
        this.scrollLeft();
      } else if (event.target.classList.contains('ribbon__arrow_right')) {
        this.scrollRight();
      }
    });

    this.elem.querySelector('.ribbon__inner').addEventListener('scroll', () => {
      this.toggleArrows();
    });
  }

  selectCategory(clickedItem) {
    const activeItem = this.elem.querySelector('.ribbon__item_active');
    if (activeItem) {
      activeItem.classList.remove('ribbon__item_active');
    }
    clickedItem.classList.add('ribbon__item_active');

    const categoryId = clickedItem.getAttribute('data-id');
    this.elem.dispatchEvent(
      new CustomEvent('ribbon-select', {
        detail: categoryId,
        bubbles: true,
      })
    );
  }

  scrollLeft() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(-350, 0);
  }

  scrollRight() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(350, 0);
  }

  toggleArrows() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const scrollLeft = ribbonInner.scrollLeft;
    const scrollWidth = ribbonInner.scrollWidth;
    const clientWidth = ribbonInner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    arrowLeft.classList.toggle('ribbon__arrow_visible', scrollLeft > 0);
    arrowRight.classList.toggle(
      'ribbon__arrow_visible',
      scrollRight > 1
    );
  }
}
