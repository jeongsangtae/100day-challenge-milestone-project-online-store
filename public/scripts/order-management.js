const updateOrderForms = document.querySelectorAll(".order-actions form");

async function updateOrder(event) {
  event.preventDefault();
  const form = event.target;

  const formData = new FormData(form);
  const newStatus = formData.get("status");
  const orderId = formData.get("orderid");
  const csrfToken = formData.get("_csrf");

  let response;

  try {
    response = await fetch(`/admin/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({
        newStatus: newStatus,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("문제가 발생하여 주문 상태를 업데이트할 수 없습니다.");
    return;
  }

  if (!response.ok) {
    alert("문제가 발생하여 주문 상태를 업데이트할 수 없습니다.");
    return;
  }

  const responseData = await response.json();

  form.parentElement.parentElement.querySelector(".badge").textContent =
    responseData.newStatus.toUpperCase();
}

for (const updateOrderForm of updateOrderForms) {
  updateOrderForm.addEventListener("submit", updateOrder);
}
