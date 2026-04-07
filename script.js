document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(`
    /* HOME */
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

    /* ABOUT */
    .about-hero-content,
    .about-diagnosis-grid p,
    .about-belief .section-heading,
    .about-belief-copy,
    .about-patterns-panel,
    .about-pattern-item,
    .about-model .section-heading,
    .model-card,
    .about-model-outcomes,
    .about-readiness .section-heading,
    .readiness-column,
    .about-closing-copy,

    /* SERVICES */
    .services-hero-content,
    .services-scope-grid p,
    .services-architecture .section-heading,
    .services-architecture-intro,
    .service-detail-row,
    .services-closing-copy,

    /* CASE STUDIES */
    .case-studies-hero-content,
    .case-studies-band-grid p,
    .case-study-featured-copy,
    .case-study-featured-image,
    .case-study-row,
    .case-studies-closing-copy,

    /* COLLABORATION */
    .collaboration-page-hero-content,
    .collaboration-page-band-grid p,
    .collaboration-process .section-heading,
    .collaboration-process-intro,
    .collaboration-step-row,
    .collaboration-partners .section-heading,
    .collaboration-featured-partner,
    .partner-network-card,
    .collaboration-standard .section-heading,
    .collaboration-standard-column,
    .collaboration-standard-principles,
    .collaboration-page-closing-copy,
    .collaboration-page-closing .btn-primary,

    /* INSIGHTS */
    .insights-hero-content,
    .insights-band-grid p,
    .insights-intro .section-heading,
    .insights-intro-copy,
    .insight-featured-copy,
    .insight-featured-panel,
    .insight-card,
    .insights-closing-copy,
    .insights-closing .btn-primary,

    /* CONTACT */
    .contact-hero-content,
    .contact-band-grid p,
    .contact-info-block,
    .contact-form-shell,

    /* GLOBAL */
    .footer-top,
    .footer-bottom
  `);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
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