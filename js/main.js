/**
 * Main application controller
 */
class App {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupFormValidation();
        this.setupAccessibility();
    }

    bindEvents() {
        // Mobile menu toggle
        const menuCheck = document.getElementById('menu-check');
        if (menuCheck) {
            menuCheck.addEventListener('change', this.handleMobileMenuToggle.bind(this));
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const navbar = document.querySelector('.navbar');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (menuCheck && menuCheck.checked && 
                !navbar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                menuCheck.checked = false;
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
        });
    }

    handleMobileMenuToggle(e) {
        const navbar = document.querySelector('.navbar');
        if (e.target.checked) {
            navbar.style.transform = 'translateX(0)';
            document.body.style.overflow = 'hidden';
        } else {
            navbar.style.transform = 'translateX(-100%)';
            document.body.style.overflow = '';
        }
    }

    handleSmoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#') && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
            
            // Real-time validation
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('blur', this.validateInput.bind(this));
                input.addEventListener('input', this.clearValidationError.bind(this));
            });
        });
    }

    handleFormSubmit(e) {
        const form = e.target;
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateInput({ target: input })) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
        }
    }

    validateInput(e) {
        const input = e.target;
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.clearValidationError(e);

        // Required field validation
        if (input.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }

        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }

        // Password confirmation validation
        if (input.name === 'repass' && value) {
            const passwordInput = input.form.querySelector('input[name="password"]');
            if (passwordInput && value !== passwordInput.value) {
                errorMessage = 'Passwords do not match';
                isValid = false;
            }
        }

        // Display error if validation failed
        if (!isValid) {
            this.showValidationError(input, errorMessage);
        }

        return isValid;
    }

    showValidationError(input, message) {
        input.style.borderColor = '#ff4444';
        input.style.backgroundColor = '#fff5f5';
        
        // Create or update error message
        let errorElement = input.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = `
                color: #ff4444;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: block;
            `;
            input.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearValidationError(e) {
        const input = e.target;
        input.style.borderColor = '';
        input.style.backgroundColor = '';
        
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setupAccessibility() {
        // Add keyboard navigation for custom elements
        const interactiveElements = document.querySelectorAll('[data-tab], [data-target]');
        interactiveElements.forEach(element => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
            
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });

        // Add focus indicators
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Add keyboard navigation styles
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--accent-color) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);