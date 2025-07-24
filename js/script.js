// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initThemeToggle();
    initTypingAnimation();
    initSmoothScrolling();
    initContactForm();
    initProgressBars();
    initActiveNavigation();

    // Add entrance animations
    addEntranceAnimations();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Update icon based on current theme
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const roles = [
        'Full-Stack Developer',
        'Web Developer',
        'Software Engineer',
        'Frontend Developer',
        'Backend Developer',
        'Problem Solver'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 100;

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            delay = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            delay = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            delay = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 500; // Pause before next role
        }

        setTimeout(typeRole, delay);
    }

    // Start typing animation
    setTimeout(typeRole, 1000);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// Active Navigation Highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Validate form
        if (validateForm(name, email, subject, message)) {
            // Submit form to Formspree
            submitFormToFormspree(this, name, email, subject, message);
        }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
}

function validateForm(name, email, subject, message) {
    let isValid = true;

    // Validate name
    if (!name || name.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    } else {
        showFieldSuccess('name');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        showFieldSuccess('email');
    }

    // Validate subject
    if (!subject || subject.trim().length < 3) {
        showFieldError('subject', 'Subject must be at least 3 characters long');
        isValid = false;
    } else {
        showFieldSuccess('subject');
    }

    // Validate message
    if (!message || message.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        showFieldSuccess('message');
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;

    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters long');
                return false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError('email', 'Please enter a valid email address');
                return false;
            }
            break;
        case 'subject':
            if (value.length < 3) {
                showFieldError('subject', 'Subject must be at least 3 characters long');
                return false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError('message', 'Message must be at least 10 characters long');
                return false;
            }
            break;
    }

    showFieldSuccess(fieldName);
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const feedback = field.nextElementSibling;

    field.classList.remove('is-valid');
    field.classList.add('is-invalid');

    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = message;
    }
}

function showFieldSuccess(fieldName) {
    const field = document.getElementById(fieldName);

    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

function submitFormToFormspree(form, name, email, subject, message) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;

    // Create FormData for submission
    const formData = new FormData(form);

    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Success
                showSuccessMessage();
                form.reset();

                // Remove validation classes
                const fields = form.querySelectorAll('input, textarea');
                fields.forEach(field => {
                    field.classList.remove('is-valid', 'is-invalid');
                });
            } else {
                response.json().then(data => {
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        showErrorMessage('There was a problem with your submission. Please try again.');
                    } else {
                        showErrorMessage('Oops! There was a problem submitting your form');
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Fallback to mailto link
            const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${subject}`);
            const mailtoBody = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );
            const mailtoLink = `mailto:yasiruchamudithawijesinghe@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

            showErrorWithMailto('Unable to send email automatically. Please use the email link below:', mailtoLink);
        })
        .finally(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

function showSuccessMessage() {
    // Remove any existing alerts
    clearExistingAlerts();

    // Create success alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
    alertDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        Thank you for your message! I'll get back to you soon.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insert after form
    const form = document.getElementById('contact-form');
    form.insertAdjacentElement('afterend', alertDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv && alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function showErrorMessage(message) {
    // Remove any existing alerts
    clearExistingAlerts();

    // Create error alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show mt-3';
    alertDiv.innerHTML = `
        <i class="fas fa-exclamation-circle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insert after form
    const form = document.getElementById('contact-form');
    form.insertAdjacentElement('afterend', alertDiv);

    // Auto remove after 8 seconds
    setTimeout(() => {
        if (alertDiv && alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 8000);
}

function showErrorWithMailto(message, mailtoLink) {
    // Remove any existing alerts
    clearExistingAlerts();

    // Create error alert with mailto link
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-warning alert-dismissible fade show mt-3';
    alertDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        ${message}
        <br><br>
        <a href="${mailtoLink}" class="btn btn-primary btn-sm">
            <i class="fas fa-envelope me-1"></i>Open Email Client
        </a>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insert after form
    const form = document.getElementById('contact-form');
    form.insertAdjacentElement('afterend', alertDiv);

    // Auto remove after 10 seconds
    setTimeout(() => {
        if (alertDiv && alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 10000);
}

function clearExistingAlerts() {
    const existingAlerts = document.querySelectorAll('#contact .alert');
    existingAlerts.forEach(alert => alert.remove());
}

// Progress Bar Animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    function animateProgressBars() {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.style.width;
                bar.style.width = '0%';
                bar.classList.add('animated');

                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    }

    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars(); // Initial call
}

// Add Entrance Animations
function addEntranceAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .stat-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navbar Background Change on Scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(52, 58, 64, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--dark-color)';
        navbar.style.backdropFilter = 'none';
    }
});

// Keyboard Navigation
document.addEventListener('keydown', function (e) {
    // Press 'T' to toggle theme
    if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            document.getElementById('theme-toggle').click();
        }
    }
});

// Smooth reveal animation for sections
function revealSections() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;

        if (isVisible) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize section animations
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index > 0) { // Skip hero section
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
    });

    window.addEventListener('scroll', revealSections);
    revealSections(); // Initial call
});

// Performance optimization - Debounce scroll events
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

// Apply debouncing to scroll-heavy functions
const debouncedRevealSections = debounce(revealSections, 10);
const debouncedProgressBars = debounce(() => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.style.width;
            bar.style.width = '0%';
            bar.classList.add('animated');

            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        }
    });
}, 10);

window.addEventListener('scroll', debouncedRevealSections);
window.addEventListener('scroll', debouncedProgressBars);