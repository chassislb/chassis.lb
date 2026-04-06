document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(
    `
    .hero-system-content,
    .statement-band-grid p,
    .services-editorial .section-heading,
    .service-row,
    .featured-case-study-copy,
    .featured-case-study-image,
    .case-heading,
    .case-preview-editorial,
    .collaboration-editorial-copy,
    .collaboration-editorial .btn-primary,
    .footer-top,
    .footer-bottom,
    .about-hero-content,
    .about-diagnosis-grid p,
    .about-problem .section-heading,
    .about-problem-copy,
    .about-patterns .section-heading,
    .about-patterns-intro,
    .pattern-row,
    .about-model .section-heading,
    .model-card,
    .about-outcomes .section-heading,
    .about-outcomes-copy,
    .about-outcomes-list,
    .about-fit .section-heading,
    .fit-card,
    .about-closing-copy,
    .about-closing .btn-primary
    `
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