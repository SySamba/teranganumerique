// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================
// Chatbox TERANGA NUMÉRIQUE
// ============================
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('tn-chatbox')) return; // avoid duplicate

  const chatWrapper = document.createElement('div');
  chatWrapper.id = 'tn-chatbox';
  chatWrapper.innerHTML = `
    <div class="tn-chat-toggle" aria-label="Ouvrir le chat" title="Chat TERANGA NUMÉRIQUE">
      <i class="fas fa-comments"></i>
      <span class="tn-badge" aria-hidden="true">1</span>
    </div>
    <div class="tn-chat-panel" role="dialog" aria-label="Chat TERANGA NUMÉRIQUE" aria-modal="false">
      <div class="tn-chat-header">
        <div class="tn-chat-title">
          <span class="tn-dot"></span>
          Chat TERANGA NUMÉRIQUE
        </div>
        <button class="tn-chat-close" aria-label="Fermer"><i class="fas fa-times"></i></button>
      </div>
      <div class="tn-chat-body">
        <div class="tn-chat-messages" aria-live="polite"></div>
        <div class="tn-quick-replies">
          <button data-intent="services"><i class="fas fa-layer-group"></i> Services</button>
          <button data-intent="devis"><i class="fas fa-calculator"></i> Devis</button>
          <button data-intent="contact"><i class="fas fa-envelope"></i> Contact</button>
          <button data-intent="apropos"><i class="fas fa-info-circle"></i> À propos</button>
          <button data-intent="localisation"><i class="fas fa-map-marker-alt"></i> Localisation</button>
          <button data-intent="horaires"><i class="fas fa-clock"></i> Horaires</button>
        </div>
      </div>
      <form class="tn-chat-input" aria-label="Envoyer un message">
        <input type="text" name="message" placeholder="Écrivez votre message..." autocomplete="off" />
        <button type="submit" aria-label="Envoyer"><i class="fas fa-paper-plane"></i></button>
      </form>
    </div>
  `;

  document.body.appendChild(chatWrapper);
  // Create and attach overlay for clearer focus when chat is open
  const overlay = document.createElement('div');
  overlay.className = 'tn-chat-overlay';
  document.body.appendChild(overlay);

  const toggle = chatWrapper.querySelector('.tn-chat-toggle');
  const panel = chatWrapper.querySelector('.tn-chat-panel');
  const closeBtn = chatWrapper.querySelector('.tn-chat-close');
  const messages = chatWrapper.querySelector('.tn-chat-messages');
  const form = chatWrapper.querySelector('.tn-chat-input');
  const input = form.querySelector('input[name="message"]');

  const intents = {
    services: `Voici nos services principaux:\n• Développement Web (vitrines, e-commerce, applications)\n• Intelligence Artificielle (chatbots, automatisation)\n• Cybersécurité (audit, conformité, formation)\n• Cloud Computing (migration, hébergement)\n\nEn savoir plus: https://teranganumerique.com/services.html`,
    devis: `Nous proposons un devis gratuit et rapide. Cliquez ici: https://teranganumerique.com/devis.html`,
    contact: `Vous pouvez nous joindre au +221 77 472 73 62 ou par email: contact@teranganumerique.com\nFormulaire: https://teranganumerique.com/contact.html`,
    apropos: `Nous sommes TERANGA NUMÉRIQUE, entreprise sénégalaise créée en 2025 à Dakar. En savoir plus: https://teranganumerique.com/about.html`,
    localisation: `Nous sommes basés à Dakar, Sénégal.`,
    horaires: `Nous répondons généralement du lundi au vendredi, 9h–18h. Délais de réponse sous 24h.`
  };

  function addMessage(text, sender = 'bot') {
    const bubble = document.createElement('div');
    bubble.className = `tn-msg ${sender}`;
    bubble.innerHTML = text.replace(/\n/g, '<br>');
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function openPanel() {
    panel.classList.add('open');
    toggle.classList.add('hidden');
    overlay.classList.add('show');
    panel.setAttribute('aria-modal', 'true');
    if (!panel.dataset.welcomed) {
      addMessage(`<strong>Bienvenue chez TERANGA NUMÉRIQUE</strong> 👋<br>Comment puis-je vous aider ? Sélectionnez une option ou posez votre question.`, 'bot');
      panel.dataset.welcomed = '1';
    }
    input.focus();
  }

  function closePanel() {
    panel.classList.remove('open');
    toggle.classList.remove('hidden');
    overlay.classList.remove('show');
    panel.setAttribute('aria-modal', 'false');
  }

  function handleIntent(intentKey) {
    const answer = intents[intentKey] || `Je n'ai pas bien saisi. Essayez: services, devis, contact, à propos, localisation, horaires.`;
    addMessage(answer, 'bot');
  }

  toggle.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);

  chatWrapper.querySelectorAll('.tn-quick-replies button').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.intent;
      addMessage(btn.textContent.trim(), 'user');
      handleIntent(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';
    const lower = text.toLowerCase();
    if (lower.includes('service')) return handleIntent('services');
    if (lower.includes('devis') || lower.includes('prix') || lower.includes('tarif')) return handleIntent('devis');
    if (lower.includes('contact') || lower.includes('téléphone') || lower.includes('telephone') || lower.includes('email')) return handleIntent('contact');
    if (lower.includes('propos') || lower.includes('entreprise')) return handleIntent('apropos');
    if (lower.includes('local') || lower.includes('dakar') || lower.includes('adresse')) return handleIntent('localisation');
    if (lower.includes('horaire') || lower.includes('ouvert')) return handleIntent('horaires');
    // default
    handleIntent('services');
  });

  // Auto-open once per session after delay for first-time visitors
  try {
    const key = 'tn_chat_seen';
    if (!sessionStorage.getItem(key)) {
      setTimeout(() => {
        if (!panel.classList.contains('open')) {
          openPanel();
        }
        sessionStorage.setItem(key, '1');
      }, 3000);
    }
  } catch (e) { /* ignore private mode errors */ }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navUl.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navUl.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navUl && navUl.classList.contains('active')) {
            // Check if click is outside the menu and toggle button
            if (!navUl.contains(e.target) && !menuToggle.contains(e.target)) {
                navUl.classList.remove('active');
            }
        }
    });
    
    // Prevent menu from closing when clicking inside it
    if (navUl) {
        navUl.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Quote form submission
function handleQuoteForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        alert('Votre demande de devis a été envoyée ! Nous vous contacterons sous 24h.');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .service-card, .blog-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for animated elements
    const elements = document.querySelectorAll('.card, .service-card, .blog-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Animate on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 200;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Intersection Observer for counter animation
if (document.querySelector('.counter')) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('.counter').forEach(counter => {
        observer.observe(counter);
    });
}

// Service modal functionality
function openServiceModal(serviceName) {
    // Create modal content based on service
    const modalContent = getServiceModalContent(serviceName);
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            ${modalContent}
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function getServiceModalContent(serviceName) {
    const services = {
        'Développement Web': `
            <h2>Développement Web</h2>
            <p>Nous créons des sites web modernes, responsives et optimisés pour le SEO.</p>
            <ul>
                <li>Sites vitrines</li>
                <li>E-commerce</li>
                <li>Applications web</li>
                <li>CMS personnalisés</li>
            </ul>
            <a href="contact.html" class="cta-button">Demander un devis</a>
        `,
        'Intelligence Artificielle': `
            <h2>Intelligence Artificielle</h2>
            <p>Solutions IA pour automatiser et optimiser vos processus métier.</p>
            <ul>
                <li>Chatbots intelligents</li>
                <li>Analyse de données</li>
                <li>Machine Learning</li>
                <li>Vision par ordinateur</li>
            </ul>
            <a href="contact.html" class="cta-button">Demander un devis</a>
        `,
        'Cybersécurité': `
            <h2>Cybersécurité</h2>
            <p>Protégez vos données et systèmes avec nos solutions de sécurité avancées.</p>
            <ul>
                <li>Audit de sécurité</li>
                <li>Protection des données</li>
                <li>Surveillance réseau</li>
                <li>Formation sécurité</li>
            </ul>
            <a href="contact.html" class="cta-button">Demander un devis</a>
        `
    };
    
    return services[serviceName] || '<h2>Service</h2><p>Informations sur ce service.</p>';
}

// Quote Form Handler
function handleQuoteForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  
  // Show loading state
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
  submitButton.disabled = true;
  
  // Simulate form submission (replace with actual backend integration)
  setTimeout(() => {
    // Reset button
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
    
    // Show success message
    alert('Merci pour votre demande de devis ! Nous vous contacterons sous 24h pour discuter de votre projet en détail.');
    
    // Optional: Reset form
    form.reset();
  }, 2000);
}

// Newsletter Subscription
function handleNewsletterForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const email = form.querySelector('input[type="email"]').value;
  const submitButton = form.querySelector('button[type="submit"]');
  
  if (!email) {
    alert('Veuillez saisir votre adresse email.');
    return;
  }
  
  // Show loading state
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  submitButton.disabled = true;
  
  // Simulate subscription (replace with actual backend integration)
  setTimeout(() => {
    // Reset button
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
    
    // Show success message
    alert('Merci pour votre inscription ! Vous recevrez bientôt notre newsletter avec les dernières actualités tech.');
    
    // Reset form
    form.reset();
  }, 1500);
}
