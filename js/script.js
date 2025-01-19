var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
  },
});

let cart = [];

// Replace all "Buy Now" buttons with "Add to Cart"
document.addEventListener("DOMContentLoaded", function () {
  const buyButtons = document.querySelectorAll(".btn1");
  buyButtons.forEach((button) => {
    button.textContent = "Add to Cart";
    button.addEventListener("click", addToCart);
  });
});

function addToCart(event) {
  const productDiv = event.target.closest(".row");
  const title = productDiv.querySelector(".title").textContent;
  const price = parseInt(
    productDiv.querySelector(".price").textContent.replace("Rs. ", "")
  );
  const image = productDiv.querySelector("img").src;

  const existingItem = cart.find((item) => item.title === title);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      title,
      price,
      image,
      quantity: 1,
    });
  }

  updateCartDisplay();
  updateCartCount();
  showNotification("Item added to cart!");
}

function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function updateCartDisplay() {
  const cartItems = document.querySelector(".cart-items");
  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}" style="  width: 200px; height: 200px; object-fit: cover; ">
            <div style = "font-size:15px;">
                <h2>${item.title}</h2>
                <h2 style="text-align:center;">Rs. ${item.price} × ${item.quantity}</h2>
            </div>
            <div style = "font-size:15px;">
            <h2 >
                <button onclick="updateQuantity('${item.title}', -1)" style="cursor:pointer; margin-right:10px; color:red; font-size:3rem; background-color:transparent;"><strong>-</strong></button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.title}', 1)"  style="cursor:pointer;margin-left:10px; color:green; font-size:3rem; background-color:transparent;"><strong>+</strong></button>
                </h2>
            </div>
        `;
    cartItems.appendChild(itemDiv);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("cart-total-amount").textContent = total;
}

function updateQuantity(title, change) {
  const item = cart.find((item) => item.title === title);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.title !== title);
    }
    updateCartDisplay();
    updateCartCount();
  }
}

function checkout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!");
    return;
  }

  // Here you would typically integrate with a payment gateway
  alert(
    "Proceeding to checkout...\nTotal: Rs. " +
      document.getElementById("cart-total-amount").textContent
  );
  // Clear cart after successful checkout
  cart = [];
  updateCartDisplay();
  updateCartCount();
  toggleCart();
}
