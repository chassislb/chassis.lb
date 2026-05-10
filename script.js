document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimations();
  initChassisDiagnosisAssistant();
});

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
    .about-model .section-heading,
    .model-card,
    .about-model-outcomes,
    .about-readiness .section-heading,
    .readiness-column,
    .about-closing-copy,

    .services-hero-content,
    .services-scope-grid p,
    .services-architecture .section-heading,
    .services-architecture-intro,
    .service-detail-row,
    .services-closing-copy,

    .case-studies-hero-content,
    .case-studies-band-grid p,
    .case-study-featured-copy,
    .case-study-featured-image,
    .case-study-row,
    .case-studies-closing-copy,

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

    .insights-hero-content,
    .insights-band-grid p,
    .insights-intro .section-heading,
    .insights-intro-copy,
    .insight-featured-copy,
    .insight-featured-panel,
    .insight-card,
    .insights-closing-copy,
    .insights-closing .btn-primary,

    .contact-hero-content,
    .contact-band-grid p,
    .contact-info-block,
    .contact-form-shell,

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
}

function initChassisDiagnosisAssistant() {
  document.querySelectorAll(".whatsapp-float").forEach((item) => item.remove());

  const assistant = document.createElement("div");
  assistant.className = "chassis-diagnosis-widget";

  assistant.innerHTML = `
    <button class="diagnosis-launcher" type="button" aria-label="Diagnose your business">
      <span class="diagnosis-launcher-dot"></span>
      <span>Diagnose Your Business</span>
    </button>

    <section class="diagnosis-chat" aria-live="polite">
      <div class="diagnosis-chat-header">
        <div>
          <p>Chassis Diagnosis Assistant</p>
          <h2>Understand what needs structure</h2>
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

  const launcher   = assistant.querySelector(".diagnosis-launcher");
  const chat       = assistant.querySelector(".diagnosis-chat");
  const closeBtn   = assistant.querySelector(".diagnosis-close");
  const chatArea   = assistant.querySelector(".diagnosis-question-area");
  const footer     = assistant.querySelector(".diagnosis-chat-footer");
  const progressBar = assistant.querySelector(".diagnosis-progress-bar");

  const answers = {};
  const askedQuestions = [];
  let currentQuestionId = "client_name";
  let diagnosisFinished = false;

  // ─── QUESTIONS ─────────────────────────────────────────────────────────────

  const questions = {

    client_name: {
      section: "Let's start",
      question: "What's your name?",
      type: "text",
      placeholder: "Your first name is fine",
      required: true,
      next: "business_description",
      response: null
    },

    business_description: {
      section: "Your Business",
      question: "What does your business do? One or two sentences, in your own words. Don't overthink it.",
      type: "textarea",
      placeholder: "e.g. I run a dental clinic in Beirut. I offer coaching for professionals. I have a restaurant in Tripoli.",
      required: true,
      next: "biggest_feeling",
      response: "Got it. Now the real question."
    },

    biggest_feeling: {
      section: "The Real Problem",
      question: "When you think about the business right now, which of these feels most true?",
      type: "choice",
      required: true,
      options: [
        { label: "Everything goes through me. I can't step away.",          value: "owner_dependent",   next: "what_breaks" },
        { label: "I can't explain what I sell in one clear sentence.",       value: "unclear_offer",     next: "what_breaks" },
        { label: "The business works, but it feels chaotic and reactive.",   value: "operational_chaos", next: "what_breaks" },
        { label: "I'm not growing and I don't know exactly why.",            value: "plateaued",         next: "what_breaks" },
        { label: "We look weaker online than we actually are.",              value: "weak_presence",     next: "what_breaks" }
      ],
      responseMap: {
        owner_dependent:   "That's one of the most common and most exhausting problems. Let's go deeper.",
        unclear_offer:     "If you can't explain it clearly, neither can your clients. That affects everything downstream.",
        operational_chaos: "Chaos isn't a personality trait. It's a missing system.",
        plateaued:         "Hitting a ceiling usually means the current structure can't support more weight.",
        weak_presence:     "Looking smaller than you are costs you real money. Let's figure out where that starts."
      }
    },

    what_breaks: {
      section: "Where It Breaks",
      question: "Where does the business actually slow down or fall apart? Pick everything that applies.",
      type: "multi",
      required: true,
      options: [
        "Clients don't understand what I offer or what it costs",
        "Decisions wait for me, even small ones",
        "Delivery is inconsistent, things fall through",
        "I repeat myself constantly to clients or the team",
        "Sales happen, but not enough of the right ones",
        "The website or social presence doesn't reflect reality",
        "I don't have time to think, only react",
        "I don't know what to fix first"
      ],
      next: "client_quality",
      response: "Useful. That tells me where the pressure is actually coming from."
    },

    client_quality: {
      section: "Your Clients",
      question: "What's happening with the clients or customers you're getting right now?",
      type: "choice",
      required: true,
      options: [
        { label: "Good clients, not enough of them",             value: "good_not_enough",  next: "stage" },
        { label: "Enough clients, but the wrong type",           value: "wrong_type",       next: "stage" },
        { label: "People inquire but don't convert",             value: "no_conversion",    next: "stage" },
        { label: "Very few inquiries at all",                    value: "low_volume",       next: "stage" },
        { label: "Clients are fine. The problem is internal.",   value: "internal_problem", next: "stage" }
      ],
      responseMap: {
        good_not_enough:  "That usually points to a visibility or positioning problem, not a product problem.",
        wrong_type:       "Wrong clients are usually a positioning signal. The offer or the message is attracting the wrong room.",
        no_conversion:    "When people ask and don't buy, the gap is usually in how the offer is presented or priced.",
        low_volume:       "Low volume usually means the business isn't structured to be found or trusted yet.",
        internal_problem: "Internal problems compound fast. The sooner the structure is right, the less it costs."
      }
    },

    stage: {
      section: "Where You Are",
      question: "Which of these best describes where the business is right now?",
      type: "choice",
      required: true,
      options: [
        { label: "Still early. Less than a year in, finding my footing.",      value: "early",       next: "tried_before" },
        { label: "Running for 1 to 3 years. Has clients, but still messy.",    value: "mid",         next: "tried_before" },
        { label: "Established. More than 3 years. Stuck or slowing down.",     value: "established", next: "tried_before" }
      ],
      responseMap: {
        early:       "Early stage businesses that get structured properly save years of fixing things later.",
        mid:         "The 1 to 3 year range is where most businesses start feeling the cost of missing structure.",
        established: "Established businesses that hit a wall usually need to restructure, not just push harder."
      }
    },

    tried_before: {
      section: "What You've Tried",
      question: "Have you tried to fix any of this before?",
      type: "choice",
      required: true,
      options: [
        { label: "Yes. Hired a freelancer or agency. Didn't really solve it.", value: "tried_agency", next: "readiness" },
        { label: "Yes. Did it myself. Still feels incomplete.",                 value: "tried_self",   next: "readiness" },
        { label: "No. This is the first time I'm properly looking at it.",      value: "first_time",   next: "readiness" }
      ],
      responseMap: {
        tried_agency: "Most agencies fix the surface. They design, post, advertise. The structure underneath stays broken.",
        tried_self:   "Self-built systems work until they don't. Usually they break when the business needs to grow.",
        first_time:   "Good. Starting with a clear diagnosis saves a lot of wasted effort."
      }
    },

    readiness: {
      section: "Your Readiness",
      question: "If the diagnosis pointed to a clear starting point, what would you do with it?",
      type: "choice",
      required: true,
      options: [
        { label: "Book a call. I'm ready to move.",          value: "ready",     next: "contact_number" },
        { label: "Review it first, then decide.",            value: "reviewing", next: "contact_number" },
        { label: "I'm just exploring for now.",              value: "exploring", next: "contact_number" }
      ],
      responseMap: {
        ready:     "Good. That's exactly who this is built for.",
        reviewing: "Fair. A clear summary will give you something concrete to look at.",
        exploring: "That's fine. The diagnosis still gives you a useful picture of where things stand."
      }
    },

    contact_number: {
      section: "One Last Thing",
      question: "What's your WhatsApp number? Sophia reviews every diagnosis personally before reaching out.",
      type: "text",
      placeholder: "+961...",
      required: true,
      next: "finish",
      response: "Done. Let me put your diagnosis together now."
    }

  };

  // ─── ENGINE ────────────────────────────────────────────────────────────────

  launcher.addEventListener("click", () => {
    chat.classList.add("is-open");
    launcher.classList.add("is-hidden");
    if (!askedQuestions.length && !diagnosisFinished) startConversation();
  });

  closeBtn.addEventListener("click", () => {
    chat.classList.remove("is-open");
    launcher.classList.remove("is-hidden");
  });

  function startConversation() {
    chatArea.innerHTML = "";
    footer.innerHTML = "";
    addBotMessage("This takes about two minutes. No forms. No pricing. Just a few direct questions so Sophia can understand what your business actually needs before you speak.");
    setTimeout(() => askQuestion(currentQuestionId), 450);
  }

  function askQuestion(questionId) {
    const q = questions[questionId];
    currentQuestionId = questionId;
    if (!askedQuestions.includes(questionId)) askedQuestions.push(questionId);
    updateProgress();
    addBotMessage(q.question, q.section);
    renderAnswerInput(q);
  }

  function renderAnswerInput(q) {
    footer.innerHTML = "";

    if (q.type === "choice") {
      const choiceBox = document.createElement("div");
      choiceBox.className = "diagnosis-choice-list";
      q.options.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "diagnosis-choice-option";
        button.innerHTML = `<span>${escapeHtml(option.label)}</span>`;
        button.addEventListener("click", () => handleAnswer(option.value, option.label, option.next));
        choiceBox.appendChild(button);
      });
      footer.appendChild(choiceBox);
      return;
    }

    if (q.type === "multi") {
      const wrapper = document.createElement("div");
      wrapper.className = "diagnosis-multi-panel";
      const selected = new Set();
      const choiceBox = document.createElement("div");
      choiceBox.className = "diagnosis-choice-list";
      q.options.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "diagnosis-choice-option";
        button.innerHTML = `<span>${escapeHtml(option)}</span>`;
        button.addEventListener("click", () => {
          if (selected.has(option)) { selected.delete(option); button.classList.remove("is-selected"); }
          else                      { selected.add(option);    button.classList.add("is-selected"); }
        });
        choiceBox.appendChild(button);
      });
      const sendBtn = makeSendButton(() => {
        if (q.required && selected.size === 0) { addBotMessage("Pick at least one so I can continue."); return; }
        const values = Array.from(selected);
        handleAnswer(values, values.join(", "), q.next);
      });
      wrapper.appendChild(choiceBox);
      wrapper.appendChild(sendBtn);
      footer.appendChild(wrapper);
      return;
    }

    // text / textarea
    const inputRow = document.createElement("div");
    inputRow.className = q.type === "textarea"
      ? "diagnosis-input-row diagnosis-input-row-textarea"
      : "diagnosis-input-row";

    let input;
    if (q.type === "textarea") {
      input = document.createElement("textarea");
      input.rows = 3;
    } else {
      input = document.createElement("input");
      input.type = currentQuestionId === "contact_number" ? "tel" : "text";
      input.inputMode = currentQuestionId === "contact_number" ? "tel" : "text";
    }
    input.id = "diagnosisAnswer";
    input.placeholder = q.placeholder || "";

    const speechSupported = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (speechSupported) {
      const voiceBtn = document.createElement("button");
      voiceBtn.type = "button";
      voiceBtn.className = "diagnosis-voice-btn";
      voiceBtn.innerHTML = micIcon();
      voiceBtn.addEventListener("click", () => startVoiceInput(input, voiceBtn));
      inputRow.appendChild(input);
      inputRow.appendChild(voiceBtn);
    } else {
      inputRow.appendChild(input);
    }

    const sendBtn = makeSendButton(() => {
      const value = input.value.trim();
      if (q.required && !value) { addBotMessage("I need an answer here to continue."); return; }
      handleAnswer(value, value || "Skipped", q.next);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && q.type !== "textarea") { e.preventDefault(); sendBtn.click(); }
    });

    footer.appendChild(inputRow);
    footer.appendChild(sendBtn);
    setTimeout(() => input.focus(), 100);
  }

  function makeSendButton(onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "diagnosis-next";
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true"><path d="M3 11.5L20 4l-5.5 16-2.8-5.7L3 11.5z" fill="currentColor"/></svg>`;
    btn.addEventListener("click", onClick);
    return btn;
  }

  function handleAnswer(value, displayValue, nextQuestionId) {
    const q = questions[currentQuestionId];
    answers[currentQuestionId] = value;
    addUserMessage(displayValue);
    footer.innerHTML = "";

    const response = getResponseForAnswer(q, value);
    if (response) setTimeout(() => addBotMessage(response), 350);

    if (nextQuestionId === "finish") {
      setTimeout(() => renderFinalDiagnosis(), 850);
      return;
    }
    setTimeout(() => askQuestion(nextQuestionId), response ? 950 : 450);
  }

  function getResponseForAnswer(question, value) {
    if (question.responseMap && !Array.isArray(value)) return question.responseMap[value] || question.response || "";
    return question.response || "";
  }

  // ─── AI DIAGNOSIS ──────────────────────────────────────────────────────────

  async function fetchAIDiagnosis() {
    const feelingLabels = {
      owner_dependent:   "Everything goes through the owner. They can't step away.",
      unclear_offer:     "They can't explain what they sell in one clear sentence.",
      operational_chaos: "The business works but feels chaotic and reactive.",
      plateaued:         "They're not growing and don't know exactly why.",
      weak_presence:     "They look weaker online than they actually are."
    };

    const clientLabels = {
      good_not_enough:  "Good clients, not enough of them.",
      wrong_type:       "Enough clients but the wrong type.",
      no_conversion:    "People inquire but don't convert.",
      low_volume:       "Very few inquiries at all.",
      internal_problem: "Clients are fine. The problem is internal."
    };

    const stageLabels = {
      early:       "Less than a year in.",
      mid:         "1 to 3 years in. Has clients but still messy.",
      established: "More than 3 years. Stuck or slowing down."
    };

    const triedLabels = {
      tried_agency: "Tried an agency or freelancer. Didn't really solve it.",
      tried_self:   "Tried to fix it themselves. Still feels incomplete.",
      first_time:   "First time properly looking at this."
    };

    const breaks = Array.isArray(answers.what_breaks) ? answers.what_breaks.join(", ") : "";

    const prompt = `You are Sophia Ayoubi, founder of Chassis — a business structuring and execution practice based in Lebanon. Your job is to read a business owner's diagnosis answers and write a short, honest, specific summary of what their business actually needs.

CHASSIS CONTEXT:
Chassis works with founders and operators who are unclear, chaotic, or stuck. The four layers Chassis addresses are:
1. Business Structure — offer clarity, pricing logic, positioning, revenue model
2. Operations — workflows, SOPs, decision rules, removing owner dependency
3. Digital Infrastructure — website structure, booking flows, client intake, digital tools
4. Positioning and Trust — how the business appears, sales messaging, credibility

YOUR TONE:
Sharp. Direct. Human. No fluff. No motivational language. No dashes as punctuation. Speak like a smart operator who has seen this before, not like a chatbot. Never say "great question" or "thank you for sharing." Be specific about what you see in their answers. Do not give generic advice.

THE PERSON'S ANSWERS:
Name: ${answers.client_name || ""}
Business description (in their own words): "${answers.business_description || ""}"
Main feeling about the business: ${feelingLabels[answers.biggest_feeling] || answers.biggest_feeling || ""}
Where things break down: ${breaks || "Not specified"}
Client situation: ${clientLabels[answers.client_quality] || ""}
Business stage: ${stageLabels[answers.stage] || ""}
What they have tried before: ${triedLabels[answers.tried_before] || ""}

YOUR TASK:
Write a diagnosis summary with exactly three parts. Use this structure:

WHAT I SEE:
Two to three sentences. Read their business description and their answers together. Name what the actual problem appears to be, specifically. If the business description is vague or nonsensical, say so directly and honestly. Do not pretend the answers are clear if they are not.

WHERE TO START:
One to two sentences. Name the one layer that needs attention first and why, based on what they told you. Be specific to their situation.

WHAT THIS MEANS FOR THEM:
One sentence. Connect the starting layer to the outcome they care about.

Do not use bullet points. Do not use headers with # symbols. Write in plain paragraphs under each label. Keep the whole thing under 120 words. Do not mention pricing. Do not mention specific service names from Chassis.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.content && data.content[0] && data.content[0].text
      ? data.content[0].text.trim()
      : null;

    return text;
  }

  // ─── RESULT CARD ───────────────────────────────────────────────────────────

  async function renderFinalDiagnosis() {
    diagnosisFinished = true;
    updateProgress();
    progressBar.style.width = "100%";
    footer.innerHTML = "";

    const name = answers.client_name || "there";
    addBotMessage(`${name}, give me a moment. I'm reading through your answers now.`);

    // Show thinking state
    const thinkingMsg = document.createElement("div");
    thinkingMsg.className = "diagnosis-message diagnosis-message-bot";
    thinkingMsg.innerHTML = `<p style="opacity:0.5; font-style:italic;">Putting your diagnosis together...</p>`;
    chatArea.appendChild(thinkingMsg);
    scrollChatToBottom();

    let diagnosisText = null;

    try {
      diagnosisText = await fetchAIDiagnosis();
    } catch (err) {
      console.error("Chassis diagnosis API error:", err);
    }

    // Remove thinking message
    thinkingMsg.remove();

    if (!diagnosisText) {
      diagnosisText = "WHAT I SEE:\nSomething went wrong generating your diagnosis. This sometimes happens with a connection issue.\n\nWHERE TO START:\nBook a discovery call and Sophia will review your answers directly.\n\nWHAT THIS MEANS FOR THEM:\nA 30-minute call will give you a clearer picture than any automated tool.";
    }

    // Parse the three sections
    const sections = parseDiagnosisSections(diagnosisText);

    const whatsappMessage = buildWhatsAppMessage(diagnosisText);
    const whatsappUrl  = `https://wa.me/96171085824?text=${encodeURIComponent(whatsappMessage)}`;
    const calendlyUrl  = "https://calendly.com/chassis-lb/chassis-discovery-call";

    const resultCard = document.createElement("div");
    resultCard.className = "diagnosis-result-card";

    resultCard.innerHTML = `
      <p class="diagnosis-question-section">Your Diagnosis</p>

      <h3>What I see</h3>
      <p>${escapeHtml(sections.whatISee)}</p>

      <h3>Where to start</h3>
      <p>${escapeHtml(sections.whereToStart)}</p>

      <h3>What this means for you</h3>
      <p>${escapeHtml(sections.whatItMeans)}</p>

      <div class="diagnosis-result-note">
        <p>This is a read based on what you shared. The full diagnosis happens in a conversation.</p>
      </div>

      <div class="diagnosis-result-note">
        <p>The discovery call is 30 minutes. No pitch. Sophia looks at your specific situation and tells you honestly what needs to be done and whether Chassis is the right fit.</p>
      </div>

      <a class="diagnosis-whatsapp-link" href="${calendlyUrl}" target="_blank" rel="noopener">
        Book a Discovery Call
      </a>

      <a class="diagnosis-whatsapp-link" href="${whatsappUrl}" target="_blank" rel="noopener" style="margin-top:10px; background:transparent; border:1px solid currentColor; opacity:0.7;">
        Send This to WhatsApp Instead
      </a>

      <button class="diagnosis-restart" type="button">Start Again</button>
    `;

    chatArea.appendChild(resultCard);
    scrollChatToBottom();

    resultCard.querySelector(".diagnosis-restart").addEventListener("click", () => {
      Object.keys(answers).forEach((k) => delete answers[k]);
      askedQuestions.length = 0;
      currentQuestionId = "client_name";
      diagnosisFinished = false;
      startConversation();
    });
  }

  function parseDiagnosisSections(text) {
    // Try to extract the three labeled sections
    const whatISeeMatch      = text.match(/WHAT I SEE[:\s]*([\s\S]*?)(?=WHERE TO START|$)/i);
    const whereToStartMatch  = text.match(/WHERE TO START[:\s]*([\s\S]*?)(?=WHAT THIS MEANS|$)/i);
    const whatItMeansMatch   = text.match(/WHAT THIS MEANS(?:\s+FOR\s+(?:YOU|THEM))?[:\s]*([\s\S]*?)$/i);

    return {
      whatISee:     whatISeeMatch    ? whatISeeMatch[1].trim()    : text,
      whereToStart: whereToStartMatch ? whereToStartMatch[1].trim() : "",
      whatItMeans:  whatItMeansMatch  ? whatItMeansMatch[1].trim()  : ""
    };
  }

  function buildWhatsAppMessage(diagnosisText) {
    const breaks = Array.isArray(answers.what_breaks) ? answers.what_breaks.join(", ") : answers.what_breaks || "";

    const feelingLabels = {
      owner_dependent:   "Everything goes through me. I can't step away.",
      unclear_offer:     "I can't explain what I sell in one clear sentence.",
      operational_chaos: "The business works but feels chaotic and reactive.",
      plateaued:         "I'm not growing and I don't know exactly why.",
      weak_presence:     "We look weaker online than we actually are."
    };

    return `Hello Chassis. I completed the business diagnosis on your website.

Name: ${answers.client_name || ""}
WhatsApp: ${answers.contact_number || ""}

Business: ${answers.business_description || ""}

Main feeling: ${feelingLabels[answers.biggest_feeling] || answers.biggest_feeling || ""}
Where things break: ${breaks}

Diagnosis summary:
${diagnosisText || ""}

I'd like to understand more about what Chassis can do for my situation.`;
  }

  // ─── UI HELPERS ────────────────────────────────────────────────────────────

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
    const total    = Object.keys(questions).length;
    const progress = Math.min((askedQuestions.length / total) * 100, 100);
    progressBar.style.width = `${progress}%`;
  }

  function scrollChatToBottom() {
    const body = assistant.querySelector(".diagnosis-chat-body");
    body.scrollTop = body.scrollHeight;
  }

  function micIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true"><path d="M12 15a3 3 0 003-3V7a3 3 0 10-6 0v5a3 3 0 003 3z" fill="currentColor"/><path d="M19 11a1 1 0 112 0 9 9 0 11-18 0 1 1 0 112 0 7 7 0 0014 0z" fill="currentColor"/></svg>`;
  }

  function startVoiceInput(input, voiceBtn) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition || !input) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    voiceBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="currentColor"/></svg>`;
    recognition.start();

    let finalTranscript = "";

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += t;
        else interim += t;
      }
      input.value = `${input.value.trim() ? input.value.trim() + " " : ""}${finalTranscript || interim}`.trim();
    };

    recognition.onerror = () => addBotMessage("Voice input didn't work this time. Type it instead.");
    recognition.onend   = () => { voiceBtn.innerHTML = micIcon(); };
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