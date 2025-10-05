/* ===================================
   HACK TRACKS - Production JavaScript
   Smooth animations & interactions
   =================================== */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAnimations();
    initScrollEffects();
    initInteractions();
});

/* ===== NAVIGATION ===== */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });
    }
    
    // Smooth scroll for anchors
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
}

/* ===== ANIMATIONS ===== */
function initAnimations() {
    // Animate hero elements on load
    anime({
        targets: '.hero-badge',
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
    });
    
    anime({
        targets: '.hero-title',
        translateY: [-30, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 200,
        easing: 'easeOutExpo'
    });
    
    anime({
        targets: '.hero-subtitle',
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 400,
        easing: 'easeOutExpo'
    });
    
    anime({
        targets: '.hero-cta .btn-hero',
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100, {start: 600}),
        easing: 'easeOutExpo'
    });
    
    anime({
        targets: '.hero-stats .stat',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100, {start: 800}),
        easing: 'easeOutExpo'
    });
    
    // Animate visual cards
    anime({
        targets: '.visual-card',
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(150, {start: 600}),
        easing: 'easeOutElastic(1, .8)'
    });
    
    // Gradient text effect
    const gradientText = document.querySelector('.gradient-text');
    if (gradientText) {
        animateGradientText(gradientText);
    }
}

function animateGradientText(element) {
    anime({
        targets: element,
        backgroundPosition: ['0% 50%', '100% 50%'],
        duration: 3000,
        easing: 'linear',
        loop: true,
        direction: 'alternate'
    });
}

/* ===== SCROLL EFFECTS ===== */
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.dataset.delay = index * 100;
        observer.observe(card);
    });
    
    // Observe steps
    document.querySelectorAll('.step').forEach((step, index) => {
        step.dataset.delay = index * 150;
        observer.observe(step);
    });
    
    // Observe tech items
    document.querySelectorAll('.tech-item').forEach((item, index) => {
        item.dataset.delay = index * 100;
        observer.observe(item);
    });
    
    // Parallax effect for orbs
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
            const speed = 0.5 + (index * 0.2);
            orb.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.05}px)`;
        });
    });
}

function animateElement(element) {
    const delay = element.dataset.delay || 0;
    
    anime({
        targets: element,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: delay,
        easing: 'easeOutExpo'
    });
}

/* ===== INTERACTIONS ===== */
function initInteractions() {
    // Button hover effects
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutExpo'
            });
        });
        
        button.addEventListener('mouseleave', (e) => {
            anime({
                targets: button,
                scale: 1,
                duration: 300,
                easing: 'easeOutExpo'
            });
        });
    });
    
    // Feature card interactions
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card.querySelector('.feature-icon'),
                rotate: [0, 5, -5, 0],
                duration: 600,
                easing: 'easeInOutQuad'
            });
        });
    });
    
    // Stat counter animation
    animateStats();
    
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isNumber = !isNaN(target);
        
        if (isNumber) {
            const obj = { value: 0 };
            anime({
                targets: obj,
                value: parseInt(target),
                duration: 2000,
                delay: 1000,
                easing: 'easeOutExpo',
                update: () => {
                    stat.textContent = Math.round(obj.value) + '%';
                }
            });
        }
    });
}

/* ===== MOUSE EFFECTS ===== */
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth mouse follower for visual cards
function updateMouseFollower() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    document.querySelectorAll('.visual-card').forEach((card, index) => {
        const speed = 0.02 + (index * 0.01);
        const x = (currentX - window.innerWidth / 2) * speed;
        const y = (currentY - window.innerHeight / 2) * speed;
        
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    requestAnimationFrame(updateMouseFollower);
}

updateMouseFollower();

/* ===== FORM VALIDATION (for future use) ===== */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/* ===== UTILITIES ===== */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ===== PERFORMANCE OPTIMIZATION ===== */
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        // Add critical image/resource paths here
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

console.log('🎵 HACK TRACKS - Production Ready');
console.log('Made with ❤️ for RU Hacks 2025');
