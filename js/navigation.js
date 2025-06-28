/**
 * Navigation scroll behavior
 */
class NavigationController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScrollTop = 0;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide navbar
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            this.navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = scrollTop;
    }
}

// Initialize navigation controller
document.addEventListener('DOMContentLoaded', () => {
    new NavigationController();
});