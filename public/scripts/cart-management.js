const addToCartButton = document.querySelector("#product-details button");
const cartBadge = document.querySelector(".nav-items .badge");

async function addToCart() {
  const productId = addToCartButton.dataset.productid;
  const csrfToken = addToCartButton.dataset.csrf;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
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

  const newTotalQuantity = responseData.newTotalItems;

  cartBadge.innerHTML = newTotalQuantity;
}

addToCartButton.addEventListener("click", addToCart);
