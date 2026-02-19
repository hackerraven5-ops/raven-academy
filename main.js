/**
 * RAVEN Academy - Main JavaScript Controller
 * © 2026 hacker_.raven - جميع الحقوق محفوظة
 * منصة تعلم الأمن السيبراني والاختراق الأخلاقي
 */

(function() {
    'use strict';

    // 🎯 Global Configuration
    const CONFIG = {
        preloaderDelay: 1500,
        scrollOffset: 80,
        debounceDelay: 300,
        roadmapStepsPerPage: 5,
        socialLinks: {
            instagram: 'https://instagram.com/hacker_.raven',
            tiktok: 'https://tiktok.com/@hacker_.raven'
        }
    };

    // 📦 State Management
    const state = {
        currentTheme: localStorage.getItem('raven-theme') || 'dark',
        currentLang: 'ar',
        roadmapProgress: JSON.parse(localStorage.getItem('raven-progress')) || {},
        mobileMenuOpen: false
    };

    // 🎬 DOM Elements Cache
    const DOM = {
        body: null,
        preloader: null,
        navbar: null,
        themeToggle: null,
        langToggle: null,
        mobileToggle: null,
        mobileOverlay: null,
        navMenu: null,
        backToTop: null,
        roadmapTabs: null,
        roadmapContents: null,
        stepToggles: null,
        resourceSearch: null,
        filterBtns: null,
        contactForm: null,
        counters: null
    };

    // 🚀 Initialize Application
    function init() {
        cacheDOM();
        bindEvents();
        applyTheme();
        hidePreloader();
        initRoadmap();
        initResources();
        initCounters();
        initScrollReveal();
        initFormValidation();
        console.log('🛡️ RAVEN Academy v1.0.0 - Loaded Successfully');
        console.log('© 2026 hacker_.raven - جميع الحقوق محفوظة');
    }

    // 📦 Cache DOM Elements
    function cacheDOM() {
        DOM.body = document.body;
        DOM.preloader = document.getElementById('preloader');
        DOM.navbar = document.querySelector('.navbar');
        DOM.themeToggle = document.getElementById('themeToggle');
        DOM.langToggle = document.getElementById('langToggle');
        DOM.mobileToggle = document.getElementById('mobileToggle');
        DOM.mobileOverlay = document.getElementById('mobileOverlay');
        DOM.navMenu = document.querySelector('.nav-menu');
        DOM.backToTop = document.getElementById('backToTop');
        DOM.roadmapTabs = document.querySelectorAll('.tab-btn');
        DOM.roadmapContents = document.querySelectorAll('.roadmap-content');
        DOM.stepToggles = document.querySelectorAll('.step-toggle');
        DOM.resourceSearch = document.getElementById('resourceSearch');
        DOM.filterBtns = document.querySelectorAll('.filter-btn');
        DOM.contactForm = document.getElementById('contactForm');
        DOM.counters = document.querySelectorAll('.number[data-count]');
    }

    // 🔗 Bind Event Listeners
    function bindEvents() {
        // Theme Toggle
        if (DOM.themeToggle) {
            DOM.themeToggle.addEventListener('click', toggleTheme);
        }

        // Language Toggle
        if (DOM.langToggle) {
            DOM.langToggle.addEventListener('click', toggleLanguage);
        }

        // Mobile Menu
        if (DOM.mobileToggle) {
            DOM.mobileToggle.addEventListener('click', toggleMobileMenu);
        }
        if (DOM.mobileOverlay) {
            DOM.mobileOverlay.addEventListener('click', toggleMobileMenu);
        }

        // Scroll Events
        window.addEventListener('scroll', handleScroll);

        // Back to Top
        if (DOM.backToTop) {
            DOM.backToTop.addEventListener('click', scrollToTop);
        }

        // Smooth Scroll for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleSmoothScroll);
        });

        // Roadmap Tabs
        if (DOM.roadmapTabs.length) {
            DOM.roadmapTabs.forEach(tab => {
                tab.addEventListener('click', handleRoadmapTab);
            });
        }

        // Step Toggle Details
        if (DOM.stepToggles.length) {
            DOM.stepToggles.forEach(btn => {
                btn.addEventListener('click', toggleStepDetails);
            });
        }

        // Resource Search & Filter
        if (DOM.resourceSearch) {
            DOM.resourceSearch.addEventListener('input', 
                debounce(handleResourceSearch, CONFIG.debounceDelay)
            );
        }
        if (DOM.filterBtns.length) {
            DOM.filterBtns.forEach(btn => {
                btn.addEventListener('click', handleResourceFilter);
            });
        }

        // Contact Form
        if (DOM.contactForm) {
            DOM.contactForm.addEventListener('submit', handleContactSubmit);
        }

        // Keyboard Navigation
        document.addEventListener('keydown', handleKeyboardNav);

        // Visibility Change (Pause animations when tab inactive)
        document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    // 🌓 Theme Management
    function toggleTheme() {
        state.currentTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme();
        localStorage.setItem('raven-theme', state.currentTheme);
        
        // Update icon
        if (DOM.themeToggle) {
            DOM.themeToggle.innerHTML = state.currentTheme === 'dark' 
                ? '<i class="fas fa-moon"></i>' 
                : '<i class="fas fa-sun"></i>';
        }
    }

    function applyTheme() {
        if (state.currentTheme === 'light') {
            DOM.body.classList.add('light-theme');
        } else {
            DOM.body.classList.remove('light-theme');
        }
    }

    // 🌐 Language Management
    function toggleLanguage() {
        state.currentLang = state.currentLang === 'ar' ? 'en' : 'ar';
        
        if (DOM.langToggle) {
            DOM.langToggle.innerHTML = `<i class="fas fa-globe"></i> ${state.currentLang.toUpperCase()}`;
        }
        
        document.documentElement.lang = state.currentLang;
        document.documentElement.dir = state.currentLang === 'ar' ? 'rtl' : 'ltr';
        
        // TODO: Implement full i18n system
        showToast(
            state.currentLang === 'ar' 
                ? 'سيتم تطبيق اللغة العربية بالكامل قريباً' 
                : 'Full English support coming soon!'
        );
    }

    // 📱 Mobile Menu Management
    function toggleMobileMenu() {
        state.mobileMenuOpen = !state.mobileMenuOpen;
        
        if (DOM.navMenu) {
            DOM.navMenu.classList.toggle('active', state.mobileMenuOpen);
        }
        if (DOM.mobileOverlay) {
            DOM.mobileOverlay.classList.toggle('active', state.mobileMenuOpen);
        }
        
        DOM.body.classList.toggle('no-scroll', state.mobileMenuOpen);
        
        // Update toggle icon
        if (DOM.mobileToggle) {
            DOM.mobileToggle.innerHTML = state.mobileMenuOpen 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        }
    }

    function closeMobileMenu() {
        if (state.mobileMenuOpen) {
            toggleMobileMenu();
        }
    }

    // 🔄 Scroll Handling
    function handleScroll() {
        // Navbar scroll effect
        if (DOM.navbar) {
            if (window.scrollY > 50) {
                DOM.navbar.classList.add('scrolled');
            } else {
                DOM.navbar.classList.remove('scrolled');
            }
        }

        // Back to top button visibility
        if (DOM.backToTop) {
            if (window.scrollY > 500) {
                DOM.backToTop.classList.add('visible');
            } else {
                DOM.backToTop.classList.remove('visible');
            }
        }

        // Scroll reveal animations
        revealOnScroll();
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            closeMobileMenu();
            const offsetTop = targetElement.offsetTop - CONFIG.scrollOffset;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            
            // Update URL without jump
            history.pushState(null, null, targetId);
        }
    }

    // 🗺️ Roadmap Management
    function initRoadmap() {
        // Load default roadmap (beginner)
        const defaultRoadmap = document.getElementById('beginner-roadmap');
        if (defaultRoadmap && !defaultRoadmap.dataset.loaded) {
            loadRoadmapData('beginner');
        }
    }

    function handleRoadmapTab(e) {
        const targetId = e.currentTarget.dataset.target;
        
        // Update tab buttons
        DOM.roadmapTabs.forEach(tab => tab.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // Update content visibility
        DOM.roadmapContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === targetId) {
                content.classList.add('active');
                // Load data if not loaded
                if (!content.dataset.loaded) {
                    const level = targetId.replace('-roadmap', '');
                    loadRoadmapData(level);
                }
            }
        });
    }

    async function loadRoadmapData(level) {
        const container = document.querySelector(`#${level}-roadmap .roadmap-steps`);
        if (!container || container.dataset.loaded) return;
        
        container.innerHTML = '<div class="loading-steps"><div class="spinner"></div><p>جاري تحميل المحتوى التعليمي...</p></div>';
        
        try {
            // Simulate API delay for demo
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Get data from resources
            const steps = window.RAVEN_RESOURCES?.[level] || [];
            
            if (steps.length > 0) {
                renderRoadmapSteps(container, steps, level);
            } else {
                container.innerHTML = '<p class="no-steps">🚧 جاري إعداد محتوى هذا المسار، عد قريباً!</p>';
            }
            
            container.dataset.loaded = 'true';
            
            // Re-attach event listeners for new elements
            container.querySelectorAll('.step-toggle').forEach(btn => {
                btn.addEventListener('click', toggleStepDetails);
            });
            
        } catch (error) {
            console.error('Error loading roadmap:', error);
            container.innerHTML = '<p class="error">❌ حدث خطأ في تحميل المحتوى. يرجى تحديث الصفحة.</p>';
        }
    }

    function renderRoadmapSteps(container, steps, level) {
        const progress = state.roadmapProgress[level] || { completed: [], current: 1 };
        
        container.innerHTML = steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = progress.completed.includes(stepNumber);
            const isCurrent = progress.current === stepNumber;
            
            return `
                <div class="roadmap-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}" 
                     data-step="${stepNumber}">
                    <div class="step-marker ${isCompleted ? 'completed' : ''}">
                        <span class="step-number">${stepNumber}</span>
                        ${isCompleted ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                    <div class="step-content">
                        <h4>${step.title}</h4>
                        <p>${step.description}</p>
                        ${step.resources ? `
                        <div class="step-resources">
                            ${step.resources.map(res => `
                            <a href="${res.url}" target="_blank" rel="noopener" class="resource-link youtube">
                                <i class="fab fa-youtube"></i>
                                <span>${res.title}</span>
                                <span class="duration">${res.duration}</span>
                            </a>
                            `).join('')}
                        </div>` : ''}
                        ${step.objectives ? `
                        <button class="step-toggle" aria-expanded="false">
                            عرض التفاصيل <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="step-details">
                            <ul>
                                ${step.objectives.map(obj => `<li>✓ ${obj}</li>`).join('')}
                            </ul>
                        </div>` : ''}
                        <div class="step-actions">
                            ${!isCompleted ? `
                            <button class="btn-sm btn-success mark-complete" data-step="${stepNumber}">
                                <i class="fas fa-check"></i> أكملت هذه الخطوة
                            </button>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Add load more button if steps > per page
        if (steps.length > CONFIG.roadmapStepsPerPage) {
            container.insertAdjacentHTML('beforeend', `
                <div class="roadmap-load-more">
                    <button class="btn-secondary" id="loadMore-${level}">
                        عرض المزيد <i class="fas fa-plus"></i>
                    </button>
                </div>
            `);
            
            document.getElementById(`loadMore-${level}`)?.addEventListener('click', () => {
                // Show all steps (simplified for demo)
                container.querySelectorAll('.roadmap-step').forEach(step => {
                    step.style.display = 'flex';
                });
                event.target.closest('.roadmap-load-more').remove();
            });
        }
        
        // Add mark complete functionality
        container.querySelectorAll('.mark-complete').forEach(btn => {
            btn.addEventListener('click', (e) => markStepComplete(level, parseInt(e.currentTarget.dataset.step)));
        });
    }

    function toggleStepDetails(e) {
        const btn = e.currentTarget;
        const details = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        
        btn.setAttribute('aria-expanded', !isExpanded);
        details.classList.toggle('active');
        
        if (icon) {
            icon.classList.toggle('fa-chevron-down', isExpanded);
            icon.classList.toggle('fa-chevron-up', !isExpanded);
        }
        
        btn.innerHTML = !isExpanded 
            ? 'إخفاء التفاصيل <i class="fas fa-chevron-up"></i>' 
            : 'عرض التفاصيل <i class="fas fa-chevron-down"></i>';
    }

    function markStepComplete(level, stepNumber) {
        if (!state.roadmapProgress[level]) {
            state.roadmapProgress[level] = { completed: [], current: 1 };
        }
        
        if (!state.roadmapProgress[level].completed.includes(stepNumber)) {
            state.roadmapProgress[level].completed.push(stepNumber);
            state.roadmapProgress[level].current = stepNumber + 1;
            
            // Save to localStorage
            localStorage.setItem('raven-progress', JSON.stringify(state.roadmapProgress));
            
            // Update UI
            const step = document.querySelector(`[data-level="${level}"] [data-step="${stepNumber}"]`);
            if (step) {
                step.classList.add('completed');
                const marker = step.querySelector('.step-marker');
                if (marker) {
                    marker.classList.add('completed');
                    marker.innerHTML = '<i class="fas fa-check"></i>';
                }
                showToast('🎉 أحسنت! تم حفظ تقدمك');
            }
            
            // Update progress bar if exists
            updateProgressBar(level);
        }
    }

    function updateProgressBar(level) {
        // Implementation for progress bar update
        const progress = state.roadmapProgress[level];
        if (progress && progress.completed.length) {
            const totalSteps = window.RAVEN_RESOURCES?.[level]?.length || 0;
            const percent = Math.round((progress.completed.length / totalSteps) * 100);
            // Update UI elements with this percent
        }
    }

    // 📚 Resources Management
    function initResources() {
        renderResources('all', '');
    }

    function handleResourceFilter(e) {
        // Update active button
        DOM.filterBtns.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        const filter = e.currentTarget.dataset.filter;
        const query = DOM.resourceSearch?.value.toLowerCase() || '';
        renderResources(filter, query);
    }

    function handleResourceSearch(e) {
        const query = e.target.value.toLowerCase();
        const filter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        renderResources(filter, query);
    }

    function renderResources(filter, query) {
        const grid = document.getElementById('resourcesGrid');
        if (!grid) return;
        
        const allResources = window.RAVEN_RESOURCES?.library || [];
        
        const filtered = allResources.filter(res => {
            const matchesFilter = filter === 'all' || res.type === filter;
            const matchesQuery = !query || 
                res.title?.toLowerCase().includes(query) ||
                res.description?.toLowerCase().includes(query) ||
                res.channel?.toLowerCase().includes(query);
            return matchesFilter && matchesQuery;
        });
        
        if (filtered.length === 0) {
            grid.innerHTML = '<p class="no-steps">لم يتم العثور على نتائج. جرب بحثاً آخر.</p>';
            return;
        }
        
        grid.innerHTML = filtered.map(res => `
            <div class="resource-card" data-type="${res.type}">
                <div class="card-header">
                    <div class="card-icon">
                        <i class="${getResourceIcon(res.type)}"></i>
                    </div>
                    <h4>${res.title}</h4>
                </div>
                <p>${res.description || res.channel || ''}</p>
                <div class="resource-meta">
                    ${res.level ? `<span><i class="fas fa-layer-group"></i> ${getLevelLabel(res.level)}</span>` : ''}
                    ${res.rating ? `<span><i class="fas fa-star"></i> ${res.rating}</span>` : ''}
                    ${res.duration ? `<span><i class="fas fa-clock"></i> ${res.duration}</span>` : ''}
                </div>
                <a href="${res.url}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
                    <i class="fas fa-external-link-alt"></i> عرض المصدر
                </a>
            </div>
        `).join('');
    }

    function getResourceIcon(type) {
        const icons = {
            youtube: 'fab fa-youtube',
            courses: 'fas fa-graduation-cap',
            tools: 'fas fa-tools',
            books: 'fas fa-book',
            labs: 'fas fa-flask'
        };
        return icons[type] || 'fas fa-link';
    }

    function getLevelLabel(level) {
        const labels = {
            beginner: '🌱 مبتدئ',
            intermediate: '🔥 متوسط',
            professional: '👑 محترف',
            all: '📚 جميع المستويات'
        };
        return labels[level] || level;
    }

    // 📊 Animated Counters
    function initCounters() {
        if (!DOM.counters.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        DOM.counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const update = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(update);
            } else {
                element.textContent = target + '+';
            }
        };
        
        update();
    }

    // 🎬 Scroll Reveal Animations
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.fade-in-up, .reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => observer.observe(el));
    }

    function revealOnScroll() {
        // Additional scroll-based reveals if needed
    }

    // 📬 Form Handling
    function initFormValidation() {
        if (!DOM.contactForm) return;
        
        // Real-time validation
        DOM.contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => clearError(field));
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        
        if (isRequired && !value) {
            showError(field, 'هذا الحقل مطلوب');
            return false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            showError(field, 'يرجى إدخال بريد إلكتروني صحيح');
            return false;
        }
        
        return true;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(field, message) {
        clearError(field);
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        const error = document.createElement('small');
        error.className = 'error-message';
        error.style.color = 'var(--accent-danger)';
        error.style.fontSize = 'var(--font-size-xs)';
        error.textContent = message;
        field.parentNode.appendChild(error);
    }

    function clearError(field) {
        field.classList.remove('error');
        field.removeAttribute('aria-invalid');
        const error = field.parentNode.querySelector('.error-message');
        if (error) error.remove();
    }

    async function handleContactSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        DOM.contactForm.querySelectorAll('input[required], textarea[required]').forEach(field => {
            if (!validateField(field)) isValid = false;
        });
        
        if (!isValid) {
            showToast('⚠️ يرجى تصحيح الأخطاء في النموذج', 'error');
            return;
        }
        
        // Get form data
        const formData = new FormData(DOM.contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner animate-spin"></i> جاري الإرسال...';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // TODO: Replace with actual API endpoint
            // await fetch('/api/contact', { method: 'POST', body: formData });
            
            console.log('Form submitted:', data);
            
            // Success
            showToast('✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            DOM.contactForm.reset();
            
        } catch (error) {
            console.error('Submission error:', error);
            showToast('❌ حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.', 'error');
        } finally {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }

    // ⌨️ Keyboard Navigation
    function handleKeyboardNav(e) {
        // Close mobile menu with Escape
        if (e.key === 'Escape' && state.mobileMenuOpen) {
            toggleMobileMenu();
        }
        
        // Skip to main content
        if (e.key === 's' && e.ctrlKey) {
            e.preventDefault();
            document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // 👁️ Visibility Change Handler
    function handleVisibilityChange() {
        if (document.hidden) {
            // Pause heavy animations when tab is not visible
            document.body.classList.add('paused');
        } else {
            document.body.classList.remove('paused');
        }
    }

    // 🔔 Toast Notifications
    function showToast(message, type = 'info') {
        // Remove existing toast
        const existing = document.getElementById('raven-toast');
        if (existing) existing.remove();
        
        // Create toast
        const toast = document.createElement('div');
        toast.id = 'raven-toast';
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close" aria-label="إغلاق">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-right: 4px solid var(--toast-color, var(--accent-primary));
            border-radius: var(--border-radius);
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            max-width: 400px;
            animation: slideInUp 0.3s ease;
        `;
        
        // Set color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        toast.style.setProperty('--toast-color', colors[type]);
        
        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.style.animation = 'slideOutDown 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        document.body.appendChild(toast);
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideOutDown 0.3s ease forwards';
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    }

    function getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // 🔄 Utility Functions
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

    // 🔐 Preloader Management
    function hidePreloader() {
        setTimeout(() => {
            if (DOM.preloader) {
                DOM.preloader.classList.add('hidden');
                // Remove from DOM after animation
                setTimeout(() => {
                    if (DOM.preloader?.parentNode) {
                        DOM.preloader.remove();
                    }
                }, 500);
            }
        }, CONFIG.preloaderDelay);
    }

    // 🎯 Public API
    window.RAVEN = {
        version: '1.0.0',
        author: 'hacker_.raven',
        copyright: '© 2026 RAVEN Academy - جميع الحقوق محفوظة',
        
        // Methods for external use
        showToast,
        toggleTheme: () => toggleTheme(),
        toggleLanguage: () => toggleLanguage(),
        markStepComplete,
        getProgress: (level) => state.roadmapProgress[level] || null,
        
        // Configuration access
        getConfig: (key) => CONFIG[key],
        
        // Resources access
        getResources: (level) => window.RAVEN_RESOURCES?.[level] || []
    };

    // 🚀 Start Application
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();