import { renderOrderSummary } from "../scripts/checkout/orderSumary.js";

import { renderPaymentSummary } from "../scripts/checkout/paymentSumary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

//import "../data/cart-oop.js"; //this is the code to import the oop object

//import "../data/cart-class.js"; //this is the code to import the object created using class

//import "../data/backend-practice.js";

Promise.all([
  new Promise((resolve) => {
    console.log("promise???????????????");
    loadProducts(() => {
      resolve("value1");
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  console.log("next step>>>>>>>>>>>>>>>>>>");
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
  console.log("promise???????????????");
  loadProducts(() => {
    resolve("value1");
  });
})
  .then((value) => {
    console.log("value!!!!!!!!!!!", value);
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    console.log("next step>>>>>>>>>>>>>>>>>>");
    renderOrderSummary();
    renderPaymentSummary();
  });
  */

/*
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
