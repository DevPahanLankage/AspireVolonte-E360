// Wait for DOM and Firebase to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Check if Firebase is initialized
    if (typeof firebase === 'undefined') {
        console.error('Firebase is not loaded!');
        return;
    }

    // Initialize Firebase components
    try {
        const db = firebase.firestore();
        console.log('Firestore initialized successfully');
    } catch (error) {
        console.error('Error initializing Firestore:', error);
        return;
    }

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
        console.log('Initializing forms');
        const contactForm = document.getElementById('contactForm');
        const newsletterForm = document.getElementById('newsletterForm');
        const quickQuoteForm = document.getElementById('quickQuoteForm');

        if (contactForm) {
            console.log('Contact form found');
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        if (newsletterForm) {
            console.log('Newsletter form found');
            newsletterForm.addEventListener('submit', handleFormSubmit);
        }
        if (quickQuoteForm) {
            console.log('Quick quote form found');
            quickQuoteForm.addEventListener('submit', handleFormSubmit);
        }
    }

    // Track form submission state
    let isSubmitting = false;
    let lastSubmissionTime = 0;
    const SUBMISSION_COOLDOWN = 3000; // 3 seconds cooldown

    async function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Check if already submitting or in cooldown
        const now = Date.now();
        if (isSubmitting || (now - lastSubmissionTime) < SUBMISSION_COOLDOWN) {
            console.log('Submission blocked: Too frequent or already processing');
            showNotification('Please wait before submitting again', 'warning');
            return;
        }
        
        console.log('Form submission started:', form.id);
        
        if (!validateForm(form)) {
            console.error('Form validation failed');
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        try {
            // Set submitting state
            isSubmitting = true;
            lastSubmissionTime = now;
            
            // Update button state
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.classList.add('submitting');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Log the data being submitted
            console.log('Form data:', data);
            
            // Validate Firebase is initialized
            if (!firebase || !firebase.firestore) {
                console.error('Firebase is not initialized properly');
                showNotification('System error: Firebase not initialized', 'error');
                return;
            }

            // Get Firestore instance
            const db = firebase.firestore();
            console.log('Firestore instance:', db ? 'Available' : 'Not available');
            
            // Add timestamp
            data.timestamp = firebase.firestore.FieldValue.serverTimestamp();
            
            if (form.id === 'newsletterForm') {
                console.log('Processing newsletter submission');
                try {
                    const docRef = await db.collection('newsletter').add({
                        email: data.email,
                        timestamp: data.timestamp
                    });
                    console.log('Newsletter document written with ID:', docRef.id);
                } catch (error) {
                    console.error('Error adding newsletter document:', error);
                    throw error;
                }
            } else {
                console.log('Processing lead submission');
                // Handle contact form and quick quote submissions
                data.type = form.id === 'quickQuoteForm' ? 'quick-quote' : 'contact';
                try {
                    const docRef = await db.collection('leads').add(data);
                    console.log('Lead document written with ID:', docRef.id);
                } catch (error) {
                    console.error('Error adding lead document:', error);
                    throw error;
                }
            }
            
            // Show success animation
            submitButton.classList.remove('submitting');
            submitButton.classList.add('success');
            submitButton.innerHTML = '<i class="fas fa-check"></i> Submitted!';
            
            showNotification('Form submitted successfully!', 'success');
            form.reset();

            // Reset button after delay
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.classList.remove('success');
                submitButton.innerHTML = originalButtonText;
            }, 2000);

        } catch (error) {
            console.error('Form submission error:', error);
            showNotification(`Error: ${error.message}`, 'error');
            
            // Reset button on error
            submitButton.disabled = false;
            submitButton.classList.remove('submitting');
            submitButton.innerHTML = originalButtonText;
        } finally {
            // Reset submission state
            isSubmitting = false;
        }
    }

    function validateForm(form) {
        console.log('Starting form validation');
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            removeErrorState(input);
            
            if (!input.value.trim()) {
                console.log('Empty required field:', input.name);
                isValid = false;
                addErrorState(input);
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                console.log('Invalid email:', input.value);
                isValid = false;
                addErrorState(input, 'Please enter a valid email address');
            }
        });
        
        console.log('Form validation result:', isValid ? 'Valid' : 'Invalid');
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

    function showNotification(message, type = 'info') {
        console.log(`Showing notification: ${message} (${type})`);
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

    // Add CSS for button states
    const style = document.createElement('style');
    style.textContent = `
        button[type="submit"] {
            position: relative;
            transition: all 0.3s ease;
        }
        
        button[type="submit"]:active {
            transform: scale(0.95);
        }
        
        button[type="submit"].submitting {
            background-color: #666 !important;
            cursor: not-allowed;
        }
        
        button[type="submit"].success {
            background-color: #28a745 !important;
        }
        
        button[type="submit"] i {
            margin-right: 8px;
        }
        
        .notification.warning {
            background-color: #ffc107;
            color: #000;
        }
    `;
    document.head.appendChild(style);

    // Initialize everything
    console.log('Initializing all components');
    initializeMobileMenu();
    initializeForms();
});
