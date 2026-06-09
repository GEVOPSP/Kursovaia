// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
// BURGER MENU
// ===========================
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

if (burger) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ===========================
// GALLERY LIGHTBOX
// ===========================
const galleryCards = document.querySelectorAll('.gallery-card');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');

const scenes = ['scene-1','scene-2','scene-3','scene-4','scene-5','scene-6'];
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const card = galleryCards[index];
  const imgDiv = card.querySelector('.gallery-img');
  const caption = card.querySelector('.gallery-caption').textContent;

  lbImg.className = 'lightbox-img ' + scenes[index];
  lbCaption.textContent = caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

if (galleryCards.length > 0) {
  galleryCards.forEach((card, i) => {
    card.addEventListener('click', () => openLightbox(i));
  });

  lbClose.addEventListener('click', closeLightbox);

  lbPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryCards.length) % galleryCards.length;
    openLightbox(currentIndex);
  });

  lbNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryCards.length;
    openLightbox(currentIndex);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbPrev.click();
    if (e.key === 'ArrowRight') lbNext.click();
  });
}

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================
const revealElements = document.querySelectorAll(
  '.feature-card, .char-card, .sysreq-card, .ps5-card, .gallery-card, .info-card'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
