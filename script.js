
// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const slides = document.querySelectorAll('.slide');
const contactForm = document.querySelector('.contact-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Hero Slider
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Auto-play slider
setInterval(nextSlide, 5000);

// Smooth scrolling for navigation links
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

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = '0s';
      entry.target.style.animationName = 'slideInUp';
      entry.target.style.animationDuration = '0.8s';
      entry.target.style.animationFillMode = 'both';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .news-card, .section-title').forEach(el => {
  observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  }
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Simple validation
  if (!data.name || !data.email || !data.service || !data.message) {
    showNotification('Veuillez remplir tous les champs requis.', 'error');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showNotification('Veuillez entrer une adresse email valide.', 'error');
    return;
  }
  
  // Simulate form submission
  showNotification('Message envoyé avec succès! Nous vous contacterons bientôt.', 'success');
  contactForm.reset();
});

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">
        ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
      </span>
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    transform: translateX(400px);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 400px;
  `;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Add click effects to news cards
document.querySelectorAll('.news-card').forEach(card => {
  card.addEventListener('click', () => {
    // Simulate opening news article
    showNotification('Fonctionnalité à venir - Article en cours de chargement...', 'info');
  });
  
  card.style.cursor = 'pointer';
});

// Table responsiveness helper
function makeTableResponsive() {
  const table = document.querySelector('.documents-table');
  const wrapper = document.querySelector('.table-wrapper');
  
  if (window.innerWidth < 768) {
    wrapper.style.overflowX = 'scroll';
    table.style.minWidth = '800px';
  } else {
    wrapper.style.overflowX = 'auto';
    table.style.minWidth = 'auto';
  }
}

// Call on load and resize
window.addEventListener('load', makeTableResponsive);
window.addEventListener('resize', makeTableResponsive);

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in-out';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.slide.active .slide-content h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 1000);
  }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const slides = document.querySelectorAll('.slide img');
  
  if (hero && scrolled < hero.offsetHeight) {
    slides.forEach(slide => {
      slide.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
  }
});

// Add counter animation for cost summary
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + '$';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '$';
    }
  }
  
  updateCounter();
}

// Initialize counter animation when cost summary is visible
const costObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const totalElement = document.querySelector('.total-cost span:last-child');
      if (totalElement && !totalElement.dataset.animated) {
        totalElement.dataset.animated = 'true';
        animateCounter(totalElement, 4405);
      }
    }
  });
});

const costSummary = document.querySelector('.cost-summary');
if (costSummary) {
  costObserver.observe(costSummary);
}

console.log('✅ EduTravel - Site web chargé avec succès!');
console.log('🌐 Fonctionnalités actives: Navigation, Slider, Animations, Formulaire de contact');
