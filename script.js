// ─────────────────────────────────────────────────────────────
// CHASSIS WEBSITE
// FULL LOCAL DIAGNOSIS ENGINE
// BILINGUAL EN / AR
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

  const isArabic =
    document.documentElement.lang.toLowerCase().startsWith("ar") ||
    document.documentElement.dir.toLowerCase() === "rtl" ||
    window.location.pathname.startsWith("/ar");

  const t = isArabic ? getArabicDiagnosisContent() : getEnglishDiagnosisContent();

  const assistant = document.createElement("div");
  assistant.className = "chassis-diagnosis-widget";
  assistant.setAttribute("dir", isArabic ? "rtl" : "ltr");
  assistant.setAttribute("lang", isArabic ? "ar" : "en");

  assistant.innerHTML = `
    <button class="diagnosis-launcher" type="button">
      <span class="diagnosis-launcher-dot"></span>
      <span>${escapeHtml(t.ui.launcher)}</span>
    </button>

    <section class="diagnosis-chat" aria-live="polite">
      <div class="diagnosis-chat-header">
        <div>
          <p>${escapeHtml(t.ui.headerKicker)}</p>
          <h2>${escapeHtml(t.ui.headerTitle)}</h2>
        </div>

        <button class="diagnosis-close" type="button" aria-label="${escapeHtml(t.ui.closeLabel)}">×</button>
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
  const answerLabels = {};
  const askedQuestions = [];

  let currentQuestionId = "client_name";
  let diagnosisFinished = false;

  const questions = t.questions;
  const serviceLabels = t.serviceLabels;
  const serviceDescriptions = t.serviceDescriptions;

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

    addBotMessage(t.ui.intro);

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
          addBotMessage(t.ui.pickOne);
          return;
        }

        const values = Array.from(selected);
        const labels = q.options
          .filter((option) => values.includes(option.value))
          .map((option) => option.label);

        handleAnswer(values, labels.join(isArabic ? "، " : ", "), q.next);
      });

      footer.appendChild(wrapper);
      footer.appendChild(sendBtn);
      return;
    }

    const input =
      q.type === "textarea"
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
        addBotMessage(t.ui.requiredAnswer);
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
    answerLabels[currentQuestionId] = displayValue;

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
      operationalPartnership: 0,
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
        description: serviceDescriptions[key],
      }))
      .sort((a, b) => b.score - a.score);
  }

  function getSeverityLevel(scores) {
    const highest = Math.max(...Object.values(scores));
    const broken = Array.isArray(answers.broken_areas) ? answers.broken_areas.length : 0;

    if (highest >= 16 || broken >= 7 || answers.urgency === "critical") {
      return t.severity.high;
    }

    if (highest >= 11 || broken >= 4 || answers.urgency === "high") {
      return t.severity.moderate;
    }

    return t.severity.early;
  }

  function getBusinessContextLine() {
    const business = answers.business_description || t.ui.yourBusiness;
    const type = answerLabels.business_type || t.ui.business;

    return t.diagnosis.businessContext(business, type);
  }

  function getOperationalSignals() {
    const signals = [];
    const broken = Array.isArray(answers.broken_areas) ? answers.broken_areas : [];
    const systems = Array.isArray(answers.systems_maturity) ? answers.systems_maturity : [];
    const desiredOutcome = Array.isArray(answers.desired_outcome)
      ? answers.desired_outcome
      : [];

    if (
      answers.main_pressure === "owner_dependency" ||
      ["stops", "decisions_pile"].includes(answers.owner_dependency_level)
    ) {
      signals.push(t.signals.ownerDependency);
    }

    if (
      ["unclear", "scattered", "changes"].includes(answers.offer_clarity) ||
      answers.main_pressure === "unclear_offer"
    ) {
      signals.push(t.signals.offerClarity);
    }

    if (
      broken.includes("workflow_in_heads") ||
      broken.includes("repeated_instructions") ||
      answers.operations_maturity === "informal"
    ) {
      signals.push(t.signals.workflowMemory);
    }

    if (
      broken.includes("team_waits_owner") ||
      answers.owner_dependency_level === "decisions_pile"
    ) {
      signals.push(t.signals.decisionRouting);
    }

    if (
      broken.includes("digital_disconnected") ||
      answers.main_pressure === "infrastructure_gap"
    ) {
      signals.push(t.signals.infrastructureGap);
    }

    if (
      broken.includes("growth_creates_stress") ||
      answers.business_stage === "growing_unstructured"
    ) {
      signals.push(t.signals.growthPressure);
    }

    if (broken.includes("no_priority") || desiredOutcome.includes("not_sure")) {
      signals.push(t.signals.priorityUnclear);
    }

    if (systems.includes("none_structured")) {
      signals.push(t.signals.noStructuredSystems);
    }

    return [...new Set(signals)].slice(0, 5);
  }

  function getLayeredPattern(sortedServices) {
    const strongServices = sortedServices.filter((service) => service.score >= 8);

    if (strongServices.length >= 3) {
      return t.diagnosis.layeredPressure;
    }

    if (strongServices.length === 2) {
      return t.diagnosis.twoLayerPressure(
        strongServices[0].label,
        strongServices[1].label
      );
    }

    return "";
  }

  function getRecommendedPath(primary, secondary) {
    const secondLayer = secondary && secondary.score > 6 ? secondary.label : "";
    return t.diagnosis.recommendedPath(primary.label, secondLayer);
  }

  function generateDiagnosis() {
    const scores = scoreDiagnosis();
    const sortedServices = getSortedServices(scores);
    const primary = sortedServices[0];
    const secondary = sortedServices[1];
    const severity = getSeverityLevel(scores);
    const broken = Array.isArray(answers.broken_areas) ? answers.broken_areas : [];
    const signals = getOperationalSignals();
    const layeredPattern = getLayeredPattern(sortedServices);

    let whatISee = getBusinessContextLine();

    if (primary.key === "businessStructuring") {
      whatISee += " " + t.diagnosis.primaryBusinessStructuring;
    }

    if (primary.key === "operationsSystems") {
      whatISee += " " + t.diagnosis.primaryOperationsSystems;
    }

    if (primary.key === "executionInfrastructure") {
      whatISee += " " + t.diagnosis.primaryExecutionInfrastructure;
    }

    if (primary.key === "operationalPartnership") {
      whatISee += " " + t.diagnosis.primaryOperationalPartnership;
    }

    if (primary.key === "operationalDiagnosis") {
      whatISee += " " + t.diagnosis.primaryOperationalDiagnosis;
    }

    if (layeredPattern) {
      whatISee += " " + layeredPattern;
    }

    const whereToStart = t.diagnosis.whereToStart(
      primary.label,
      primary.description,
      secondary && secondary.score > 6 ? secondary.label : ""
    );

    const whatItMeans = t.diagnosis.whatItMeans(severity.text);
    const recommendedPath = getRecommendedPath(primary, secondary);

    return {
      whatISee,
      whereToStart,
      whatItMeans,
      recommendedPath,
      signals,
      serviceRecommendation: {
        primary,
        secondary,
        scores,
        severity,
        brokenCount: broken.length,
      },
    };
  }

  function renderFinalDiagnosis() {
    diagnosisFinished = true;
    progressBar.style.width = "100%";
    footer.innerHTML = "";

    const diagnosis = generateDiagnosis();
    const whatsappText = buildWhatsAppMessage(diagnosis);
    const whatsappUrl = `https://wa.me/96171085824?text=${encodeURIComponent(
      whatsappText
    )}`;

    const resultCard = document.createElement("div");
    resultCard.className = "diagnosis-result-card";

    resultCard.innerHTML = `
      <p class="diagnosis-question-section">${escapeHtml(t.ui.resultTitle)}</p>

      <h3>${escapeHtml(t.ui.primaryService)}</h3>
      <p><strong>${escapeHtml(diagnosis.serviceRecommendation.primary.label)}</strong></p>
      <p>${escapeHtml(diagnosis.serviceRecommendation.primary.description)}</p>

      ${
        diagnosis.serviceRecommendation.secondary &&
        diagnosis.serviceRecommendation.secondary.score > 6
          ? `
            <h3>${escapeHtml(t.ui.secondLayer)}</h3>
            <p><strong>${escapeHtml(diagnosis.serviceRecommendation.secondary.label)}</strong></p>
            <p>${escapeHtml(diagnosis.serviceRecommendation.secondary.description)}</p>
          `
          : ""
      }

      <h3>${escapeHtml(t.ui.diagnosisLevel)}</h3>
      <p><strong>${escapeHtml(diagnosis.serviceRecommendation.severity.label)}</strong></p>

      <h3>${escapeHtml(t.ui.whatISee)}</h3>
      <p>${escapeHtml(diagnosis.whatISee)}</p>

      ${
        diagnosis.signals.length
          ? `
            <h3>${escapeHtml(t.ui.keySignals)}</h3>
            <ul class="diagnosis-signal-list">
              ${diagnosis.signals.map((signal) => `<li>${escapeHtml(signal)}</li>`).join("")}
            </ul>
          `
          : ""
      }

      <h3>${escapeHtml(t.ui.whereToStart)}</h3>
      <p>${escapeHtml(diagnosis.whereToStart)}</p>

      <h3>${escapeHtml(t.ui.recommendedPath)}</h3>
      <p>${escapeHtml(diagnosis.recommendedPath)}</p>

      <h3>${escapeHtml(t.ui.whatThisMeans)}</h3>
      <p>${escapeHtml(diagnosis.whatItMeans)}</p>

      <div class="diagnosis-result-note">
        <p>${escapeHtml(t.ui.resultNote)}</p>
      </div>

      <a
        class="diagnosis-whatsapp-link"
        href="https://calendly.com/chassis-lb/chassis-discovery-call"
        target="_blank"
        rel="noopener"
      >
        ${escapeHtml(t.ui.bookCall)}
      </a>

      <a
        class="diagnosis-whatsapp-link"
        href="${whatsappUrl}"
        target="_blank"
        rel="noopener"
        style="margin-top:10px; background:transparent; border:1px solid currentColor; opacity:0.75;"
      >
        ${escapeHtml(t.ui.sendWhatsapp)}
      </a>

      <button class="diagnosis-restart" type="button">
        ${escapeHtml(t.ui.startAgain)}
      </button>
    `;

    chatArea.appendChild(resultCard);
    scrollChatToBottom();

    resultCard.querySelector(".diagnosis-restart").addEventListener("click", () => {
      Object.keys(answers).forEach((key) => delete answers[key]);
      Object.keys(answerLabels).forEach((key) => delete answerLabels[key]);
      askedQuestions.length = 0;
      currentQuestionId = "client_name";
      diagnosisFinished = false;
      startConversation();
    });
  }

  function buildWhatsAppMessage(diagnosis) {
    if (isArabic) {
      return `
مرحباً Chassis.

أنهيت تشخيص البزنس على الموقع.

الاسم:
${answers.client_name || ""}

واتساب:
${answers.contact_number || ""}

وصف البزنس:
${answers.business_description || ""}

نوع البزنس:
${answerLabels.business_type || ""}

مرحلة البزنس:
${answerLabels.business_stage || ""}

أكبر ضغط:
${answerLabels.main_pressure || ""}

الأمور التي تتكرر:
${answerLabels.broken_areas || ""}

اعتماد البزنس على المؤسس:
${answerLabels.owner_dependency_level || ""}

وضوح العرض:
${answerLabels.offer_clarity || ""}

نضج العمليات:
${answerLabels.operations_maturity || ""}

الأنظمة الموجودة:
${answerLabels.systems_maturity || ""}

النتيجة المطلوبة:
${answerLabels.desired_outcome || ""}

الاستعجال:
${answerLabels.urgency || ""}

الجاهزية:
${answerLabels.readiness || ""}

الخدمة المقترحة:
${diagnosis.serviceRecommendation.primary.label}

الطبقة الثانية المحتملة:
${
  diagnosis.serviceRecommendation.secondary &&
  diagnosis.serviceRecommendation.secondary.score > 6
    ? diagnosis.serviceRecommendation.secondary.label
    : "لا يوجد"
}

مستوى التشخيص:
${diagnosis.serviceRecommendation.severity.label}

ما يظهر في التشخيص:
${diagnosis.whatISee}

الإشارات التشغيلية الأساسية:
${diagnosis.signals.length ? diagnosis.signals.map((signal) => `- ${signal}`).join("\n") : "لا يوجد"}

من أين يجب البدء:
${diagnosis.whereToStart}

المسار المقترح:
${diagnosis.recommendedPath}

ماذا يعني ذلك:
${diagnosis.whatItMeans}
`;
    }

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
${answerLabels.business_type || ""}

BUSINESS STAGE:
${answerLabels.business_stage || ""}

MAIN PRESSURE:
${answerLabels.main_pressure || ""}

BROKEN AREAS:
${answerLabels.broken_areas || ""}

OWNER DEPENDENCY:
${answerLabels.owner_dependency_level || ""}

OFFER CLARITY:
${answerLabels.offer_clarity || ""}

OPERATIONS MATURITY:
${answerLabels.operations_maturity || ""}

CURRENT SYSTEMS:
${answerLabels.systems_maturity || ""}

DESIRED OUTCOME:
${answerLabels.desired_outcome || ""}

URGENCY:
${answerLabels.urgency || ""}

READINESS:
${answerLabels.readiness || ""}

PRIMARY RECOMMENDED SERVICE:
${diagnosis.serviceRecommendation.primary.label}

POSSIBLE SECOND LAYER:
${
  diagnosis.serviceRecommendation.secondary &&
  diagnosis.serviceRecommendation.secondary.score > 6
    ? diagnosis.serviceRecommendation.secondary.label
    : "None"
}

DIAGNOSIS LEVEL:
${diagnosis.serviceRecommendation.severity.label}

WHAT I SEE:
${diagnosis.whatISee}

KEY OPERATIONAL SIGNALS:
${diagnosis.signals.length ? diagnosis.signals.map((signal) => `- ${signal}`).join("\n") : "None"}

WHERE TO START:
${diagnosis.whereToStart}

RECOMMENDED PATH:
${diagnosis.recommendedPath}

WHAT THIS MEANS:
${diagnosis.whatItMeans}
`;
  }

  function makeSendButton(onClick) {
    const btn = document.createElement("button");
    btn.className = "diagnosis-next";
    btn.type = "button";
    btn.innerHTML = escapeHtml(t.ui.send);
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
}

// ─────────────────────────────────────────────────────────────
// ENGLISH CONTENT
// ─────────────────────────────────────────────────────────────

function getEnglishDiagnosisContent() {
  return {
    ui: {
      launcher: "Diagnose Your Business",
      headerKicker: "Chassis Diagnosis Assistant",
      headerTitle: "Find what needs structure",
      closeLabel: "Close diagnosis assistant",
      intro:
        "This is not a quote request. It is a structured diagnosis. The goal is to identify which operational layer needs attention first.",
      pickOne: "Pick at least one. A useful diagnosis needs a real signal.",
      requiredAnswer: "I need an answer here. The diagnosis depends on the context.",
      send: "Send",
      resultTitle: "Your Diagnosis",
      primaryService: "Primary recommended service",
      secondLayer: "Possible second layer",
      diagnosisLevel: "Diagnosis level",
      whatISee: "What I see",
      keySignals: "Key operational signals",
      whereToStart: "Where to start",
      recommendedPath: "Recommended path",
      whatThisMeans: "What this means",
      resultNote:
        "This result is based on your answers across offer clarity, owner dependency, operations, systems, infrastructure, urgency, and desired outcome.",
      bookCall: "Book a Discovery Call",
      sendWhatsapp: "Send Diagnosis to WhatsApp",
      startAgain: "Start Again",
      yourBusiness: "your business",
      business: "business",
    },

    serviceLabels: {
      operationalDiagnosis: "Operational Diagnosis",
      businessStructuring: "Business Structuring",
      operationsSystems: "Business Structuring",
      executionInfrastructure: "Execution Infrastructure",
      operationalPartnership: "Operational Partnership",
    },

    serviceDescriptions: {
      operationalDiagnosis:
        "Best when the business feels messy but the real priority is not clear yet.",
      businessStructuring:
        "Best when the offer, pricing, positioning, workflows, roles, or business direction need to become clearer before execution.",
      operationsSystems:
        "Best when the business already runs, but workflows, roles, decision rules, SOPs, and daily execution need structure.",
      executionInfrastructure:
        "Best when the business needs a website, CRM, intake flow, platform, tool, or digital system built around how it actually works.",
      operationalPartnership:
        "Best when the structure exists, but the business needs ongoing correction, follow-up, and operational alignment.",
    },

    severity: {
      high: {
        label: "High operational pressure",
        text:
          "The business is showing several structural pressure points at the same time. This usually means the issue is not cosmetic. It needs proper diagnosis and controlled implementation.",
      },
      moderate: {
        label: "Moderate operational pressure",
        text:
          "There is a clear operational pattern behind the symptoms. The business does not need random fixes. It needs the right layer handled first.",
      },
      early: {
        label: "Early structural pressure",
        text:
          "The business is not necessarily broken, but there are early signs that clearer structure would prevent future pressure.",
      },
    },

    signals: {
      ownerDependency:
        "The business depends heavily on the owner for movement, decisions, or continuity.",
      offerClarity:
        "The offer or pricing logic is not clear enough to support clean execution.",
      workflowMemory:
        "Workflows appear to live in people's heads instead of a repeatable operating system.",
      decisionRouting:
        "Small decisions are still routing back to the owner instead of being handled by rules or authority limits.",
      infrastructureGap:
        "The current website, tools, intake flow, or digital setup does not fully support how the business actually works.",
      growthPressure:
        "Growth is adding pressure instead of control, which usually means structure is lagging behind demand.",
      priorityUnclear:
        "The business has multiple symptoms, but the first operational priority is not yet clear.",
      noStructuredSystems:
        "The business does not yet have enough structured systems to reduce operational friction.",
    },

    diagnosis: {
      businessContext: (business, type) =>
        `Based on what you shared about ${business}, this looks closest to a ${type} with structural pressure that needs to be organized before more execution is added.`,
      primaryBusinessStructuring:
        "The strongest signal is unclear business structure: offer clarity, pricing logic, service framing, workflows, roles, or positioning may be creating friction before proper execution can happen.",
      primaryOperationsSystems:
        "The strongest signal is operational inconsistency: the business may be relying too much on memory, owner involvement, repeated instructions, or informal workflows.",
      primaryExecutionInfrastructure:
        "The strongest signal is an infrastructure gap: the business may need better tools, website structure, intake flow, CRM, platform logic, or digital systems to support how it actually works.",
      primaryOperationalPartnership:
        "The strongest signal is ongoing operational dependency: the business may need continued correction, follow-up, and alignment after the structure is built.",
      primaryOperationalDiagnosis:
        "The strongest signal is unclear priority: there are enough mixed symptoms that the first move should be a proper operational diagnosis before choosing what to build.",
      layeredPressure:
        "The pressure is distributed across several areas. That usually means this is not one isolated issue; it is a layered structural problem.",
      twoLayerPressure: (firstLayer, secondLayer) =>
        `The diagnosis is showing two strong layers: ${firstLayer} and ${secondLayer}. This means the problem should be handled in sequence, not randomly.`,
      recommendedPath: (primaryLabel, secondaryLabel) =>
        secondaryLabel
          ? `Start with ${primaryLabel}. Then move into ${secondaryLabel} once the first layer is clear enough to support execution.`
          : `Start with ${primaryLabel}. Do not add more execution until this layer is clear.`,
      whereToStart: (primaryLabel, primaryDescription, secondaryLabel) =>
        `Start with ${primaryLabel}. ${primaryDescription} ${
          secondaryLabel
            ? `After that, ${secondaryLabel} may become the second layer because it also scored strongly.`
            : ""
        }`,
      whatItMeans: (severityText) =>
        `${severityText} The immediate goal is not to do more work. The goal is to identify the correct operational layer, fix that first, and avoid spending time or money on the wrong solution.`,
    },

    questions: getSharedQuestions("en"),
  };
}

// ─────────────────────────────────────────────────────────────
// ARABIC CONTENT
// ─────────────────────────────────────────────────────────────

function getArabicDiagnosisContent() {
  return {
    ui: {
      launcher: "شخّص بزنسك",
      headerKicker: "مساعد التشخيص من Chassis",
      headerTitle: "اكتشف ما الذي يحتاج إلى هيكلة",
      closeLabel: "إغلاق مساعد التشخيص",
      intro:
        "هذا ليس طلب عرض سعر. هذا تشخيص منظم هدفه تحديد أي طبقة تشغيلية تحتاج إلى معالجة أولاً.",
      pickOne: "اختر جواباً واحداً على الأقل. التشخيص الجيد يحتاج إلى إشارة واضحة.",
      requiredAnswer: "أحتاج إلى جواب هنا. التشخيص يعتمد على السياق.",
      send: "إرسال",
      resultTitle: "تشخيصك",
      primaryService: "الخدمة المقترحة أولاً",
      secondLayer: "الطبقة الثانية المحتملة",
      diagnosisLevel: "مستوى التشخيص",
      whatISee: "ما الذي أراه",
      keySignals: "الإشارات التشغيلية الأساسية",
      whereToStart: "من أين تبدأ",
      recommendedPath: "المسار المقترح",
      whatThisMeans: "ماذا يعني ذلك",
      resultNote:
        "هذه النتيجة مبنية على إجاباتك حول وضوح العرض، اعتماد البزنس على المؤسس، العمليات، الأنظمة، البنية التنفيذية، الاستعجال، والنتيجة المطلوبة.",
      bookCall: "احجز مكالمة اكتشاف",
      sendWhatsapp: "أرسل التشخيص على واتساب",
      startAgain: "ابدأ من جديد",
      yourBusiness: "بزنسك",
      business: "بزنس",
    },

    serviceLabels: {
      operationalDiagnosis: "تشخيص تشغيلي",
      businessStructuring: "هيكلة البزنس",
      operationsSystems: "هيكلة البزنس",
      executionInfrastructure: "بنية تنفيذية",
      operationalPartnership: "شراكة تشغيلية",
    },

    serviceDescriptions: {
      operationalDiagnosis:
        "الأنسب عندما يكون البزنس غير واضح أو مضغوطاً، لكن الأولوية الحقيقية ليست محددة بعد.",
      businessStructuring:
        "الأنسب عندما يحتاج العرض، التسعير، التموضع، سير العمل، الأدوار، أو اتجاه البزنس إلى وضوح قبل التنفيذ.",
      operationsSystems:
        "الأنسب عندما يكون البزنس يعمل فعلاً، لكن سير العمل، الأدوار، قواعد القرار، الإجراءات، والتنفيذ اليومي يحتاجون إلى هيكلة.",
      executionInfrastructure:
        "الأنسب عندما يحتاج البزنس إلى موقع، CRM، نظام استقبال طلبات، منصة، أداة، أو إعداد رقمي مبني حول طريقة العمل الفعلية.",
      operationalPartnership:
        "الأنسب عندما تكون الهيكلة موجودة، لكن البزنس يحتاج إلى متابعة، تصحيح، وتوجيه تشغيلي مستمر.",
    },

    severity: {
      high: {
        label: "ضغط تشغيلي مرتفع",
        text:
          "البزنس يظهر عدة نقاط ضغط هيكلية في الوقت نفسه. غالباً المشكلة ليست شكلية، بل تحتاج إلى تشخيص واضح وتنفيذ مضبوط.",
      },
      moderate: {
        label: "ضغط تشغيلي متوسط",
        text:
          "هناك نمط تشغيلي واضح خلف الأعراض. البزنس لا يحتاج إلى حلول عشوائية، بل يحتاج إلى معالجة الطبقة الصحيحة أولاً.",
      },
      early: {
        label: "ضغط هيكلي مبكر",
        text:
          "البزنس ليس بالضرورة مكسوراً، لكن هناك إشارات مبكرة أن الوضوح والهيكلة سيمنعان ضغطاً أكبر لاحقاً.",
      },
    },

    signals: {
      ownerDependency:
        "البزنس يعتمد كثيراً على وجود المؤسس حتى يتحرك أو تُتخذ القرارات أو يستمر العمل.",
      offerClarity:
        "العرض أو منطق التسعير ليس واضحاً بما يكفي لدعم تنفيذ نظيف.",
      workflowMemory:
        "سير العمل يبدو موجوداً في رؤوس الناس أكثر من كونه نظاماً قابلاً للتكرار.",
      decisionRouting:
        "القرارات الصغيرة لا تزال ترجع إلى المؤسس بدل أن تُحسم بقواعد واضحة أو صلاحيات محددة.",
      infrastructureGap:
        "الموقع أو الأدوات أو نظام الاستقبال أو الإعداد الرقمي لا يدعم طريقة عمل البزنس الحقيقية بشكل كافٍ.",
      growthPressure:
        "النمو يضيف ضغطاً بدل أن يضيف سيطرة، وهذا يعني عادةً أن الهيكلة لا تواكب الطلب.",
      priorityUnclear:
        "هناك أعراض متعددة، لكن الأولوية التشغيلية الأولى ليست واضحة بعد.",
      noStructuredSystems:
        "البزنس لا يملك بعد أنظمة مهيكلة كافية لتخفيف الاحتكاك التشغيلي.",
    },

    diagnosis: {
      businessContext: (business, type) =>
        `بناءً على ما شاركته عن ${business}، يبدو أن هذا أقرب إلى ${type} لديه ضغط هيكلي يحتاج إلى تنظيم قبل إضافة المزيد من التنفيذ.`,
      primaryBusinessStructuring:
        "أقوى إشارة هي أن هيكلة البزنس غير واضحة: العرض، التسعير، طريقة تقديم الخدمة، سير العمل، الأدوار، أو التموضع قد يخلقون احتكاكاً قبل أن يبدأ التنفيذ الصحيح.",
      primaryOperationsSystems:
        "أقوى إشارة هي عدم ثبات العمليات: البزنس قد يعتمد كثيراً على الذاكرة، وجود المؤسس، تكرار التعليمات، أو سير عمل غير موثق.",
      primaryExecutionInfrastructure:
        "أقوى إشارة هي فجوة في البنية التنفيذية: البزنس قد يحتاج إلى أدوات أفضل، موقع أوضح، نظام استقبال، CRM، منصة، أو أنظمة رقمية تدعم طريقة العمل الحقيقية.",
      primaryOperationalPartnership:
        "أقوى إشارة هي اعتماد تشغيلي مستمر: البزنس قد يحتاج إلى متابعة وتصحيح وتوجيه بعد بناء الهيكلة.",
      primaryOperationalDiagnosis:
        "أقوى إشارة هي أن الأولوية غير واضحة: هناك أعراض مختلطة كافية تجعل الخطوة الأولى تشخيصاً تشغيلياً قبل اختيار ما يجب بناؤه.",
      layeredPressure:
        "الضغط موزّع على أكثر من منطقة. هذا يعني غالباً أن المشكلة ليست نقطة واحدة منفصلة، بل خلل هيكلي متراكم على أكثر من طبقة.",
      twoLayerPressure: (firstLayer, secondLayer) =>
        `التشخيص يُظهر طبقتين قويتين: ${firstLayer} و${secondLayer}. هذا يعني أن المشكلة يجب أن تُعالج بالتسلسل، وليس بحلول عشوائية.`,
      recommendedPath: (primaryLabel, secondaryLabel) =>
        secondaryLabel
          ? `ابدأ بـ ${primaryLabel}. ثم انتقل إلى ${secondaryLabel} عندما تصبح الطبقة الأولى واضحة بما يكفي لدعم التنفيذ.`
          : `ابدأ بـ ${primaryLabel}. لا تضف المزيد من التنفيذ قبل أن تصبح هذه الطبقة واضحة.`,
      whereToStart: (primaryLabel, primaryDescription, secondaryLabel) =>
        `ابدأ بـ ${primaryLabel}. ${primaryDescription} ${
          secondaryLabel
            ? `بعد ذلك، قد تصبح ${secondaryLabel} الطبقة الثانية لأن نتيجتها كانت قوية أيضاً.`
            : ""
        }`,
      whatItMeans: (severityText) =>
        `${severityText} الهدف الفوري ليس أن تفعل المزيد. الهدف هو تحديد الطبقة التشغيلية الصحيحة، إصلاحها أولاً، وتجنب صرف الوقت أو المال على الحل الخاطئ.`,
    },

    questions: getSharedQuestions("ar"),
  };
}

// ─────────────────────────────────────────────────────────────
// SHARED QUESTIONS
// ─────────────────────────────────────────────────────────────

function getSharedQuestions(lang) {
  const ar = lang === "ar";

  return {
    client_name: {
      section: ar ? "البداية" : "Start",
      question: ar ? "ما اسمك؟" : "What's your name?",
      type: "text",
      placeholder: ar ? "الاسم الأول يكفي" : "First name is enough",
      required: true,
      next: "business_description",
    },

    business_description: {
      section: ar ? "سياق البزنس" : "Business Context",
      question: ar
        ? "صف بزنسك بجملة إلى ثلاث جمل. ماذا تبيع؟ ولمن؟"
        : "Describe your business in 1–3 sentences. What do you sell, and to whom?",
      type: "textarea",
      placeholder: ar
        ? "مثال: نملك مطعماً / عيادة / خدمة استشارية / بزنس أونلاين..."
        : "Example: We run a restaurant group / clinic / consulting service / online business...",
      required: true,
      next: "business_type",
    },

    business_type: {
      section: ar ? "نوع البزنس" : "Business Type",
      question: ar
        ? "أي فئة أقرب إلى بزنسك؟"
        : "Which category is closest to your business?",
      type: "choice",
      required: true,
      options: [
        {
          label: ar ? "مطاعم / ضيافة / بزنس غذائي" : "Hospitality / restaurant / food business",
          value: "hospitality",
          next: "business_stage",
        },
        {
          label: ar ? "عيادة / خدمة طبية / صحية" : "Clinic / medical / health service",
          value: "clinic",
          next: "business_stage",
        },
        {
          label: ar ? "خبير / استشاري / براند شخصي" : "Expert / consultant / personal brand",
          value: "expert",
          next: "business_stage",
        },
        {
          label: ar ? "شركة خدمات / وكالة / مكتب مهني" : "Service business / agency / professional office",
          value: "service_business",
          next: "business_stage",
        },
        {
          label: ar ? "بيع منتجات / ريتيل" : "Retail / product business",
          value: "retail_product",
          next: "business_stage",
        },
        {
          label: ar ? "ستارت أب / تطبيق / منصة" : "Startup / app / platform",
          value: "startup",
          next: "business_stage",
        },
        {
          label: ar ? "غير ذلك" : "Other",
          value: "other",
          next: "business_stage",
        },
      ],
    },

    business_stage: {
      section: ar ? "المرحلة" : "Stage",
      question: ar ? "أين البزنس الآن؟" : "Where is the business right now?",
      type: "choice",
      required: true,
      options: [
        {
          label: ar ? "ما زلنا في البداية ونشكّل العرض." : "Still early. We are still shaping the offer.",
          value: "early",
          next: "main_pressure",
        },
        {
          label: ar ? "البزنس يعمل، لكنه فوضوي." : "Already operating, but still messy.",
          value: "operating_messy",
          next: "main_pressure",
        },
        {
          label: ar ? "البزنس قائم، لكنه يعتمد كثيراً على المؤسس." : "Established, but too dependent on the owner.",
          value: "established_owner_dependent",
          next: "main_pressure",
        },
        {
          label: ar ? "ننمو، لكن الهيكلة لا تواكب النمو." : "Growing, but structure is not keeping up.",
          value: "growing_unstructured",
          next: "main_pressure",
        },
        {
          label: ar ? "مستقر، لكن نحتاج أنظمة أفضل قبل التوسع." : "Stable, but we need better systems before scaling.",
          value: "stable_needs_systems",
          next: "main_pressure",
        },
      ],
    },

    main_pressure: {
      section: ar ? "أكبر ضغط" : "Main Pressure",
      question: ar
        ? "ما الذي يشكّل أكبر ضغط الآن؟"
        : "What feels like the biggest pressure right now?",
      type: "choice",
      required: true,
      options: [
        {
          label: ar ? "الناس لا يفهمون بوضوح ماذا نبيع." : "People don't clearly understand what we sell.",
          value: "unclear_offer",
          next: "broken_areas",
        },
        {
          label: ar ? "كل شيء يعتمد على صاحب البزنس." : "Everything depends on the owner.",
          value: "owner_dependency",
          next: "broken_areas",
        },
        {
          label: ar ? "البزنس يعمل، لكن العمليات اليومية فوضوية." : "The business works, but daily operations are chaotic.",
          value: "operational_chaos",
          next: "broken_areas",
        },
        {
          label: ar
            ? "التنفيذ غير ثابت. نبدأ أشياء ولا تكتمل بشكل صحيح."
            : "Execution is inconsistent. Things start but don't get completed properly.",
          value: "execution_inconsistency",
          next: "broken_areas",
        },
        {
          label: ar
            ? "الموقع أو الأدوات أو الحضور الرقمي لا يعكس طريقة عمل البزنس."
            : "Our website/tools/social presence don't reflect how the business actually works.",
          value: "infrastructure_gap",
          next: "broken_areas",
        },
        {
          label: ar
            ? "نحن ننمو، لكن كل خطوة نمو تخلق ضغطاً إضافياً."
            : "We are growing, but every growth step creates more pressure.",
          value: "growth_pressure",
          next: "broken_areas",
        },
      ],
    },

    broken_areas: {
      section: ar ? "أين يتكرر الخلل" : "Where It Breaks",
      question: ar
        ? "اختر كل ما يتكرر داخل البزنس."
        : "Select everything that keeps repeating inside the business.",
      type: "multi",
      required: true,
      options: [
        {
          label: ar ? "العملاء يسألون أسئلة أساسية كثيرة قبل فهم العرض." : "Clients ask too many basic questions before understanding the offer.",
          value: "clients_confused",
        },
        {
          label: ar ? "التسعير يتغير كثيراً من عميل إلى آخر." : "Pricing changes too much from client to client.",
          value: "pricing_improvised",
        },
        {
          label: ar ? "الفريق ينتظر المؤسس لاتخاذ قرارات صغيرة." : "The team waits for the owner to decide small things.",
          value: "team_waits_owner",
        },
        {
          label: ar ? "نكرر نفس التعليمات باستمرار." : "The same instructions are repeated constantly.",
          value: "repeated_instructions",
        },
        {
          label: ar ? "سير العمل موجود في رؤوس الناس وليس في نظام." : "Workflows exist in people's heads, not in a system.",
          value: "workflow_in_heads",
        },
        {
          label: ar ? "جودة التسليم تتغير حسب الشخص الذي ينفذ العمل." : "Delivery quality changes depending on who handles the work.",
          value: "delivery_inconsistent",
        },
        {
          label: ar ? "لا توجد SOPs أو قوائم تحقق أو وثائق عمليات واضحة." : "There are no clear SOPs, checklists, or process documents.",
          value: "no_sops",
        },
        {
          label: ar ? "الموقع أو الحضور الرقمي منفصل عن حقيقة البزنس." : "The website or digital presence feels disconnected from the real business.",
          value: "digital_disconnected",
        },
        {
          label: ar ? "تصلنا طلبات، لكن التحويل ضعيف." : "Leads come in, but conversion is weak.",
          value: "weak_conversion",
        },
        {
          label: ar ? "البزنس مشغول، لكن لا أحد يرى الصورة الكاملة." : "The business is busy, but nobody sees the full picture.",
          value: "no_visibility",
        },
        {
          label: ar ? "أي عمل جديد يخلق ضغطاً بدل أن يخلق سيطرة." : "New work creates more stress instead of more control.",
          value: "growth_creates_stress",
        },
        {
          label: ar ? "لا أعرف ماذا يجب أن أصلح أولاً." : "I don't know what to fix first.",
          value: "no_priority",
        },
      ],
      next: "owner_dependency_level",
    },

    owner_dependency_level: {
      section: ar ? "اعتماد البزنس على المؤسس" : "Owner Dependency",
      question: ar
        ? "إذا غاب المؤسس أسبوعين، ماذا يحدث؟"
        : "If the owner disappears for two weeks, what happens?",
      type: "choice",
      required: true,
      options: [
        {
          label: ar ? "البزنس يتوقف تقريباً." : "The business mostly stops.",
          value: "stops",
          next: "offer_clarity",
        },
        {
          label: ar ? "الفريق يكمل، لكن القرارات تتراكم." : "The team continues, but decisions pile up.",
          value: "decisions_pile",
          next: "offer_clarity",
        },
        {
          label: ar ? "العمليات تكمل، لكن الجودة تنخفض." : "Operations continue, but quality drops.",
          value: "quality_drops",
          next: "offer_clarity",
        },
        {
          label: ar ? "يمكن للبزنس أن يعمل، لكن ليس براحة." : "The business can run, but not comfortably.",
          value: "runs_uncomfortably",
          next: "offer_clarity",
        },
        {
          label: ar ? "يمكنه العمل دون مشاكل كبيرة." : "It can run without major problems.",
          value: "runs_well",
          next: "offer_clarity",
        },
      ],
    },

    offer_clarity: {
      section: ar ? "وضوح العرض" : "Offer Clarity",
      question: ar
        ? "هل يمكنك شرح ما يبيعه بزنسك بجملة واحدة واضحة؟"
        : "Can you explain what your business sells in one clear sentence?",
      type: "choice",
      required: true,
      options: [
        {
          label: ar ? "نعم، بسهولة." : "Yes, easily.",
          value: "clear",
          next: "operations_maturity",
        },
        {
          label: ar ? "نوعاً ما، لكنه يتغير حسب الشخص." : "Kind of, but it changes depending on the person.",
          value: "changes",
          next: "operations_maturity",
        },
        {
          label: ar ? "ليس تماماً. يحتاج إلى شرح." : "Not really. It takes explanation.",
          value: "unclear",
          next: "operations_maturity",
        },
        {
          label: ar ? "لا. نقوم بأشياء كثيرة ويصعب تبسيطها." : "No. We do many things and it is hard to simplify.",
          value: "scattered",
          next: "operations_maturity",
        },
      ],
    },

    operations_maturity: {
      section: ar ? "العمليات" : "Operations",
      question: ar
        ? "ما مدى هيكلة العمليات الداخلية حالياً؟"
        : "How structured are your internal operations right now?",
      type: "choice",
      required: true,
      options: [
        {
          label: ar ? "غالباً غير رسمية. الناس يعرفون ماذا يفعلون فقط." : "Mostly informal. People just know what to do.",
          value: "informal",
          next: "systems_maturity",
        },
        {
          label: ar ? "يوجد بعض الهيكلة، لكنها غير ثابتة." : "Some structure exists, but it is not consistent.",
          value: "some_structure",
          next: "systems_maturity",
        },
        {
          label: ar ? "لدينا عمليات، لكنها لا تُتبع بشكل صحيح." : "We have processes, but they are not followed properly.",
          value: "not_followed",
          next: "systems_maturity",
        },
        {
          label: ar ? "لدينا سير عمل واضح، لكن نحتاج أدوات أفضل." : "We have clear workflows, but we need better tools.",
          value: "clear_workflows_need_tools",
          next: "systems_maturity",
        },
        {
          label: ar ? "العمليات مهيكلة ومستقرة نسبياً." : "Operations are structured and mostly stable.",
          value: "structured",
          next: "systems_maturity",
        },
      ],
    },

    systems_maturity: {
      section: ar ? "الأنظمة والبنية" : "Systems & Infrastructure",
      question: ar
        ? "ما الأنظمة أو الأصول الموجودة حالياً؟"
        : "What systems or assets already exist?",
      type: "multi",
      required: true,
      options: [
        { label: ar ? "موقع إلكتروني" : "Website", value: "website" },
        { label: ar ? "CRM أو قاعدة بيانات عملاء" : "CRM or client database", value: "crm" },
        { label: ar ? "SOPs / قوائم تحقق / وثائق عمليات" : "SOPs / checklists / process documents", value: "sops" },
        { label: ar ? "أداة إدارة مشاريع" : "Project management tool", value: "project_management" },
        { label: ar ? "نموذج استقبال أو حجز" : "Intake form or booking flow", value: "intake" },
        { label: ar ? "لوحات متابعة أو تقارير" : "Dashboards or reports", value: "dashboards" },
        { label: ar ? "حضور على السوشال ميديا" : "Social media presence", value: "social" },
        { label: ar ? "لا شيء من هذه الأمور مهيكل بشكل صحيح" : "None of these are properly structured", value: "none_structured" },
      ],
      next: "desired_outcome",
    },

    desired_outcome: {
      section: ar ? "النتيجة المطلوبة" : "Outcome",
      question: ar
        ? "ماذا تريد أن تحصل عليه بعد العمل مع Chassis؟"
        : "What do you want to have at the end of working with Chassis?",
      type: "multi",
      required: true,
      options: [
        {
          label: ar ? "أريد أن أعرف بالضبط ما الخلل وماذا أصلح أولاً." : "I want to know exactly what is broken and what to fix first.",
          value: "diagnosis",
        },
        {
          label: ar ? "أريد عرضاً أوضح، وتسعيراً أوضح، واتجاهاً أوضح للبزنس." : "I want a clearer offer, pricing, and business direction.",
          value: "business_structuring",
        },
        {
          label: ar ? "أريد سير عمل، SOPs، أدوار، وأنظمة داخلية." : "I want workflows, SOPs, roles, and internal systems.",
          value: "operations_systems",
        },
        {
          label: ar ? "أريد موقعاً، منصة، أداة، CRM، أو إعداداً رقمياً يدعم البزنس." : "I want a website, platform, tool, CRM, or digital setup that supports the business.",
          value: "execution_infrastructure",
        },
        {
          label: ar ? "أريد متابعة وتصحيحاً تشغيلياً مستمراً." : "I want ongoing operational follow-up and correction.",
          value: "operational_partnership",
        },
        {
          label: ar ? "لست متأكداً. أحتاج أن تخبروني من أين أبدأ." : "I am not sure. I need you to tell me what comes first.",
          value: "not_sure",
        },
      ],
      next: "urgency",
    },

    urgency: {
      section: ar ? "الاستعجال" : "Urgency",
      question: ar ? "ما مدى استعجال الموضوع؟" : "How urgent is this?",
      type: "choice",
      required: true,
      options: [
        {
          label: ar ? "ليس مستعجلاً. أريد فهم المشكلة أولاً." : "Not urgent. I want to understand the problem first.",
          value: "low",
          next: "readiness",
        },
        {
          label: ar ? "قريباً. بدأ الموضوع يعيق النمو." : "Soon. This is starting to block growth.",
          value: "medium",
          next: "readiness",
        },
        {
          label: ar ? "مستعجل. البزنس يشعر بالضغط فعلاً." : "Urgent. The business is already feeling pressure.",
          value: "high",
          next: "readiness",
        },
        {
          label: ar ? "مستعجل جداً. نحتاج إلى تحرك سريع." : "Very urgent. We need action fast.",
          value: "critical",
          next: "readiness",
        },
      ],
    },

    readiness: {
      section: ar ? "الجاهزية" : "Readiness",
      question: ar
        ? "ماذا ستفعل إذا كان التشخيص دقيقاً؟"
        : "What would you do if the diagnosis is accurate?",
      type: "choice",
      required: true,
      options: [
        {
          label: ar ? "أحجز مكالمة اكتشاف." : "Book a discovery call.",
          value: "ready",
          next: "contact_number",
        },
        {
          label: ar ? "أراجع النتيجة أولاً ثم أقرر." : "Review the result first, then decide.",
          value: "reviewing",
          next: "contact_number",
        },
        {
          label: ar ? "أرسلها داخلياً للنقاش." : "Send it internally to discuss.",
          value: "internal_review",
          next: "contact_number",
        },
        {
          label: ar ? "أستكشف فقط حالياً." : "Just exploring for now.",
          value: "exploring",
          next: "contact_number",
        },
      ],
    },

    contact_number: {
      section: ar ? "الخطوة الأخيرة" : "Final Step",
      question: ar
        ? "ما رقم واتسابك حتى يتم إرسال التشخيص مع السياق؟"
        : "What is your WhatsApp number so the diagnosis can be sent with your context?",
      type: "text",
      placeholder: "+961...",
      required: true,
      next: "finish",
    },
  };
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}