const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

function toggleMobileMenu() {
  mobileMenu.classList.toggle('open')
  // if (mobileMenu.style.display === "flex") {
  //   mobileMenu.style.display = "none"
  // } else {
  //   mobileMenu.style.display = "flex"
  // }
}

mobileMenuBtn.addEventListener("click", toggleMobileMenu);
