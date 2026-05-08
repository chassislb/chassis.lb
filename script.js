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
      section: "Basic Information",
      question: "First, what is your full name?",
      type: "text",
      placeholder: "Write your name",
      required: true,
      next: "business_name",
      response: "Perfect. I’ll keep the summary tied to your name."
    },

    business_name: {
      section: "Basic Information",
      question: "What is the name of your business or project?",
      type: "text",
      placeholder: "Business or project name",
      required: true,
      next: "phone",
      response: "Good. I’ll also need your WhatsApp number so the summary can be sent properly if you want Chassis to review it."
    },

    phone: {
      section: "Basic Information",
      question: "What is your WhatsApp number?",
      type: "text",
      placeholder: "+961...",
      required: true,
      next: "business_stage",
      response: "Great. Now I’ll diagnose the business through structured questions."
    },

    business_stage: {
      section: "Business Stage",
      question: "Which situation best describes your business right now?",
      type: "choice",
      required: true,
      options: [
        {
          label: "I only have an idea and need to turn it into a business",
          value: "idea",
          next: "business_type"
        },
        {
          label: "The business exists, but it feels messy or unclear",
          value: "existing_messy",
          next: "business_type"
        },
        {
          label: "The business is working, but I want to improve or grow it",
          value: "working_growth",
          next: "business_type"
        },
        {
          label: "I mainly need a website, app, or digital system",
          value: "infrastructure_need",
          next: "business_type"
        }
      ],
      responseMap: {
        idea: "That usually means the first layer is business structure before execution.",
        existing_messy: "That often points to structure, operations, or workflow issues.",
        working_growth: "Good. The next step is checking whether the current structure can support growth.",
        infrastructure_need: "Good. I’ll still check the business behind the website or system before estimating the direction."
      }
    },

    business_type: {
      section: "Business Type",
      question: "What type of business is this closest to?",
      type: "choice",
      required: true,
      options: [
        {
          label: "Service-based business",
          value: "service",
          next: "business_model"
        },
        {
          label: "Product-based business",
          value: "product",
          next: "business_model"
        },
        {
          label: "Restaurant, café, hospitality, or food business",
          value: "hospitality",
          next: "business_model"
        },
        {
          label: "Personal brand, consultant, expert, or professional profile",
          value: "personal_brand",
          next: "business_model"
        },
        {
          label: "Online platform, app, or digital concept",
          value: "platform",
          next: "business_model"
        },
        {
          label: "Mixed or not fully clear yet",
          value: "mixed",
          next: "business_model"
        }
      ],
      responseMap: {
        service: "Service businesses usually need clear offers, pricing logic, and client flow.",
        product: "Product businesses usually need positioning, pricing, packaging, and sales flow.",
        hospitality: "Hospitality businesses usually need operational consistency, service flow, and positioning.",
        personal_brand: "Personal brands need clear authority, service packaging, and trust-building infrastructure.",
        platform: "Digital concepts need structure before development, or the build becomes messy.",
        mixed: "That is exactly where structure helps: deciding what the business should sell and how it should flow."
      }
    },

    business_model: {
      section: "Business Model",
      question: "What best describes how the business makes or plans to make money?",
      type: "choice",
      required: true,
      options: [
        {
          label: "Selling services directly to clients",
          value: "services",
          next: "offer_clarity_level"
        },
        {
          label: "Selling physical products",
          value: "products",
          next: "offer_clarity_level"
        },
        {
          label: "Selling packages or programs",
          value: "packages",
          next: "offer_clarity_level"
        },
        {
          label: "Bookings, reservations, or appointments",
          value: "bookings",
          next: "offer_clarity_level"
        },
        {
          label: "Custom projects quoted case by case",
          value: "custom",
          next: "offer_clarity_level"
        },
        {
          label: "I am not sure yet",
          value: "not_sure",
          next: "offer_clarity_level"
        }
      ],
      responseMap: {
        services: "Good. Service businesses need offer clarity and a clean client journey.",
        products: "Good. Product businesses need clear positioning, pricing, and buying triggers.",
        packages: "Good. Packages can make sales easier when they are structured properly.",
        bookings: "Good. Booking-based businesses need clear flow from interest to confirmation.",
        custom: "Custom work can be strong, but it needs pricing logic and scope control.",
        not_sure: "That means the business model itself may need structuring first."
      }
    },

    offer_clarity_level: {
      section: "Offer Clarity",
      question: "How clear is what you sell?",
      type: "choice",
      required: true,
      options: [
        {
          label: "Very clear. People understand it quickly",
          value: "clear",
          next: "offer_confusion"
        },
        {
          label: "Somewhat clear, but I still explain a lot",
          value: "semi",
          next: "offer_confusion"
        },
        {
          label: "Not clear. People ask many questions before understanding",
          value: "unclear",
          next: "offer_confusion"
        },
        {
          label: "I do many things and I don’t know what to focus on",
          value: "scattered",
          next: "offer_confusion"
        },
        {
          label: "I have an idea, but not a proper offer yet",
          value: "no_offer",
          next: "offer_confusion"
        }
      ],
      responseMap: {
        clear: "Good. Clear offers make sales and execution easier.",
        semi: "That usually means the offer needs better packaging.",
        unclear: "That usually means the business needs clearer explanation, positioning, and structure.",
        scattered: "That is a strong sign that the business needs focus and offer architecture.",
        no_offer: "That usually means offer creation should come before marketing or infrastructure."
      }
    },

    offer_confusion: {
      section: "Offer Clarity",
      question: "What feels unclear or weak about the offer?",
      type: "multi",
      required: true,
      options: [
        "People don’t understand what I do",
        "I don’t know what to focus on",
        "I don’t have clear packages",
        "I don’t know how to explain the value",
        "My services or products feel scattered",
        "Clients compare me too much to cheaper alternatives",
        "The offer exists, but it does not feel premium",
        "The offer is clear enough"
      ],
      next: "pricing_status",
      response: "Good. Offer clarity directly affects pricing, sales, and the type of system the business needs."
    },

    pricing_status: {
      section: "Pricing",
      question: "How do you currently price your work, products, or services?",
      type: "choice",
      required: true,
      options: [
        {
          label: "Fixed prices",
          value: "fixed",
          next: "pricing_problem"
        },
        {
          label: "Packages with clear prices",
          value: "packages",
          next: "pricing_problem"
        },
        {
          label: "It depends on the client or project",
          value: "depends",
          next: "pricing_problem"
        },
        {
          label: "I usually guess or decide emotionally",
          value: "unstable",
          next: "pricing_problem"
        },
        {
          label: "I do not have pricing yet",
          value: "none",
          next: "pricing_problem"
        }
      ],
      responseMap: {
        fixed: "Good. Fixed prices work best when the scope is also clear.",
        packages: "Good. Packages are strong when they are easy to understand and deliver.",
        depends: "Custom pricing can work, but it needs strong logic behind it.",
        unstable: "That usually means the pricing structure needs work.",
        none: "That is common in early-stage businesses. Pricing can be built clearly."
      }
    },

    pricing_problem: {
      section: "Pricing",
      question: "What is the biggest pricing issue?",
      type: "multi",
      required: true,
      options: [
        "I underprice because I’m afraid to lose clients",
        "Clients negotiate too much",
        "I don’t know what the service or product is worth",
        "The price changes too much depending on the person",
        "People do not understand why it costs that much",
        "I don’t have a clear payment structure",
        "Pricing is not my main issue"
      ],
      next: "sales_problem",
      response: "Good. Pricing problems usually connect to offer clarity, positioning, and trust."
    },

    sales_problem: {
      section: "Sales & Conversion",
      question: "Where do you feel sales are getting stuck?",
      type: "multi",
      required: true,
      options: [
        "People ask but do not buy",
        "People say it is expensive",
        "People do not understand the value",
        "People need too much explanation",
        "I do not get enough inquiries",
        "I get inquiries but they are not serious",
        "I do not know how to follow up",
        "Sales are not the main issue"
      ],
      next: "client_flow",
      response: "That helps identify whether the issue is demand, trust, offer clarity, or follow-up."
    },

    client_flow: {
      section: "Client Flow",
      question: "What happens when someone becomes interested?",
      type: "choice",
      required: true,
      options: [
        {
          label: "There is a clear process from inquiry to payment",
          value: "clear",
          next: "operations_state"
        },
        {
          label: "I reply manually and explain everything each time",
          value: "manual",
          next: "operations_state"
        },
        {
          label: "People message, then the conversation gets messy",
          value: "messy",
          next: "operations_state"
        },
        {
          label: "I do not have a clear intake, booking, or quotation flow",
          value: "no_flow",
          next: "operations_state"
        }
      ],
      responseMap: {
        clear: "Good. A clear client flow makes conversion easier.",
        manual: "That usually means the business needs a more structured client intake or quotation process.",
        messy: "That often means the business is losing potential clients inside the communication flow.",
        no_flow: "That is a strong sign that a client flow system would help."
      }
    },

    operations_state: {
      section: "Operations",
      question: "How does the business run day to day?",
      type: "choice",
      required: true,
      options: [
        {
          label: "There is a clear workflow and people know what to do",
          value: "structured",
          next: "operations_problem"
        },
        {
          label: "It works, but there is confusion and inconsistency",
          value: "messy",
          next: "operations_problem"
        },
        {
          label: "Everything is reactive and depends on the day",
          value: "chaos",
          next: "operations_problem"
        },
        {
          label: "Everything depends on me personally",
          value: "owner_dependent",
          next: "operations_problem"
        },
        {
          label: "There are no operations yet because it is still an idea",
          value: "not_started",
          next: "operations_problem"
        }
      ],
      responseMap: {
        structured: "Good. Structured operations are a strong base for growth.",
        messy: "That usually means the business relies more on effort than on systems.",
        chaos: "That usually means workflows, roles, and standards need clarification.",
        owner_dependent: "That usually means too much of the business still lives in the owner’s head.",
        not_started: "That makes sense for an early-stage idea."
      }
    },

    operations_problem: {
      section: "Operations",
      question: "Where does work usually slow down or become messy?",
      type: "multi",
      required: true,
      options: [
        "Client communication",
        "Pricing and quotations",
        "Team follow-up",
        "Delivery timing",
        "Decision-making",
        "Quality control",
        "Money collection",
        "Content or marketing",
        "Inventory or stock",
        "Bookings or scheduling",
        "Everything depends on me",
        "Operations are not my main issue"
      ],
      next: "owner_dependency",
      response: "Good. These answers show where structure may reduce pressure."
    },

    owner_dependency: {
      section: "Owner Dependency",
      question: "If you stop working for three days, what happens?",
      type: "choice",
      required: true,
      options: [
        {
          label: "The business continues normally",
          value: "low",
          next: "systems_status"
        },
        {
          label: "Some things continue, but important decisions wait for me",
          value: "medium",
          next: "dependency_details"
        },
        {
          label: "Most things stop or become messy",
          value: "high",
          next: "dependency_details"
        },
        {
          label: "There is no team or system yet",
          value: "no_system",
          next: "systems_status"
        }
      ],
      responseMap: {
        low: "Good. Low owner dependency is a healthy sign.",
        medium: "That means some structure exists, but decision-making still depends heavily on you.",
        high: "That usually means the business needs clearer systems and delegation logic.",
        no_system: "That is normal for early-stage or solo businesses, but it should be structured before growth."
      }
    },

    dependency_details: {
      section: "Owner Dependency",
      question: "What depends on you personally?",
      type: "multi",
      required: true,
      options: [
        "Sales",
        "Pricing",
        "Client communication",
        "Operations",
        "Team decisions",
        "Quality control",
        "Payments",
        "Marketing",
        "Approvals",
        "Everything"
      ],
      next: "systems_status",
      response: "That helps define what should become documented, structured, or easier to delegate."
    },

    systems_status: {
      section: "Systems & Tools",
      question: "What tools or systems do you currently use?",
      type: "multi",
      required: true,
      options: [
        "Website",
        "Instagram / Facebook only",
        "WhatsApp only",
        "Excel or Google Sheets",
        "CRM",
        "Booking tool",
        "Payment system",
        "Internal dashboard",
        "Content calendar",
        "None"
      ],
      next: "tool_problem",
      response: "Tools are useful only when they support the business flow."
    },

    tool_problem: {
      section: "Systems & Tools",
      question: "What is missing or weak in your current digital setup?",
      type: "multi",
      required: true,
      options: [
        "No website",
        "Website does not explain the business properly",
        "No proper client intake",
        "No quotation system",
        "No payment flow",
        "No internal tracking",
        "No booking or request system",
        "Social media is not structured",
        "Tools exist but are disconnected",
        "I mainly need a website or app",
        "Digital setup is not my main issue"
      ],
      next: "infrastructure_need",
      response: "Good. This shows whether digital infrastructure is a priority or a later layer."
    },

    infrastructure_need: {
      section: "Infrastructure",
      question: "What type of infrastructure would help most?",
      type: "multi",
      required: true,
      options: [
        "Website that explains the business clearly",
        "Website that generates inquiries",
        "Client intake form",
        "Quotation or request flow",
        "Booking system",
        "Payment flow",
        "Internal dashboard",
        "Mobile app",
        "Portfolio or professional profile",
        "I am not sure yet",
        "Infrastructure can wait"
      ],
      next: "brand_positioning",
      response: "Good. Infrastructure should support the business, not just look nice."
    },

    brand_positioning: {
      section: "Positioning",
      question: "How does the business currently look to people?",
      type: "choice",
      required: true,
      options: [
        {
          label: "Clear, professional, and trustworthy",
          value: "strong",
          next: "growth_goal"
        },
        {
          label: "Good but not strong enough",
          value: "average",
          next: "positioning_problem"
        },
        {
          label: "Unclear or not premium enough",
          value: "weak",
          next: "positioning_problem"
        },
        {
          label: "The business barely has a public presence",
          value: "missing",
          next: "positioning_problem"
        }
      ],
      responseMap: {
        strong: "Good. Strong positioning helps every other layer perform better.",
        average: "That usually means the business needs stronger messaging and presentation.",
        weak: "That can affect trust, pricing, and conversion.",
        missing: "That usually means visibility and credibility infrastructure need attention."
      }
    },

    positioning_problem: {
      section: "Positioning",
      question: "What feels weak about the business image or positioning?",
      type: "multi",
      required: true,
      options: [
        "People do not understand what we do",
        "The business does not look premium enough",
        "The page or website feels weak",
        "The message is not clear",
        "The offer does not feel valuable enough",
        "The brand does not build trust quickly",
        "The business looks inconsistent",
        "Positioning is not my main issue"
      ],
      next: "growth_goal",
      response: "Good. Positioning is often what makes pricing and sales easier to accept."
    },

    growth_goal: {
      section: "Goals",
      question: "What are you trying to improve in the next three months?",
      type: "multi",
      required: true,
      options: [
        "Clarify what we sell",
        "Increase sales",
        "Get better clients",
        "Reduce operational chaos",
        "Stop depending on myself for everything",
        "Build a website or app",
        "Create systems",
        "Improve brand trust",
        "Prepare for growth",
        "Understand what is wrong first"
      ],
      next: "priority_first",
      response: "Good. Now I need to understand what should be handled first."
    },

    priority_first: {
      section: "Priority",
      question: "If you could fix only one layer first, what would you choose?",
      type: "choice",
      required: true,
      options: [
        {
          label: "Clarify the business, offers, and pricing",
          value: "structure",
          next: "business_size"
        },
        {
          label: "Fix workflows, operations, and owner dependency",
          value: "operations",
          next: "business_size"
        },
        {
          label: "Build or fix the website, app, or digital system",
          value: "infrastructure",
          next: "business_size"
        },
        {
          label: "Improve positioning, trust, and sales message",
          value: "positioning",
          next: "business_size"
        },
        {
          label: "I don’t know. I need Chassis to decide",
          value: "diagnose_first",
          next: "business_size"
        }
      ],
      responseMap: {
        structure: "Good. That points toward business structuring as the starting layer.",
        operations: "Good. That points toward operations and systems as the starting layer.",
        infrastructure: "Good. That points toward digital infrastructure as the starting layer.",
        positioning: "Good. That points toward offer, trust, and positioning work.",
        diagnose_first: "That is fine. The diagnosis will suggest the most useful starting point."
      }
    },

    business_size: {
      section: "Business Size",
      question: "How big is the business right now?",
      type: "choice",
      required: true,
      options: [
        {
          label: "Idea stage or pre-launch",
          value: "idea_stage",
          next: "urgency"
        },
        {
          label: "Solo project or one-person business",
          value: "solo",
          next: "urgency"
        },
        {
          label: "Small business with 2 to 5 people",
          value: "small",
          next: "urgency"
        },
        {
          label: "Active business with 6 to 15 people",
          value: "medium",
          next: "urgency"
        },
        {
          label: "Larger business or more complex operations",
          value: "large",
          next: "urgency"
        }
      ],
      responseMap: {
        idea_stage: "Good. Early-stage businesses need structure without overcomplication.",
        solo: "Good. Solo businesses need sharp systems without making the work heavy.",
        small: "Good. Small teams usually need clearer roles, workflow, and offer logic.",
        medium: "That adds operational complexity and usually needs deeper system work.",
        large: "That usually requires a more serious diagnosis before confirming scope."
      }
    },

    urgency: {
      section: "Urgency",
      question: "How urgent is this?",
      type: "choice",
      required: true,
      options: [
        {
          label: "Low. I am exploring",
          value: "low",
          next: "budget_readiness"
        },
        {
          label: "Medium. I want to start soon",
          value: "medium",
          next: "budget_readiness"
        },
        {
          label: "High. I need this fixed quickly",
          value: "high",
          next: "budget_readiness"
        }
      ],
      responseMap: {
        low: "Understood. I’ll keep the recommendation exploratory.",
        medium: "Good. That usually needs a clear starting point and delivery sequence.",
        high: "High urgency may affect the scope because faster work needs tighter priority handling."
      }
    },

    budget_readiness: {
      section: "Budget",
      question: "How ready are you to discuss investment if the recommended direction makes sense?",
      type: "choice",
      required: true,
      options: [
        {
          label: "Ready, if the solution makes sense",
          value: "ready",
          next: "final_notes"
        },
        {
          label: "Maybe. I need to understand the cost first",
          value: "maybe",
          next: "final_notes"
        },
        {
          label: "Not now. I am only checking",
          value: "not_ready",
          next: "final_notes"
        }
      ],
      responseMap: {
        ready: "Good. I’ll show an estimated starting direction.",
        maybe: "Fair. I’ll show the estimate clearly so you can review it calmly.",
        not_ready: "Understood. I’ll still show the diagnosis, and the next step can stay exploratory."
      }
    },

    final_notes: {
      section: "Final Details",
      question: "Anything important you want Chassis to know before reviewing this?",
      type: "textarea",
      placeholder: "Optional: deadlines, context, concerns, or extra details",
      required: false,
      next: "finish",
      response: "Thank you. I have enough structured answers to prepare the diagnosis summary."
    }
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

    addBotMessage("Hello. I’ll walk through your business through structured questions to understand what may need clearer structure, smoother operations, stronger positioning, or better digital flow.");

    setTimeout(() => {
      askQuestion(currentQuestionId);
    }, 450);
  }

  function askQuestion(questionId) {
    const q = questions[questionId];
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
      const choiceBox = document.createElement("div");
      choiceBox.className = "diagnosis-choice-list";

      q.options.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "diagnosis-choice-option";
        button.innerHTML = `<span>${escapeHtml(option.label)}</span>`;

        button.addEventListener("click", () => {
          handleAnswer(option.value, option.label, option.next);
        });

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
          if (selected.has(option)) {
            selected.delete(option);
            button.classList.remove("is-selected");
          } else {
            selected.add(option);
            button.classList.add("is-selected");
          }
        });

        choiceBox.appendChild(button);
      });

      const sendBtn = document.createElement("button");
      sendBtn.type = "button";
      sendBtn.className = "diagnosis-next";
      sendBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
          <path d="M3 11.5L20 4l-5.5 16-2.8-5.7L3 11.5z" fill="currentColor"/>
        </svg>
      `;

      sendBtn.addEventListener("click", () => {
        if (q.required && selected.size === 0) {
          addBotMessage("Please choose at least one option so I can continue the diagnosis properly.");
          return;
        }

        const values = Array.from(selected);
        handleAnswer(values, values.join(", "), q.next);
      });

      wrapper.appendChild(choiceBox);
      wrapper.appendChild(sendBtn);
      footer.appendChild(wrapper);
      return;
    }

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
      input.type = currentQuestionId === "phone" ? "tel" : "text";
      input.inputMode = currentQuestionId === "phone" ? "tel" : "text";
    }

    input.id = "diagnosisAnswer";
    input.placeholder = q.placeholder || "";

    const speechSupported = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (speechSupported) {
      const voiceBtn = document.createElement("button");
      voiceBtn.type = "button";
      voiceBtn.className = "diagnosis-voice-btn";
      voiceBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
          <path d="M12 15a3 3 0 003-3V7a3 3 0 10-6 0v5a3 3 0 003 3z" fill="currentColor"/>
          <path d="M19 11a1 1 0 112 0 9 9 0 11-18 0 1 1 0 112 0 7 7 0 0014 0z" fill="currentColor"/>
        </svg>
      `;

      voiceBtn.addEventListener("click", () => startVoiceInput(input, voiceBtn));
      inputRow.appendChild(input);
      inputRow.appendChild(voiceBtn);
    } else {
      inputRow.appendChild(input);
    }

    const sendBtn = document.createElement("button");
    sendBtn.type = "button";
    sendBtn.className = "diagnosis-next";
    sendBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
        <path d="M3 11.5L20 4l-5.5 16-2.8-5.7L3 11.5z" fill="currentColor"/>
      </svg>
    `;

    sendBtn.addEventListener("click", () => {
      const value = input.value.trim();

      if (q.required && !value) {
        addBotMessage("Please answer this so I can continue the diagnosis properly.");
        return;
      }

      handleAnswer(value, value || "No extra details added", q.next);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && q.type !== "textarea") {
        event.preventDefault();
        sendBtn.click();
      }
    });

    footer.appendChild(inputRow);
    footer.appendChild(sendBtn);

    setTimeout(() => input.focus(), 100);
  }

  function handleAnswer(value, displayValue, nextQuestionId) {
    const q = questions[currentQuestionId];

    answers[currentQuestionId] = value;

    addUserMessage(displayValue);

    footer.innerHTML = "";

    const response = getResponseForAnswer(q, value);

    if (response) {
      setTimeout(() => addBotMessage(response), 350);
    }

    if (nextQuestionId === "finish") {
      setTimeout(() => renderFinalDiagnosis(), 850);
      return;
    }

    setTimeout(() => {
      askQuestion(nextQuestionId);
    }, response ? 950 : 450);
  }

  function getResponseForAnswer(question, value) {
    if (question.responseMap && !Array.isArray(value)) {
      return question.responseMap[value] || question.response || "";
    }

    return question.response || "";
  }

  function addBotMessage(message, section = "") {
    const messageBox = document.createElement("div");
    messageBox.className = "diagnosis-message diagnosis-message-bot";

    messageBox.innerHTML = `
      ${section ? `<p class="diagnosis-question-section">${escapeHtml(section)}</p>` : ""}
      <p>${escapeHtml(message)}</p>
    `;

    chatArea.appendChild(messageBox);
    scrollChatToBottom();
  }

  function addUserMessage(message) {
    const messageBox = document.createElement("div");
    messageBox.className = "diagnosis-message diagnosis-message-user";

    messageBox.innerHTML = `<p>${escapeHtml(message)}</p>`;

    chatArea.appendChild(messageBox);
    scrollChatToBottom();
  }

  function updateProgress() {
    const totalQuestionsEstimate = 21;
    const progress = Math.min((askedQuestions.length / totalQuestionsEstimate) * 100, 100);
    progressBar.style.width = `${progress}%`;
  }

  function calculateDiagnosis() {
    const scores = {
      businessStructuring: 0,
      operationsSystems: 0,
      executionInfrastructure: 0,
      positioningTrust: 0,
      strategicAdvisory: 0,
      complexity: 0,
      urgency: 0
    };

    addBusinessStageScores(scores);
    addBusinessTypeScores(scores);
    addOfferScores(scores);
    addPricingScores(scores);
    addSalesScores(scores);
    addClientFlowScores(scores);
    addOperationsScores(scores);
    addSystemsScores(scores);
    addPositioningScores(scores);
    addGoalScores(scores);
    addPriorityScores(scores);
    addComplexityScores(scores);

    const serviceScores = [
      {
        name: "Business Structure & Offer Clarity",
        key: "businessStructuring",
        score: scores.businessStructuring
      },
      {
        name: "Operations & Workflow System",
        key: "operationsSystems",
        score: scores.operationsSystems
      },
      {
        name: "Website & Digital Flow Setup",
        key: "executionInfrastructure",
        score: scores.executionInfrastructure
      },
      {
        name: "Positioning & Sales Clarity",
        key: "positioningTrust",
        score: scores.positioningTrust
      },
      {
        name: "Growth Direction Session",
        key: "strategicAdvisory",
        score: scores.strategicAdvisory
      }
    ];

    serviceScores.sort((a, b) => b.score - a.score);

    const primary = serviceScores[0];
    const secondary = serviceScores[1];
    const third = serviceScores[2];

    const summary = buildDiagnosisSummary(primary, secondary, scores);
    const quotation = calculateQuotation(primary.name, secondary.name, third.name);

    return {
      scores,
      primary,
      secondary,
      third,
      summary,
      quotation
    };
  }

  function addBusinessStageScores(scores) {
    if (answers.business_stage === "idea") {
      scores.businessStructuring += 5;
      scores.strategicAdvisory += 2;
    }

    if (answers.business_stage === "existing_messy") {
      scores.businessStructuring += 2;
      scores.operationsSystems += 4;
    }

    if (answers.business_stage === "working_growth") {
      scores.operationsSystems += 2;
      scores.positioningTrust += 2;
      scores.strategicAdvisory += 3;
    }

    if (answers.business_stage === "infrastructure_need") {
      scores.executionInfrastructure += 4;
      scores.businessStructuring += 1;
    }
  }

  function addBusinessTypeScores(scores) {
    if (answers.business_type === "service") {
      scores.businessStructuring += 2;
      scores.positioningTrust += 1;
    }

    if (answers.business_type === "product") {
      scores.positioningTrust += 2;
      scores.businessStructuring += 2;
    }

    if (answers.business_type === "hospitality") {
      scores.operationsSystems += 3;
      scores.positioningTrust += 1;
    }

    if (answers.business_type === "personal_brand") {
      scores.positioningTrust += 3;
      scores.executionInfrastructure += 1;
    }

    if (answers.business_type === "platform") {
      scores.executionInfrastructure += 3;
      scores.businessStructuring += 2;
    }

    if (answers.business_type === "mixed") {
      scores.businessStructuring += 4;
      scores.strategicAdvisory += 2;
    }
  }

  function addOfferScores(scores) {
    if (answers.business_model === "custom") {
      scores.businessStructuring += 2;
      scores.operationsSystems += 1;
    }

    if (answers.business_model === "not_sure") {
      scores.businessStructuring += 4;
      scores.strategicAdvisory += 2;
    }

    if (answers.offer_clarity_level === "semi") scores.businessStructuring += 3;
    if (answers.offer_clarity_level === "unclear") scores.businessStructuring += 5;
    if (answers.offer_clarity_level === "scattered") scores.businessStructuring += 5;
    if (answers.offer_clarity_level === "no_offer") scores.businessStructuring += 6;

    if (Array.isArray(answers.offer_confusion)) {
      answers.offer_confusion.forEach((item) => {
        if (item === "The offer is clear enough") return;

        scores.businessStructuring += 1;

        if (
          item === "People don’t understand what I do" ||
          item === "I don’t know how to explain the value" ||
          item === "The offer exists, but it does not feel premium" ||
          item === "Clients compare me too much to cheaper alternatives"
        ) {
          scores.positioningTrust += 2;
        }

        if (
          item === "I do many things and don’t know what to focus on" ||
          item === "My services or products feel scattered" ||
          item === "I don’t have clear packages"
        ) {
          scores.businessStructuring += 2;
        }
      });
    }
  }

  function addPricingScores(scores) {
    if (answers.pricing_status === "depends") scores.businessStructuring += 2;
    if (answers.pricing_status === "unstable") scores.businessStructuring += 4;
    if (answers.pricing_status === "none") scores.businessStructuring += 4;

    if (Array.isArray(answers.pricing_problem)) {
      answers.pricing_problem.forEach((item) => {
        if (item === "Pricing is not my main issue") return;

        scores.businessStructuring += 1;

        if (
          item === "People do not understand why it costs that much" ||
          item === "Clients negotiate too much" ||
          item === "I don’t know what the service or product is worth"
        ) {
          scores.positioningTrust += 2;
        }

        if (
          item === "I don’t have a clear payment structure" ||
          item === "The price changes too much depending on the person"
        ) {
          scores.operationsSystems += 1;
        }
      });
    }
  }

  function addSalesScores(scores) {
    if (Array.isArray(answers.sales_problem)) {
      answers.sales_problem.forEach((item) => {
        if (item === "Sales are not the main issue") return;

        if (
          item === "People ask but do not buy" ||
          item === "People say it is expensive" ||
          item === "People do not understand the value" ||
          item === "People need too much explanation" ||
          item === "I get inquiries but they are not serious"
        ) {
          scores.positioningTrust += 2;
          scores.businessStructuring += 1;
        }

        if (item === "I do not get enough inquiries") {
          scores.positioningTrust += 2;
          scores.executionInfrastructure += 1;
        }

        if (item === "I do not know how to follow up") {
          scores.operationsSystems += 2;
        }
      });
    }
  }

  function addClientFlowScores(scores) {
    if (answers.client_flow === "manual") {
      scores.operationsSystems += 2;
      scores.executionInfrastructure += 1;
    }

    if (answers.client_flow === "messy") {
      scores.operationsSystems += 3;
      scores.executionInfrastructure += 2;
    }

    if (answers.client_flow === "no_flow") {
      scores.operationsSystems += 3;
      scores.executionInfrastructure += 3;
    }
  }

  function addOperationsScores(scores) {
    if (answers.operations_state === "messy") scores.operationsSystems += 3;
    if (answers.operations_state === "chaos") scores.operationsSystems += 5;
    if (answers.operations_state === "owner_dependent") scores.operationsSystems += 5;
    if (answers.operations_state === "not_started") scores.businessStructuring += 2;

    if (Array.isArray(answers.operations_problem)) {
      answers.operations_problem.forEach((item) => {
        if (item === "Operations are not my main issue") return;

        scores.operationsSystems += 1;

        if (
          item === "Pricing and quotations" ||
          item === "Money collection" ||
          item === "Bookings or scheduling"
        ) {
          scores.executionInfrastructure += 1;
        }

        if (item === "Content or marketing") {
          scores.positioningTrust += 1;
        }

        if (item === "Everything depends on me") {
          scores.operationsSystems += 3;
        }
      });
    }

    if (answers.owner_dependency === "medium") scores.operationsSystems += 2;
    if (answers.owner_dependency === "high") scores.operationsSystems += 4;
    if (answers.owner_dependency === "no_system") scores.operationsSystems += 2;

    if (Array.isArray(answers.dependency_details)) {
      answers.dependency_details.forEach((item) => {
        scores.operationsSystems += 1;

        if (item === "Marketing") scores.positioningTrust += 1;
        if (item === "Payments") scores.executionInfrastructure += 1;
        if (item === "Everything") scores.operationsSystems += 3;
      });
    }
  }

  function addSystemsScores(scores) {
    if (Array.isArray(answers.systems_status)) {
      if (answers.systems_status.includes("None")) {
        scores.executionInfrastructure += 3;
        scores.operationsSystems += 1;
      }

      if (answers.systems_status.includes("WhatsApp only")) {
        scores.executionInfrastructure += 1;
        scores.operationsSystems += 1;
      }

      if (answers.systems_status.includes("Instagram / Facebook only")) {
        scores.positioningTrust += 1;
        scores.executionInfrastructure += 1;
      }
    }

    if (Array.isArray(answers.tool_problem)) {
      answers.tool_problem.forEach((item) => {
        if (item === "Digital setup is not my main issue") return;

        if (
          item === "No website" ||
          item === "Website does not explain the business properly" ||
          item === "No proper client intake" ||
          item === "No quotation system" ||
          item === "No payment flow" ||
          item === "No internal tracking" ||
          item === "No booking or request system" ||
          item === "Tools exist but are disconnected" ||
          item === "I mainly need a website or app"
        ) {
          scores.executionInfrastructure += 2;
        }

        if (item === "Social media is not structured") {
          scores.positioningTrust += 2;
        }
      });
    }

    if (Array.isArray(answers.infrastructure_need)) {
      answers.infrastructure_need.forEach((item) => {
        if (item === "Infrastructure can wait") return;

        if (
          item === "Website that explains the business clearly" ||
          item === "Website that generates inquiries" ||
          item === "Client intake form" ||
          item === "Quotation or request flow" ||
          item === "Booking system" ||
          item === "Payment flow" ||
          item === "Internal dashboard" ||
          item === "Mobile app" ||
          item === "Portfolio or professional profile"
        ) {
          scores.executionInfrastructure += 2;
        }

        if (
          item === "Website that explains the business clearly" ||
          item === "Website that generates inquiries" ||
          item === "Portfolio or professional profile"
        ) {
          scores.positioningTrust += 1;
        }
      });
    }
  }

  function addPositioningScores(scores) {
    if (answers.brand_positioning === "average") scores.positioningTrust += 2;
    if (answers.brand_positioning === "weak") scores.positioningTrust += 4;
    if (answers.brand_positioning === "missing") {
      scores.positioningTrust += 4;
      scores.executionInfrastructure += 2;
    }

    if (Array.isArray(answers.positioning_problem)) {
      answers.positioning_problem.forEach((item) => {
        if (item === "Positioning is not my main issue") return;

        scores.positioningTrust += 2;

        if (
          item === "People do not understand what we do" ||
          item === "The message is not clear" ||
          item === "The offer does not feel valuable enough"
        ) {
          scores.businessStructuring += 1;
        }

        if (
          item === "The page or website feels weak" ||
          item === "The brand does not build trust quickly"
        ) {
          scores.executionInfrastructure += 1;
        }
      });
    }
  }

  function addGoalScores(scores) {
    if (Array.isArray(answers.growth_goal)) {
      answers.growth_goal.forEach((item) => {
        if (item === "Clarify what we sell") scores.businessStructuring += 3;
        if (item === "Increase sales") scores.positioningTrust += 2;
        if (item === "Get better clients") scores.positioningTrust += 2;
        if (item === "Reduce operational chaos") scores.operationsSystems += 3;
        if (item === "Stop depending on myself for everything") scores.operationsSystems += 3;
        if (item === "Build a website or app") scores.executionInfrastructure += 3;
        if (item === "Create systems") scores.operationsSystems += 2;
        if (item === "Improve brand trust") scores.positioningTrust += 3;
        if (item === "Prepare for growth") scores.strategicAdvisory += 2;
        if (item === "Understand what is wrong first") scores.strategicAdvisory += 2;
      });
    }
  }

  function addPriorityScores(scores) {
    if (answers.priority_first === "structure") scores.businessStructuring += 4;
    if (answers.priority_first === "operations") scores.operationsSystems += 4;
    if (answers.priority_first === "infrastructure") scores.executionInfrastructure += 4;
    if (answers.priority_first === "positioning") scores.positioningTrust += 4;
    if (answers.priority_first === "diagnose_first") scores.strategicAdvisory += 3;
  }

  function addComplexityScores(scores) {
    if (answers.business_size === "idea_stage") scores.complexity += 1;
    if (answers.business_size === "solo") scores.complexity += 1;
    if (answers.business_size === "small") scores.complexity += 2;
    if (answers.business_size === "medium") scores.complexity += 3;
    if (answers.business_size === "large") scores.complexity += 4;

    if (answers.urgency === "medium") {
      scores.urgency += 1;
      scores.complexity += 1;
    }

    if (answers.urgency === "high") {
      scores.urgency += 2;
      scores.complexity += 2;
    }
  }

  function buildDiagnosisSummary(primary, secondary) {
    const summaries = {
      "Business Structure & Offer Clarity": "The business may benefit from clearer offers, better pricing logic, stronger packaging, and a sharper direction before scaling further.",
      "Operations & Workflow System": "The business may benefit from smoother workflows, clearer responsibilities, better follow-up systems, and less daily pressure on the owner.",
      "Website & Digital Flow Setup": "The business may benefit from stronger digital infrastructure that supports trust, inquiries, bookings, quotations, payments, or internal tracking.",
      "Positioning & Sales Clarity": "The business may benefit from clearer positioning, stronger trust signals, better sales messaging, and a more convincing presentation of value.",
      "Growth Direction Session": "The business may benefit from a focused strategic review to decide what should be fixed first before investing in execution."
    };

    return `${summaries[primary.name]} The secondary layer appears to be ${secondary.name}, which means the work can be phased instead of handled all at once.`;
  }

  function calculateQuotation(primaryService, secondaryService, thirdService) {
    const today = new Date();
    const quotationNumber = `CH-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-${Math.floor(100 + Math.random() * 900)}`;

    const lineItems = [];

    addPrimaryLineItems(lineItems, primaryService);
    addSecondaryLineItem(lineItems, secondaryService, primaryService);
    addOptionalLaterLineItem(lineItems, thirdService, primaryService, secondaryService);
    addComplexityLineItems(lineItems);

    const total = lineItems
      .filter((item) => !item.optional)
      .reduce((sum, item) => sum + item.price, 0);

    const downPayment = Math.round(total * 0.5);
    const balance = total - downPayment;

    return {
      quotationNumber,
      date: formatDate(today),
      validUntil: formatDate(addDays(today, 15)),
      lineItems,
      total,
      downPayment,
      balance
    };
  }

  function addPrimaryLineItems(lineItems, primaryService) {
    if (primaryService === "Business Structure & Offer Clarity") {
      lineItems.push({
        item: "Business Structure Diagnosis & Direction Map",
        price: 150,
        phase: "Priority"
      });

      lineItems.push({
        item: "Offer, Positioning & Pricing Structure",
        price: 450,
        phase: "Priority"
      });
    }

    if (primaryService === "Operations & Workflow System") {
      lineItems.push({
        item: "Operational Diagnosis & Workflow Mapping",
        price: 250,
        phase: "Priority"
      });

      lineItems.push({
        item: "Operations & Workflow System",
        price: 950,
        phase: "Priority"
      });
    }

    if (primaryService === "Website & Digital Flow Setup") {
      lineItems.push({
        item: "Website / System Planning & User Flow",
        price: 250,
        phase: "Priority"
      });

      lineItems.push({
        item: "Website / Digital Flow Setup",
        price: 850,
        phase: "Priority"
      });
    }

    if (primaryService === "Positioning & Sales Clarity") {
      lineItems.push({
        item: "Positioning Review & Sales Message Direction",
        price: 150,
        phase: "Priority"
      });

      lineItems.push({
        item: "Offer Presentation & Sales Clarity Setup",
        price: 450,
        phase: "Priority"
      });
    }

    if (primaryService === "Growth Direction Session") {
      lineItems.push({
        item: "Growth Direction Session",
        price: 150,
        phase: "Priority"
      });

      lineItems.push({
        item: "Next-Step Execution Roadmap",
        price: 250,
        phase: "Priority"
      });
    }
  }

  function addSecondaryLineItem(lineItems, secondaryService, primaryService) {
    if (secondaryService === primaryService) return;

    const secondaryItems = {
      "Business Structure & Offer Clarity": {
        item: "Secondary Offer & Structure Layer",
        price: 250
      },
      "Operations & Workflow System": {
        item: "Secondary Operations Review Layer",
        price: 300
      },
      "Website & Digital Flow Setup": {
        item: "Secondary Digital Flow Direction Layer",
        price: 250
      },
      "Positioning & Sales Clarity": {
        item: "Secondary Positioning & Sales Clarity Layer",
        price: 250
      },
      "Growth Direction Session": {
        item: "Secondary Growth Direction Layer",
        price: 150
      }
    };

    if (secondaryItems[secondaryService]) {
      lineItems.push({
        ...secondaryItems[secondaryService],
        phase: "Recommended"
      });
    }
  }

  function addOptionalLaterLineItem(lineItems, thirdService, primaryService, secondaryService) {
    if (!thirdService || thirdService === primaryService || thirdService === secondaryService) return;

    const optionalItems = {
      "Business Structure & Offer Clarity": "Business structure can be refined later if the priority is not offer clarity now.",
      "Operations & Workflow System": "Operations can be improved later if the first priority is structure or digital setup.",
      "Website & Digital Flow Setup": "Digital infrastructure can be added later after the offer and process are clearer.",
      "Positioning & Sales Clarity": "Positioning can be strengthened later after the core structure is fixed.",
      "Growth Direction Session": "A strategic review can be added later if execution becomes unclear."
    };

    lineItems.push({
      item: optionalItems[thirdService] || "Additional layer can be added later",
      price: 0,
      phase: "Can Wait",
      optional: true
    });
  }

  function addComplexityLineItems(lineItems) {
    if (answers.business_size === "medium") {
      lineItems.push({
        item: "Operational Scope Adjustment",
        price: 250,
        phase: "Scope"
      });
    }

    if (answers.business_size === "large") {
      lineItems.push({
        item: "Advanced Operational Scope Adjustment",
        price: 500,
        phase: "Scope"
      });
    }

    if (answers.urgency === "high") {
      const subtotalBeforePriority = lineItems
        .filter((item) => !item.optional)
        .reduce((sum, item) => sum + item.price, 0);

      lineItems.push({
        item: "Priority Timeline Adjustment",
        price: Math.round(subtotalBeforePriority * 0.25),
        phase: "Timeline"
      });
    }
  }

  function renderFinalDiagnosis() {
    diagnosisFinished = true;

    const diagnosis = calculateDiagnosis();
    const whatsappMessage = buildWhatsAppMessage(diagnosis);
    const whatsappUrl = `https://wa.me/96171085824?text=${encodeURIComponent(whatsappMessage)}`;

    updateProgress();
    progressBar.style.width = "100%";
    footer.innerHTML = "";

    addBotMessage("I finished reviewing your structured answers. Here is the recommended starting direction.");

    const resultCard = document.createElement("div");
    resultCard.className = "diagnosis-result-card";

    const priorityItemsHtml = diagnosis.quotation.lineItems
      .filter((item) => !item.optional)
      .map((item) => {
        return `
          <div>
            <span>${escapeHtml(item.phase)}: ${escapeHtml(item.item)}</span>
            <strong>$${item.price}</strong>
          </div>
        `;
      })
      .join("");

    const optionalItemsHtml = diagnosis.quotation.lineItems
      .filter((item) => item.optional)
      .map((item) => {
        return `
          <div>
            <span>${escapeHtml(item.phase)}: ${escapeHtml(item.item)}</span>
            <strong>Later</strong>
          </div>
        `;
      })
      .join("");

    resultCard.innerHTML = `
      <p class="diagnosis-question-section">Business Direction Summary</p>
      <h3>Recommended Starting Point</h3>

      <p>${escapeHtml(diagnosis.summary)}</p>

      <div class="diagnosis-result-note">
        <p>Not every business needs every layer immediately. This summary separates what appears to be the priority now from what can wait.</p>
      </div>

      <div class="diagnosis-result-grid">
        <div>
          <span>Primary Recommendation</span>
          <strong>${escapeHtml(diagnosis.primary.name)}</strong>
        </div>

        <div>
          <span>Secondary Layer</span>
          <strong>${escapeHtml(diagnosis.secondary.name)}</strong>
        </div>
      </div>

      <div class="diagnosis-result-note">
        <p><strong>Estimated Direction ${escapeHtml(diagnosis.quotation.quotationNumber)}</strong></p>
        <p>Date: ${escapeHtml(diagnosis.quotation.date)}</p>
        <p>Valid until: ${escapeHtml(diagnosis.quotation.validUntil)}</p>
      </div>

      <div class="diagnosis-result-note">
        <p><strong>Priority Fixes</strong></p>
        <p>These are the areas that appear most useful to start with based on the diagnosis.</p>
      </div>

      <div class="diagnosis-result-grid">
        ${priorityItemsHtml}
      </div>

      ${
        optionalItemsHtml
          ? `
            <div class="diagnosis-result-note">
              <p><strong>Can Be Added Later</strong></p>
              <p>This layer does not need to be handled immediately unless the scope is confirmed manually.</p>
            </div>

            <div class="diagnosis-result-grid">
              ${optionalItemsHtml}
            </div>
          `
          : ""
      }

      <div class="diagnosis-result-grid">
        <div>
          <span>Estimated Starting Investment</span>
          <strong>$${diagnosis.quotation.total}</strong>
        </div>

        <div>
          <span>Suggested Starting Deposit</span>
          <strong>$${diagnosis.quotation.downPayment}</strong>
        </div>

        <div>
          <span>Remaining Balance</span>
          <strong>$${diagnosis.quotation.balance}</strong>
        </div>

        <div>
          <span>Payment Method</span>
          <strong>Whish / Wish Money</strong>
        </div>
      </div>

      <div class="diagnosis-result-note">
        <p>This is an estimated direction generated from your answers. Chassis reviews every business manually before confirming the final scope.</p>
        <p>You can send this summary to WhatsApp to review what should be started now and what can wait.</p>
      </div>

      <a class="diagnosis-whatsapp-link" href="${whatsappUrl}" target="_blank" rel="noopener">
        Review This Diagnosis on WhatsApp
      </a>

      <button class="diagnosis-restart" type="button">Start Again</button>
    `;

    chatArea.appendChild(resultCard);
    scrollChatToBottom();

    const restartBtn = resultCard.querySelector(".diagnosis-restart");

    restartBtn.addEventListener("click", () => {
      Object.keys(answers).forEach((key) => delete answers[key]);
      askedQuestions.length = 0;
      currentQuestionId = "client_name";
      diagnosisFinished = false;
      startConversation();
    });
  }

  function buildWhatsAppMessage(diagnosis) {
    const priorityItems = diagnosis.quotation.lineItems
      .filter((item) => !item.optional)
      .map((item) => `- ${item.phase}: ${item.item}: $${item.price}`)
      .join("\n");

    const optionalItems = diagnosis.quotation.lineItems
      .filter((item) => item.optional)
      .map((item) => `- ${item.phase}: ${item.item}`)
      .join("\n");

    return `Hello Chassis, I completed the business diagnosis.

Prepared For:
Name: ${answers.client_name || ""}
Business: ${answers.business_name || ""}
Phone: ${answers.phone || ""}

Business Direction Summary:
${diagnosis.summary}

Recommended Starting Point:
${diagnosis.primary.name}

Secondary Layer:
${diagnosis.secondary.name}

Priority Fixes:
${priorityItems}

${optionalItems ? `Can Be Added Later:\n${optionalItems}\n` : ""}

Estimated Starting Investment:
$${diagnosis.quotation.total}

Suggested Starting Deposit:
$${diagnosis.quotation.downPayment}

Remaining Balance:
$${diagnosis.quotation.balance}

Payment:
If the direction is confirmed, the next step can be arranged through Whish / Wish Money.

Main Answers:
Business stage: ${formatAnswer(answers.business_stage)}
Business type: ${formatAnswer(answers.business_type)}
Business model: ${formatAnswer(answers.business_model)}
Offer clarity: ${formatAnswer(answers.offer_clarity_level)}
Offer issues: ${formatAnswer(answers.offer_confusion)}
Pricing status: ${formatAnswer(answers.pricing_status)}
Pricing issues: ${formatAnswer(answers.pricing_problem)}
Sales issues: ${formatAnswer(answers.sales_problem)}
Client flow: ${formatAnswer(answers.client_flow)}
Operations state: ${formatAnswer(answers.operations_state)}
Operations issues: ${formatAnswer(answers.operations_problem)}
Owner dependency: ${formatAnswer(answers.owner_dependency)}
Systems used: ${formatAnswer(answers.systems_status)}
Tool problems: ${formatAnswer(answers.tool_problem)}
Infrastructure needs: ${formatAnswer(answers.infrastructure_need)}
Positioning: ${formatAnswer(answers.brand_positioning)}
Positioning issues: ${formatAnswer(answers.positioning_problem)}
Goal: ${formatAnswer(answers.growth_goal)}
Priority: ${formatAnswer(answers.priority_first)}
Business size: ${formatAnswer(answers.business_size)}
Urgency: ${formatAnswer(answers.urgency)}
Budget readiness: ${formatAnswer(answers.budget_readiness)}
Extra notes: ${answers.final_notes || "No extra notes added"}

I would like Chassis to review this diagnosis and discuss the next step.`;
  }

  function startVoiceInput(input, voiceBtn) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition || !input) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    voiceBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="currentColor"/>
      </svg>
    `;

    recognition.start();

    let finalTranscript = "";

    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const currentValue = input.value.trim();
      const newValue = `${currentValue ? currentValue + " " : ""}${finalTranscript || interimTranscript}`.trim();
      input.value = newValue;
    };

    recognition.onerror = () => {
      addBotMessage("Voice input did not work this time. Please type the answer manually.");
    };

    recognition.onend = () => {
      voiceBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
          <path d="M12 15a3 3 0 003-3V7a3 3 0 10-6 0v5a3 3 0 003 3z" fill="currentColor"/>
          <path d="M19 11a1 1 0 112 0 9 9 0 11-18 0 1 1 0 7 7 0 0014 0z" fill="currentColor"/>
        </svg>
      `;
    };
  }

  function scrollChatToBottom() {
    const body = assistant.querySelector(".diagnosis-chat-body");
    body.scrollTop = body.scrollHeight;
  }

  function formatDate(date) {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function formatAnswer(value) {
    if (Array.isArray(value)) {
      return value.length ? value.join(", ") : "";
    }

    return value || "";
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