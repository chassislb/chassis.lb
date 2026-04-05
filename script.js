document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(
    ".hero-system-content, .statement-band-grid p, .services-editorial .section-heading, .service-row, .featured-case-study-copy, .featured-case-study-image, .case-heading, .case-preview-editorial, .collaboration-editorial-copy, .collaboration-editorial .btn-primary, .footer-top, .footer-bottom"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
});