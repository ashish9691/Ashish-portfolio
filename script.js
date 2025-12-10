// script.js (or main.js) - replace everything with this

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Custom cursor
    // ======================
    const cursor = document.querySelector('.cursor');
    
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.pageX + 'px';
            cursor.style.top = e.pageY + 'px';
        });

        // Add hover effect to links and buttons
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-category');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });
    }

    // ======================
    // Navbar scroll effect
    // ======================
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // ======================
    // Mobile menu toggle
    // ======================
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        const navItems = document.querySelectorAll('.nav-links li a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
            });
        });
    }

    // ======================
    // Smooth scrolling for anchor links
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Only prevent default for on-page anchors
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ======================
    // Animate skill bars on scroll
    // ======================
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width') || bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // ======================
// Contact form submission
// ======================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = encodeURIComponent(formData.get('name') || '');
        const email = encodeURIComponent(formData.get('email') || '');
        const subject = encodeURIComponent(formData.get('subject') || 'Portfolio Contact');
        const message = encodeURIComponent(formData.get('message') || '');

        // Build the email body
        const body =
            `Name: ${name}%0D%0A` +
            `Email: ${email}%0D%0A%0D%0A` +
            `Message:%0D%0A${message}`;

        // Your email here
        const mailtoLink = `mailto:ashishaduri@gmail.com?subject=${subject}&body=${body}`;

        // Open default mail client
        window.location.href = mailtoLink;

        // Optional: show popup + reset form
        alert('Opening your email app to send the message. Thank you!');
        this.reset();
    });
}


    // ======================
    // ScrollReveal (optional, only if library is loaded)
    // ======================
    if (window.ScrollReveal) {
        const scrollReveal = window.ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            reset: false
        });

        scrollReveal.reveal('.section-header, .about-image, .about-text, .education-item, .skill-category, .project-card, .contact-info, .contact-form', {
            interval: 200
        });
    }
});
