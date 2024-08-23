import {
  cart as MyCart,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js"; //this is a import from a named export

import { products, getProduct } from "../../data/products.js";

import formatCurency from "../utils/money.js";

import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOption.js";

function renderPaymentSummary() {
  console.log("renderPaymentSummary");
  let itemPrice = 0;
  let shipingPrice = 0;

  MyCart.forEach((cartItems) => {
    let matchingProduct = getProduct(cartItems.productId);

    itemPrice += matchingProduct.priceCents * cartItems.quantity;

    const deliveryOption = getDeliveryOption(cartItems.deliveryOptionId);
    shipingPrice += deliveryOption.priceCents;
  });

  const totalBeforeTaxPrice = itemPrice + shipingPrice;
  const taxCents = totalBeforeTaxPrice * 0.1;
  const totalPrice = totalBeforeTaxPrice + taxCents;

  const paymentSumaryHTML = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (3):</div>
          <div class="payment-summary-money">$${formatCurency(itemPrice)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurency(
            shipingPrice
          )}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurency(
            totalBeforeTaxPrice
          )}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurency(totalPrice)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
        `;

  document.querySelector(".js_payment_summary").innerHTML = paymentSumaryHTML;
}

export { renderPaymentSummary };
