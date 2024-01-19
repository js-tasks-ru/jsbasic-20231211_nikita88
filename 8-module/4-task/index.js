import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;
    let isInCart = false;

    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id === product.id) {
        this.cartItems[i].count++;
        this.onProductUpdate(this.cartItems[i]);
        isInCart = true;
      }
    }
    if (!isInCart) {
      this.cartItems.push({ product, count: 1 });
      this.onProductUpdate(this.cartItems[this.cartItems.length - 1]);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.count = cartItem.count + +amount;
  
      this.onProductUpdate(cartItem);
  
      if (cartItem.count === 0) {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
      }
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let result = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      result += this.cartItems[i].count;
    }
    return result;
  }

  getTotalPrice() {
    let resultPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      resultPrice += this.cartItems[i].product.price * this.cartItems[i].count;
    }
    return resultPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    if (!this.modal) {
      this.modal = new Modal();
    }

    this.modal.setTitle('Your order');

    let modalBody = createElement('<div></div>');
    this.cartItems.forEach(item => {
      modalBody.append(this.renderProduct(item.product, item.count));
    });
    modalBody.append(this.renderOrderForm());
    this.modal.setBody(modalBody);

    this.modal.open();

    modalBody.addEventListener('click', (event) => {
      let cartCounterButton = event.target.closest('.cart-counter__button');

      if (cartCounterButton) {
        let productId = cartCounterButton.closest('.cart-product').dataset.productId;
        if (cartCounterButton.classList.contains('cart-counter__button_minus')) {
          this.updateProductCount(productId, -1);
        } else if (cartCounterButton.classList.contains('cart-counter__button_plus')) {
          this.updateProductCount(productId, 1);
        }
      }
    });

    const cartForm = document.querySelector('.cart-form');

    cartForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      let modalBody = document.querySelector('.modal__body');
      let productId = cartItem.product.id;
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector('.cart-buttons__info-price');

      if (cartItem.count > 0) {
        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
        let total = this.cartItems.reduce((acc, item) => acc + (item.count * item.product.price), 0).toFixed(2);
        infoPrice.innerHTML = `€${total}`;
      } else {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
        modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
        if (this.cartItems.length === 0) {
          this.modal.close();
        } else {
          let total = this.cartItems.reduce((acc, item) => acc + (item.count * item.product.price), 0).toFixed(2);
          infoPrice.innerHTML = `€${total}`;
        }
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();

    let form = event.target;
    let submitButton = form.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading');

    let formData = new FormData(form);

    let modalBodyContent = document.createElement('div');
    modalBodyContent.classList.add('modal__body-inner');
    modalBodyContent.innerHTML = `
      <p>
        Order successful! Your order is being cooked <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    `;


    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          this.modal.setTitle('Success!');
          this.cartItems = [];
          this.modal.setBody(modalBodyContent);
        }
        submitButton.classList.remove('is-loading');
      })
      .catch(error => console.error('Error:', error));
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

