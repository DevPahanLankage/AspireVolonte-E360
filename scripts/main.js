// Mobile Navigation
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navWrapper = document.querySelector('.nav-wrapper');
const navLinks = document.querySelectorAll('.nav-link');

function initializeMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navWrapper.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navWrapper.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navWrapper.classList.remove('active');
        }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navWrapper.classList.remove('active');
        });
    });
}

// Form Handling
function initializeForms() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const quickQuoteForm = document.getElementById('quickQuoteForm');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleFormSubmit);
    }
    if (quickQuoteForm) {
        quickQuoteForm.addEventListener('submit', handleFormSubmit);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    if (!validateForm(form)) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showNotification('Form submitted successfully!', 'success');
        form.reset();
    } catch (error) {
        showNotification('An error occurred. Please try again.', 'error');
        console.error('Form submission error:', error);
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        removeErrorState(input);
        
        if (!input.value.trim()) {
            isValid = false;
            addErrorState(input);
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            isValid = false;
            addErrorState(input, 'Please enter a valid email address');
        }
    });
    
    return isValid;
}

function addErrorState(input, message = 'This field is required') {
    input.classList.add('error');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    input.parentNode.appendChild(errorMessage);
}

function removeErrorState(input) {
    input.classList.remove('error');
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    const container = document.querySelector('.notification-container') || createNotificationContainer();
    container.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}

// Image Loading
function handleImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
        // Add error handling
        img.onerror = () => {
            img.src = 'images/fallback.jpg';
            img.classList.add('error');
        };
    });
}

// Quick Quote Calculator
function initializeQuoteCalculator() {
    const calculator = document.getElementById('quoteCalculator');
    const minimizeBtn = calculator.querySelector('.minimize-btn');
    const coverageSlider = document.getElementById('coverageSlider');
    const coverageValue = document.getElementById('coverageValue');
    
    // Initialize minimize button functionality
    minimizeBtn.addEventListener('click', () => {
        calculator.classList.toggle('minimized');
    });

    // Initialize slider functionality
    if (coverageSlider && coverageValue) {
        coverageSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            });
            coverageValue.textContent = value;
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    initializeForms();
    initializeFAQ();
    initializeQuoteCalculator();
    handleImageLoading();

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        disable: 'mobile'
    });
});
