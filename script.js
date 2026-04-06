document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(
    `
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
    .about-closing .btn-primary,

    /* SERVICES */
    .services-hero-content,
    .services-scope-grid p,
    .services-overview .section-heading,
    .services-overview-copy,
    .service-detail-row,
    .services-fit .section-heading,
    .services-fit-card,
    .services-note-copy,
    .services-closing-copy,
    .services-closing .btn-primary,

    /* CASE STUDIES */
    .case-studies-hero-content,
    .case-studies-band-grid p,
    .case-studies-intro .section-heading,
    .case-studies-intro-copy,
    .case-study-featured-copy,
    .case-study-featured-image,
    .case-study-row,
    .case-studies-note-copy,
    .case-studies-closing-copy,
    .case-studies-closing .btn-primary,

    /* COLLABORATION */
    .collaboration-page-hero-content,
    .collaboration-page-band-grid p,
    .collaboration-page-overview .section-heading,
    .collaboration-page-overview-copy,
    .collaboration-step-row,
    .collaboration-partners-copy,
    .collaboration-partners-note,
    .collaboration-fit .section-heading,
    .collaboration-fit-card,
    .collaboration-principles .section-heading,
    .collaboration-principles-list,
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
    .insights-note-copy,
    .insights-closing-copy,
    .insights-closing .btn-primary,

    /* GLOBAL */
    .footer-top,
    .footer-bottom
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