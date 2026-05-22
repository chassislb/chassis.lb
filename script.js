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
// CHASSIS DIAGNOSIS ASSISTANT
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
          <h2>Find what needs structure</h2>
        </div>

        <button class="diagnosis-close" type="button" aria-label="Close diagnosis assistant">×</button>
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
      section: "Start",
      question: "What's your name?",
      type: "text",
      placeholder: "First name is enough",
      required: true,
      next: "business_description"
    },

    business_description: {
      section: "Business Context",
      question: "Describe your business in 1–3 sentences. What do you sell, and to whom?",
      type: "textarea",
      placeholder: "Example: We run a restaurant group / clinic / consulting service / online business...",
      required: true,
      next: "business_type"
    },

    business_type: {
      section: "Business Type",
      question: "Which category is closest to your business?",
      type: "choice",
      required: true,
      options: [
        { label: "Hospitality / restaurant / food business", value: "hospitality", next: "business_stage" },
        { label: "Clinic / medical / health service", value: "clinic", next: "business_stage" },
        { label: "Expert / consultant / personal brand", value: "expert", next: "business_stage" },
        { label: "Service business / agency / professional office", value: "service_business", next: "business_stage" },
        { label: "Retail / product business", value: "retail_product", next: "business_stage" },
        { label: "Startup / app / platform", value: "startup", next: "business_stage" },
        { label: "Other", value: "other", next: "business_stage" }
      ]
    },

    business_stage: {
      section: "Stage",
      question: "Where is the business right now?",
      type: "choice",
      required: true,
      options: [
        { label: "Still early. We are still shaping the offer.", value: "early", next: "main_pressure" },
        { label: "Already operating, but still messy.", value: "operating_messy", next: "main_pressure" },
        { label: "Established, but too dependent on the owner.", value: "established_owner_dependent", next: "main_pressure" },
        { label: "Growing, but structure is not keeping up.", value: "growing_unstructured", next: "main_pressure" },
        { label: "Stable, but we need better systems before scaling.", value: "stable_needs_systems", next: "main_pressure" }
      ]
    },

    main_pressure: {
      section: "Main Pressure",
      question: "What feels like the biggest pressure right now?",
      type: "choice",
      required: true,
      options: [
        { label: "People don't clearly understand what we sell.", value: "unclear_offer", next: "broken_areas" },
        { label: "Everything depends on the owner.", value: "owner_dependency", next: "broken_areas" },
        { label: "The business works, but daily operations are chaotic.", value: "operational_chaos", next: "broken_areas" },
        { label: "Execution is inconsistent. Things start but don't get completed properly.", value: "execution_inconsistency", next: "broken_areas" },
        { label: "Our website/tools/social presence don't reflect how the business actually works.", value: "infrastructure_gap", next: "broken_areas" },
        { label: "We are growing, but every growth step creates more pressure.", value: "growth_pressure", next: "broken_areas" }
      ]
    },

    broken_areas: {
      section: "Where It Breaks",
      question: "Select everything that keeps repeating inside the business.",
      type: "multi",
      required: true,
      options: [
        { label: "Clients ask too many basic questions before understanding the offer.", value: "clients_confused" },
        { label: "Pricing changes too much from client to client.", value: "pricing_improvised" },
        { label: "The team waits for the owner to decide small things.", value: "team_waits_owner" },
        { label: "The same instructions are repeated constantly.", value: "repeated_instructions" },
        { label: "Workflows exist in people's heads, not in a system.", value: "workflow_in_heads" },
        { label: "Delivery quality changes depending on who handles the work.", value: "delivery_inconsistent" },
        { label: "There are no clear SOPs, checklists, or process documents.", value: "no_sops" },
        { label: "The website or digital presence feels disconnected from the real business.", value: "digital_disconnected" },
        { label: "Leads come in, but conversion is weak.", value: "weak_conversion" },
        { label: "The business is busy, but nobody sees the full picture.", value: "no_visibility" },
        { label: "New work creates more stress instead of more control.", value: "growth_creates_stress" },
        { label: "I don't know what to fix first.", value: "no_priority" }
      ],
      next: "owner_dependency_level"
    },

    owner_dependency_level: {
      section: "Owner Dependency",
      question: "If the owner disappears for two weeks, what happens?",
      type: "choice",
      required: true,
      options: [
        { label: "The business mostly stops.", value: "stops", next: "offer_clarity" },
        { label: "The team continues, but decisions pile up.", value: "decisions_pile", next: "offer_clarity" },
        { label: "Operations continue, but quality drops.", value: "quality_drops", next: "offer_clarity" },
        { label: "The business can run, but not comfortably.", value: "runs_uncomfortably", next: "offer_clarity" },
        { label: "It can run without major problems.", value: "runs_well", next: "offer_clarity" }
      ]
    },

    offer_clarity: {
      section: "Offer Clarity",
      question: "Can you explain what your business sells in one clear sentence?",
      type: "choice",
      required: true,
      options: [
        { label: "Yes, easily.", value: "clear", next: "operations_maturity" },
        { label: "Kind of, but it changes depending on the person.", value: "changes", next: "operations_maturity" },
        { label: "Not really. It takes explanation.", value: "unclear", next: "operations_maturity" },
        { label: "No. We do many things and it is hard to simplify.", value: "scattered", next: "operations_maturity" }
      ]
    },

    operations_maturity: {
      section: "Operations",
      question: "How structured are your internal operations right now?",
      type: "choice",
      required: true,
      options: [
        { label: "Mostly informal. People just know what to do.", value: "informal", next: "systems_maturity" },
        { label: "Some structure exists, but it is not consistent.", value: "some_structure", next: "systems_maturity" },
        { label: "We have processes, but they are not followed properly.", value: "not_followed", next: "systems_maturity" },
        { label: "We have clear workflows, but we need better tools.", value: "clear_workflows_need_tools", next: "systems_maturity" },
        { label: "Operations are structured and mostly stable.", value: "structured", next: "systems_maturity" }
      ]
    },

    systems_maturity: {
      section: "Systems & Infrastructure",
      question: "What systems or assets already exist?",
      type: "multi",
      required: true,
      options: [
        { label: "Website", value: "website" },
        { label: "CRM or client database", value: "crm" },
        { label: "SOPs / checklists / process documents", value: "sops" },
        { label: "Project management tool", value: "project_management" },
        { label: "Intake form or booking flow", value: "intake" },
        { label: "Dashboards or reports", value: "dashboards" },
        { label: "Social media presence", value: "social" },
        { label: "None of these are properly structured", value: "none_structured" }
      ],
      next: "desired_outcome"
    },

    desired_outcome: {
      section: "Outcome",
      question: "What do you want to have at the end of working with Chassis?",
      type: "multi",
      required: true,
      options: [
        { label: "I want to know exactly what is broken and what to fix first.", value: "diagnosis" },
        { label: "I want a clearer offer, pricing, and business direction.", value: "business_structuring" },
        { label: "I want workflows, SOPs, roles, and internal systems.", value: "operations_systems" },
        { label: "I want a website, platform, tool, CRM, or digital setup that supports the business.", value: "execution_infrastructure" },
        { label: "I want ongoing operational follow-up and correction.", value: "operational_partnership" },
        { label: "I am not sure. I need you to tell me what comes first.", value: "not_sure" }
      ],
      next: "urgency"
    },

    urgency: {
      section: "Urgency",
      question: "How urgent is this?",
      type: "choice",
      required: true,
      options: [
        { label: "Not urgent. I want to understand the problem first.", value: "low", next: "readiness" },
        { label: "Soon. This is starting to block growth.", value: "medium", next: "readiness" },
        { label: "Urgent. The business is already feeling pressure.", value: "high", next: "readiness" },
        { label: "Very urgent. We need action fast.", value: "critical", next: "readiness" }
      ]
    },

    readiness: {
      section: "Readiness",
      question: "What would you do if the diagnosis is accurate?",
      type: "choice",
      required: true,
      options: [
        { label: "Book a discovery call.", value: "ready", next: "contact_number" },
        { label: "Review the result first, then decide.", value: "reviewing", next: "contact_number" },
        { label: "Send it internally to discuss.", value: "internal_review", next: "contact_number" },
        { label: "Just exploring for now.", value: "exploring", next: "contact_number" }
      ]
    },

    contact_number: {
      section: "Final Step",
      question: "What is your WhatsApp number so the diagnosis can be sent with your context?",
      type: "text",
      placeholder: "+961...",
      required: true,
      next: "finish"
    }
  };

  const serviceLabels = {
    operationalDiagnosis: "Operational Diagnosis",
    businessStructuring: "Business Structuring",
    operationsSystems: "Operations & Systems Setup",
    executionInfrastructure: "Execution Infrastructure",
    operationalPartnership: "Operational Partnership"
  };

  const serviceDescriptions = {
    operationalDiagnosis:
      "Best when the business feels messy but the real priority is not clear yet.",
    businessStructuring:
      "Best when the offer, pricing, positioning, or business direction needs to become clearer before execution.",
    operationsSystems:
      "Best when the business already runs, but workflows, roles, SOPs, and daily operations are inconsistent.",
    executionInfrastructure:
      "Best when the business needs a website, CRM, intake flow, platform, tool, or digital system built around how it actually works.",
    operationalPartnership:
      "Best when the structure exists, but the business needs ongoing correction, follow-up, and operational alignment."
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
      "This is not a quote request. It is a structured diagnosis. The goal is to identify which operational layer needs attention first."
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
        btn.innerHTML = `<span>${escapeHtml(option.label)}</span>`;

        btn.addEventListener("click", () => {
          if (selected.has(option.value)) {
            selected.delete(option.value);
            btn.classList.remove("is-selected");
          } else {
            selected.add(option.value);
            btn.classList.add("is-selected");
          }
        });

        wrapper.appendChild(btn);
      });

      const sendBtn = makeSendButton(() => {
        if (!selected.size) {
          addBotMessage("Pick at least one. A useful diagnosis needs a real signal.");
          return;
        }

        const values = Array.from(selected);
        const labels = q.options
          .filter((option) => values.includes(option.value))
          .map((option) => option.label);

        handleAnswer(values, labels.join(", "), q.next);
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
        addBotMessage("I need an answer here. The diagnosis depends on the context.");
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

  function scoreDiagnosis() {
    const scores = {
      operationalDiagnosis: 0,
      businessStructuring: 0,
      operationsSystems: 0,
      executionInfrastructure: 0,
      operationalPartnership: 0
    };

    const broken = Array.isArray(answers.broken_areas) ? answers.broken_areas : [];
    const systems = Array.isArray(answers.systems_maturity) ? answers.systems_maturity : [];
    const outcomes = Array.isArray(answers.desired_outcome) ? answers.desired_outcome : [];

    scores.operationalDiagnosis += 2;

    if (answers.main_pressure === "unclear_offer") scores.businessStructuring += 5;
    if (answers.main_pressure === "owner_dependency") scores.operationsSystems += 5;
    if (answers.main_pressure === "operational_chaos") scores.operationsSystems += 5;
    if (answers.main_pressure === "execution_inconsistency") scores.operationsSystems += 4;
    if (answers.main_pressure === "infrastructure_gap") scores.executionInfrastructure += 5;
    if (answers.main_pressure === "growth_pressure") {
      scores.businessStructuring += 2;
      scores.operationsSystems += 4;
      scores.operationalPartnership += 2;
    }

    if (answers.business_stage === "early") {
      scores.businessStructuring += 4;
      scores.operationalDiagnosis += 2;
    }

    if (answers.business_stage === "operating_messy") {
      scores.operationsSystems += 4;
      scores.operationalDiagnosis += 2;
    }

    if (answers.business_stage === "established_owner_dependent") {
      scores.operationsSystems += 5;
      scores.operationalPartnership += 3;
    }

    if (answers.business_stage === "growing_unstructured") {
      scores.operationsSystems += 4;
      scores.operationalPartnership += 3;
    }

    if (answers.business_stage === "stable_needs_systems") {
      scores.executionInfrastructure += 3;
      scores.operationsSystems += 3;
    }

    if (broken.includes("clients_confused")) scores.businessStructuring += 3;
    if (broken.includes("pricing_improvised")) scores.businessStructuring += 4;
    if (broken.includes("team_waits_owner")) scores.operationsSystems += 4;
    if (broken.includes("repeated_instructions")) scores.operationsSystems += 3;
    if (broken.includes("workflow_in_heads")) scores.operationsSystems += 4;
    if (broken.includes("delivery_inconsistent")) scores.operationsSystems += 4;
    if (broken.includes("no_sops")) scores.operationsSystems += 4;
    if (broken.includes("digital_disconnected")) scores.executionInfrastructure += 4;
    if (broken.includes("weak_conversion")) scores.businessStructuring += 2;
    if (broken.includes("no_visibility")) scores.operationalDiagnosis += 3;
    if (broken.includes("growth_creates_stress")) {
      scores.operationsSystems += 3;
      scores.operationalPartnership += 2;
    }
    if (broken.includes("no_priority")) scores.operationalDiagnosis += 5;

    if (answers.owner_dependency_level === "stops") {
      scores.operationsSystems += 5;
      scores.operationalPartnership += 3;
    }

    if (answers.owner_dependency_level === "decisions_pile") {
      scores.operationsSystems += 4;
      scores.operationalPartnership += 2;
    }

    if (answers.owner_dependency_level === "quality_drops") {
      scores.operationsSystems += 4;
    }

    if (answers.owner_dependency_level === "runs_uncomfortably") {
      scores.operationsSystems += 2;
    }

    if (answers.offer_clarity === "changes") scores.businessStructuring += 3;
    if (answers.offer_clarity === "unclear") scores.businessStructuring += 5;
    if (answers.offer_clarity === "scattered") scores.businessStructuring += 5;

    if (answers.operations_maturity === "informal") scores.operationsSystems += 5;
    if (answers.operations_maturity === "some_structure") scores.operationsSystems += 3;
    if (answers.operations_maturity === "not_followed") {
      scores.operationsSystems += 4;
      scores.operationalPartnership += 2;
    }

    if (answers.operations_maturity === "clear_workflows_need_tools") {
      scores.executionInfrastructure += 5;
      scores.operationsSystems += 1;
    }

    if (systems.includes("none_structured")) {
      scores.operationalDiagnosis += 2;
      scores.operationsSystems += 3;
      scores.executionInfrastructure += 2;
    }

    if (!systems.includes("website") && answers.main_pressure === "infrastructure_gap") {
      scores.executionInfrastructure += 2;
    }

    if (!systems.includes("crm") && !systems.includes("intake")) {
      scores.executionInfrastructure += 1;
    }

    if (!systems.includes("sops") && !systems.includes("project_management")) {
      scores.operationsSystems += 2;
    }

    if (outcomes.includes("diagnosis")) scores.operationalDiagnosis += 5;
    if (outcomes.includes("business_structuring")) scores.businessStructuring += 5;
    if (outcomes.includes("operations_systems")) scores.operationsSystems += 5;
    if (outcomes.includes("execution_infrastructure")) scores.executionInfrastructure += 5;
    if (outcomes.includes("operational_partnership")) scores.operationalPartnership += 5;

    if (outcomes.includes("not_sure")) {
      scores.operationalDiagnosis += 4;
      scores.businessStructuring += 1;
      scores.operationsSystems += 1;
    }

    if (answers.urgency === "high") {
      scores.operationalDiagnosis += 1;
      scores.operationsSystems += 1;
    }

    if (answers.urgency === "critical") {
      scores.operationalDiagnosis += 2;
      scores.operationsSystems += 2;
      scores.operationalPartnership += 1;
    }

    return scores;
  }

  function getSortedServices(scores) {
    return Object.keys(scores)
      .map((key) => ({
        key,
        label: serviceLabels[key],
        score: scores[key],
        description: serviceDescriptions[key]
      }))
      .sort((a, b) => b.score - a.score);
  }

  function getSeverityLevel(scores) {
    const highest = Math.max(...Object.values(scores));
    const broken = Array.isArray(answers.broken_areas) ? answers.broken_areas.length : 0;

    if (highest >= 16 || broken >= 7 || answers.urgency === "critical") {
      return {
        label: "High operational pressure",
        text: "The business is showing several structural pressure points at the same time. This usually means the issue is not cosmetic. It needs proper diagnosis and controlled implementation."
      };
    }

    if (highest >= 11 || broken >= 4 || answers.urgency === "high") {
      return {
        label: "Moderate operational pressure",
        text: "There is a clear operational pattern behind the symptoms. The business does not need random fixes. It needs the right layer handled first."
      };
    }

    return {
      label: "Early structural pressure",
      text: "The business is not necessarily broken, but there are early signs that clearer structure would prevent future pressure."
    };
  }

  function getBusinessContextLine() {
    const business = answers.business_description || "your business";
    const type = answers.business_type ? readableValue(answers.business_type) : "business";

    return `Based on what you shared about ${business}, this looks closest to a ${type} with structural pressure that needs to be organized before more execution is added.`;
  }

  function generateDiagnosis() {
    const scores = scoreDiagnosis();
    const sortedServices = getSortedServices(scores);
    const primary = sortedServices[0];
    const secondary = sortedServices[1];
    const severity = getSeverityLevel(scores);
    const broken = Array.isArray(answers.broken_areas) ? answers.broken_areas : [];

    let whatISee = getBusinessContextLine();

    if (primary.key === "businessStructuring") {
      whatISee += " The strongest signal is unclear business structure: offer clarity, pricing logic, service framing, or positioning may be creating friction before operations even begin.";
    }

    if (primary.key === "operationsSystems") {
      whatISee += " The strongest signal is operational inconsistency: the business may be relying too much on memory, owner involvement, repeated instructions, or informal workflows.";
    }

    if (primary.key === "executionInfrastructure") {
      whatISee += " The strongest signal is an infrastructure gap: the business may need better tools, website structure, intake flow, CRM, platform logic, or digital systems to support how it actually works.";
    }

    if (primary.key === "operationalPartnership") {
      whatISee += " The strongest signal is ongoing operational dependency: the business may need continued correction, follow-up, and alignment after the structure is built.";
    }

    if (primary.key === "operationalDiagnosis") {
      whatISee += " The strongest signal is unclear priority: there are enough mixed symptoms that the first move should be a proper operational diagnosis before choosing what to build.";
    }

    const whereToStart = `Start with ${primary.label}. ${primary.description} ${
      secondary && secondary.score > 6
        ? `After that, ${secondary.label} may become the second layer because it also scored strongly.`
        : ""
    }`;

    const whatItMeans = `${severity.text} The immediate goal is not to do more work. The goal is to identify the correct operational layer, fix that first, and avoid spending time or money on the wrong solution.`;

    const serviceRecommendation = {
      primary,
      secondary,
      scores,
      severity,
      brokenCount: broken.length
    };

    return {
      whatISee,
      whereToStart,
      whatItMeans,
      serviceRecommendation
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

      <h3>Primary recommended service</h3>
      <p><strong>${escapeHtml(diagnosis.serviceRecommendation.primary.label)}</strong></p>
      <p>${escapeHtml(diagnosis.serviceRecommendation.primary.description)}</p>

      ${
        diagnosis.serviceRecommendation.secondary &&
        diagnosis.serviceRecommendation.secondary.score > 6
          ? `
            <h3>Possible second layer</h3>
            <p><strong>${escapeHtml(diagnosis.serviceRecommendation.secondary.label)}</strong></p>
            <p>${escapeHtml(diagnosis.serviceRecommendation.secondary.description)}</p>
          `
          : ""
      }

      <h3>Diagnosis level</h3>
      <p><strong>${escapeHtml(diagnosis.serviceRecommendation.severity.label)}</strong></p>

      <h3>What I see</h3>
      <p>${escapeHtml(diagnosis.whatISee)}</p>

      <h3>Where to start</h3>
      <p>${escapeHtml(diagnosis.whereToStart)}</p>

      <h3>What this means</h3>
      <p>${escapeHtml(diagnosis.whatItMeans)}</p>

      <div class="diagnosis-result-note">
        <p>This result is based on your answers across offer clarity, owner dependency, operations, systems, infrastructure, urgency, and desired outcome.</p>
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
        style="margin-top:10px; background:transparent; border:1px solid currentColor; opacity:0.75;"
      >
        Send Diagnosis to WhatsApp
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

NAME:
${answers.client_name || ""}

WHATSAPP:
${answers.contact_number || ""}

BUSINESS DESCRIPTION:
${answers.business_description || ""}

BUSINESS TYPE:
${readableValue(answers.business_type)}

BUSINESS STAGE:
${readableValue(answers.business_stage)}

MAIN PRESSURE:
${readableValue(answers.main_pressure)}

BROKEN AREAS:
${readableList(answers.broken_areas)}

OWNER DEPENDENCY:
${readableValue(answers.owner_dependency_level)}

OFFER CLARITY:
${readableValue(answers.offer_clarity)}

OPERATIONS MATURITY:
${readableValue(answers.operations_maturity)}

CURRENT SYSTEMS:
${readableList(answers.systems_maturity)}

DESIRED OUTCOME:
${readableList(answers.desired_outcome)}

URGENCY:
${readableValue(answers.urgency)}

READINESS:
${readableValue(answers.readiness)}

PRIMARY RECOMMENDED SERVICE:
${diagnosis.serviceRecommendation.primary.label}

POSSIBLE SECOND LAYER:
${diagnosis.serviceRecommendation.secondary ? diagnosis.serviceRecommendation.secondary.label : "None"}

DIAGNOSIS LEVEL:
${diagnosis.serviceRecommendation.severity.label}

WHAT I SEE:
${diagnosis.whatISee}

WHERE TO START:
${diagnosis.whereToStart}

WHAT THIS MEANS:
${diagnosis.whatItMeans}
`;
  }

  function readableValue(value) {
    if (!value) return "";

    return String(value)
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function readableList(value) {
    if (!Array.isArray(value)) return "";
    return value.map(readableValue).join(", ");
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