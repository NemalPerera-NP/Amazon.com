import {
  cart as MyCart,
  removeFromCart,
  updateDeliveryOption,
} from "../data/cart.js"; //this is a import from a named export

import { products } from "../data/products.js";

import formatCurency from "../scripts/utils/money.js";

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; //this is a import from a default export

import { deliveryOptions } from "../data/deliveryOption.js";

function renderOrderSummary() {
  let cartHTML = "";
  MyCart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;
        //console.log("product", product);
        //console.log("product.id", product.id);
      }
    });
    //console.log("matchingProduct", matchingProduct);

    const deliveryOptionId = cartItem.deliveryOptionId;
    console.log("deliveryOptionId", deliveryOptionId);

    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
        console.log("deliveryOption", deliveryOption);
      }
    });

    const today = dayjs();
    const deliveryData = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryData.format("dddd, MMMM D");
    console.log("deliveryOption.deliveryDays", deliveryOption.deliveryDays);
    console.log("dateString", dateString);

    cartHTML += `
  <div class="cart-item-container js_cart_item_contasiner_${
    matchingProduct.id
  }">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
              ${matchingProduct.name}
              </div>
              <div class="product-price">
              $${formatCurency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                  matchingProduct.id
                }">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>`;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryData = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryData.format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      //console.log("isChecked", isChecked);

      html += `<div class="delivery-option js_delivery_option" data-product-id="${
        matchingProduct.id
      }" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" 
                ${isChecked ? "checked" : ""}
                 class="delivery-option-input" name="delivery-option-${
                   matchingProduct.id
                 }">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
              </div>`;
    });
    return html;
  }

  //console.log(cartHTML);
  document.querySelector(".order-summary").innerHTML = cartHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      //console.log("cart", MyCart);

      const container = document.querySelector(
        `.js_cart_item_contasiner_${productId}`
      );
      container.remove();
      //console.log("container", container);
    });
  });

  document.querySelectorAll(".js_delivery_option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}
renderOrderSummary();
