// ─────────────────────────────────────────────────────────────
// CHASSIS WEBSITE
// FULL LOCAL DIAGNOSIS ENGINE
// NO API
// NO BACKEND
// NO COST
// ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimations();
  initChassisDiagnosisAssistant();
});

// ─────────────────────────────────────────────────────────────
// REVEAL ANIMATIONS
// ─────────────────────────────────────────────────────────────

function initRevealAnimations() {

  const revealItems = document.querySelectorAll(`
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

    .about-hero-content,
    .about-diagnosis-grid p,
    .about-belief .section-heading,
    .about-belief-copy,
    .about-patterns-panel,
    .about-pattern-item,
    .about-founder-image-col,
    .about-founder-copy-col,
    .about-model .section-heading,
    .model-card,
    .about-model-outcomes,
    .about-readiness .section-heading,
    .readiness-column,
    .about-closing-copy,
    .about-closing .btn-closing-cta,

    .services-hero-content,
    .services-scope-grid p,
    .services-architecture .section-heading,
    .services-pricing-signal .section-heading,
    .services-architecture-intro,
    .service-detail-row,
    .services-closing-copy,
    .services-closing .btn,
    .services-closing .btn-primary,

    .case-studies-hero-content,
    .case-studies-band-grid p,
    .case-study-featured-copy,
    .case-study-featured-image,
    .case-study-row,
    .case-studies-closing-copy,
    .case-studies-closing .btn,
    .case-studies-closing .btn-primary,

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

    

    .contact-hero-content,
    .contact-band-grid p,
    .contact-info-block,
    .contact-form-shell,

    .footer-top,
    .footer-bottom,
    .footer-social
  `);

  if (!revealItems.length) return;

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
      threshold: 0.08,
      rootMargin: "0px 0px -20px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

// ─────────────────────────────────────────────────────────────
// MAIN ASSISTANT
// ─────────────────────────────────────────────────────────────

function initChassisDiagnosisAssistant() {

  document.querySelectorAll(".whatsapp-float").forEach((item) => item.remove());

  const assistant = document.createElement("div");
  assistant.className = "chassis-diagnosis-widget";

  assistant.innerHTML = `
    <button class="diagnosis-launcher" type="button">
      <span class="diagnosis-launcher-dot"></span>
      <span>Diagnose Your Business</span>
    </button>

    <section class="diagnosis-chat" aria-live="polite">

      <div class="diagnosis-chat-header">
        <div>
          <p>Chassis Diagnosis Assistant</p>
          <h2>Understand what needs structure</h2>
        </div>

        <button class="diagnosis-close" type="button">×</button>
      </div>

      <div class="diagnosis-chat-body">

        <div class="diagnosis-progress-track">
          <div class="diagnosis-progress-bar"></div>
        </div>

        <div class="diagnosis-question-area"></div>

      </div>

      <div class="diagnosis-chat-footer"></div>

    </section>
  `;

  document.body.appendChild(assistant);

  const launcher = assistant.querySelector(".diagnosis-launcher");
  const chat = assistant.querySelector(".diagnosis-chat");
  const closeBtn = assistant.querySelector(".diagnosis-close");
  const chatArea = assistant.querySelector(".diagnosis-question-area");
  const footer = assistant.querySelector(".diagnosis-chat-footer");
  const progressBar = assistant.querySelector(".diagnosis-progress-bar");

  const answers = {};
  const askedQuestions = [];

  let currentQuestionId = "client_name";
  let diagnosisFinished = false;

  // ─────────────────────────────────────────────────────────────
  // QUESTIONS
  // ─────────────────────────────────────────────────────────────

  const questions = {

    client_name: {
      section: "Let's start",
      question: "What's your name?",
      type: "text",
      placeholder: "First name is enough",
      required: true,
      next: "business_description"
    },

    business_description: {
      section: "Your Business",
      question: "What does your business do?",
      type: "textarea",
      required: true,
      next: "biggest_feeling"
    },

    biggest_feeling: {
      section: "The Real Problem",
      question: "Which feels most true right now?",
      type: "choice",
      required: true,

      options: [
        {
          label: "Everything goes through me. I can't step away.",
          value: "owner_dependent",
          next: "what_breaks"
        },

        {
          label: "I can't explain what I sell clearly.",
          value: "unclear_offer",
          next: "what_breaks"
        },

        {
          label: "The business works but feels chaotic.",
          value: "operational_chaos",
          next: "what_breaks"
        },

        {
          label: "I'm not growing and don't know why.",
          value: "plateaued",
          next: "what_breaks"
        },

        {
          label: "We look weaker online than we are.",
          value: "weak_presence",
          next: "what_breaks"
        }
      ]
    },

    what_breaks: {
      section: "Where It Breaks",
      question: "What keeps breaking?",
      type: "multi",
      required: true,

      options: [
        "Clients don't understand what I offer or what it costs",
        "Decisions wait for me, even small ones",
        "Delivery is inconsistent",
        "I repeat myself constantly to clients or the team",
        "Sales happen, but not enough of the right ones",
        "The website or social presence doesn't reflect reality",
        "I don't have time to think, only react",
        "I don't know what to fix first"
      ],

      next: "client_quality"
    },

    client_quality: {
      section: "Clients",
      question: "What's happening with clients?",
      type: "choice",
      required: true,

      options: [
        {
          label: "Good clients, not enough",
          value: "good_not_enough",
          next: "stage"
        },

        {
          label: "Wrong type of clients",
          value: "wrong_type",
          next: "stage"
        },

        {
          label: "People inquire but don't convert",
          value: "no_conversion",
          next: "stage"
        },

        {
          label: "Very few inquiries",
          value: "low_volume",
          next: "stage"
        },

        {
          label: "Clients are fine. Internal issue.",
          value: "internal_problem",
          next: "stage"
        }
      ]
    },

    stage: {
      section: "Business Stage",
      question: "Where is the business now?",
      type: "choice",
      required: true,

      options: [
        {
          label: "Still early",
          value: "early",
          next: "tried_before"
        },

        {
          label: "1 to 3 years in",
          value: "mid",
          next: "tried_before"
        },

        {
          label: "Established",
          value: "established",
          next: "tried_before"
        }
      ]
    },

    tried_before: {
      section: "Previous Attempts",
      question: "Have you tried fixing this before?",
      type: "choice",
      required: true,

      options: [
        {
          label: "Hired freelancers or agencies",
          value: "tried_agency",
          next: "readiness"
        },

        {
          label: "Tried fixing it myself",
          value: "tried_self",
          next: "readiness"
        },

        {
          label: "First time properly addressing it",
          value: "first_time",
          next: "readiness"
        }
      ]
    },

    readiness: {
      section: "Readiness",
      question: "What would you do with a clear diagnosis?",
      type: "choice",
      required: true,

      options: [
        {
          label: "Book a call",
          value: "ready",
          next: "contact_number"
        },

        {
          label: "Review it first",
          value: "reviewing",
          next: "contact_number"
        },

        {
          label: "Just exploring",
          value: "exploring",
          next: "contact_number"
        }
      ]
    },

    contact_number: {
      section: "Final Step",
      question: "What's your WhatsApp number?",
      type: "text",
      required: true,
      next: "finish"
    }

  };

  // assistant logic continues unchanged...
}