// DOM elements
const themeToggleButtons = document.querySelectorAll('.theme-toggle, .footer-theme-toggle');
const themeIcons = document.querySelectorAll('#theme-icon, #footer-theme-icon');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typewriterText = document.getElementById('typewriter-text');
const skillsSlider = document.getElementById('skills-slider');
const skillsNext = document.getElementById('skills-next');
const skillsPrev = document.getElementById('skills-prev');
const testimonialsContainer = document.getElementById('testimonials-container');
const testimonialNext = document.getElementById('testimonial-next');
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialDots = document.querySelectorAll('.dot');
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');
const languageToggle = document.getElementById('language-toggle');
const languageDropdown = document.getElementById('language-dropdown');
const languageOptions = document.querySelectorAll('.language-option');
const currentLangSpan = document.querySelector('.current-lang');
const cv = document.getElementById("cv")

// Download CV
function downloadAndOpenCV(e) {
  e.preventDefault();

  const fileUrl = './Assets/Docs/CVFS.pdf';

  // 1) Abrir en nueva pestaña
  window.open(fileUrl, '_blank');

  // 2) Forzar descarga
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = 'Jhon-Ramirez-CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Asignar evento
cv.addEventListener("click", downloadAndOpenCV);


// State
let currentSkillSlide = 0;
let currentTestimonialSlide = 0;
let skillsAutoPlay;
let isFormSubmitting = false;
let currentLanguage = 'en';
let typingTimeoutId;
let isTyping = false;

//Constants
const MAIL_TO = "jhoxardev@gmail.com";
const MAIL_SUBJECT = "Quiero colaborar contigo";

// Translations
const translations = {
  en: {
    nav: {
      home: "Home",
      skills: "Skills",
      work: "Projects",
      testimonials: "Voices",
      blog: "Insights",
      contact: "Contact"
    },
    hero: {
      greeting: "Hi, I'm Jhon Ramirez",
      subtitle: "Full-Stack Developer · UX/UI Designer · AI Automation Specialist",
      tagline: "I craft digital products that blend design, technology, and automation to help businesses scale.",
      downloadCV: "Download CV",
      letsTalk: "Let’s Talk"
    },
    skills: {
      title: "My Skills",
      subtitle: "Tech + Design + AI: the toolkit that drives business growth",
      frontend: {
        title: "Frontend Development",
        description: "Interactive and responsive apps with React, Vue.js, and modern JavaScript"
      },
      backend: {
        title: "Backend Development",
        description: "Scalable APIs, secure microservices, and cloud-based architectures"
      },
      automation: {
        title: "AI & Automation",
        description: "Intelligent workflows, AI-driven bots, and machine learning integrations"
      },
      database: {
        title: "Database Design",
        description: "Efficient and scalable database structures for high-performance apps"
      }
    },
    work: {
  title: "Projects",
  subtitle: "Solutions that merge code, design, and automation",
  project1: {
    title: "Movie Market – Real-time Movie Explorer",
    problemDesc: "Movie Market is a sleek web app that lets users easily discover, search, and save movies in real time. Built with REST APIs and advanced DOM manipulation, it delivers a smooth, intuitive, and engaging movie discovery experience powered by live data.",
   
  },
  project2: {
    title: "Minesweeper with Lives – Classic Game Reinvented",
    problemDesc: "Minesweeper with Lives is a fresh take on the classic game. Built in JavaScript, it adds lives, a timer, enemies, and collectibles to create a more dynamic and engaging gameplay experience.",
    
  },
  project3: {
    title: "Guitar Shop – Modern E-commerce with React",
    problemDesc: "Guitar Shop is a modern React-based e-commerce platform designed for musicians. With a dynamic cart and clean component architecture, it delivers a sleek shopping experience optimized for usability and conversions.",
  },
  liveDemo: "Live Demo",
  github: "View Code"
},
    testimonials: {
      title: "Testimonials",
      subtitle: "What people say about working with me"
    },
    blog: {
      title: "Insights",
      subtitle: "Thoughts on coding, UX, and intelligent automation",
      readMore: "Read more",
      viewMore: "View all articles"
    },
    contact: {
      title: "Let’s build something amazing",
      subtitle: "Ready to combine design, code, and AI to transform your business?",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      companyPlaceholder: "Company (optional)",
      messagePlaceholder: "Tell me about your project...",
      sendMessage: "Send Message",
      sending: "Sending...",
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      emailInvalid: "Enter a valid email",
      messageRequired: "Message is required",
      messageLength: "Message must be at least 10 characters",
      successMessage: "Message sent successfully! I'll get back soon.",
      errorMessage: "Error sending message. Try again."
    },
    footer: {
      description: "Full-Stack Developer | UX/UI Designer | AI Automation",
      navigation: "Navigation",
      copyright: "© 2025 Jhon Ramirez. All rights reserved."
    }
  },

  es: {
    nav: {
      home: "Inicio",
      skills: "Habilidades",
      work: "Proyectos",
      testimonials: "Testimonios",
      blog: "Blog",
      contact: "Contacto"
    },
    hero: {
      greeting: "Hola, soy Jhon Ramirez",
      subtitle: "Full-Stack Developer · UX/UI · Automatización con IA",
      tagline: "Diseño y desarrollo experiencias digitales que combinan código, diseño y automatización para hacer crecer negocios.",
      downloadCV: "Descargar CV",
      letsTalk: "Hablemos"
    },
    skills: {
      title: "Mis Habilidades",
      subtitle: "Tecnología, diseño e IA: mi caja de herramientas para impulsar innovación",
      frontend: {
        title: "Desarrollo Frontend",
        description: "Apps modernas e interactivas con React, Vue.js y JavaScript"
      },
      backend: {
        title: "Desarrollo Backend",
        description: "APIs escalables, microservicios seguros y arquitectura en la nube"
      },
      automation: {
        title: "IA y Automatización",
        description: "Automatizaciones inteligentes, bots y modelos de machine learning"
      },
      database: {
        title: "Diseño de Bases de Datos",
        description: "Arquitecturas eficientes y escalables para apps de alto rendimiento"
      }
    },
    work: {
  title: "Proyectos",
  subtitle: "Soluciones que integran diseño, código e inteligencia artificial",
  project1: {
    title: "Movie Market – Explorador de Películas en Tiempo Real",
    problemDesc: "Movie Market es una aplicación web moderna que permite descubrir, buscar y guardar películas en tiempo real. Desarrollada con APIs REST y manipulación avanzada del DOM, ofrece una experiencia fluida, intuitiva y atractiva impulsada por datos en vivo.",
   
  },
  project2: {
    title: "Buscaminas con Vidas – El clásico reinventado",
    problemDesc: "Minesweeper con Vidas es una nueva versión del clásico juego. Creado en JavaScript, incorpora vidas, temporizador, enemigos y coleccionables para brindar una jugabilidad más dinámica y entretenida.",
    
  },
  project3: {
    title: "Guitar Shop – E-commerce Moderno con React",
    problemDesc: "Guitar Shop es una tienda online construida con React para músicos. Con carrito dinámico y una arquitectura limpia de componentes, ofrece una experiencia de compra elegante y optimizada para usabilidad y conversión.",
   
  },
  liveDemo: "Ver Demo",
  github: "Ver Código"
}
,
    testimonials: {
      title: "Testimonios",
      subtitle: "Lo que dicen al trabajar conmigo"
    },
    blog: {
      title: "Reflexiones",
      subtitle: "Ideas sobre programación, diseño y automatización inteligente",
      readMore: "Leer más",
      viewMore: "Ver todos los artículos"
    },
    contact: {
      title: "Construyamos algo increíble",
      subtitle: "¿Listo para combinar diseño, código e IA en tu negocio?",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@email.com",
      companyPlaceholder: "Empresa (opcional)",
      messagePlaceholder: "Cuéntame sobre tu proyecto...",
      sendMessage: "Enviar mensaje",
      sending: "Enviando...",
      nameRequired: "El nombre es requerido",
      emailRequired: "El email es requerido",
      emailInvalid: "Ingresa un email válido",
      messageRequired: "El mensaje es requerido",
      messageLength: "El mensaje debe tener al menos 10 caracteres",
      successMessage: "¡Mensaje enviado! Te contactaré pronto.",
      errorMessage: "Error al enviar el mensaje. Intenta de nuevo."
    },
    footer: {
      description: "Full-Stack Developer | UX/UI | IA & Automatización",
      navigation: "Navegación",
      copyright: "© 2025 Jhon Ramirez. Todos los derechos reservados."
    }
  },

  de: {
    nav: {
      home: "Start",
      skills: "Fähigkeiten",
      work: "Projekte",
      testimonials: "Stimmen",
      blog: "Blog",
      contact: "Kontakt"
    },
    hero: {
      greeting: "Hallo, ich bin Jhon Ramirez",
      subtitle: "Full-Stack Developer · UX/UI Designer · KI-Automatisierung",
      tagline: "Ich entwickle digitale Produkte, die Design, Technologie und KI-Automatisierung kombinieren, um Unternehmen zu skalieren.",
      downloadCV: "Lebenslauf herunterladen",
      letsTalk: "Lass uns reden"
    },
    skills: {
      title: "Fähigkeiten",
      subtitle: "Technologie + Design + KI: mein Werkzeugkasten für Wachstum",
      frontend: {
        title: "Frontend-Entwicklung",
        description: "Interaktive und responsive Apps mit React, Vue.js und modernem JavaScript"
      },
      backend: {
        title: "Backend-Entwicklung",
        description: "Skalierbare APIs, sichere Microservices und Cloud-Architektur"
      },
      automation: {
        title: "KI & Automatisierung",
        description: "Intelligente Workflows, Bots und Machine-Learning-Integration"
      },
      database: {
        title: "Datenbankdesign",
        description: "Effiziente und skalierbare Strukturen für leistungsstarke Anwendungen"
      }
    },
    work: {
  title: "Projetos",
  subtitle: "Soluções que unem código, design e automação",
  project1: {
    title: "Movie Market – Explorador de Filmes em Tempo Real",
    problemDesc: "Movie Market ist eine moderne Web-App, mit der Nutzer Filme in Echtzeit entdecken, suchen und speichern können. Entwickelt mit REST-APIs und fortgeschrittener DOM-Manipulation bietet sie ein flüssiges, intuitives und ansprechendes Erlebnis mit Live-Daten.",
    
  },
  project2: {
    title: "Campo Minado com Vidas – O clássico reinventado",
    problemDesc: "Minesweeper mit Leben ist eine Neuinterpretation des klassischen Spiels. In JavaScript entwickelt, integriert es Leben, Timer, Gegner und Sammelobjekte, um ein dynamischeres und unterhaltsameres Spielerlebnis zu schaffen.",
  },
  project3: {
    title: "Guitar Shop – E-commerce Moderno com React",
    problemDesc: "Guitar Shop ist ein Online-Shop für Musiker, der mit React entwickelt wurde. Mit einem dynamischen Warenkorb und einer klaren Komponentenarchitektur bietet er ein elegantes Einkaufserlebnis, optimiert für Benutzerfreundlichkeit und Konversion.",
   
  },
  liveDemo: "Ver Demo",
  github: "Ver Código"
}
,
    testimonials: {
      title: "Referenzen",
      subtitle: "Was andere über die Zusammenarbeit sagen"
    },
    blog: {
      title: "Gedanken",
      subtitle: "Beiträge zu Code, UX und Automatisierung",
      readMore: "Weiterlesen",
      viewMore: "Alle Artikel"
    },
    contact: {
      title: "Lass uns etwas Großartiges bauen",
      subtitle: "Bereit, Design, Code und KI zu vereinen?",
      namePlaceholder: "Dein Name",
      emailPlaceholder: "deine@email.com",
      companyPlaceholder: "Firma (optional)",
      messagePlaceholder: "Erzähl mir von deinem Projekt...",
      sendMessage: "Nachricht senden",
      sending: "Wird gesendet...",
      nameRequired: "Name erforderlich",
      emailRequired: "E-Mail erforderlich",
      emailInvalid: "Bitte gültige E-Mail eingeben",
      messageRequired: "Nachricht erforderlich",
      messageLength: "Mindestens 10 Zeichen",
      successMessage: "Nachricht gesendet! Ich melde mich bald.",
      errorMessage: "Fehler beim Senden. Bitte erneut versuchen."
    },
    footer: {
      description: "Full-Stack Developer | UX/UI Designer | KI & Automatisierung",
      navigation: "Navigation",
      copyright: "© 2025 Jhon Ramirez. Alle Rechte vorbehalten."
    }
  },

  pt: {
    nav: {
      home: "Início",
      skills: "Habilidades",
      work: "Projetos",
      testimonials: "Depoimentos",
      blog: "Blog",
      contact: "Contato"
    },
    hero: {
      greeting: "Olá, eu sou Jhon Ramirez",
      subtitle: "Full-Stack Developer · UX/UI · Automação com IA",
      tagline: "Crio experiências digitais unindo design, tecnologia e automação inteligente para escalar negócios.",
      downloadCV: "Baixar CV",
      letsTalk: "Vamos Conversar"
    },
    skills: {
      title: "Minhas Habilidades",
      subtitle: "Tecnologia, design e IA: meu kit para inovação",
      frontend: {
        title: "Desenvolvimento Frontend",
        description: "Apps modernos e responsivos com React, Vue.js e JavaScript"
      },
      backend: {
        title: "Desenvolvimento Backend",
        description: "APIs escaláveis, microsserviços seguros e arquitetura em nuvem"
      },
      automation: {
        title: "IA & Automação",
        description: "Fluxos inteligentes, bots e integrações de machine learning"
      },
      database: {
        title: "Design de Banco de Dados",
        description: "Arquiteturas eficientes e escaláveis para alta performance"
      }
    },
   work: {
  title: "Projetos",
  subtitle: "Soluções que unem código, design e automação",
  project1: {
    title: "Movie Market – Explorador de Filmes em Tempo Real",
    problemDesc: "Movie Market é um aplicativo web moderno que permite aos usuários descobrir, buscar e salvar filmes em tempo real. Construído com REST APIs e manipulação avançada do DOM, oferece uma experiência fluida, intuitiva e envolvente com dados ao vivo."
  },
  project2: {
    title: "Campo Minado com Vidas – O clássico reinventado",
    problemDesc: "Minesweeper com Vidas é uma nova versão do clássico jogo. Desenvolvido em JavaScript, adiciona vidas, cronômetro, inimigos e itens colecionáveis para criar uma jogabilidade mais dinâmica e divertida.",
  },
  project3: {
    title: "Guitar Shop – E-commerce Moderno com React",
    problemDesc: "Guitar Shop é uma loja online para músicos desenvolvida em React. Com carrinho dinâmico e arquitetura limpa de componentes, oferece uma experiência de compra elegante, otimizada para usabilidade e conversão.",
  },
  liveDemo: "Ver Demo",
  github: "Ver Código"
}
,
    testimonials: {
      title: "Depoimentos",
      subtitle: "O que dizem sobre trabalhar comigo"
    },
    blog: {
      title: "Reflexões",
      subtitle: "Ideias sobre programação, UX e automação inteligente",
      readMore: "Ler mais",
      viewMore: "Ver todos os artigos"
    },
    contact: {
      title: "Vamos construir algo incrível",
      subtitle: "Pronto para unir design, código e IA?",
      namePlaceholder: "Seu nome",
      emailPlaceholder: "seu@email.com",
      companyPlaceholder: "Empresa (opcional)",
      messagePlaceholder: "Fale sobre seu projeto...",
      sendMessage: "Enviar mensagem",
      sending: "Enviando...",
      nameRequired: "Nome é obrigatório",
      emailRequired: "Email é obrigatório",
      emailInvalid: "Insira um email válido",
      messageRequired: "Mensagem obrigatória",
      messageLength: "Mensagem deve ter pelo menos 10 caracteres",
      successMessage: "Mensagem enviada! Retornarei em breve.",
      errorMessage: "Erro no envio. Tente novamente."
    },
    footer: {
      description: "Full-Stack Developer | UX/UI | IA & Automação",
      navigation: "Navegação",
      copyright: "© 2025 Jhon Ramirez. Todos os direitos reservados."
    }
  }
};

//Handle Submit
function buildMailto({ name, email, company, message }) {
  const lines = [
    "Hola Jhon,",
    "",
    "Quiero colaborar contigo.",
    "",
    `— Nombre: ${name}`,
    `— Email: ${email}`,
    company ? `— Empresa: ${company}` : null,
    "",
    "Mensaje:",
    message
  ].filter(Boolean).join("\n");

  const params = new URLSearchParams({
    subject: MAIL_SUBJECT,
    body: lines
  });

  return `mailto:${MAIL_TO}?${params.toString()}`;
}

async function handleFormSubmit(e) {
  e.preventDefault();

  if (typeof isFormSubmitting !== "undefined" && isFormSubmitting) return;
  if (typeof validateForm === "function" && !validateForm()) return;

  if (typeof setFormLoading === "function") setFormLoading(true);

  try {
    const formData = new FormData(contactForm);
    const payload = {
      name: (formData.get("name") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim(),
      company: (formData.get("company") || "").toString().trim(),
      message: (formData.get("message") || "").toString().trim()
    };

    // 1) Abre el cliente de correo en una pestaña nueva
    const mailtoUrl = buildMailto(payload);
    window.open(mailtoUrl, "_blank");

    // 2) (Opcional) Envía en segundo plano a Formspree para registro
    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    }).catch(() => { /* silencioso */ });

    // UI feedback
    const t = translations?.[currentLanguage] || translations.en;
    if (typeof showFormMessage === "function") {
      showFormMessage(t.contact.successMessage, "success");
    }
    contactForm.reset();
  } catch (error) {
    console.error("Form submission error:", error);
    const t = translations?.[currentLanguage] || translations.en;
    if (typeof showFormMessage === "function") {
      showFormMessage(t.contact.errorMessage, "error");
    }
  } finally {
    if (typeof setFormLoading === "function") setFormLoading(false);
  }
}


// Language Management
function initLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    currentLanguage = savedLanguage;
    updateLanguage(savedLanguage);
    updateLanguageUI(savedLanguage);
}

function updateLanguage(lang) {
    const t = translations[lang];
    
    // Update navigation (with safety checks)
    const navHome = document.querySelector('a[href="#home"]');
    const navSkills = document.querySelector('a[href="#skills"]');
    const navWork = document.querySelector('a[href="#work"]');
    const navTestimonials = document.querySelector('a[href="#testimonials"]');
    const navBlog = document.querySelector('a[href="#blog"]');
    const navContact = document.querySelector('a[href="#contact"]');
    
    if (navHome) navHome.textContent = t.nav.home;
    if (navSkills) navSkills.textContent = t.nav.skills;
    if (navWork) navWork.textContent = t.nav.work;
    if (navTestimonials) navTestimonials.textContent = t.nav.testimonials;
    if (navBlog) navBlog.textContent = t.nav.blog;
    if (navContact) navContact.textContent = t.nav.contact;
    
    // Update hero section (with safety checks)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const btnPrimary = document.querySelector('.btn-primary .fas + *');
    const btnSecondary = document.querySelector('.btn-secondary .fas + *');
    
    if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;
    if (btnPrimary) btnPrimary.textContent = t.hero.downloadCV;
    if (btnSecondary) btnSecondary.textContent = t.hero.letsTalk;
    
    // Update skills section (with safety checks)
    const skillsTitle = document.querySelector('#skills .section-title');
    const skillsSubtitle = document.querySelector('#skills .section-subtitle');
    
    if (skillsTitle) skillsTitle.textContent = t.skills.title;
    if (skillsSubtitle) skillsSubtitle.textContent = t.skills.subtitle;
    
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length >= 4) {
        const frontendTitle = skillCards[0]?.querySelector('.skill-title');
        const frontendDesc = skillCards[0]?.querySelector('.skill-description');
        if (frontendTitle) frontendTitle.textContent = t.skills.frontend.title;
        if (frontendDesc) frontendDesc.textContent = t.skills.frontend.description;
        
        const backendTitle = skillCards[1]?.querySelector('.skill-title');
        const backendDesc = skillCards[1]?.querySelector('.skill-description');
        if (backendTitle) backendTitle.textContent = t.skills.backend.title;
        if (backendDesc) backendDesc.textContent = t.skills.backend.description;
        
        const automationTitle = skillCards[2]?.querySelector('.skill-title');
        const automationDesc = skillCards[2]?.querySelector('.skill-description');
        if (automationTitle) automationTitle.textContent = t.skills.automation.title;
        if (automationDesc) automationDesc.textContent = t.skills.automation.description;
        
        const databaseTitle = skillCards[3]?.querySelector('.skill-title');
        const databaseDesc = skillCards[3]?.querySelector('.skill-description');
        if (databaseTitle) databaseTitle.textContent = t.skills.database.title;
        if (databaseDesc) databaseDesc.textContent = t.skills.database.description;
    }
    
    // Update work section (with safety checks)
    const workTitle = document.querySelector('#work .section-title');
    const workSubtitle = document.querySelector('#work .section-subtitle');
    
    if (workTitle) workTitle.textContent = t.work.title;
    if (workSubtitle) workSubtitle.textContent = t.work.subtitle;
    
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length >= 3) {
        // Project 1
        projectCards[0].querySelector('.project-title').textContent = t.work.project1.title;
        const project1Desc = projectCards[0].querySelector('.project-description');
        project1Desc.innerHTML = `
             ${t.work.project1.problemDesc}
            
        `;
        
        // Project 2
        projectCards[1].querySelector('.project-title').textContent = t.work.project2.title;
        const project2Desc = projectCards[1].querySelector('.project-description');
        project2Desc.innerHTML = `
             ${t.work.project2.problemDesc}
            
        `;
        
        // Project 3
        projectCards[2].querySelector('.project-title').textContent = t.work.project3.title;
        const project3Desc = projectCards[2].querySelector('.project-description');
        project3Desc.innerHTML = `
             ${t.work.project3.problemDesc}
            
        `;
        
        // Update project links
        document.querySelectorAll('.project-link').forEach(link => {
            if (link.textContent.includes('Live') || link.textContent.includes('Demo')) {
                link.innerHTML = `<i class="fas fa-external-link-alt"></i> ${t.work.liveDemo}`;
            } else if (link.textContent.includes('GitHub')) {
                link.innerHTML = `<i class="fab fa-github"></i> ${t.work.github}`;
            }
        });
    }
    
    // Update testimonials section (with safety checks)
    const testimonialsTitle = document.querySelector('#testimonials .section-title');
    const testimonialsSubtitle = document.querySelector('#testimonials .section-subtitle');
    
    if (testimonialsTitle) testimonialsTitle.textContent = t.testimonials.title;
    if (testimonialsSubtitle) testimonialsSubtitle.textContent = t.testimonials.subtitle;
    
    // Update blog section (with safety checks)
    const blogTitle = document.querySelector('#blog .section-title');
    const blogSubtitle = document.querySelector('#blog .section-subtitle');
    
    if (blogTitle) blogTitle.textContent = t.blog.title;
    if (blogSubtitle) blogSubtitle.textContent = t.blog.subtitle;
    
    document.querySelectorAll('.blog-link').forEach(link => {
        link.innerHTML = `${t.blog.readMore} <i class="fas fa-arrow-right"></i>`;
    });
    
    const blogCTA = document.querySelector('.blog-cta .btn');
    if (blogCTA) {
        blogCTA.innerHTML = `<i class="fas fa-newspaper"></i> ${t.blog.viewMore}`;
    }
    
    // Update contact section
    document.querySelector('#contact .section-title').textContent = t.contact.title;
    document.querySelector('#contact .section-subtitle').textContent = t.contact.subtitle;
    
    document.getElementById('name').placeholder = t.contact.namePlaceholder;
    document.getElementById('email').placeholder = t.contact.emailPlaceholder;
    document.getElementById('company').placeholder = t.contact.companyPlaceholder;
    document.getElementById('message').placeholder = t.contact.messagePlaceholder;
    
    const submitBtnText = document.querySelector('.submit-btn .btn-text');
    if (submitBtnText) {
        submitBtnText.innerHTML = `<i class="fas fa-paper-plane"></i> ${t.contact.sendMessage}`;
    }
    
    const submitBtnLoading = document.querySelector('.submit-btn .btn-loading');
    if (submitBtnLoading) {
        submitBtnLoading.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${t.contact.sending}`;
    }
    
    // Update footer
    const footerDescription = document.querySelector('.footer-brand p');
    if (footerDescription) {
        footerDescription.textContent = t.footer.description;
    }
    
    const footerNavTitle = document.querySelector('.footer-section h3');
    if (footerNavTitle) {
        footerNavTitle.textContent = t.footer.navigation;
    }
    
    const footerCopyright = document.querySelector('.footer-bottom p');
    if (footerCopyright) {
        footerCopyright.textContent = t.footer.copyright;
    }
    
    // Update typewriter text
    if (typewriterText) {
    typewriterText.textContent = '';
    typeWriter(t.hero.greeting, {
        speed: 80,         // Más rápido (menor valor = más rápido)
        initialDelay: 300,
        sound: true
    });
}
}

function updateLanguageUI(lang) {
    const langMap = {
        'en': { flag: '🇺🇸', code: 'EN' },
        'es': { flag: '🇪🇸', code: 'ES' },
        'de': { flag: '🇩🇪', code: 'DE' },
        'pt': { flag: '🇵🇹', code: 'PT' }
    };
    
    currentLangSpan.textContent = langMap[lang].code;
    
    languageOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
    });
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateLanguage(lang);
    updateLanguageUI(lang);
    closeLangDropdown();
}

function toggleLangDropdown() {
    languageToggle.classList.toggle('active');
    languageDropdown.classList.toggle('active');
}

function closeLangDropdown() {
    languageToggle.classList.remove('active');
    languageDropdown.classList.remove('active');
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        updateThemeIcons('dark');
    } else {
        document.body.classList.remove('dark');
        updateThemeIcons('light');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    const theme = isDark ? 'dark' : 'light';

    localStorage.setItem('theme', theme);
    updateThemeIcons(theme);

    // Forzar repaint para que el cambio se refleje de inmediato
    void document.body.offsetWidth; // ← esta línea forza un reflow
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}


function updateThemeIcons(theme) {
    themeIcons.forEach(icon => {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// Navigation
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function smoothScrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const navbar = document.querySelector('.navbar');
        const offset = navbar.offsetHeight;
        const targetPosition = target.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    navbar.style.background = scrolled 
        ? (document.body.classList.contains('dark') 
            ? 'rgba(15, 23, 42, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)')
        : (document.body.classList.contains('dark') 
            ? 'rgba(15, 23, 42, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)');
    
    navbar.style.boxShadow = scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none';
}

// --- Typewriter Sound ---
const typingAudio = new Audio('../Assets/audio/keyboard_sound.wav');
typingAudio.volume = 0.6;
typingAudio.playbackRate = 2.5; 

function typeWriter(textToType = "Hi, I'm Jhon Ramirez", options = {}) {
    const {
        speed = 80,           // Slower speed (lower = faster)
        initialDelay = 400,
        sound = false
    } = options;

    if (!typewriterText) return;

    if (isTyping) {
        clearTimeout(typingTimeoutId);
        isTyping = false;
        document.body.classList.remove('typing-done');
    }

    const text = textToType;
    let i = 0;
    typewriterText.textContent = '';
    isTyping = true;

    const greetingSet = new Set(
        Object.values(translations).map(lang => lang.hero.greeting)
    );

    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            typewriterText.textContent += char;

            if (sound && greetingSet.has(textToType) && /\S/.test(char)) {
                typingAudio.pause();
                typingAudio.currentTime = 0;
                typingAudio.play();
            }

            i++;
            typingTimeoutId = setTimeout(type, speed);
        } else {
            isTyping = false;
            document.body.classList.add('typing-done');
        }
    }

    typingTimeoutId = setTimeout(type, initialDelay);
}


// Skills Slider
function updateSkillsSlider() {
    const slides = document.querySelectorAll('.skill-card');
    const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(skillsSlider).gap);
    const maxSlide = Math.max(0, slides.length - getSlidesPerView());
    
    currentSkillSlide = Math.min(currentSkillSlide, maxSlide);
    
    const transform = -currentSkillSlide * slideWidth;
    skillsSlider.style.transform = `translateX(${transform}px)`;
    
    // Update button states
    skillsPrev.disabled = currentSkillSlide === 0;
    skillsNext.disabled = currentSkillSlide >= maxSlide;
    
    skillsPrev.style.opacity = currentSkillSlide === 0 ? '0.5' : '1';
    skillsNext.style.opacity = currentSkillSlide >= maxSlide ? '0.5' : '1';
}

function getSlidesPerView() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 640) return 2;
    return 1;
}

function nextSkillSlide() {
    const slides = document.querySelectorAll('.skill-card');
    const maxSlide = Math.max(0, slides.length - getSlidesPerView());
    
    if (currentSkillSlide < maxSlide) {
        currentSkillSlide++;
    } else {
        currentSkillSlide = 0; // Loop back to start
    }
    updateSkillsSlider();
}

function prevSkillSlide() {
    if (currentSkillSlide > 0) {
        currentSkillSlide--;
    } else {
        // Loop to end
        const slides = document.querySelectorAll('.skill-card');
        currentSkillSlide = Math.max(0, slides.length - getSlidesPerView());
    }
    updateSkillsSlider();
}

function startSkillsAutoPlay() {
    skillsAutoPlay = setInterval(nextSkillSlide, 5000);
}

function stopSkillsAutoPlay() {
    if (skillsAutoPlay) {
        clearInterval(skillsAutoPlay);
    }
}

// Testimonials Slider
function updateTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentTestimonialSlide);
    });
    
    testimonialDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonialSlide);
    });
}

function nextTestimonial() {
    const slides = document.querySelectorAll('.testimonial-slide');
    currentTestimonialSlide = (currentTestimonialSlide + 1) % slides.length;
    updateTestimonialSlider();
}

function prevTestimonial() {
    const slides = document.querySelectorAll('.testimonial-slide');
    currentTestimonialSlide = currentTestimonialSlide === 0 
        ? slides.length - 1 
        : currentTestimonialSlide - 1;
    updateTestimonialSlider();
}

function goToTestimonial(index) {
    currentTestimonialSlide = index;
    updateTestimonialSlider();
}

// Form Validation and Submission
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
    
    const t = translations[currentLanguage];
    
    // Name validation
    if (!name.value.trim()) {
        document.getElementById('name-error').textContent = t.contact.nameRequired;
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        document.getElementById('email-error').textContent = t.contact.emailRequired;
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        document.getElementById('email-error').textContent = t.contact.emailInvalid;
        isValid = false;
    }
    
    // Message validation
    if (!message.value.trim()) {
        document.getElementById('message-error').textContent = t.contact.messageRequired;
        isValid = false;
    } else if (message.value.trim().length < 10) {
        document.getElementById('message-error').textContent = t.contact.messageLength;
        isValid = false;
    }
    
    return isValid;
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

function setFormLoading(loading) {
    isFormSubmitting = loading;
    submitBtn.classList.toggle('loading', loading);
    submitBtn.disabled = loading;
}



// Parallax Effects
function handleParallax() {
    const scrolled = window.pageYOffset;
    
    // Hero parallax background
    const parallaxImage = document.querySelector('.parallax-image');
    if (parallaxImage) {
        const speed = 0.5;
        parallaxImage.style.transform = `translate(-50%, -50%) translate3d(0, ${scrolled * speed}px, 0)`;
    }
    
    // Project images parallax
    const projectImages = document.querySelectorAll('.project-img');
    projectImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        const speed = 0.1;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = -(scrolled - img.offsetTop) * speed;
            img.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
    });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .testimonial-slide, .blog-card, .contact-item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Special handling for mobile project cards pulse animation
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && window.innerWidth <= 767) {
                entry.target.classList.add('pulse-in');
                setTimeout(() => {
                    entry.target.classList.remove('pulse-in');
                }, 600);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
}

// Touch gestures for mobile sliders
function initTouchGestures() {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Skills slider touch
    skillsSlider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        stopSkillsAutoPlay();
    });
    
    skillsSlider.addEventListener('touchmove', (e) => {
        e.preventDefault();
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
    });
    
    skillsSlider.addEventListener('touchend', () => {
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSkillSlide();
            } else {
                prevSkillSlide();
            }
        }
        
        startSkillsAutoPlay();
    });
    
    // Testimonials touch
    testimonialsContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    testimonialsContainer.addEventListener('touchmove', (e) => {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
    });
    
    testimonialsContainer.addEventListener('touchend', () => {
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextTestimonial();
            } else {
                prevTestimonial();
            }
        }
    });
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Skip if user is typing in an input
        if (e.target.matches('input, textarea')) {
            return;
        }
        
        switch (e.key) {
            case 'ArrowLeft':
                if (e.target.closest('.skills-slider-container')) {
                    e.preventDefault();
                    prevSkillSlide();
                } else if (e.target.closest('.testimonials-slider')) {
                    e.preventDefault();
                    prevTestimonial();
                }
                break;
            case 'ArrowRight':
                if (e.target.closest('.skills-slider-container')) {
                    e.preventDefault();
                    nextSkillSlide();
                } else if (e.target.closest('.testimonials-slider')) {
                    e.preventDefault();
                    nextTestimonial();
                }
                break;
            case 'Escape':
                closeMobileMenu();
                closeLangDropdown();
                break;
        }
    });
}

// Performance optimization for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Resize handler
function handleResize() {
    updateSkillsSlider();
    
    // Close mobile menu on resize to larger screen
    if (window.innerWidth >= 768) {
        closeMobileMenu();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language and theme
    initLanguage();
    initTheme();
    
 // Start typewriter effect on load with sound
    const greeting = translations[currentLanguage].hero.greeting;
    typeWriter(greeting, {
        speed: 80,
        initialDelay: 300,
        sound: true
    });
    
    // Initialize sliders
    updateSkillsSlider();
    updateTestimonialSlider();
    // Don't start autoplay immediately
    
    // Initialize observers and gestures
    initIntersectionObserver();
    initTouchGestures();
    initKeyboardNavigation();
    
    // Event listeners
    themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });
    
    // Language toggle
    languageToggle.addEventListener('click', toggleLangDropdown);
    
    // Language options
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            changeLanguage(option.dataset.lang);
        });
    });
    
    hamburger.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScrollToSection(targetId);
            closeMobileMenu();
        });
    });
    
    // Skills slider controls
    skillsNext.addEventListener('click', () => {
        stopSkillsAutoPlay();
        nextSkillSlide();
        startSkillsAutoPlay();
    });
    
    skillsPrev.addEventListener('click', () => {
        stopSkillsAutoPlay();
        prevSkillSlide();
        startSkillsAutoPlay();
    });
    
    // Testimonials controls
    testimonialNext.addEventListener('click', nextTestimonial);
    testimonialPrev.addEventListener('click', prevTestimonial);
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToTestimonial(index));
    });
    
    // Form submission
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Scroll events (throttled for performance)
    window.addEventListener('scroll', throttle(() => {
        handleNavbarScroll();
        handleParallax();
    }, 16)); // ~60fps
    
    // Resize events (throttled)
    window.addEventListener('resize', throttle(handleResize, 250));
    
    // Pause autoplay when user interacts with skills section
    const skillsSection = document.querySelector('.skills');
    skillsSection.addEventListener('mouseenter', stopSkillsAutoPlay);
    skillsSection.addEventListener('mouseleave', startSkillsAutoPlay);
    
    // Handle focus for accessibility
    skillsSlider.addEventListener('focusin', stopSkillsAutoPlay);
    skillsSlider.addEventListener('focusout', startSkillsAutoPlay);
    
    // Smooth scroll for anchor links
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            smoothScrollToSection(targetId);
        }
        
        // Close language dropdown when clicking outside
        if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
            closeLangDropdown();
        }
        
        // Close mobile menu when clicking outside
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });
});

// Handle visibility change (pause autoplay when tab is not visible)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopSkillsAutoPlay();
    } else {
        startSkillsAutoPlay();
    }
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Service Worker for caching (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Error handling for images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        // You could set a fallback image here
        // e.target.src = '/fallback-image.jpg';
    }
}, true);

// Utility function for smooth animations
function animateElement(element, keyframes, options = {}) {
    const defaultOptions = {
        duration: 300,
        easing: 'ease-out',
        fill: 'forwards'
    };
    
    return element.animate(keyframes, { ...defaultOptions, ...options });
}

// Export for potential external use
window.PortfolioApp = {
    toggleTheme,
    changeLanguage,
    smoothScrollToSection,
    nextSkillSlide,
    prevSkillSlide,
    nextTestimonial,
    prevTestimonial,
    animateElement
};
