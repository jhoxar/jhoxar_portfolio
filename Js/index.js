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

// State
let currentSkillSlide = 0;
let currentTestimonialSlide = 0;
let skillsAutoPlay;
let isFormSubmitting = false;
let currentLanguage = 'en';
let typingTimeoutId;
let isTyping = false;

// Translations
const translations = {
    en: {
        nav: {
            home: "Start",
            skills: "Skills",
            work: "Work",
            testimonials: "Love",
            blog: "Posts",
            contact: "Hi"
        },
        hero: {
            greeting: "Hi, I'm Jhon Ramirez",
            subtitle: "I translate strategy into scalable full-stack & AI solutions.",
            downloadCV: "Download CV",
            letsTalk: "Let's Talk"
        },
        skills: {
            title: "My Skills",
            subtitle: "Technologies and expertise that drive innovation",
            frontend: {
                title: "Frontend Development",
                description: "Modern React, Vue.js, and vanilla JS applications with responsive design"
            },
            backend: {
                title: "Backend Development", 
                description: "Scalable APIs, microservices, and cloud infrastructure solutions"
            },
            automation: {
                title: "AI & Automation",
                description: "Machine learning models and intelligent automation systems"
            },
            database: {
                title: "Database Design",
                description: "Optimized database architectures for high-performance applications"
            }
        },
        work: {
            title: "My Work",
            subtitle: "Featured projects showcasing innovation and impact",
            project1: {
                title: "AI-Powered E-commerce Platform",
                problem: "Problem:",
                problemDesc: "Traditional e-commerce lacks personalization.",
                solution: "Solution:",
                solutionDesc: "AI-driven recommendation engine with real-time analytics.",
                result: "Result:",
                resultDesc: "40% increase in conversion rates and user engagement."
            },
            project2: {
                title: "Real-time Analytics Dashboard",
                problemDesc: "Complex data visualization needs.",
                solutionDesc: "Interactive dashboard with real-time data streaming.",
                resultDesc: "Reduced decision-making time by 60% for stakeholders."
            },
            project3: {
                title: "Intelligent Process Automation",
                problemDesc: "Manual repetitive business processes.",
                solutionDesc: "AI-driven automation with natural language processing.",
                resultDesc: "80% reduction in processing time and human errors."
            },
            liveDemo: "Live Demo",
            github: "GitHub"
        },
        testimonials: {
            title: "Testimonials",
            subtitle: "What clients and colleagues say about my work"
        },
        blog: {
            title: "Latest Insights",
            subtitle: "Thoughts on technology, innovation, and digital transformation",
            readMore: "Read more",
            viewMore: "Ver más artículos"
        },
        contact: {
            title: "Ready to automate and scale your business?",
            subtitle: "Let's discuss how we can transform your ideas into powerful solutions",
            namePlaceholder: "Your full name",
            emailPlaceholder: "your.email@company.com",
            companyPlaceholder: "Company name (optional)",
            messagePlaceholder: "Tell me about your project and how I can help you scale your business...",
            sendMessage: "Send Message",
            sending: "Sending...",
            nameRequired: "Name is required",
            emailRequired: "Email is required",
            emailInvalid: "Please enter a valid email",
            messageRequired: "Message is required",
            messageLength: "Message must be at least 10 characters long",
            successMessage: "Message sent successfully! I'll get back to you soon.",
            errorMessage: "Error sending message. Please try again."
        },
        footer: {
            description: "Software Engineer | Full-Stack & Automation Specialist",
            navigation: "Navigation",
            copyright: "© 2025 Jhon Ramirez. All rights reserved."
        }
    },
    es: {
        nav: {
            home: "Ir",
            skills: "Tech",
            work: "Proy",
            testimonials: "Voz",
            blog: "Post",
            contact: "Habla"
        },
        hero: {
            greeting: "Hola, soy Jhon Ramirez",
            subtitle: "Transformo estrategias en soluciones escalables de full-stack e IA.",
            downloadCV: "Descargar CV",
            letsTalk: "Hablemos"
        },
        skills: {
            title: "Mis Habilidades",
            subtitle: "Tecnologías y experiencia que impulsan la innovación",
            frontend: {
                title: "Desarrollo Frontend",
                description: "Aplicaciones modernas con React, Vue.js y JavaScript vanilla con diseño responsivo"
            },
            backend: {
                title: "Desarrollo Backend",
                description: "APIs escalables, microservicios y soluciones de infraestructura en la nube"
            },
            automation: {
                title: "IA y Automatización",
                description: "Modelos de aprendizaje automático y sistemas de automatización inteligente"
            },
            database: {
                title: "Diseño de Bases de Datos",
                description: "Arquitecturas de bases de datos optimizadas para aplicaciones de alto rendimiento"
            }
        },
        work: {
            title: "Mi Trabajo",
            subtitle: "Proyectos destacados que muestran innovación e impacto",
            project1: {
                title: "Plataforma E-commerce con IA",
                problem: "Problema:",
                problemDesc: "El e-commerce tradicional carece de personalización.",
                solution: "Solución:",
                solutionDesc: "Motor de recomendaciones impulsado por IA con análisis en tiempo real.",
                result: "Resultado:",
                resultDesc: "40% de aumento en tasas de conversión y engagement del usuario."
            },
            project2: {
                title: "Dashboard de Análisis en Tiempo Real",
                problemDesc: "Necesidades complejas de visualización de datos.",
                solutionDesc: "Dashboard interactivo con streaming de datos en tiempo real.",
                resultDesc: "Reducción del 60% en tiempo de toma de decisiones para stakeholders."
            },
            project3: {
                title: "Automatización Inteligente de Procesos",
                problemDesc: "Procesos empresariales manuales y repetitivos.",
                solutionDesc: "Automatización impulsada por IA con procesamiento de lenguaje natural.",
                resultDesc: "80% de reducción en tiempo de procesamiento y errores humanos."
            },
            liveDemo: "Demo en Vivo",
            github: "GitHub"
        },
        testimonials: {
            title: "Testimonios",
            subtitle: "Lo que dicen clientes y colegas sobre mi trabajo"
        },
        blog: {
            title: "Últimas Reflexiones",
            subtitle: "Pensamientos sobre tecnología, innovación y transformación digital",
            readMore: "Leer más",
            viewMore: "Ver más artículos"
        },
        contact: {
            title: "¿Listo para automatizar y escalar tu negocio?",
            subtitle: "Conversemos sobre cómo podemos transformar tus ideas en soluciones poderosas",
            namePlaceholder: "Tu nombre completo",
            emailPlaceholder: "tu.email@empresa.com",
            companyPlaceholder: "Nombre de la empresa (opcional)",
            messagePlaceholder: "Cuéntame sobre tu proyecto y cómo puedo ayudarte a escalar tu negocio...",
            sendMessage: "Enviar Mensaje",
            sending: "Enviando...",
            nameRequired: "El nombre es requerido",
            emailRequired: "El email es requerido",
            emailInvalid: "Por favor ingresa un email válido",
            messageRequired: "El mensaje es requerido",
            messageLength: "El mensaje debe tener al menos 10 caracteres",
            successMessage: "¡Mensaje enviado exitosamente! Te contactaré pronto.",
            errorMessage: "Error al enviar el mensaje. Por favor intenta de nuevo."
        },
        footer: {
            description: "Ingeniero de Software | Especialista en Full-Stack y Automatización",
            navigation: "Navegación",
            copyright: "© 2025 Jhon Ramirez. Todos los derechos reservados."
        }
    },
    de: {
        nav: {
            home: "Home",
            skills: "Stack",
            work: "Works",
            testimonials: "Echo",
            blog: "Texte",
            contact: "Hi"
        },
        hero: {
            greeting: "Hallo, ich bin Jhon Ramirez",
            subtitle: "Ich übersetze Strategien in skalierbare Full-Stack- und KI-Lösungen.",
            downloadCV: "Lebenslauf herunterladen",
            letsTalk: "Sprechen wir"
        },
        skills: {
            title: "Meine Fähigkeiten",
            subtitle: "Technologien und Expertise, die Innovation vorantreiben",
            frontend: {
                title: "Frontend-Entwicklung",
                description: "Moderne React-, Vue.js- und Vanilla-JS-Anwendungen mit responsivem Design"
            },
            backend: {
                title: "Backend-Entwicklung",
                description: "Skalierbare APIs, Microservices und Cloud-Infrastrukturlösungen"
            },
            automation: {
                title: "KI & Automatisierung",
                description: "Machine-Learning-Modelle und intelligente Automatisierungssysteme"
            },
            database: {
                title: "Datenbankdesign",
                description: "Optimierte Datenbankarchitekturen für hochperformante Anwendungen"
            }
        },
        work: {
            title: "Meine Arbeit",
            subtitle: "Ausgewählte Projekte, die Innovation und Wirkung zeigen",
            project1: {
                title: "KI-gestützte E-Commerce-Plattform",
                problem: "Problem:",
                problemDesc: "Traditioneller E-Commerce mangelt an Personalisierung.",
                solution: "Lösung:",
                solutionDesc: "KI-gestützte Empfehlungsmaschine mit Echtzeitanalyse.",
                result: "Ergebnis:",
                resultDesc: "40% Steigerung der Conversion-Raten und Nutzerbindung."
            },
            project2: {
                title: "Echtzeit-Analytics-Dashboard",
                problemDesc: "Komplexe Datenvisualisierungsanforderungen.",
                solutionDesc: "Interaktives Dashboard mit Echtzeit-Datenstreaming.",
                resultDesc: "60% Reduzierung der Entscheidungszeit für Stakeholder."
            },
            project3: {
                title: "Intelligente Prozessautomatisierung",
                problemDesc: "Manuelle repetitive Geschäftsprozesse.",
                solutionDesc: "KI-gestützte Automatisierung mit natürlicher Sprachverarbeitung.",
                resultDesc: "80% Reduzierung der Bearbeitungszeit und menschlicher Fehler."
            },
            liveDemo: "Live Demo",
            github: "GitHub"
        },
        testimonials: {
            title: "Referenzen",
            subtitle: "Was Kunden und Kollegen über meine Arbeit sagen"
        },
        blog: {
            title: "Neueste Erkenntnisse",
            subtitle: "Gedanken zu Technologie, Innovation und digitaler Transformation",
            readMore: "Weiterlesen",
            viewMore: "Mehr Artikel anzeigen"
        },
        contact: {
            title: "Bereit, Ihr Unternehmen zu automatisieren und zu skalieren?",
            subtitle: "Lassen Sie uns besprechen, wie wir Ihre Ideen in leistungsstarke Lösungen verwandeln können",
            namePlaceholder: "Ihr vollständiger Name",
            emailPlaceholder: "ihre.email@unternehmen.com",
            companyPlaceholder: "Firmenname (optional)",
            messagePlaceholder: "Erzählen Sie mir von Ihrem Projekt und wie ich Ihnen beim Skalieren Ihres Unternehmens helfen kann...",
            sendMessage: "Nachricht senden",
            sending: "Wird gesendet...",
            nameRequired: "Name ist erforderlich",
            emailRequired: "E-Mail ist erforderlich",
            emailInvalid: "Bitte geben Sie eine gültige E-Mail ein",
            messageRequired: "Nachricht ist erforderlich",
            messageLength: "Nachricht muss mindestens 10 Zeichen lang sein",
            successMessage: "Nachricht erfolgreich gesendet! Ich melde mich bald bei Ihnen.",
            errorMessage: "Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut."
        },
        footer: {
            description: "Software Engineer | Full-Stack & Automatisierungs-Spezialist",
            navigation: "Navigation",
            copyright: "© 2025 Jhon Ramirez. Alle Rechte vorbehalten."
        }
    },
    pt: {
        nav: {
            home: "Ir",
            skills: "Tech",
            work: "Obra",
            testimonials: "Eco",
            blog: "Blog",
            contact: "Oi"
        },
        hero: {
            greeting: "Olá, eu sou Jhon Ramirez",
            subtitle: "Transformo estratégias em soluções escaláveis de full-stack e IA.",
            downloadCV: "Baixar CV",
            letsTalk: "Vamos Conversar"
        },
        skills: {
            title: "Minhas Habilidades",
            subtitle: "Tecnologias e experiência que impulsionam a inovação",
            frontend: {
                title: "Desenvolvimento Frontend",
                description: "Aplicações modernas React, Vue.js e JavaScript vanilla com design responsivo"
            },
            backend: {
                title: "Desenvolvimento Backend",
                description: "APIs escaláveis, microserviços e soluções de infraestrutura em nuvem"
            },
            automation: {
                title: "IA e Automação",
                description: "Modelos de machine learning e sistemas de automação inteligente"
            },
            database: {
                title: "Design de Banco de Dados",
                description: "Arquiteturas de banco de dados otimizadas para aplicações de alta performance"
            }
        },
        work: {
            title: "Meu Trabalho",
            subtitle: "Projetos em destaque mostrando inovação e impacto",
            project1: {
                title: "Plataforma E-commerce com IA",
                problem: "Problema:",
                problemDesc: "E-commerce tradicional carece de personalização.",
                solution: "Solução:",
                solutionDesc: "Engine de recomendação impulsionado por IA com análises em tempo real.",
                result: "Resultado:",
                resultDesc: "40% de aumento nas taxas de conversão e engajamento do usuário."
            },
            project2: {
                title: "Dashboard de Analytics em Tempo Real",
                problemDesc: "Necessidades complexas de visualização de dados.",
                solutionDesc: "Dashboard interativo com streaming de dados em tempo real.",
                resultDesc: "Redução de 60% no tempo de tomada de decisão para stakeholders."
            },
            project3: {
                title: "Automação Inteligente de Processos",
                problemDesc: "Processos empresariais manuais e repetitivos.",
                solutionDesc: "Automação impulsionada por IA com processamento de linguagem natural.",
                resultDesc: "80% de redução no tempo de processamento e erros humanos."
            },
            liveDemo: "Demo ao Vivo",
            github: "GitHub"
        },
        testimonials: {
            title: "Depoimentos",
            subtitle: "O que clientes e colegas dizem sobre meu trabalho"
        },
        blog: {
            title: "Últimas Reflexões",
            subtitle: "Pensamentos sobre tecnologia, inovação e transformação digital",
            readMore: "Ler mais",
            viewMore: "Ver mais artigos"
        },
        contact: {
            title: "Pronto para automatizar e escalar seu negócio?",
            subtitle: "Vamos discutir como podemos transformar suas ideias em soluções poderosas",
            namePlaceholder: "Seu nome completo",
            emailPlaceholder: "seu.email@empresa.com",
            companyPlaceholder: "Nome da empresa (opcional)",
            messagePlaceholder: "Conte-me sobre seu projeto e como posso ajudá-lo a escalar seu negócio...",
            sendMessage: "Enviar Mensagem",
            sending: "Enviando...",
            nameRequired: "Nome é obrigatório",
            emailRequired: "Email é obrigatório",
            emailInvalid: "Por favor, insira um email válido",
            messageRequired: "Mensagem é obrigatória",
            messageLength: "Mensagem deve ter pelo menos 10 caracteres",
            successMessage: "Mensagem enviada com sucesso! Entrarei em contato em breve.",
            errorMessage: "Erro ao enviar mensagem. Por favor, tente novamente."
        },
        footer: {
            description: "Engenheiro de Software | Especialista em Full-Stack e Automação",
            navigation: "Navegação",
            copyright: "© 2025 Jhon Ramirez. Todos os direitos reservados."
        }
    }
};

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
            <strong>${t.work.project1.problem}</strong> ${t.work.project1.problemDesc}<br>
            <strong>${t.work.project1.solution}</strong> ${t.work.project1.solutionDesc}<br>
            <strong>${t.work.project1.result}</strong> ${t.work.project1.resultDesc}
        `;
        
        // Project 2
        projectCards[1].querySelector('.project-title').textContent = t.work.project2.title;
        const project2Desc = projectCards[1].querySelector('.project-description');
        project2Desc.innerHTML = `
            <strong>${t.work.project1.problem}</strong> ${t.work.project2.problemDesc}<br>
            <strong>${t.work.project1.solution}</strong> ${t.work.project2.solutionDesc}<br>
            <strong>${t.work.project1.result}</strong> ${t.work.project2.resultDesc}
        `;
        
        // Project 3
        projectCards[2].querySelector('.project-title').textContent = t.work.project3.title;
        const project3Desc = projectCards[2].querySelector('.project-description');
        project3Desc.innerHTML = `
            <strong>${t.work.project1.problem}</strong> ${t.work.project3.problemDesc}<br>
            <strong>${t.work.project1.solution}</strong> ${t.work.project3.solutionDesc}<br>
            <strong>${t.work.project1.result}</strong> ${t.work.project3.resultDesc}
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

async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (isFormSubmitting || !validateForm()) {
        return;
    }
    
    setFormLoading(true);
    
    try {
        const formData = new FormData(contactForm);
        
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            const t = translations[currentLanguage];
            showFormMessage(t.contact.successMessage, 'success');
            contactForm.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        const t = translations[currentLanguage];
        showFormMessage(t.contact.errorMessage, 'error');
    } finally {
        setFormLoading(false);
    }
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
