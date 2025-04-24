/**
 * Tank Wars - Main JavaScript
 * Handles interactive elements, animations, and UI functionality
 * Enhanced with CaneFly-inspired loading and animations
 */

document.addEventListener("DOMContentLoaded", function() {
    // Initialize loader
    initLoader();

    // Initialize all components once page is loaded
    setTimeout(() => {
        initNavigation();
        initScrollEffects();
        initAnimations();
        initSmoothScroll();
        initParallaxEffects();
        initThemeToggle();
    }, 500);
});

/**
 * Page Loader
 * Inspired by CaneFly loading screen
 */
function initLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    
    const loaderContent = `
        <div class="loader-text">TANK WARS</div>
        <div class="loader-bar">
            <div class="loader-progress"></div>
        </div>
        <div class="loader-percentage">0%</div>
    `;
    
    loader.innerHTML = loaderContent;
    document.body.appendChild(loader);
    
    let progress = 0;
    const progressBar = document.querySelector('.loader-progress');
    const progressText = document.querySelector('.loader-percentage');
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 500);
        }
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
    }, 100);
}

/**
 * Mobile Navigation Toggle with enhanced animations
 */
function initNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.innerHTML = '<span></span><span></span><span></span>';
        
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            // Add animation delay based on index
            link.style.transitionDelay = `${0.1 + index * 0.05}s`;
            
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }
}

/**
 * Scroll Effects
 * - Header background change on scroll
 * - Reveal elements on scroll
 */
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        // Add different animation delays to elements
        revealElements.forEach((element, index) => {
            element.style.transitionDelay = `${0.1 * (index % 3)}s`;
        });
        
        const revealElementsOnScroll = function() {
            const windowHeight = window.innerHeight;
            const revealPoint = 150;
            
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('revealed');
                }
            });
        };
        
        window.addEventListener('scroll', revealElementsOnScroll);
        // Initial check in case elements are already in view
        revealElementsOnScroll();
    }
}

/**
 * Animations
 * - Counter animations
 * - Parallax effects
 */
function initAnimations() {
    // Counter animations (if any exist)
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // ms
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            const counterObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            }, { threshold: 0.5 });
            
            counterObserver.observe(counter);
        });
    }
    
    // Add animated background to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (featureCards.length > 0) {
        featureCards.forEach(card => {
            const overlay = document.createElement('div');
            overlay.className = 'feature-overlay';
            card.appendChild(overlay);
        });
    }
}

/**
 * Smooth Scroll for anchor links with enhanced easing
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition - headerOffset;
                const duration = 1000;
                let startTimestamp = null;
                
                function scrollAnimation(timestamp) {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const elapsed = timestamp - startTimestamp;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function - easeOutCubic
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    
                    window.scrollTo(0, startPosition + distance * easeProgress);
                    
                    if (elapsed < duration) {
                        requestAnimationFrame(scrollAnimation);
                    }
                }
                
                requestAnimationFrame(scrollAnimation);
            }
        });
    });
}

/**
 * Parallax Effects
 * Adds depth with subtle parallax movements
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.1;
                element.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }
    
    // Add mousemove parallax to hero section
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroSection && heroContent) {
        heroSection.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Subtle tilt effect on hero content
            heroContent.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
        });
    }
}

/**
 * Form Validation & Submission with enhanced feedback
 */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    // Add status indicators to form fields
    const formControls = contactForm.querySelectorAll('.form-control');
    formControls.forEach(control => {
        const statusIcon = document.createElement('span');
        statusIcon.className = 'status-icon';
        control.parentNode.appendChild(statusIcon);
        
        // Add validation indicators as user types
        control.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                statusIcon.innerHTML = '<i class="fas fa-check"></i>';
                statusIcon.classList.add('valid');
                statusIcon.classList.remove('invalid');
                this.classList.remove('error');
            } else {
                statusIcon.innerHTML = '<i class="fas fa-times"></i>';
                statusIcon.classList.add('invalid');
                statusIcon.classList.remove('valid');
            }
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Enhanced form validation
        let isValid = true;
        const formInputs = contactForm.querySelectorAll('.form-control');
        
        formInputs.forEach(input => {
            const errorMessage = input.nextElementSibling?.classList.contains('error-message') 
                ? input.nextElementSibling 
                : null;
                
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                
                // Show specific error message if it exists
                if (errorMessage) {
                    errorMessage.classList.add('visible');
                }
                
                // Add shake animation to invalid fields
                input.classList.add('shake');
                setTimeout(() => {
                    input.classList.remove('shake');
                }, 600);
            } else {
                input.classList.remove('error');
                if (errorMessage) {
                    errorMessage.classList.remove('visible');
                }
            }
            
            // Email validation if it's an email field
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.classList.add('error');
                    if (errorMessage) {
                        errorMessage.textContent = 'Please enter a valid email address';
                        errorMessage.classList.add('visible');
                    }
                }
            }
        });
        
        if (isValid) {
            // Submit animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate AJAX submission
            setTimeout(() => {
                // Success message
                const formContent = contactForm.querySelector('.form-content');
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thanks for contacting us. We'll be in touch soon!</p>
                    <button class="btn submit-btn send-another">Send Another Message</button>
                `;
                
                formContent.style.display = 'none';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Add event listener to "Send Another" button
                const sendAnotherBtn = contactForm.querySelector('.send-another');
                if (sendAnotherBtn) {
                    sendAnotherBtn.addEventListener('click', function() {
                        successMessage.remove();
                        formContent.style.display = 'block';
                        submitBtn.innerHTML = 'Send Message';
                        submitBtn.disabled = false;
                    });
                }
            }, 1500);
        }
    });
}

/**
 * Auth Forms Validation with enhanced feedback
 */
const authForms = document.querySelectorAll('.auth-form');

if (authForms.length > 0) {
    authForms.forEach(form => {
        // Add password visibility toggle
        const passwordFields = form.querySelectorAll('input[type="password"]');
        passwordFields.forEach(field => {
            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.className = 'password-toggle';
            toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
            field.parentNode.appendChild(toggleBtn);
            
            toggleBtn.addEventListener('click', function() {
                if (field.type === 'password') {
                    field.type = 'text';
                    this.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    field.type = 'password';
                    this.innerHTML = '<i class="fas fa-eye"></i>';
                }
            });
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Enhanced form validation
            let isValid = true;
            const formInputs = form.querySelectorAll('input');
            
            formInputs.forEach(input => {
                // Determine if an error message element already exists or create one if needed
                let errorMessage = input.nextElementSibling;
                if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                    errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    input.parentNode.appendChild(errorMessage);
                }
                
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    errorMessage.textContent = 'This field is required';
                    errorMessage.classList.add('visible');
                    
                    // Add shake animation
                    input.classList.add('shake');
                    setTimeout(() => {
                        input.classList.remove('shake');
                    }, 600);
                } else {
                    input.classList.remove('error');
                    errorMessage.classList.remove('visible');
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        input.classList.add('error');
                        errorMessage.textContent = 'Please enter a valid email address';
                        errorMessage.classList.add('visible');
                    }
                }
                
                // Password strength check
                if (input.id === 'password' && input.value.trim()) {
                    if (input.value.length < 8) {
                        isValid = false;
                        input.classList.add('error');
                        errorMessage.textContent = 'Password must be at least 8 characters';
                        errorMessage.classList.add('visible');
                    }
                }
                
                // Password matching for signup form
                if (input.id === 'confirmPassword') {
                    const password = document.getElementById('password');
                    if (password && input.value !== password.value) {
                        isValid = false;
                        input.classList.add('error');
                        errorMessage.textContent = 'Passwords do not match';
                        errorMessage.classList.add('visible');
                    }
                }
            });
            
            if (isValid) {
                // Submit animation
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Simulate submission
                setTimeout(() => {
                    // Redirect to dashboard or home page
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    });
}

// Initialize scroll reveal
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight && elementBottom > 0) {
            element.classList.add('active');
        }
    });
};

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Basic validation
        let isValid = true;
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.style.display = 'none');
        
        if (!formValues.name.trim()) {
            showError('name', 'Please enter your name');
            isValid = false;
        }
        
        if (!formValues.email.trim() || !isValidEmail(formValues.email)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        }
        
        if (!formValues.message.trim()) {
            showError('message', 'Please enter your message');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for contacting us. We'll get back to you soon.</p>
            `;
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        }
    });
}

// Helper function to show error messages
function showError(fieldId, message) {
    const errorElement = document.querySelector(`#${fieldId}`).nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Helper function to validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Forum post submission
const forumForm = document.querySelector('.new-post-form');
if (forumForm) {
    forumForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = forumForm.querySelector('input[type="text"]').value;
        const content = forumForm.querySelector('textarea').value;
        
        if (title && content) {
            const newPost = document.createElement('div');
            newPost.className = 'post';
            newPost.innerHTML = `
                <div class="avatar"></div>
                <div class="post-content">
                    <h2>${title}</h2>
                    <p>${content}</p>
                    <small>Posted by You just now</small>
                </div>
            `;
            
            const forumContainer = document.querySelector('.forum-container');
            forumContainer.insertBefore(newPost, forumForm.nextElementSibling);
            
            // Clear form
            forumForm.reset();
        }
    });
}

// FAQ accordion
const faqItems = document.querySelectorAll('.faq p');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Initialize animations
function initAnimations() {
    const elements = document.querySelectorAll('.feature-card, .section-title, .section-content');
    
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Call initialization functions
initAnimations(); 