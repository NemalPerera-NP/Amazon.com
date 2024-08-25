//class = object generater
class Cart {
  cartItems; //cartItems = undefined; //in OOP this is equal to cartItems: undefined,

  localStorageKey;

  //Constructor lets us put this setup code inside the class
  //should not return anything from the constructor
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    //cart.localStorageKey = "cart-oop";
    this.loadFromeStorage(); //instance of the class
  }

  loadFromeStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "2",
        },
      ];
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartitem) => {
      if (productId === cartitem.productId) {
        matchingItem = cartitem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }

    this.saveToLocalStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (productId !== cartItem.productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToLocalStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartitem) => {
      if (productId === cartitem.productId) {
        matchingItem = cartitem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToLocalStorage();
  }
}

const cart = new Cart("cart-oop"); //generate a new object using the class Class
const businessCart = new Cart("cart-business");

console.log("cart", cart);
console.log("businessCart", businessCart);
console.log("businessCart instance", businessCart instanceof Cart);
