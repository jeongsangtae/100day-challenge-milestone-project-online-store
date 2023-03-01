const cartItemUpdateForms = document.querySelectorAll(".cart-item-management");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartBadge = document.querySelector(".nav-items .badge");

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

  //console.log(responseData);

  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove();
  } else {
    const cartItemTotalPrice =
      form.parentElement.querySelector(".cart-item-price");
    cartItemTotalPrice.innerHTML =
      responseData.updatedCartData.updatedItemPrice;
  }

  cartTotalPrice.innerHTML = responseData.updatedCartData.newTotalPrice;

  cartBadge.innerHTML = responseData.updatedCartData.newTotalQuantity;
}

for (const form of cartItemUpdateForms) {
  form.addEventListener("submit", updateCartItem);
}
