<<<<<<< HEAD
﻿


if (window.location.hash) {

}


try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}

document.addEventListener('DOMContentLoaded', function () {
  
  try { window.scrollTo(0,0); } catch (e) {}
  
  window.addEventListener('load', function() { try { window.scrollTo(0,0); } catch(e) {} });

  
  (function setupHamburgerMenu(){
    const hamburgerToggle = document.getElementById('hamburgerToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-nav-link') : [];

    if (!hamburgerToggle || !mobileNav) return;

    
    const closeMenu = () => {
      hamburgerToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      
      document.body.style.cursor = 'auto';
      document.body.classList.remove('menu-cross', 'over-header');
    };

    
    hamburgerToggle.addEventListener('click', function() {
      hamburgerToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      
      document.body.style.cursor = '';
      document.body.classList.remove('menu-cross', 'over-header');
    });

    
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMenu();
      }
    });

    
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.hamburger-header') && mobileNav.classList.contains('active')) {
        closeMenu();
      }
    });

    
    window.addEventListener('scroll', function() {
      if (mobileNav.classList.contains('active')) {
        closeMenu();
      }
    }, { passive: true });

  })();

  /* Theme toggle behavior
     - Reads stored theme from localStorage (`site-theme`) and applies it by
       setting `data-theme` on the root `<html>` element.
     - Toggle stores the selection and updates `aria-pressed` for accessibility.
  */
  (function setupThemeToggle(){
    const KEY = 'site-theme';
    const themeToggle = document.getElementById('themeToggle');

    function applyTheme(theme) {
      try {
        if (theme === 'dark') document.documentElement.setAttribute('data-theme','dark');
        else document.documentElement.removeAttribute('data-theme');
        if (themeToggle) {
          const pressed = theme === 'dark' ? 'true' : 'false';
          themeToggle.setAttribute('aria-pressed', pressed);
        }
      } catch (e) { }
    }

    // Initialize theme from localStorage on page load
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) {
        applyTheme(stored);
      }
    } catch (e) { }

    // Toggle theme on button click
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        try {
          const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
          const next = current === 'dark' ? 'light' : 'dark';
          applyTheme(next);
          localStorage.setItem(KEY, next);
        } catch (e) { }
      });
    }
  })();

  // Contact form handler
  (function setupContactForm(){
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
=======
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    // --- Theme Management ---
    // Force Dark Mode
    document.body.classList.add('dark-theme');

    // --- Randomize Hero Icons ---
    const heroIcons = document.querySelectorAll('.hero-tech-icon');
    const iconClasses = [
        'fab fa-python', 'fas fa-database', 'fas fa-chart-bar', 'fas fa-chart-pie',
        'fas fa-chart-line', 'fas fa-table', 'fas fa-file-csv', 'fas fa-file-excel',
        'fas fa-code', 'fas fa-terminal', 'fas fa-server', 'fas fa-brain',
        'fas fa-project-diagram', 'fas fa-sitemap', 'fas fa-filter', 'fas fa-search',
        'fas fa-layer-group', 'fas fa-cloud', 'fas fa-laptop-code', 'fas fa-network-wired'
    ];

    if (heroIcons.length > 0) {
        // Fisher-Yates Shuffle
        for (let i = iconClasses.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [iconClasses[i], iconClasses[j]] = [iconClasses[j], iconClasses[i]];
        }
        
        heroIcons.forEach((icon, index) => {
            icon.className = `hero-tech-icon ${iconClasses[index % iconClasses.length]}`;
        });
    }

    // --- Mobile Navigation ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            toggleMenuIcon();
        });

        // Close mobile menu when a link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                toggleMenuIcon();
            });
        });

        // Close menu on scroll
        window.addEventListener('scroll', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                toggleMenuIcon();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mainNav.classList.contains('active') && !mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                toggleMenuIcon();
            }
        });

        // Helper to toggle icon
        function toggleMenuIcon() {
            const icon = mobileMenuBtn.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }

    // --- Navigation & Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Active Section Highlighter ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    const navIds = new Set();
    
    // Collect all section IDs that are actually linked in the navigation
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            navIds.add(href.substring(1));
        }
    });

    const highlightActiveSection = () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            // 150px offset to trigger highlight slightly before the section hits the very top
            if (scrollY >= (sectionTop - 150)) {
                if (navIds.has(sectionId)) {
                    current = sectionId;
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Run on load

    // Shows or hides the "Scroll to Top" button based on scroll position
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            scrollToTopBtn.classList.toggle('show', window.scrollY > 300);
            
            // Hide if overlapping footer
            const footer = document.querySelector('footer');
            if (footer && scrollToTopBtn.classList.contains('show')) {
                const footerRect = footer.getBoundingClientRect();
                if (footerRect.top < window.innerHeight) scrollToTopBtn.classList.remove('show');
            }
        });

        // Handles the click event for the "Scroll to Top" button
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Simple Image Modal Logic ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImage');
    const closeModal = document.querySelector('.close-modal');
    const galleryImages = document.querySelectorAll('.gallery-img');

    if (modal && modalImg && galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = "block";
                modalImg.src = img.src;
            });
        });
    }

    // Modal Close Logic
    if (modal && closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = "none";
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
>>>>>>> d6ac4af (updated ui)
    const formLoading = document.getElementById('formLoading');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

<<<<<<< HEAD
    if (!submitBtn || !formLoading || !formSuccess) return;

    contactForm.addEventListener('submit', function(e) {
      submitBtn.disabled = true;
      formLoading.style.display = 'flex';
      formSuccess.style.display = 'none';
      if (formError) formError.style.display = 'none';

      setTimeout(() => {
        submitBtn.disabled = false;
        formLoading.style.display = 'none';
        formSuccess.style.display = 'flex';
        
        setTimeout(() => {
          formSuccess.style.display = 'none';
          contactForm.reset();
        }, 5000);
      }, 2000);
    });
  })();

  
  (function setupScrollToTop(){
    const toTopBtn = document.getElementById('scrollToTop');
    if (!toTopBtn) return;

    
    function toggleBtn() {
      try {
        if (window.scrollY > 300) toTopBtn.classList.add('visible');
        else toTopBtn.classList.remove('visible');
      } catch (e) { }
    }

    toggleBtn();
    window.addEventListener('scroll', toggleBtn, { passive: true });
    toTopBtn.addEventListener('click', function (ev) {
      ev.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  
  const container = document.querySelector('.projects-showcase');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const indicators = Array.from(document.querySelectorAll('.indicator'));
  if (!container || !prevBtn || !nextBtn || indicators.length === 0) return;

  
  const slides = Array.from(container.querySelectorAll('.project-showcase-card'));
  let currentIndex = 0;
  const lastIndex = slides.length - 1;
  let isScrollingProgrammatically = false;
  let scrollTimeout = null;

  
  function setButtonState() {
    if (currentIndex <= 0) {
      prevBtn.classList.add('disabled');
      prevBtn.setAttribute('aria-disabled', 'true');
      prevBtn.disabled = true;
    } else {
      prevBtn.classList.remove('disabled');
      prevBtn.removeAttribute('aria-disabled');
      prevBtn.disabled = false;
    }

    if (currentIndex >= lastIndex) {
      nextBtn.classList.add('disabled');
      nextBtn.setAttribute('aria-disabled', 'true');
      nextBtn.disabled = true;
    } else {
      nextBtn.classList.remove('disabled');
      nextBtn.removeAttribute('aria-disabled');
      nextBtn.disabled = false;
    }
  }

  
  function updateIndicators() {
    indicators.forEach((btn, i) => {
      if (i === currentIndex) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }

  
  function goTo(index, smooth = true) {
    const clamped = Math.max(0, Math.min(lastIndex, index));
    currentIndex = clamped;
    setButtonState();
    updateIndicators();
    if (slides[currentIndex]) {
      isScrollingProgrammatically = true;
      slides[currentIndex].scrollIntoView({behavior: smooth ? 'smooth' : 'auto', block: 'nearest', inline: 'start'});
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => { isScrollingProgrammatically = false; }, 520);
    }
  }

  prevBtn.addEventListener('click', () => { if (!prevBtn.classList.contains('disabled')) goTo(currentIndex - 1); });
  nextBtn.addEventListener('click', () => { if (!nextBtn.classList.contains('disabled')) goTo(currentIndex + 1); });

  indicators.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      if (!Number.isNaN(idx)) goTo(idx);
    });
  });

  
  document.addEventListener('keydown', (ev) => {
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      goTo(currentIndex - 1);
    } else if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      goTo(currentIndex + 1);
    }
  });

  
  container.addEventListener('scroll', () => {
    if (isScrollingProgrammatically) return;
    window.clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(() => {
      const width = container.clientWidth || container.getBoundingClientRect().width;
      if (!width) return;
      const idx = Math.round(container.scrollLeft / width);
      if (idx !== currentIndex) {
        currentIndex = Math.max(0, Math.min(lastIndex, idx));
        setButtonState();
        updateIndicators();
      }
    }, 80);
  });

  
  goTo(0, false);
  
  window.__portfolioCarousel = { goTo, getCurrent: () => currentIndex };

  /* Outcome metric count-up when visible
     - Animates any element with `.metric-number` and a numeric `data-target` attribute
     - Runs once per element when it enters the viewport (threshold 50%) */
  (function setupOutcomeCounters(){
    try {
      const counters = Array.from(document.querySelectorAll('.metric-number[data-target]'));
      if (!counters.length) return;

      function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

      function animateValue(el, start, end, duration) {
        const startTime = performance.now();
        const suffix = el.dataset.suffix || '';

        function frame(now) {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          const eased = easeOutCubic(progress);
          const current = Math.floor(start + (end - start) * eased);
          el.textContent = String(current) + suffix;
          if (progress < 1) requestAnimationFrame(frame);
          else {
            el.textContent = String(end) + suffix;
          }
        }

        requestAnimationFrame(frame);
      }

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.dataset.counted) { obs.unobserve(el); return; }
          const raw = el.getAttribute('data-target') || el.textContent || '0';
          const n = parseInt(String(raw).replace(/[^0-9]/g, ''), 10) || 0;
          const plus = (String(raw).trim().endsWith('+')) ? '+' : '';
          if (n > 0) animateValue(el, 0, n, 1200);
          if (plus) el.dataset.suffix = '+';
          el.dataset.counted = '1';
          obs.unobserve(el);
        });
      }, { threshold: 0.5 });

      counters.forEach(el => { observer.observe(el); });
    } catch (e) { /* fail silently */ }
  })();

});

// Technical panels: expand/collapse behavior
document.addEventListener('DOMContentLoaded', function () {
  try {
    const toggles = Array.from(document.querySelectorAll('.tech-toggle'));
    toggles.forEach(btn => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : btn.nextElementSibling;
      if (!panel) return;

      // prepare panel for height animation
      panel.style.maxHeight = panel.classList.contains('open') ? panel.scrollHeight + 'px' : '0px';

      btn.addEventListener('click', function () {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        if (expanded) {
          // collapse
          panel.style.maxHeight = panel.scrollHeight + 'px';
          // allow the browser to paint before setting to 0
          requestAnimationFrame(() => {
            panel.classList.remove('open');
            panel.style.maxHeight = '0px';
          });
          btn.setAttribute('aria-expanded', 'false');
        } else {
          // open
          panel.classList.add('open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
          // ensure panel is visible in viewport on open
          setTimeout(() => { try { panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) {} }, 220);
        }
      });
    });
  } catch (e) { /* fail silently */ }

  // Projects Slider functionality
  (function initProjectsSlider() {
    const track = document.getElementById('projectsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!track || !prevBtn || !nextBtn) return;

    const cards = Array.from(track.querySelectorAll('.project-card'));
    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // 2rem in pixels
    let currentIndex = 0;

    // Create dots
    cards.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    function updateSlider() {
      const offset = -currentIndex * (cardWidth + gap);
      track.style.transform = `translateX(${offset}px)`;
      
      // Update active card
      cards.forEach((card, index) => {
        card.classList.toggle('active', index === currentIndex);
      });
      
      // Update dots
      document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });

      // Update button states
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === cards.length - 1;
    }

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, cards.length - 1));
      updateSlider();
    }

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });

    // Initialize
    updateSlider();
  })();
});

=======
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            formSuccess.style.display = 'none';
            formError.style.display = 'none';
            formLoading.style.display = 'block';
            
            // Visual Validation
            const requiredInputs = contactForm.querySelectorAll('[required]');
            let isValid = true;
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('input-error');
                    isValid = false;
                } else { input.classList.remove('input-error'); }
            });
            if (!isValid) { formLoading.style.display = 'none'; return; }

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                formLoading.style.display = 'none';

                if (response.ok) {
                    formSuccess.style.display = 'block';
                    contactForm.reset();
                } else {
                    formError.style.display = 'block';
                }
            } catch (error) {
                formLoading.style.display = 'none';
                formError.style.display = 'block';
            }
        });
    }

    // --- Typewriter Effect ---
    const typingText = document.querySelector('.typing-text');
    const words = ["Data Analyst", "BI Specialist", "Python + Java Developer", "SQL Expert"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            if (words.length === 1) return;
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 100 : 200);
        }
    }

    if (typingText) {
        type();
    }

    // --- Constellation Effect ---
    function initConstellation(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        let animationId;
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

        function resize() {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        }

        function createParticles() {
            particles = [];
            const numParticles = Math.floor(((width * height) / 10000) * 1.44);
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(74, 108, 247, 0.5)';

            particles.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse attraction & connection
                if (mouse.x != null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius && distance > 1) {
                        ctx.beginPath(); ctx.strokeStyle = `rgba(74, 108, 247, ${0.4})`; ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();

                        // Smoother, non-linear attraction
                        const force = (mouse.radius - distance) / mouse.radius;
                        const attractionStrength = 4;
                        p.x -= (dx / distance) * force * attractionStrength;
                        p.y -= (dy / distance) * force * attractionStrength;
                    }
                }

                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j], dx = p.x - p2.x, dy = p.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath(); ctx.strokeStyle = `rgba(74, 108, 247, ${0.15 - dist / 1000})`; ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
                    }
                }
            });
            animationId = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => { resize(); createParticles(); });
        resize(); createParticles(); animate();
        
        // Pause animation when not in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    cancelAnimationFrame(animationId);
                } else {
                    cancelAnimationFrame(animationId); // Prevent duplicate loops
                    animate();
                }
            });
        });
        
        if (canvas.parentElement) observer.observe(canvas.parentElement);
    }

    // Initialize for Hero and CTA
    initConstellation('constellationCanvas');
    initConstellation('ctaCanvas');

    // --- Project Slider Logic ---
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;

    if (cards.length > 0 && prevBtn && nextBtn) {
        // Create dots
        if (dotsContainer) {
            cards.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }

        function updateDots() {
            const dots = document.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            cards[currentIndex].classList.remove('active');
            currentIndex = index;
            cards[currentIndex].classList.add('active');
            updateDots();
        }

        prevBtn.addEventListener('click', () => {
            let newIndex = (currentIndex - 1 + cards.length) % cards.length;
            goToSlide(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            let newIndex = (currentIndex + 1) % cards.length;
            goToSlide(newIndex);
        });
    }
    
    // --- Copy Email Logic ---
    const copyBtns = document.querySelectorAll('.copy-email-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const emailLink = btn.previousElementSibling;
            navigator.clipboard.writeText(emailLink.innerText);
            // Optional: Change icon temporarily
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => btn.innerHTML = originalIcon, 2000);
        });
    });
});
>>>>>>> d6ac4af (updated ui)
