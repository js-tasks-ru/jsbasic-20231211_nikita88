export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

