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
    .outcomes-section .section-heading,
    .outcome-card,
    .featured-case-study-copy,
    .featured-case-study-image,
    .case-heading,
    .case-preview-editorial,
    .minimal-break,
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
    .services-process .section-heading,
    .services-process-step,
    .services-architecture .section-heading,
    .services-architecture-intro,
    .service-detail-row,
    .services-pricing-note,
    .services-faq .section-heading,
    .services-faq-item,
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
      threshold: 0.05,
      rootMargin: "0px 0px -10px 0px",
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

  const patterns = [
    {
      id: "unclear_positioning",
      severity: 5,
      conditions: (a) =>
        a.biggest_feeling === "unclear_offer" &&
        a.client_quality === "no_conversion" &&
        Array.isArray(a.what_breaks) &&
        a.what_breaks.includes("Clients don't understand what I offer or what it costs") &&
        a.what_breaks.includes("I repeat myself constantly to clients or the team"),
      diagnosis: {
        whatISee:
          "Based on what you shared, the business likely delivers real value, but the offer is too unclear for people to immediately understand why they should buy. You're compensating by repeating yourself instead of communicating from a strong position.",
        whereToStart:
          "Start with offer structure and positioning clarity. The messaging, pricing explanation, and service framing need to become simpler and sharper.",
        whatItMeans:
          "Once people understand the value faster, conversion becomes easier and sales stop depending on constant explanation."
      }
    },
    {
      id: "owner_bottleneck",
      severity: 5,
      conditions: (a) =>
        a.biggest_feeling === "owner_dependent" &&
        Array.isArray(a.what_breaks) &&
        a.what_breaks.includes("Decisions wait for me, even small ones") &&
        a.what_breaks.includes("I don't have time to think, only react"),
      diagnosis: {
        whatISee:
          "Based on what you shared, the business is operating through personal involvement instead of systems. You're acting as the workflow, the decision-maker, and the pressure release valve at the same time.",
        whereToStart:
          "Operations need structure first. Decision rules, delegation logic, and operational clarity should exist without depending on your constant presence.",
        whatItMeans:
          "Without operational structure, growth increases stress instead of stability."
      }
    },
    {
      id: "weak_digital_trust",
      severity: 4,
      conditions: (a) =>
        a.biggest_feeling === "weak_presence" &&
        Array.isArray(a.what_breaks) &&
        a.what_breaks.includes("The website or social presence doesn't reflect reality"),
      diagnosis: {
        whatISee:
          "Based on what you shared, there is likely a gap between the actual quality of the business and how the business appears online. That creates trust loss before conversations even happen.",
        whereToStart:
          "The digital layer needs restructuring. The website, social positioning, and brand presentation should communicate authority immediately.",
        whatItMeans:
          "A stronger digital presence improves trust, lead quality, and perceived value before the first interaction."
      }
    },
    {
      id: "operational_chaos",
      severity: 4,
      conditions: (a) =>
        a.biggest_feeling === "operational_chaos" &&
        Array.isArray(a.what_breaks) &&
        a.what_breaks.includes("Delivery is inconsistent"),
      diagnosis: {
        whatISee:
          "Based on what you shared, the business appears to function reactively instead of systematically. Delivery inconsistency usually means the internal workflow is being improvised too often.",
        whereToStart:
          "Operations should be standardized first. Workflow clarity, process structure, and execution consistency need attention before scaling further.",
        whatItMeans:
          "Better operational structure creates consistency, reduces stress, and protects client trust."
      }
    },
    {
      id: "plateau",
      severity: 3,
      conditions: (a) =>
        a.biggest_feeling === "plateaued" &&
        a.client_quality === "good_not_enough",
      diagnosis: {
        whatISee:
          "Based on what you shared, the business has traction, but the current structure likely cannot support another level of growth. This is common when systems stay informal for too long.",
        whereToStart:
          "The next layer is strategic structure. Positioning, operational clarity, and growth systems need alignment before scaling further.",
        whatItMeans:
          "Without restructuring, the business risks staying stuck at the same ceiling."
      }
    }
  ];

  const fallbackDiagnosis = {
    whatISee:
      "Based on your answers, the business shows pressure across multiple areas at once. That usually means the problem is layered, not isolated.",
    whereToStart:
      "The first priority is identifying which operational layer creates the most friction day-to-day before deciding what to rebuild.",
    whatItMeans:
      "Once the structure becomes clearer, decisions become easier and growth becomes more controlled."
  };

  launcher.addEventListener("click", () => {
    chat.classList.add("is-open");
    launcher.classList.add("is-hidden");

    if (!askedQuestions.length && !diagnosisFinished) {
      startConversation();
    }
  });

  closeBtn.addEventListener("click", () => {
    chat.classList.remove("is-open");
    launcher.classList.remove("is-hidden");
  });

  function startConversation() {
    chatArea.innerHTML = "";
    footer.innerHTML = "";
    currentQuestionId = "client_name";

    addBotMessage(
      "This takes about two minutes. No forms. No pricing. Just a structured diagnosis."
    );

    setTimeout(() => askQuestion(currentQuestionId), 500);
  }

  function askQuestion(questionId) {
    const q = questions[questionId];
    if (!q) return;

    currentQuestionId = questionId;

    if (!askedQuestions.includes(questionId)) {
      askedQuestions.push(questionId);
    }

    updateProgress();
    addBotMessage(q.question, q.section);
    renderAnswerInput(q);
  }

  function renderAnswerInput(q) {
    footer.innerHTML = "";

    if (q.type === "choice") {
      const wrapper = document.createElement("div");
      wrapper.className = "diagnosis-choice-list";

      q.options.forEach((option) => {
        const btn = document.createElement("button");
        btn.className = "diagnosis-choice-option";
        btn.type = "button";
        btn.innerHTML = `<span>${escapeHtml(option.label)}</span>`;

        btn.addEventListener("click", () => {
          handleAnswer(option.value, option.label, option.next);
        });

        wrapper.appendChild(btn);
      });

      footer.appendChild(wrapper);
      return;
    }

    if (q.type === "multi") {
      const selected = new Set();
      const wrapper = document.createElement("div");
      wrapper.className = "diagnosis-choice-list";

      q.options.forEach((option) => {
        const btn = document.createElement("button");
        btn.className = "diagnosis-choice-option";
        btn.type = "button";
        btn.innerHTML = `<span>${escapeHtml(option)}</span>`;

        btn.addEventListener("click", () => {
          if (selected.has(option)) {
            selected.delete(option);
            btn.classList.remove("is-selected");
          } else {
            selected.add(option);
            btn.classList.add("is-selected");
          }
        });

        wrapper.appendChild(btn);
      });

      const sendBtn = makeSendButton(() => {
        if (!selected.size) {
          addBotMessage("Pick at least one.");
          return;
        }

        const values = Array.from(selected);
        handleAnswer(values, values.join(", "), q.next);
      });

      footer.appendChild(wrapper);
      footer.appendChild(sendBtn);
      return;
    }

    const input = q.type === "textarea"
      ? document.createElement("textarea")
      : document.createElement("input");

    if (q.type !== "textarea") input.type = "text";

    input.placeholder = q.placeholder || "";

    const row = document.createElement("div");
    row.className = "diagnosis-input-row";
    row.appendChild(input);

    const sendBtn = makeSendButton(() => {
      const value = input.value.trim();

      if (!value) {
        addBotMessage("I need an answer here.");
        return;
      }

      handleAnswer(value, value, q.next);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && q.type !== "textarea") {
        event.preventDefault();
        sendBtn.click();
      }
    });

    footer.appendChild(row);
    footer.appendChild(sendBtn);

    setTimeout(() => input.focus(), 100);
  }

  function handleAnswer(value, displayValue, nextQuestionId) {
    answers[currentQuestionId] = value;
    addUserMessage(displayValue);
    footer.innerHTML = "";

    if (nextQuestionId === "finish") {
      setTimeout(() => {
        renderFinalDiagnosis();
      }, 700);
      return;
    }

    setTimeout(() => {
      askQuestion(nextQuestionId);
    }, 500);
  }

  function detectPatterns() {
    return patterns.filter((pattern) => pattern.conditions(answers));
  }

  function getPrimaryDiagnosis(matches) {
    if (!matches.length) return fallbackDiagnosis;

    matches.sort((a, b) => b.severity - a.severity);
    return matches[0].diagnosis;
  }

  function generateDiagnosis() {
    const matches = detectPatterns();
    const diagnosis = getPrimaryDiagnosis(matches);

    return {
      whatISee: diagnosis.whatISee,
      whereToStart: diagnosis.whereToStart,
      whatItMeans: diagnosis.whatItMeans
    };
  }

  function renderFinalDiagnosis() {
    diagnosisFinished = true;
    progressBar.style.width = "100%";
    footer.innerHTML = "";

    const diagnosis = generateDiagnosis();
    const whatsappText = buildWhatsAppMessage(diagnosis);
    const whatsappUrl = `https://wa.me/96171085824?text=${encodeURIComponent(whatsappText)}`;

    const resultCard = document.createElement("div");
    resultCard.className = "diagnosis-result-card";

    resultCard.innerHTML = `
      <p class="diagnosis-question-section">Your Diagnosis</p>

      <h3>What I see</h3>
      <p>${escapeHtml(diagnosis.whatISee)}</p>

      <h3>Where to start</h3>
      <p>${escapeHtml(diagnosis.whereToStart)}</p>

      <h3>What this means for you</h3>
      <p>${escapeHtml(diagnosis.whatItMeans)}</p>

      <div class="diagnosis-result-note">
        <p>This diagnosis is based on operational patterns across your answers.</p>
      </div>

      <a
        class="diagnosis-whatsapp-link"
        href="https://calendly.com/chassis-lb/chassis-discovery-call"
        target="_blank"
        rel="noopener"
      >
        Book a Discovery Call
      </a>

      <a
        class="diagnosis-whatsapp-link"
        href="${whatsappUrl}"
        target="_blank"
        rel="noopener"
        style="margin-top:10px; background:transparent; border:1px solid currentColor; opacity:0.7;"
      >
        Send to WhatsApp
      </a>

      <button class="diagnosis-restart" type="button">
        Start Again
      </button>
    `;

    chatArea.appendChild(resultCard);
    scrollChatToBottom();

    resultCard
      .querySelector(".diagnosis-restart")
      .addEventListener("click", () => {
        Object.keys(answers).forEach((key) => delete answers[key]);
        askedQuestions.length = 0;
        currentQuestionId = "client_name";
        diagnosisFinished = false;
        startConversation();
      });
  }

  function buildWhatsAppMessage(diagnosis) {
    return `
Hello Chassis.

I completed the business diagnosis.

Name:
${answers.client_name || ""}

WhatsApp:
${answers.contact_number || ""}

Business:
${answers.business_description || ""}

Main Pressure:
${answers.biggest_feeling || ""}

What Breaks:
${Array.isArray(answers.what_breaks) ? answers.what_breaks.join(", ") : ""}

Client Situation:
${answers.client_quality || ""}

Business Stage:
${answers.stage || ""}

Readiness:
${answers.readiness || ""}

Diagnosis:

WHAT I SEE:
${diagnosis.whatISee}

WHERE TO START:
${diagnosis.whereToStart}

WHAT THIS MEANS:
${diagnosis.whatItMeans}
`;
  }

  function makeSendButton(onClick) {
    const btn = document.createElement("button");
    btn.className = "diagnosis-next";
    btn.type = "button";
    btn.innerHTML = "Send";
    btn.addEventListener("click", onClick);
    return btn;
  }

  function addBotMessage(message, section = "") {
    const box = document.createElement("div");
    box.className = "diagnosis-message diagnosis-message-bot";

    box.innerHTML = `
      ${section ? `<p class="diagnosis-question-section">${escapeHtml(section)}</p>` : ""}
      <p>${escapeHtml(message)}</p>
    `;

    chatArea.appendChild(box);
    scrollChatToBottom();
  }

  function addUserMessage(message) {
    const box = document.createElement("div");
    box.className = "diagnosis-message diagnosis-message-user";
    box.innerHTML = `<p>${escapeHtml(message)}</p>`;

    chatArea.appendChild(box);
    scrollChatToBottom();
  }

  function updateProgress() {
    const total = Object.keys(questions).length;
    const progress = Math.min((askedQuestions.length / total) * 100, 100);
    progressBar.style.width = `${progress}%`;
  }

  function scrollChatToBottom() {
    const body = assistant.querySelector(".diagnosis-chat-body");
    if (body) body.scrollTop = body.scrollHeight;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
}