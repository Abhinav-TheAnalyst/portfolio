document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Management ---
    const themeToggle = document.getElementById('themeToggle');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = localStorage.getItem('theme');

    // Applies the given theme and saves it to local storage
    const applyTheme = (theme) => {
        document.body.classList.toggle('dark-theme', theme === 'dark');
        themeToggle.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    };

    // Set initial theme based on local storage or system preference
    if (!currentTheme) {
        currentTheme = systemPrefersDark ? 'dark' : 'light';
    }
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // --- Mobile Navigation ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');

    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });

    // --- Navigation & Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Shows or hides the "Scroll to Top" button based on scroll position
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (scrollToTopBtn) {
            if (window.scrollY > 200) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    });

    // Handles the click event for the "Scroll to Top" button
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Project Slider (if it exists) ---
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.dot');
    let slideIndex = 1;

    // Main function to display the correct slide
    const showSlides = (n) => {
        if (slides.length === 0) return;
        
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Remove active from all dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        // Note: The 'active' class in CSS should set display to flex.
        // Direct style manipulation is avoided for better separation of concerns.
        slides[slideIndex-1].classList.add('active');
        
        if (dots.length > 0) {
            dots[slideIndex-1].classList.add('active');
        }
    };

    // Handlers for next/previous buttons
    const changeSlide = (n) => {
        showSlides(slideIndex += n);
    };

    // Handler for dot navigation
    const currentSlide = (n) => {
        showSlides(slideIndex = n);
    };

    // Initialize slider and attach event listeners
    if (slides.length > 0) {
        // Initialize
        showSlides(slideIndex);

        if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));
        
        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', () => currentSlide(index + 1));
        });

        // Swipe Support for Mobile
        let touchStartX = 0;
        let touchEndX = 0;
        const sliderContainer = document.querySelector('.slider-container');

        sliderContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        sliderContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) changeSlide(1); // Swipe Left (Next)
            if (touchEndX - touchStartX > 50) changeSlide(-1); // Swipe Right (Prev)
        });
    }

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
    const formLoading = document.getElementById('formLoading');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            formSuccess.style.display = 'none';
            formError.style.display = 'none';
            formLoading.style.display = 'block';

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
                    const data = await response.json();
                    formError.style.display = 'block';
                }
            } catch (error) {
                formLoading.style.display = 'none';
                formError.style.display = 'block';
            }
        });
    }

    // --- Hero Animations ---
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const textToType = "Data Analyst";
        let charIndex = 0;

        const type = () => {
            if (charIndex < textToType.length) {
                typingElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            }
        };
        setTimeout(type, 500);
    }

    // --- Skill Bar Animation on Scroll ---
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        const animateSkillBars = (entries, observer) => {
            entries.forEach(entry => {
                // When the section is in view
                if (entry.isIntersecting) {
                    const skillBars = skillsSection.querySelectorAll('.skill-bar-fill');
                    skillBars.forEach(bar => {
                        // Set the width to the value from the data-width attribute
                        bar.style.width = bar.dataset.width;
                    });
                    // Unobserve the section so the animation doesn't re-run
                    observer.unobserve(skillsSection);
                }
            });
        };

        const skillObserver = new IntersectionObserver(animateSkillBars, {
            root: null,
            threshold: 0.2 // Start animation when 20% of the section is visible
        });

        skillObserver.observe(skillsSection);
    }

    // --- Constellation Background for Hero Section ---
    const constellationCanvas = document.getElementById('constellation-canvas');
    const heroSectionForCanvas = document.querySelector('.hero');

    if (constellationCanvas && heroSectionForCanvas) {
        const ctx = constellationCanvas.getContext('2d');
        let particlesArray;

        // Function to set canvas dimensions
        const setCanvasDimensions = () => {
            constellationCanvas.width = heroSectionForCanvas.offsetWidth;
            constellationCanvas.height = heroSectionForCanvas.offsetHeight;
        };

        // Mouse object to store cursor coordinates
        const mouse = {
            x: null,
            y: null,
            radius: 150
        };

        heroSectionForCanvas.addEventListener('mousemove', (event) => {
            const rect = constellationCanvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        });

        heroSectionForCanvas.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Particle class
        class Particle {
            constructor(x, y, directionX, directionY, size) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
            }

            // Draw individual particle
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                const particleColor = document.body.classList.contains('dark-theme') ? 'rgba(255, 255, 255, 0.7)' : 'rgba(51, 65, 85, 0.5)';
                ctx.fillStyle = particleColor;
                ctx.fill();
            }

            // Update particle position and handle wall collision
            update() {
                if (this.x > constellationCanvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > constellationCanvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
            }
        }

        // Initialize particles
        const init = () => {
            setCanvasDimensions();
            particlesArray = [];
            let numberOfParticles = (constellationCanvas.width * constellationCanvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * (constellationCanvas.width - size * 2)) + size * 2;
                let y = (Math.random() * (constellationCanvas.height - size * 2)) + size * 2;
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                particlesArray.push(new Particle(x, y, directionX, directionY, size));
            }
        };

        // Draw lines connecting particles and mouse
        const connect = () => {
            let opacityValue = 1;
            const lineColor = document.body.classList.contains('dark-theme') ? 'rgba(255, 255, 255,' : 'rgba(51, 65, 85,';

            for (let a = 0; a < particlesArray.length; a++) {
                // Connect to mouse
                if (mouse.x !== null && mouse.y !== null) {
                    let dxMouse = mouse.x - particlesArray[a].x;
                    let dyMouse = mouse.y - particlesArray[a].y;
                    let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                    if (distanceMouse < mouse.radius) {
                        opacityValue = 1 - (distanceMouse / mouse.radius);
                        ctx.strokeStyle = `${lineColor} ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(mouse.x, mouse.y);
                        ctx.lineTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);
            for (const particle of particlesArray) {
                particle.update();
                particle.draw();
            }
            connect();
        };

        // Re-initialize on window resize
        window.addEventListener('resize', init);

        // Start
        init();
        animate();
    }
});