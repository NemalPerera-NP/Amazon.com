let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
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

function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartitem) => {
    if (productId === cartitem.productId) {
      matchingItem = cartitem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }

  saveToLocalStorage();
}

function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToLocalStorage();
}

function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartitem) => {
    if (productId === cartitem.productId) {
      matchingItem = cartitem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToLocalStorage();
}

export {
  cart,
  addToCart,
  removeFromCart,
  saveToLocalStorage,
  updateDeliveryOption,
};
