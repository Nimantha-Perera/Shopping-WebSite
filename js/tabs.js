/**
 * Tab navigation system
 */
class TabController {
    constructor() {
        this.tabLinks = document.querySelectorAll('.nav-link');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.ctaButtons = document.querySelectorAll('[data-target]');
        this.init();
    }

    init() {
        this.bindEvents();
        this.setActiveTab('home'); // Set default active tab
    }

    bindEvents() {
        // Navigation links
        this.tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = link.getAttribute('data-tab');
                this.setActiveTab(tabName);
                this.setActiveNavLink(link);
                this.closeMobileMenu();
            });
        });

        // CTA buttons
        this.ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = button.getAttribute('data-target');
                this.setActiveTab(targetTab);
                this.updateNavLinkActive(targetTab);
            });
        });
    }

    setActiveTab(tabName) {
        // Hide all tab contents
        this.tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Show target tab
        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.classList.add('active');
        }
    }

    setActiveNavLink(activeLink) {
        // Remove active class from all nav links
        this.tabLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to clicked link
        activeLink.classList.add('active');
    }

    updateNavLinkActive(tabName) {
        const targetNavLink = document.querySelector(`[data-tab="${tabName}"]`);
        if (targetNavLink) {
            this.setActiveNavLink(targetNavLink);
        }
    }

    closeMobileMenu() {
        const menuCheck = document.getElementById('menu-check');
        if (menuCheck) {
            menuCheck.checked = false;
        }
    }
}

// Initialize tab controller
document.addEventListener('DOMContentLoaded', () => {
    new TabController();
});