// Portfolio JavaScript - Optimizado para GitHub Pages
'use strict';

// Configuración y constantes
const CONFIG = {
    ANIMATION_DURATION: 300,
    SCROLL_THRESHOLD: 100,
    TYPING_SPEED: 150,
    TYPING_DELAY: 2000,
    PARTICLE_INTERVAL: 800,
    ROLES: [
        'Desarrollador Full Stack',
        'Especialista en React',
        'Arquitecto de Software',
        'DevOps Engineer',
        'UI/UX Developer'
    ]
};

// Estado global de la aplicación
const state = {
    isScrolling: false,
    currentRole: 0,
    typingTimeoutId: null,
    particleTimeoutId: null,
    observers: new Map()
};

// Utilidades
const utils = {
    // Debounce para optimizar eventos de scroll
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle para eventos que se ejecutan muy frecuentemente
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Lazy loading de imágenes
    lazyLoad: (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    },

    // Animación suave para valores numéricos
    animateValue: (obj, start, end, duration, callback) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            if (callback) callback(value);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
};

// Gestión del DOM
const dom = {
    cache: new Map(),

    get: (selector) => {
        if (!dom.cache.has(selector)) {
            dom.cache.set(selector, document.querySelector(selector));
        }
        return dom.cache.get(selector);
    },

    getAll: (selector) => {
        const key = `${selector}_all`;
        if (!dom.cache.has(key)) {
            dom.cache.set(key, document.querySelectorAll(selector));
        }
        return dom.cache.get(key);
    }
};

// Gestión de animaciones
const animations = {
    // Intersection Observer para animaciones al hacer scroll
    setupScrollAnimations() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Opcional: dejar de observar después de la animación
                    // observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observar elementos para animación
        dom.getAll('.skill-card, .project-card').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        state.observers.set('scroll', observer);
    },

    // Efecto de typing para el subtítulo
    startTypingEffect() {
        const subtitle = dom.get('#dynamic-subtitle');
        if (!subtitle) return;

        let currentRole = 0;
        let isDeleting = false;
        let currentText = '';
        let delta = CONFIG.TYPING_SPEED;

        const typeEffect = () => {
            const fullText = CONFIG.ROLES[currentRole];
            
            if (isDeleting) {
                currentText = fullText.substring(0, currentText.length - 1);
                delta = CONFIG.TYPING_SPEED / 2;
            } else {
                currentText = fullText.substring(0, currentText.length + 1);
                delta = CONFIG.TYPING_SPEED;
            }
            
            subtitle.textContent = currentText;
            
            if (!isDeleting && currentText === fullText) {
                delta = CONFIG.TYPING_DELAY;
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                currentRole = (currentRole + 1) % CONFIG.ROLES.length;
                delta = CONFIG.TYPING_SPEED;
            }
            
            state.typingTimeoutId = setTimeout(typeEffect, delta);
        };

        // Iniciar después de un breve delay
        setTimeout(typeEffect, 2000);
    },

    // Crear partículas flotantes
    createParticle() {
        if (window.innerWidth < 768) return; // No crear partículas en móvil

        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--accent-primary);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.6;
            z-index: 1;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 10}px;
        `;
        
        document.body.appendChild(particle);
        
        const duration = Math.random() * 3000 + 2000;
        const drift = (Math.random() - 0.5) * 100;
        
        const animation = particle.animate([
            { 
                transform: 'translateY(0px) translateX(0px)', 
                opacity: 0.6 
            },
            { 
                transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px)`, 
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'linear'
        });

        animation.onfinish = () => particle.remove();
    },

    // Gestionar partículas
    manageParticles() {
        this.createParticle();
        state.particleTimeoutId = setTimeout(() => {
            this.manageParticles();
        }, CONFIG.PARTICLE_INTERVAL);
    }
};

// Gestión de navegación
const navigation = {
    init() {
        this.setupSmoothScroll();
        this.setupMobileMenu();
        this.setupScrollEffects();
    },

    setupSmoothScroll() {
        dom.getAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = dom.get(targetId);
                
                if (target) {
                    const navHeight = dom.get('nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    setupMobileMenu() {
        const mobileBtn = dom.get('.mobile-menu-btn');
        const navLinks = dom.get('.nav-links');
        
        if (mobileBtn && navLinks) {
            mobileBtn.addEventListener('click', () => {
                const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
                mobileBtn.setAttribute('aria-expanded', !isExpanded);
                navLinks.classList.toggle('active');
            });

            // Cerrar menú al hacer clic en un enlace
            dom.getAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileBtn.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('active');
                });
            });
        }
    },

    setupScrollEffects() {
        const navbar = dom.get('#navbar');
        const scrollIndicator = dom.get('.scroll-indicator');
        
        const handleScroll = utils.throttle(() => {
            const scrollTop = window.pageYOffset;
            
            // Efecto del navbar
            if (scrollTop > CONFIG.SCROLL_THRESHOLD) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Indicador de progreso
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = Math.min((scrollTop / scrollHeight) * 100, 100);
            scrollIndicator.style.transform = `scaleX(${scrollPercentage / 100})`;
            
            // Efecto parallax en el hero
            const hero = dom.get('.hero-content');
            if (hero && scrollTop < window.innerHeight) {
                const speed = 0.5;
                hero.style.transform = `translateY(${scrollTop * speed}px)`;
            }
        }, 16); // ~60fps

        window.addEventListener('scroll', handleScroll, { passive: true });
    }
};

// Gestión de formularios
const forms = {
    init() {
        this.setupContactForm();
    },

    setupContactForm() {
        const form = dom.get('.contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit(form);
        });
    },

    async handleSubmit(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        // Estado de carga
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        btnText.textContent = 'Enviando...';
        
        try {
            // Simular envío (aquí integrarías con tu servicio de email)
            await this.simulateSubmission();
            
            // Estado de éxito
            submitBtn.classList.remove('loading');
            btnText.textContent = '¡Mensaje Enviado!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            // Limpiar formulario
            form.reset();
            
            // Restaurar botón después de 3 segundos
            setTimeout(() => {
                btnText.textContent = originalText;
                submitBtn.style.background = 'var(--gradient-accent)';
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            
            // Estado de error
            submitBtn.classList.remove('loading');
            btnText.textContent = 'Error al enviar';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            submitBtn.disabled = false;
            
            // Restaurar después de 3 segundos
            setTimeout(() => {
                btnText.textContent = originalText;
                submitBtn.style.background = 'var(--gradient-accent)';
            }, 3000);
        }
    },

    simulateSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1500);
        });
    }
};

// Gestión de rendimiento
const performance = {
    init() {
        this.optimizeImages();
        this.preloadCriticalResources();
    },

    optimizeImages() {
        // Configurar lazy loading para imágenes
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(utils.lazyLoad);
            
            dom.getAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
            
            state.observers.set('images', imageObserver);
        }
    },

    preloadCriticalResources() {
        // Precargar recursos críticos
        const criticalResources = [
            // Añadir URLs de recursos críticos aquí
        ];

        criticalResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            link.as = url.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }
};

// Gestión de accesibilidad
const accessibility = {
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
    },

    setupKeyboardNavigation() {
        // Navegación con teclado para elementos interactivos
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    },

    setupFocusManagement() {
        // Gestión del foco para elementos dinámicos
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        // Trap focus en modales si los hubiera
        // Implementar según necesidades específicas
    },

    setupScreenReaderSupport() {
        // Anuncios para screen readers
        const announceElement = document.createElement('div');
        announceElement.setAttribute('aria-live', 'polite');
        announceElement.setAttribute('aria-atomic', 'true');
        announceElement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(announceElement);

        // Función para hacer anuncios
        window.announceToScreenReader = (message) => {
            announceElement.textContent = message;
        };
    }
};

// Inicialización de la aplicación
const app = {
    async init() {
        try {
            // Mostrar pantalla de carga
            this.showLoadingScreen();
            
            // Esperar a que el DOM esté completamente cargado
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            // Inicializar módulos
            navigation.init();
            forms.init();
            performance.init();
            accessibility.init();
            animations.setupScrollAnimations();
            
            // Iniciar animaciones después de un breve delay
            setTimeout(() => {
                animations.startTypingEffect();
                animations.manageParticles();
            }, 1000);
            
            // Ocultar pantalla de carga
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 1500);
            
        } catch (error) {
            console.error('Error al inicializar la aplicación:', error);
            this.hideLoadingScreen();
        }
    },

    showLoadingScreen() {
        const loadingScreen = dom.get('#loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    },

    hideLoadingScreen() {
        const loadingScreen = dom.get('#loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    },

    // Cleanup al salir de la página
    cleanup() {
        // Limpiar timeouts
        if (state.typingTimeoutId) {
            clearTimeout(state.typingTimeoutId);
        }
        if (state.particleTimeoutId) {
            clearTimeout(state.particleTimeoutId);
        }
        
        // Limpiar observers
        state.observers.forEach(observer => {
            observer.disconnect();
        });
        state.observers.clear();
    }
};

// Event listeners globales
window.addEventListener('beforeunload', () => {
    app.cleanup();
});

// Manejo de errores globales
window.addEventListener('error', (e) => {
    console.error('Error global:', e.error);
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    });
}

// Inicializar aplicación
app.init();