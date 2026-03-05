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

  // Close menu when clicking a menu link
  if (menu) {
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeMenu);
    });
  }

  // Close on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // NEW: close menu if user clicks outside of it
  document.addEventListener("click", (e) => {
    if (!menu || !burger) return;
    const clickedInsideMenu = menu.contains(e.target);
    const clickedBurger = burger.contains(e.target);
    const isOpen = menu.classList.contains("show");

    if (isOpen && !clickedInsideMenu && !clickedBurger) closeMenu();
  });
})();