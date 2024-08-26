import { renderOrderSummary } from "../scripts/checkout/orderSumary.js";

import { renderPaymentSummary } from "../scripts/checkout/paymentSumary.js";
import { loadProducts } from "../data/products.js";

//import "../data/cart-oop.js"; //this is the code to import the oop object

//import "../data/cart-class.js"; //this is the code to import the object created using class

//import "../data/backend-practice.js";

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
