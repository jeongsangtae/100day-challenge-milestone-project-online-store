const deleteProductButtons = document.querySelectorAll(".product-item button");

async function deleteProduct(event) {
  const button = event.target;
  const productId = button.dataset.productid;
  const csrfToken = button.dataset.csrf;

  const response = await fetch(
    "/admin/products/" + productId + "?_csrf=" + csrfToken,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    alert("무엇인가 잘못된 거 같습니다.");
    return;
  }

  button.parentElement.parentElement.parentElement.parentElement.remove();
  console.log(button);
}

for (const deleteProductButton of deleteProductButtons) {
  deleteProductButton.addEventListener("click", deleteProduct);
}
