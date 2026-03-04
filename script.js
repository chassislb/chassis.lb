(function () {
  const menu = document.getElementById("mobileMenu");
  const burger = document.querySelector(".hamburger");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  function closeMenu() {
    if (!menu || !burger) return;
    menu.classList.remove("show");
    burger.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    if (!menu || !burger) return;
    const isOpen = menu.classList.toggle("show");
    burger.setAttribute("aria-expanded", String(isOpen));
  }

  if (burger) burger.addEventListener("click", toggleMenu);

  // Close menu when clicking a mobile link
  if (menu) {
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeMenu);
    });
  }

  // Close menu on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
