// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
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
if (document.querySelector('.stat-number')) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('.stat-number').forEach(counter => {
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
