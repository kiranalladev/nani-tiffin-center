// Run this only on the Order page
const addButtons = document.querySelectorAll("[data-add]");
const orderList = document.getElementById("order-list");
const subtotalEl = document.getElementById("subtotal");
const gstEl = document.getElementById("gst");
const totalEl = document.getElementById("total");
const clearOrderBtn = document.getElementById("clear-order");

let orderItems = [];

// If elements are not found (other pages), stop
if (addButtons.length && orderList && subtotalEl && gstEl && totalEl && clearOrderBtn) {
  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = Number(btn.getAttribute("data-price"));
      addItem(name, price);
      renderOrder();
    });
  });

  clearOrderBtn.addEventListener("click", () => {
    orderItems = [];
    renderOrder();
  });

  renderOrder();
}

function addItem(name, price) {
  const existing = orderItems.find((item) => item.name === name);
  if (existing) {
    existing.qty += 1;
    existing.total = existing.qty * existing.price;
  } else {
    orderItems.push({ name, price, qty: 1, total: price });
  }
}

function removeItem(name) {
  orderItems = orderItems.filter((item) => item.name !== name);
  renderOrder();
}

function renderOrder() {
  orderList.innerHTML = "";
  let subtotal = 0;

  orderItems.forEach((item) => {
    subtotal += item.total;

    const li = document.createElement("li");
    li.className = "order-item";
    li.innerHTML = `
      <span>${item.name}</span>
      <span class="qty">x ${item.qty}</span>
      <span>₹${item.total}</span>
      <button class="remove-btn">×</button>
    `;

    li.querySelector(".remove-btn").addEventListener("click", () => removeItem(item.name));
    orderList.appendChild(li);
  });

  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  subtotalEl.textContent = `₹${subtotal}`;
  gstEl.textContent = `₹${gst}`;
  totalEl.textContent = `₹${total}`;
}
