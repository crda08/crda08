// Portfolio JavaScript - All Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // =================== HAMBURGER MENU ===================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });

    // =================== PORTFOLIO FILTER ===================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const portfolioGrid = document.getElementById('portfolioGrid');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Show card with animation
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    // Hide card
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // =================== SMOOTH SCROLLING ===================
    // Add smooth scrolling for anchor links
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

    // =================== NAVIGATION SCROLL EFFECT ===================
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for styling
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show navigation on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // =================== PROJECT CARD INTERACTIONS - RECONFIGURED ===================
    // Enhanced link handler with better customization options
    projectCards.forEach(card => {
        const projectLinks = card.querySelectorAll('.project-link');
        
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const linkText = this.textContent.trim().toLowerCase();
                const dataAction = this.getAttribute('data-action'); // Optional data attribute for custom actions
                
                // Check if link is placeholder (empty, #, or explicitly marked as disabled)
                const isPlaceholder = !href || 
                                    href === '#' || 
                                    href === '' || 
                                    href === 'javascript:void(0)' ||
                                    this.classList.contains('disabled') ||
                                    this.hasAttribute('data-disabled');
                
                if (isPlaceholder) {
                    e.preventDefault();
                    
                    // Custom message based on data-action attribute
                    if (dataAction) {
                        handleCustomAction(dataAction, linkText);
                        return;
                    }
                    
                    // Generate message based on link text content
                    let message = getMessageForLinkType(linkText);
                    let messageType = 'info';
                    
                    // Check for urgent or special cases
                    if (linkText.includes('contact') || linkText.includes('email')) {
                        messageType = 'warning';
                    }
                    
                    showNotification(message, messageType);
                } else {
                    // Valid link - let it work normally
                    console.log('Opening project:', href);
                    
                    // Optional: Show loading notification for external links
                    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
                        showNotification('Opening external link...', 'info');
                    }
                }
            });
        });
    });

    // =================== ENHANCED MESSAGE SYSTEM ===================
    function getMessageForLinkType(linkText) {
        // Convert to lowercase for easier matching
        const text = linkText.toLowerCase();
        
        // Define message patterns
        const messagePatterns = {
            // Demo/Live links
            'demo': 'Live demo will be available soon! 🚀',
            'live': 'Live version coming soon! 🌐',
            'preview': 'Preview will be ready shortly! 👀',
            'try': 'Try it out feature coming soon! ✨',
            
            // Source code links
            'source': 'Source code access - contact me for details! 📧',
            'code': 'Code repository - reach out to request access! 💻',
            'github': 'GitHub repository will be public soon! 📦',
            'repository': 'Repository access available on request! 📂',
            
            // Download links
            'download': 'Download will be available soon! ⬇️',
            'apk': 'APK file available on request - contact me! 📱',
            'app': 'App download coming soon! 📲',
            'file': 'File download will be ready shortly! 📄',
            
            // Documentation
            'docs': 'Documentation is being prepared! 📚',
            'documentation': 'Full documentation coming soon! 📖',
            'guide': 'User guide will be available shortly! 📋',
            'manual': 'Manual is in development! 📝',
            
            // Contact/Communication
            'contact': 'Please use the contact form or email me directly! ✉️',
            'email': 'Send me an email for more information! 📨',
            'message': 'Feel free to reach out with any questions! 💬',
            
            // Social/Profile links
            'linkedin': 'LinkedIn profile will be linked soon! 💼',
            'twitter': 'Twitter profile coming soon! 🐦',
            'instagram': 'Instagram profile will be available! 📸',
            'facebook': 'Facebook page coming soon! 👥',
            
            // Default cases
            'learn more': 'More details will be available soon! 📖',
            'read more': 'Full article coming soon! 📰',
            'view': 'View option will be ready shortly! 👁️'
        };
        
        // Find matching pattern
        for (const [key, message] of Object.entries(messagePatterns)) {
            if (text.includes(key)) {
                return message;
            }
        }
        
        // Fallback message with dynamic text
        return `"${linkText}" feature is coming soon! Stay tuned! 🎯`;
    }

    // Handle custom actions defined via data-action attribute
    function handleCustomAction(action, linkText) {
        const customActions = {
            'contact-form': () => {
                showNotification('Opening contact form...', 'info');
                // You could scroll to contact section or open a modal here
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            },
            'email-direct': () => {
                showNotification('Opening email client...', 'info');
                window.location.href = 'mailto:your-email@example.com';
            },
            'request-access': () => {
                showNotification('To request access, please contact me directly! 📧', 'warning');
            },
            'coming-soon': () => {
                showNotification('This feature is in development! 🚧', 'info');
            },
            'external-redirect': () => {
                showNotification('This will redirect to an external site soon! 🔗', 'info');
            }
        };
        
        if (customActions[action]) {
            customActions[action]();
        } else {
            showNotification(`Custom action "${action}" will be available soon!`, 'info');
        }
    }

    // =================== NOTIFICATION SYSTEM ===================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles with enhanced colors
        const colors = {
            info: { bg: 'rgba(51, 144, 255, 0.9)', border: 'rgba(51, 144, 255, 0.3)' },
            success: { bg: 'rgba(34, 197, 94, 0.9)', border: 'rgba(34, 197, 94, 0.3)' },
            warning: { bg: 'rgba(251, 146, 60, 0.9)', border: 'rgba(251, 146, 60, 0.3)' },
            error: { bg: 'rgba(239, 68, 68, 0.9)', border: 'rgba(239, 68, 68, 0.3)' }
        };
        
        const colorScheme = colors[type] || colors.info;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colorScheme.bg};
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            backdrop-filter: blur(15px);
            border: 1px solid ${colorScheme.border};
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            max-width: 380px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            line-height: 1.4;
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Animate in with bounce effect
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds (increased for longer messages)
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    function getNotificationIcon(type) {
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };
        return icons[type] || icons.info;
    }

    // =================== LOADING ANIMATIONS ===================
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe project cards and stats
    projectCards.forEach(card => observer.observe(card));
    document.querySelectorAll('.stat-item').forEach(stat => observer.observe(stat));

    // =================== SOCIAL LINKS ===================
    // Handle social media links with enhanced messaging
    const socialLinks = document.querySelectorAll('.social-links a, .mobile-social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const title = this.getAttribute('title') || this.textContent.trim();
            
            // Check if it's a placeholder link
            if (!href || href === '#' || href === '') {
                e.preventDefault();
                
                const socialMessages = {
                    'LinkedIn': 'LinkedIn profile will be connected soon! 💼',
                    'GitHub': 'GitHub profile coming soon! 🐙',
                    'Twitter': 'Twitter profile will be available! 🐦',
                    'Instagram': 'Instagram profile coming soon! 📸',
                    'Facebook': 'Facebook page will be linked! 👥',
                    'Email': 'Email contact will be set up soon! 📧'
                };
                
                const message = socialMessages[title] || `${title} profile will be available soon! 🔗`;
                showNotification(message, 'info');
            }
        });
    });

    // =================== KEYBOARD NAVIGATION ===================
    // Add keyboard support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = 'auto';
        }
        
        // Arrow keys for filter navigation
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const activeFilter = document.querySelector('.filter-btn.active');
            const allFilters = Array.from(filterButtons);
            const currentIndex = allFilters.indexOf(activeFilter);
            
            let newIndex;
            if (e.key === 'ArrowRight') {
                newIndex = (currentIndex + 1) % allFilters.length;
            } else {
                newIndex = (currentIndex - 1 + allFilters.length) % allFilters.length;
            }
            
            if (e.target.classList.contains('filter-btn')) {
                allFilters[newIndex].click();
                allFilters[newIndex].focus();
            }
        }
    });

    // =================== PERFORMANCE OPTIMIZATIONS ===================
    // Debounce scroll events
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

    // Apply debounce to scroll handler
    const debouncedScrollHandler = debounce(function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);

    // =================== INITIALIZATION ===================
    console.log('Portfolio JavaScript initialized successfully!');
    
    // Add some initial styling for smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
        
        nav.scrolled {
            background: rgba(0, 0, 0, 0.98);
            padding: 15px 0;
        }
        
        .project-card {
            transition: all 0.3s ease;
        }
        
        .filter-btn:focus {
            outline: 2px solid #3390ff;
            outline-offset: 2px;
        }
        
        /* Enhanced link styling for disabled states */
        .project-link.disabled,
        .project-link[data-disabled] {
            opacity: 0.7;
            position: relative;
        }
        
        .project-link.disabled:hover,
        .project-link[data-disabled]:hover {
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);
});

// =================== UTILITY FUNCTIONS ===================
// Enhanced utility functions with new link handling
window.portfolioUtils = {
    showNotification: function(message, type = 'info') {
        const event = new CustomEvent('showNotification', {
            detail: { message, type }
        });
        document.dispatchEvent(event);
    },
    
    filterProjects: function(category) {
        const filterBtn = document.querySelector(`[data-filter="${category}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    },
    
    toggleMobileMenu: function() {
        const hamburger = document.getElementById('hamburger');
        if (hamburger) {
            hamburger.click();
        }
    },
    
    // New utility to programmatically disable/enable links
    disableLink: function(linkElement, customMessage) {
        linkElement.setAttribute('data-disabled', 'true');
        linkElement.classList.add('disabled');
        if (customMessage) {
            linkElement.setAttribute('data-custom-message', customMessage);
        }
    },
    
    enableLink: function(linkElement, href) {
        linkElement.removeAttribute('data-disabled');
        linkElement.classList.remove('disabled');
        linkElement.removeAttribute('data-custom-message');
        if (href) {
            linkElement.setAttribute('href', href);
        }
    }
};

// =================== FINAL SETUP ===================
// Ensure all animations are ready
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body for smooth initialization
    document.body.classList.add('loaded');
    
    // Add focus styles for better accessibility
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .loaded * {
            transition: all 0.3s ease;
        }
        
        .project-link:focus,
        .filter-btn:focus,
        .nav-links a:focus {
            outline: 2px solid #3390ff;
            outline-offset: 2px;
            border-radius: 4px;
        }
        
        .social-links a:focus,
        .mobile-social-links a:focus {
            outline: 2px solid #3390ff;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(focusStyle);
});