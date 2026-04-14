// ===== Floating Particles =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = ['#7c6aff', '#00d4aa', '#ff6b9d', '#ffaa5c'];
    const count = window.innerWidth < 600 ? 15 : 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 6 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 20;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`;

        container.appendChild(particle);
    }
}

// ===== Scroll Reveal =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.pain__card, .about__point, .feature-card, .classroom__list li, .schedule__card, .schedule__month, .faq__item, .features__advanced'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ===== Smooth scroll for anchor links =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Parallax subtle effect for hero =====
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            const heroImage = hero.querySelector('.hero__image');
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
        }
    }, { passive: true });
}

// ===== Counter animation for schedule dates =====
function initDateHighlight() {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // 1-indexed

    // Dynamically mark past dates
    const dates = document.querySelectorAll('.schedule__date');
    dates.forEach(dateEl => {
        const day = parseInt(dateEl.textContent);
        const monthEl = dateEl.closest('.schedule__month');
        if (!monthEl) return;

        const monthName = monthEl.querySelector('.schedule__month-name')?.textContent;
        let month = 0;
        if (monthName === '4月') month = 4;
        if (monthName === '5月') month = 5;

        if (month < currentMonth || (month === currentMonth && day < currentDay)) {
            dateEl.classList.add('schedule__date--past');
        }
    });
}

// ===== CTA button pulse =====
function initCtaPulse() {
    const ctaBtn = document.getElementById('apply-btn');
    if (!ctaBtn) return;

    setInterval(() => {
        ctaBtn.style.transform = 'scale(1.03)';
        setTimeout(() => {
            ctaBtn.style.transform = 'scale(1)';
        }, 300);
    }, 3000);
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initScrollReveal();
    initSmoothScroll();
    initParallax();
    initDateHighlight();
    initCtaPulse();
});
