import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import formatCurency from "../scripts/utils/money.js";

console.log("Script is correctly linked");

let productHTML = "";
products.forEach((product) => {
  productHTML += `
  <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarUrl()}">
          <div class="product-rating-count link-primary">
          ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
        ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js_add_to_cart"
        data-product-Id = "${product.id}">
          Add to Cart
        </button>
      </div>
  `;
});
console.log(productHTML);

document.querySelector(".js_products_grid").innerHTML = productHTML;

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    const quantity = Number(item.quantity) || 0; // Default to 0 if item.quantity is undefined or invalid
    cartQuantity += quantity;

    // console.log("quantity", quantity);
    // console.log("cart quantity", cartQuantity);
    // console.log(item);
  });

  document.querySelector(".js_cart_quantity").innerHTML = cartQuantity;

  console.log("Total cart quantity:", cartQuantity);
  console.log(cart);
}

document.querySelectorAll(".js_add_to_cart").forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.dataset);
    const productId = button.dataset.productId;

    addToCart(productId);
    updateCartQuantity();
  });
});
