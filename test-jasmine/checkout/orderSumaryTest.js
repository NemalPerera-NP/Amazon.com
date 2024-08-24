import { renderOrderSummary } from "../../scripts/checkout/orderSumary.js";

import { cart, addToCart, loadFromeStorage } from "../../data/cart.js";

// //this is a integration test

describe("test suite: renderOrderSummary", () => {
  it("displays the cart", () => {
    document.querySelector(".order-summary").innerHTML = `
    <div class="order-summary"></div>
    `;

    const productId1 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    const productId2 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromeStorage();
    renderOrderSummary();

    expect(
      document.querySelectorAll(".js_cart_item_contasiner").length
    ).toEqual(2);

    expect(
      document.querySelector(`.js_product_quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");

    expect(
      document.querySelector(`.js_product_quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");
  });

  it("removes a product", () => {
    spyOn(localStorage, "setItem");
    document.querySelector(".order-summary").innerHTML = `
    <div class="order-summary"></div>
    <div src="js_payment_summary"></div>
    `;

    const productId1 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    const productId2 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromeStorage();

    renderOrderSummary();
    document.querySelector(`.js_delete_link_${productId1}`).click();
    expect(
      document.querySelectorAll(".js_cart_item_contasiner").length
    ).toEqual(1);
    expect(
      document.querySelectorAll(`js_cart_item_contasiner_${productId1}`).length
    ).toEqual(null);

    expect(
      document.querySelectorAll(`js_cart_item_contasiner_${productId2}`).length
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });
});
