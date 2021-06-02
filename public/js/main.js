const backdrop = document.querySelector(".backdrop");
const mobileNav = document.querySelector(".mobile-nav");
const menuToggle = document.querySelector("#menu-toggle");

const handleBackdrop = () => {
  backdrop.style.display = "none";
  mobileNav.classList.remove("open");
};

const handleMenuToggle = () => {
  backdrop.style.display = "block";
  mobileNav.classList.add("open");
};

backdrop.addEventListener("click", handleBackdrop);
menuToggle.addEventListener("click", handleMenuToggle);
