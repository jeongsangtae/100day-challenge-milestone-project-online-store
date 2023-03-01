const { response } = require("express");

const cartItemUpdateForms = document.querySelectorAll(".cart-item-management");

async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target;

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("무엇인가 잘못된 거 같습니다.");
    return;
  }

  if (!response.ok) {
    alert("무엇인가 잘못된 거 같습니다.");
    return;
  }

  const responseData = await response.json();
}

for (const form of cartItemUpdateForms) {
  form.addEventListener("submit", updateCartItem);
}
