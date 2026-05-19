const navToggler = document.querySelector('[data-nav-toggler]');
const navBar = document.querySelector('[data-navbar]');
const navLinks = document.querySelectorAll('.nav-link');
const progressBar = document.getElementById('scrollProgress');
const revealElements = document.querySelectorAll('[data-reveal]');
const modalTriggers = document.querySelectorAll('[data-modal-target]');
const modals = document.querySelectorAll('[data-modal]');
const modalClosers = document.querySelectorAll('[data-modal-close]');
const galleryItems = document.querySelectorAll('[data-gallery-target]');
const galleryOverlay = document.createElement('div');
const scheduleButtons = document.querySelectorAll('[data-tab-target]');
const toggleSwitch = document.getElementById('billingToggle');
const pricingCards = document.querySelectorAll('.pricing-card');

if (navToggler && navBar) {
  navToggler.addEventListener('click', () => {
    navBar.classList.toggle('active');
    navToggler.classList.toggle('active');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navBar.classList.remove('active');
    navToggler.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  const scrollAmount = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollAmount / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((el) => revealObserver.observe(el));

modalTriggers.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.modalTarget);
    if (target) target.classList.add('active');
  });
});

modalClosers.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('[data-modal]');
    if (modal) modal.classList.remove('active');
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.classList.remove('active');
  });
});

galleryOverlay.className = 'gallery-lightbox';
galleryOverlay.style.position = 'fixed';
galleryOverlay.style.inset = '0';
galleryOverlay.style.background = 'rgba(0,0,0,0.92)';
galleryOverlay.style.display = 'none';
galleryOverlay.style.alignItems = 'center';
galleryOverlay.style.justifyContent = 'center';
galleryOverlay.style.zIndex = '100';
galleryOverlay.style.padding = '2rem';
const lightboxImage = document.createElement('img');
lightboxImage.style.maxWidth = '100%';
lightboxImage.style.maxHeight = '100%';
lightboxImage.style.borderRadius = '24px';
lightboxImage.style.boxShadow = '0 40px 90px rgba(0,0,0,0.55)';
galleryOverlay.appendChild(lightboxImage);
galleryOverlay.addEventListener('click', () => { galleryOverlay.style.display = 'none'; });
document.body.appendChild(galleryOverlay);

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const src = item.dataset.galleryTarget;
    if (src) {
      lightboxImage.src = src;
      galleryOverlay.style.display = 'grid';
    }
  });
});

scheduleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    scheduleButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const target = document.getElementById(button.dataset.tabTarget);
    document.querySelectorAll('.class-block').forEach((block) => block.classList.remove('active'));
    if (target) target.classList.add('active');
  });
});

if (toggleSwitch) {
  toggleSwitch.addEventListener('click', () => {
    toggleSwitch.classList.toggle('active');
    const isYearly = toggleSwitch.classList.contains('active');
    toggleSwitch.setAttribute('aria-pressed', isYearly.toString());
    pricingCards.forEach((card) => {
      const price = card.querySelector('[data-price-month]');
      if (price) {
        const month = price.dataset.priceMonth;
        const year = price.dataset.priceYear;
        price.textContent = isYearly ? $ : $;
      }
    });
  });
}

const testimonials = document.querySelectorAll('.testimonial-card');
let activeIndex = 0;
if (testimonials.length > 0) {
  setInterval(() => {
    testimonials[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % testimonials.length;
    testimonials[activeIndex].classList.add('active');
  }, 7000);
}
