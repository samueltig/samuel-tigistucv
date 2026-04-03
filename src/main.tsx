// External library declarations for TypeScript
declare var gsap: any;
declare var ScrollTrigger: any;
declare var lucide: any;

// Initialize Lucide icons
lucide.createIcons();

// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursorOuter = document.querySelector('.cursor-outer') as HTMLElement;
const cursorInner = document.querySelector('.cursor-inner') as HTMLElement;

document.addEventListener('mousemove', (e) => {
  gsap.to(cursorOuter, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    ease: 'power2.out'
  });
  gsap.to(cursorInner, {
    x: e.clientX,
    y: e.clientY,
    duration: 0,
  });
});

// Cursor Hover Effects
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
interactiveElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursorOuter, { scale: 1.5, borderColor: '#06b6d4', backgroundColor: 'rgba(6, 182, 212, 0.1)' });
    gsap.to(cursorInner, { scale: 0.5 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursorOuter, { scale: 1, borderColor: '#8b5cf6', backgroundColor: 'transparent' });
    gsap.to(cursorInner, { scale: 1 });
  });
});

// Scroll Progress
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.querySelector('.scroll-progress') as HTMLElement;
  if (progressBar) progressBar.style.width = scrolled + "%";
  
  // Navbar Scroll Effect
  const nav = document.querySelector('.navbar');
  if (winScroll > 50) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const words = ["Web Developer", "AI Enthusiast", "Creative Technologist", "Engineering Student"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  if (typingText) typingText.textContent = currentWord.substring(0, charIndex);

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
  type();
  
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
});

// Magnetic Buttons
const magneticBtns = document.querySelectorAll('.magnetic');
magneticBtns.forEach((btn) => {
  btn.addEventListener('mousemove', (e: any) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  });
});

// Scroll Reveals
const revealElements = document.querySelectorAll('.reveal');
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

revealElements.forEach(el => observer.observe(el));

// Hero Parallax
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX - window.innerWidth / 2) / 50;
  const y = (e.clientY - window.innerHeight / 2) / 50;
  
  gsap.to('.hero-image-wrapper', {
    rotateY: x,
    rotateX: -y,
    duration: 0.5,
    ease: 'power2.out'
  });
  
  gsap.to('.blob-1', { x: x * 2, y: y * 2, duration: 1 });
  gsap.to('.blob-2', { x: -x * 2, y: -y * 2, duration: 1 });
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach((card: any) => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        gsap.to(card, { opacity: 1, scale: 1, duration: 0.5, display: 'block' });
      } else {
        gsap.to(card, { opacity: 0, scale: 0.8, duration: 0.5, display: 'none' });
      }
    });
  });
});

// Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
  menuToggle.classList.toggle('open');
});
