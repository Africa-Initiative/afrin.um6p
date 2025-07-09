// Enhanced script.js with fixed carousel timing and performance optimizations

// Hero Carousel Variables with Better Interval Management
let currentHeroSlideIndex = 0;
const totalHeroSlides = 4;
let heroAutoplayInterval = null; // Changed to null for better checking
let heroProgressInterval = null;
const autoplayDuration = 6000; // 6 seconds per slide

// Gallery Carousel Variables
let currentSlideIndex = 0;
const totalSlides = 6;

// Performance optimization variables
let isReducedMotion = false;
let imageLoadPromises = [];

// Debouncing variables
let resetTimeout = null;
let isResetting = false;

// Initialize reduced motion preference
function initReducedMotion() {
    isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Enhanced Hero Carousel Functions with Image Support
function preloadHeroImages() {
    const imageUrls = [
        'images/hero/africa-collaboration.jpg',
        'images/hero/research-innovation.jpg',
        'images/hero/education-campus.jpg',
        'images/hero/sustainable-development.jpg',
        'images/hero/africa-map-network.png',
        'images/hero/innovation-lab.png',
        'images/hero/students-collaboration.png',
        'images/hero/green-technology.png'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        const loadPromise = new Promise((resolve, reject) => {
            img.onload = () => resolve(url);
            img.onerror = () => {
                console.warn(`Failed to load hero image: ${url}`);
                resolve(url); // Still resolve to continue loading other images
            };
        });
        img.src = url;
        imageLoadPromises.push(loadPromise);
    });

    return Promise.allSettled(imageLoadPromises);
}

// Improved function to clear all intervals safely
function stopHeroAutoplay() {
    if (heroAutoplayInterval) {
        clearInterval(heroAutoplayInterval);
        heroAutoplayInterval = null;
    }
    if (heroProgressInterval) {
        clearInterval(heroProgressInterval);
        heroProgressInterval = null;
    }
    const progressBar = document.querySelector('.hero-progress-bar');
    if (progressBar) {
        progressBar.style.width = '0%';
        progressBar.style.transition = 'none';
    }
}

// Improved function to start autoplay with safety checks
function startHeroAutoplay() {
    // Always stop any existing interval first
    stopHeroAutoplay();
    
    if (!isReducedMotion && !document.hidden) {
        heroAutoplayInterval = setInterval(() => {
            if (!isResetting && document.visibilityState === 'visible') {
                changeHeroSlide(1);
            }
        }, autoplayDuration);
        updateHeroProgress();
    }
}

// Improved reset function with debouncing
function resetHeroAutoplay() {
    if (isResetting) return;
    
    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(() => {
        isResetting = true;
        stopHeroAutoplay();
        setTimeout(() => {
            startHeroAutoplay();
            isResetting = false;
        }, 200); // Small delay to prevent rapid resets
    }, 100);
}

function changeHeroSlide(direction) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    
    if (!slides.length || isResetting) return;
    
    // Remove active class from current slide and dot
    slides[currentHeroSlideIndex].classList.remove('active');
    if (dots[currentHeroSlideIndex]) {
        dots[currentHeroSlideIndex].classList.remove('active');
        dots[currentHeroSlideIndex].setAttribute('aria-selected', 'false');
    }
    
    // Calculate next slide index
    currentHeroSlideIndex += direction;
    
    if (currentHeroSlideIndex >= totalHeroSlides) {
        currentHeroSlideIndex = 0;
    } else if (currentHeroSlideIndex < 0) {
        currentHeroSlideIndex = totalHeroSlides - 1;
    }
    
    // Add active class to new slide and dot
    slides[currentHeroSlideIndex].classList.add('active');
    if (dots[currentHeroSlideIndex]) {
        dots[currentHeroSlideIndex].classList.add('active');
        dots[currentHeroSlideIndex].setAttribute('aria-selected', 'true');
    }
    
    // Update progress bar
    updateHeroProgress();
    
    // Reset autoplay with debouncing
    resetHeroAutoplay();
    
    // Announce slide change for screen readers
    announceSlideChange(currentHeroSlideIndex + 1);
}

function currentHeroSlide(slideIndex) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    
    if (!slides.length || isResetting) return;
    
    // Remove active class from all slides and dots
    slides[currentHeroSlideIndex].classList.remove('active');
    if (dots[currentHeroSlideIndex]) {
        dots[currentHeroSlideIndex].classList.remove('active');
        dots[currentHeroSlideIndex].setAttribute('aria-selected', 'false');
    }
    
    // Set new slide index
    currentHeroSlideIndex = slideIndex - 1;
    
    // Add active class to new slide and dot
    slides[currentHeroSlideIndex].classList.add('active');
    if (dots[currentHeroSlideIndex]) {
        dots[currentHeroSlideIndex].classList.add('active');
        dots[currentHeroSlideIndex].setAttribute('aria-selected', 'true');
    }
    
    // Update progress bar
    updateHeroProgress();
    
    // Reset autoplay with debouncing
    resetHeroAutoplay();
    
    // Announce slide change for screen readers
    announceSlideChange(slideIndex);
}

function updateHeroProgress() {
    const progressBar = document.querySelector('.hero-progress-bar');
    if (progressBar && !isReducedMotion) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        // Small delay to ensure smooth animation
        setTimeout(() => {
            progressBar.style.transition = `width ${autoplayDuration}ms linear`;
            progressBar.style.width = '100%';
        }, 50);
    }
}

function announceSlideChange(slideNumber) {
    const announcement = `Slide ${slideNumber} of ${totalHeroSlides}`;
    const announcer = document.getElementById('slide-announcer');
    if (announcer) {
        announcer.textContent = announcement;
    }
}

// Enhanced image loading with better error handling and lazy loading
function initializeLogos() {
    const logoImages = document.querySelectorAll('.logo-img');
    
    logoImages.forEach(img => {
        img.classList.add('loading');
        
        // Create intersection observer for lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    img.addEventListener('load', function() {
                        this.classList.remove('loading');
                        this.classList.add('loaded');
                    });
                    
                    img.addEventListener('error', function() {
                        this.classList.remove('loading');
                        this.classList.add('error');
                        createFallback(this);
                    });
                    
                    // Force check if image is already loaded
                    if (img.complete) {
                        if (img.naturalWidth === 0) {
                            img.dispatchEvent(new Event('error'));
                        } else {
                            img.dispatchEvent(new Event('load'));
                        }
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // Start loading 50px before image enters viewport
        });
        
        imageObserver.observe(img);
    });
}

function initializeHeroImages() {
    const heroImages = document.querySelectorAll('.hero-feature-image');
    
    heroImages.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            // Create fallback emoji
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                font-size: 8rem;
                filter: drop-shadow(0 0 20px rgba(215, 73, 42, 0.5));
            `;
            
            // Set appropriate emoji based on slide
            const slideIndex = Array.from(img.closest('.hero-slide').parentNode.children).indexOf(img.closest('.hero-slide'));
            const emojis = ['🌍', '🔬', '🎓', '🌱'];
            fallback.textContent = emojis[slideIndex] || '🌍';
            
            img.parentNode.appendChild(fallback);
        });
    });
}

function createFallback(img) {
    const fallback = document.createElement('div');
    fallback.className = 'logo-fallback';
    fallback.textContent = img.alt || 'Logo';
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', img.alt || 'Partner logo');
    
    fallback.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--gradient-1);
        color: var(--primary-white);
        font-weight: 600;
        font-size: 0.9rem;
        text-align: center;
        border-radius: 10px;
        padding: 5px;
    `;
    
    img.style.display = 'none';
    img.parentNode.appendChild(fallback);
}

// Enhanced mobile menu toggle with better accessibility
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navMenu && menuBtn) {
        const isExpanded = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        
        // Focus management
        if (!isExpanded) {
            // Menu opened - focus first menu item
            const firstMenuItem = navMenu.querySelector('a');
            if (firstMenuItem) {
                setTimeout(() => firstMenuItem.focus(), 100);
            }
        }
    }
}

// Gallery Carousel Functions (for photo galleries)
function changeSlide(direction) {
    const track = document.getElementById('galleryTrack');
    
    if (!track) return;
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    updateCarousel();
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('galleryTrack');
    const dots = document.querySelectorAll('.gallery-dot');
    
    if (track) {
        const translateX = -currentSlideIndex * (100 / totalSlides) * totalSlides;
        track.style.transform = `translateX(${translateX}%)`;
    }
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

// Auto-play carousel
function autoPlayCarousel() {
    if (!isReducedMotion) {
        changeSlide(1);
    }
}

// Start auto-play when page loads
let carouselInterval;

function startCarouselAutoPlay() {
    if (!isReducedMotion) {
        carouselInterval = setInterval(autoPlayCarousel, 5000);
    }
}

function stopCarouselAutoPlay() {
    clearInterval(carouselInterval);
}

// Newsletter Archive function
function openNewsletterArchive() {
    window.open('https://um6p-my.sharepoint.com/:f:/g/personal/africa_initiative_um6p_ma/EiUh9bIHpQtAp_LLH5GFMyYBh5fBjEG5EgKPdKgFyF_0fg?e=8WDMVP', '_blank', 'noopener,noreferrer');
}

// Opportunities Database function
function openOpportunitiesDatabase() {
    window.open('https://um6p-my.sharepoint.com/:x:/g/personal/africa_initiative_um6p_ma/EQGcCw_ppm1CibdnKt4GqloBTxM22yZ4HLBZOSG3ox9ULw?e=coKt3e&nav=MTVfezAwMDAwMDAwLTAwMDEtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMH0', '_blank', 'noopener,noreferrer');
}

// Events Calendar function
function openEventsCalendar() {
    window.open('https://um6p-my.sharepoint.com/:x:/g/personal/africa_initiative_um6p_ma/EdKkT38UIMJKnWRJJ6od7mMBMmYwY8G8cp4V6WHHEdCZew?e=aH35dW&nav=MTVfezAwMDAwMDAwLTAwMDEtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMH0', '_blank', 'noopener,noreferrer');
}

// Enhanced accessibility features
function initAccessibility() {
    // Create live region for announcements
    const announcer = document.createElement('div');
    announcer.id = 'slide-announcer';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Enhanced keyboard navigation for hero carousel
    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.hero-carousel') || document.activeElement.closest('.hero-carousel')) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    changeHeroSlide(-1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    changeHeroSlide(1);
                    break;
                case 'Home':
                    e.preventDefault();
                    currentHeroSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    currentHeroSlide(totalHeroSlides);
                    break;
                case 'Escape':
                    e.preventDefault();
                    stopHeroAutoplay();
                    break;
                case ' ':
                case 'Enter':
                    if (e.target.classList.contains('hero-dot')) {
                        e.preventDefault();
                        const index = Array.from(document.querySelectorAll('.hero-dot')).indexOf(e.target) + 1;
                        currentHeroSlide(index);
                    }
                    break;
            }
        }
    });

    // Enhanced dropdown keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('dropdown-toggle')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const dropdown = e.target.closest('.dropdown');
                const menu = dropdown.querySelector('.dropdown-menu');
                const isExpanded = e.target.getAttribute('aria-expanded') === 'true';
                
                e.target.setAttribute('aria-expanded', !isExpanded);
                menu.style.display = isExpanded ? 'none' : 'block';
                
                if (!isExpanded) {
                    const firstMenuItem = menu.querySelector('a');
                    if (firstMenuItem) firstMenuItem.focus();
                }
            }
        }
    });
}

// Enhanced performance monitoring
function initPerformanceMonitoring() {
    // Monitor loading times
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
        
        // Monitor Core Web Vitals if available
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        console.log(`${entry.entryType}:`, entry);
                    }
                });
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
            } catch (e) {
                console.log('Performance monitoring not fully supported');
            }
        }
    });
}

// Enhanced form validation with accessibility improvements
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    let firstErrorField = null;
    
    inputs.forEach(input => {
        const errorElement = input.parentNode.querySelector('.error-message');
        
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
            
            if (!firstErrorField) firstErrorField = input;
            
            if (!errorElement) {
                const error = document.createElement('div');
                error.className = 'error-message';
                error.id = `error-${input.id || 'field'}`;
                error.textContent = `${input.labels[0]?.textContent || 'This field'} is required`;
                error.setAttribute('role', 'alert');
                error.style.cssText = `
                    background: #f8d7da;
                    color: #721c24;
                    padding: 0.5rem;
                    border-radius: 5px;
                    margin-top: 0.5rem;
                    font-size: 0.9rem;
                    border: 1px solid #f5c6cb;
                `;
                input.parentNode.appendChild(error);
                input.setAttribute('aria-describedby', error.id);
            }
        } else {
            input.classList.remove('error');
            input.setAttribute('aria-invalid', 'false');
            if (errorElement) {
                errorElement.remove();
                input.removeAttribute('aria-describedby');
            }
        }
        
        // Enhanced email validation
        if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                input.classList.add('error');
                input.setAttribute('aria-invalid', 'true');
                
                if (!firstErrorField) firstErrorField = input;
                
                if (!errorElement) {
                    const error = document.createElement('div');
                    error.className = 'error-message';
                    error.id = `error-${input.id || 'email'}`;
                    error.textContent = 'Please enter a valid email address';
                    error.setAttribute('role', 'alert');
                    error.style.cssText = `
                        background: #f8d7da;
                        color: #721c24;
                        padding: 0.5rem;
                        border-radius: 5px;
                        margin-top: 0.5rem;
                        font-size: 0.9rem;
                        border: 1px solid #f5c6cb;
                    `;
                    input.parentNode.appendChild(error);
                    input.setAttribute('aria-describedby', error.id);
                }
            }
        }
    });
    
    // Focus first error field if validation fails
    if (!isValid && firstErrorField) {
        firstErrorField.focus();
    }
    
    return isValid;
}

// Intersection Observer for animations with better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function observeElements() {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced header background on scroll with throttling
let ticking = false;

function updateHeader() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(51, 51, 51, 0.95) 100%)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'linear-gradient(135deg, var(--primary-black) 0%, var(--dark-gray) 100%)';
            header.style.backdropFilter = 'blur(10px)';
        }
    }
    ticking = false;
}

function requestHeaderUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}

// Enhanced stats animation with intersection observer
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target || stat.textContent);
        const suffix = stat.textContent.includes('+') ? '+' : '';
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 30);
    });
}

// Enhanced workstreams diagram interactions
function initializeWorkstreamsInteractions() {
    const workstreamNodes = document.querySelectorAll('.workstream-node');
    const workstreamCards = document.querySelectorAll('.workstream-card');
    
    // Add hover effects for nodes
    workstreamNodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            // Highlight the corresponding card
            const correspondingCard = document.querySelector(`[data-workstream="${index + 1}"]`);
            if (correspondingCard) {
                correspondingCard.style.transform = 'translateY(-10px)';
                correspondingCard.style.boxShadow = '0 20px 40px rgba(215, 73, 42, 0.2)';
                correspondingCard.style.borderColor = 'var(--primary-red)';
            }
        });
        
        node.addEventListener('mouseleave', function() {
            // Reset the corresponding card
            const correspondingCard = document.querySelector(`[data-workstream="${index + 1}"]`);
            if (correspondingCard) {
                correspondingCard.style.transform = '';
                correspondingCard.style.boxShadow = '';
                correspondingCard.style.borderColor = '';
            }
        });
        
        // Click to scroll to corresponding card with smooth animation
        node.addEventListener('click', function() {
            const correspondingCard = document.querySelector(`[data-workstream="${index + 1}"]`);
            if (correspondingCard) {
                correspondingCard.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Temporary highlight effect
                correspondingCard.style.background = 'rgba(215, 73, 42, 0.05)';
                setTimeout(() => {
                    correspondingCard.style.background = '';
                }, 2000);
            }
        });
    });
    
    // Add hover effects for cards
    workstreamCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Highlight the corresponding node
            const correspondingNode = document.querySelectorAll('.workstream-node')[index];
            if (correspondingNode) {
                correspondingNode.style.transform = 'scale(1.1)';
                correspondingNode.style.boxShadow = '0 20px 40px rgba(215, 73, 42, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset the corresponding node
            const correspondingNode = document.querySelectorAll('.workstream-node')[index];
            if (correspondingNode) {
                correspondingNode.style.transform = '';
                correspondingNode.style.boxShadow = '';
            }
        });
    });
}

// Blog Module (Enhanced with better performance)
const BlogModule = (function() {
    // Blog posts data
    const blogPosts = [
        {
            image: "images/Healthcare.jpg",
            date: "March 1, 2025",
            author: "Azeez Hamzat",
            authorLink: "https://www.linkedin.com/in/azeezhamzat",
            title: "Advancing Healthcare in Africa: UM6P's Vision for AI-Driven Innovation",
            excerpt: "Learn how UM6P leverages AI to transform healthcare in Africa, addressing challenges and improving access during Science Week.",
            link: "Advancing-healthcare.html",
            tags: ["Health", "AI", "Innovation", "Africa"],
            year: 2025,
            month: "March"
        },
        {
            image: "images/Energy-Research.jpg",
            date: "February 27, 2025",
            author: "Azeez Hamzat",
            authorLink: "https://www.linkedin.com/in/Azeezhamzat",
            title: "Why Africa Must Do More on Energy Research",
            excerpt: "Learn why Africa must prioritize energy research to address access gaps and climate challenges, with insights on the €30M EU-AU fund boosting sustainable solutions.",
            link: "africa-energy-research.html",
            tags: ["Energy", "Research", "Sustainability", "Climate Change"],
            year: 2025,
            month: "February"
        },
        {
            image: "images/NextAfrica.jpeg",
            date: "February 28, 2025",
            author: "Azeez Hamzat",
            authorLink: "https://www.linkedin.com/in/azeezhamzat",
            title: "NextAfrica: Bridging Europe and Africa Through Innovation at Station F",
            excerpt: "Learn how UM6P's NextAfrica program at Station F accelerates Greentech, Agritech, and Healthtech startups, connecting Europe and Africa for sustainable innovation.",
            link: "next-africa.html",
            tags: ["Innovation", "Entrepreneurship", "Environment", "Agriculture", "Health"],
            year: 2025,
            month: "February"
        },
        {
            image: "images/Startgate.jpg",
            date: "December 15, 2024",
            author: "Azeez Hamzat",
            authorLink: "https://www.linkedin.com/in/azeezhamzat",
            title: "Unleashing Africa's Entrepreneurial Spirit: How UM6P is Shaping the Future Through Innovation",
            excerpt: "Discover how UM6P is empowering Africa's youth to tackle challenges through entrepreneurship and innovation.",
            link: "Unleashing-Entrepreneurship.html",
            tags: ["Entrepreneurship", "Innovation", "Startups"],
            year: 2024,
            month: "December"
        },
        {
            image: "images/diversity-um6p.jpg",
            date: "January 7, 2025",
            author: "Azeez Hamzat",
            authorLink: "https://www.linkedin.com/in/azeezhamzat",
            title: "Embracing Diversity: How UM6P is Building a Pan-African Community of Innovators",
            excerpt: "Discover how UM6P fosters a diverse, multicultural student body to drive innovation and collaboration across Africa.",
            link: "blog-post-diversity.html",
            tags: ["Diversity", "Education", "Community"],
            year: 2025,
            month: "January"
        },
        {
            image: "images/For Africa.png",
            date: "January 10, 2025",
            author: "Azeez Hamzat",
            authorLink: "https://www.linkedin.com/in/azeezhamzat",
            title: "For Africa: UM6P's Commitment to Industry, Research, and Business Innovation",
            excerpt: "Discover how UM6P drives excellence through AAIT, AIRESS, ABS, and the Center for African Studies, fostering innovation and African perspectives.",
            link: "For-Africa.html",
            tags: ["Industry", "Research", "Business", "African Studies"],
            year: 2025,
            month: "January"
        },
        {
            image: "images/excellence-in-africa.jpg",
            date: "January 23, 2024",
            author: "Azeez Hamzat",
            authorLink: "https://www.linkedin.com/in/azeezhamzat",
            title: "Excellence in Africa: UM6P and EPFL's Collaborative Push for Academic Innovation",
            excerpt: "Explore how UM6P and EPFL are advancing academic excellence in Africa through the Excellence in Africa initiative.",
            link: "excellence-in-africa.html",
            tags: ["Education", "Research", "Innovation"],
            year: 2024,
            month: "January"
        },
        {
            image: "images/um6pv.png",
            date: "February 16, 2025",
            author: "Azeez Hamzat",
            authorLink: "https://www.linkedin.com/in/azeezhamzat",
            title: "UM6P Ventures: Investing in Africa's Future Through Science and Innovation",
            excerpt: "Explore how UM6P Ventures supports Digital Transformation and Deeptech startups, driving innovation in Agriculture, GreenTech, and Healthtech across Africa.",
            link: "um6p-ventures.html",
            tags: ["Innovation", "Startups", "Deeptech", "Digital Transformation"],
            year: 2025,
            month: "February"
        }
    ];

    // Pagination variables
    const postsPerPage = 6;
    let currentPage = 1;
    let filteredPosts = [...blogPosts];

    // Sort blogPosts by date (newest to oldest)
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Render blog posts with enhanced accessibility
    function renderPosts(posts, page) {
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const postsToDisplay = posts.slice(start, end);

        const blogGrid = document.getElementById('blog-grid');
        if (blogGrid) {
            blogGrid.innerHTML = '';
            
            // Add loading state
            blogGrid.setAttribute('aria-busy', 'true');
            
            postsToDisplay.forEach((post, index) => {
                const article = document.createElement('article');
                article.className = 'blog-post fade-in';
                article.setAttribute('role', 'article');
                article.innerHTML = `
                    <div class="blog-image" style="background: var(--gradient-1); display: flex; align-items: center; justify-content: center; height: 200px; border-radius: 10px; margin-bottom: 1rem; color: white; font-size: 3rem;" role="img" aria-label="Blog post illustration">📖</div>
                    <div class="blog-meta">
                        <span><i class="fas fa-calendar-alt" aria-hidden="true"></i> <time datetime="${new Date(post.date).toISOString()}">${post.date}</time></span>
                        <span><i class="fas fa-user" aria-hidden="true"></i> <a href="${post.authorLink}" target="_blank" rel="noopener">${post.author}</a></span>
                    </div>
                    <h3><a href="${post.link}" aria-describedby="excerpt-${start + index}">${post.title}</a></h3>
                    <p id="excerpt-${start + index}">${post.excerpt}</p>
                    <div class="blog-tags" style="margin-top: 1rem;">
                        ${post.tags.map(tag => `<span class="tag" style="background: var(--gradient-3); color: var(--primary-red); padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem; margin-right: 0.5rem;" role="button" tabindex="0">${tag}</span>`).join('')}
                    </div>
                `;
                blogGrid.appendChild(article);
            });
            
            // Remove loading state
            blogGrid.setAttribute('aria-busy', 'false');
            
            updatePagination(posts);
            observeElements(); // Reuse existing fade-in observer
        }
    }

    // Update pagination controls with better accessibility
    function updatePagination(posts) {
        const totalPages = Math.ceil(posts.length / postsPerPage);
        const paginationNumbers = document.getElementById('pagination-numbers');
        
        if (paginationNumbers) {
            paginationNumbers.innerHTML = '';
            paginationNumbers.setAttribute('role', 'navigation');
            paginationNumbers.setAttribute('aria-label', 'Blog pagination');
            
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `btn pagination-btn ${i === currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.setAttribute('aria-label', `Go to page ${i}`);
                pageBtn.setAttribute('aria-current', i === currentPage ? 'page' : 'false');
                pageBtn.onclick = () => {
                    currentPage = i;
                    renderPosts(filteredPosts, currentPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                };
                paginationNumbers.appendChild(pageBtn);
            }
        }

        // Update prev/next buttons
        const pagination = document.getElementById('blog-pagination');
        if (pagination) {
            const prevBtn = pagination.querySelector('button:first-child');
            const nextBtn = pagination.querySelector('button:last-child');
            if (prevBtn) {
                prevBtn.disabled = currentPage === 1;
                prevBtn.setAttribute('aria-label', 'Go to previous page');
            }
            if (nextBtn) {
                nextBtn.disabled = currentPage === totalPages;
                nextBtn.setAttribute('aria-label', 'Go to next page');
            }
        }
    }

    // Enhanced change page function
    function changePage(direction) {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        if (direction === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (direction === 'next' && currentPage < totalPages) {
            currentPage++;
        }
        renderPosts(filteredPosts, currentPage);
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Announce page change
        const announcer = document.getElementById('slide-announcer');
        if (announcer) {
            announcer.textContent = `Page ${currentPage} of ${totalPages} loaded`;
        }
    }

    // Enhanced filter posts with debouncing
    let filterTimeout;
    function filterPosts() {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => {
            const searchQuery = document.getElementById('search-posts')?.value.toLowerCase() || '';
            const selectedTag = document.getElementById('filter-tags')?.value || '';

            filteredPosts = blogPosts.filter(post => {
                const matchesSearch = post.title.toLowerCase().includes(searchQuery) || 
                                    post.excerpt.toLowerCase().includes(searchQuery) ||
                                    post.author.toLowerCase().includes(searchQuery);
                const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
                return matchesSearch && matchesTag;
            });

            currentPage = 1;
            renderPosts(filteredPosts, currentPage);
            
            // Announce filter results
            const announcer = document.getElementById('slide-announcer');
            if (announcer) {
                announcer.textContent = `Found ${filteredPosts.length} blog posts`;
            }
        }, 300); // 300ms debounce
    }

    // Initialize blog
    function init() {
        if (document.getElementById('blog-grid')) {
            renderPosts(filteredPosts, currentPage);
        }
    }

    // Public API
    return {
        changePage,
        filterPosts,
        init
    };
})();

// Global functions for blog pagination (needed for onclick handlers in HTML)
function changePage(direction) {
    BlogModule.changePage(direction);
}

function filterPosts() {
    BlogModule.filterPosts();
}

// Enhanced newsletter form submissions
function handleNewsletterSubmission(formId, successId) {
    const form = document.getElementById(formId);
    const successMessage = document.getElementById(successId);
    
    if (form && successMessage) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show success message
                successMessage.classList.add('show');
                successMessage.style.display = 'block';
                successMessage.setAttribute('role', 'alert');
                this.reset();
                
                // Focus success message for screen readers
                successMessage.focus();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
}

// Enhanced smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                });
                this.classList.add('active');
                this.setAttribute('aria-current', 'page');
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const menuBtn = document.querySelector('.mobile-menu-btn');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
}

// Enhanced touch/swipe support for hero carousel
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function initTouchSupport() {
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        heroCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        heroCarousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });
    }
}

function handleSwipe() {
    const swipeThreshold = 50;
    const horizontalDistance = touchStartX - touchEndX;
    const verticalDistance = Math.abs(touchStartY - touchEndY);
    
    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(horizontalDistance) > swipeThreshold && Math.abs(horizontalDistance) > verticalDistance) {
        if (horizontalDistance > 0) {
            // Swipe left - next slide
            changeHeroSlide(1);
        } else {
            // Swipe right - previous slide
            changeHeroSlide(-1);
        }
    }
}

// Enhanced floating links animation
function initFloatingLinks() {
    const floatingSocialLinks = document.querySelector('.floating-social-links');
    if (floatingSocialLinks) {
        floatingSocialLinks.addEventListener('mouseenter', function () {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });

        floatingSocialLinks.addEventListener('mouseleave', function () {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    }
}

// Enhanced visibility change handler for carousel management
function handleVisibilityChange() {
    if (document.hidden) {
        stopHeroAutoplay();
    } else if (!isReducedMotion && !isResetting) {
        startHeroAutoplay();
    }
}

// Enhanced page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize reduced motion detection
    initReducedMotion();
    
    // Initialize all core functionality
    initializeLogos();
    initializeHeroImages();
    initPerformanceMonitoring();
    initAccessibility();
    initSmoothScrolling();
    initTouchSupport();
    initFloatingLinks();
    
    // Preload hero images for better performance
    preloadHeroImages().then(() => {
        console.log('Hero images preloaded');
    });
    
    // Observe all fade-in elements
    observeElements();
    
    // Initialize hero carousel if it exists
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        // Start hero carousel autoplay
        setTimeout(() => {
            startHeroAutoplay();
        }, 1000); // Delay to ensure page is fully loaded
        
        // Enhanced hover/focus event handling with better debouncing
        let hoverTimeout;
        heroCarousel.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            stopHeroAutoplay();
        });
        
        heroCarousel.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                if (!document.hidden && !isReducedMotion) {
                    startHeroAutoplay();
                }
            }, 500);
        });
        
        heroCarousel.addEventListener('focusin', () => {
            stopHeroAutoplay();
        });
        
        heroCarousel.addEventListener('focusout', () => {
            setTimeout(() => {
                if (!heroCarousel.contains(document.activeElement) && !document.hidden) {
                    startHeroAutoplay();
                }
            }, 100);
        });
        
        // Add ARIA labels to hero elements
        const heroDots = document.querySelectorAll('.hero-dot');
        heroDots.forEach((dot, index) => {
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        });
        
        const heroNavs = document.querySelectorAll('.hero-nav');
        heroNavs.forEach(nav => {
            nav.setAttribute('aria-label', nav.classList.contains('prev') ? 'Previous slide' : 'Next slide');
        });
    }
    
    // Add visibility change listener for better carousel management
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Initialize workstream interactions if workstreams section exists
    if (document.querySelector('.workstreams-section')) {
        initializeWorkstreamsInteractions();
    }
    
    // Setup newsletter forms
    handleNewsletterSubmission('newsletterForm', 'newsletterSuccess');
    
    // Initialize blog module
    BlogModule.init();
    
    // Enhanced form handling for all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                // Clear previous errors
                const errorElement = this.parentNode.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                    this.removeAttribute('aria-describedby');
                }
                this.classList.remove('error');
                this.setAttribute('aria-invalid', 'false');
                
                // Validate single field
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                    this.setAttribute('aria-invalid', 'true');
                } else if (this.type === 'email' && this.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(this.value)) {
                        this.classList.add('error');
                        this.setAttribute('aria-invalid', 'true');
                        const error = document.createElement('div');
                        error.className = 'error-message';
                        error.id = `error-${this.id || 'email'}`;
                        error.textContent = 'Please enter a valid email address';
                        error.setAttribute('role', 'alert');
                        error.style.cssText = `
                            background: #f8d7da;
                            color: #721c24;
                            padding: 0.5rem;
                            border-radius: 5px;
                            margin-top: 0.5rem;
                            font-size: 0.9rem;
                            border: 1px solid #f5c6cb;
                        `;
                        this.parentNode.appendChild(error);
                        this.setAttribute('aria-describedby', error.id);
                    }
                }
            });
        });
    });
    
    // Enhanced collaboration form submission
    const collaborationForm = document.getElementById('collaborationForm');
    if (collaborationForm) {
        collaborationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const submitBtn = this.querySelector('.submit-btn');
                const successMessage = document.getElementById('collaborationSuccess');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Submitting...';
                submitBtn.style.opacity = '0.7';
                submitBtn.disabled = true;
                submitBtn.setAttribute('aria-busy', 'true');
                
                // Simulate form submission
                setTimeout(() => {
                    this.reset();
                    if (successMessage) {
                        successMessage.classList.add('show');
                        successMessage.style.display = 'block';
                        successMessage.setAttribute('role', 'alert');
                        successMessage.focus();
                    }
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                    submitBtn.setAttribute('aria-busy', 'false');
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        if (successMessage) {
                            successMessage.classList.remove('show');
                            successMessage.style.display = 'none';
                        }
                    }, 5000);
                }, 2000);
            }
        });
    }
    
    // Initialize gallery carousel auto-play (only if carousel exists)
    const galleryCarousel = document.querySelector('.gallery-carousel');
    if (galleryCarousel) {
        startCarouselAutoPlay();
        
        // Pause carousel on hover
        galleryCarousel.addEventListener('mouseenter', stopCarouselAutoPlay);
        galleryCarousel.addEventListener('mouseleave', startCarouselAutoPlay);
    }
    
    // Trigger stats animation when section comes into view
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
    }
    
    // Enhanced navigation active state management
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length > 0 && navLinks.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        link.removeAttribute('aria-current');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                            link.setAttribute('aria-current', 'page');
                        }
                    });
                }
            });
        }, { threshold: 0.6 });
        
        sections.forEach(section => {
            navObserver.observe(section);
        });
    }
    
    // Enhanced scroll event with throttling
    window.addEventListener('scroll', requestHeaderUpdate, { passive: true });
    
    // Enhanced loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Remove any loading spinners or placeholders
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => {
            if (!el.classList.contains('logo-img')) {
                el.classList.remove('loading');
            }
        });
        
        // Initialize any remaining lazy-loaded content
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(img => {
                if (img.complete && img.naturalHeight !== 0) {
                    img.classList.add('loaded');
                }
            });
        }
    });
    
    // Enhanced error handling for failed resources
    window.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            console.warn('Failed to load image:', e.target.src);
            if (!e.target.classList.contains('error')) {
                if (e.target.classList.contains('logo-img')) {
                    createFallback(e.target);
                } else if (e.target.classList.contains('hero-feature-image')) {
                    // Handle hero image errors
                    e.target.style.display = 'none';
                }
            }
        }
    }, true);
    
    // Enhanced resize handler with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Update viewport height for mobile
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            
            // Recalculate carousel positions if needed
            if (document.querySelector('.gallery-carousel')) {
                updateCarousel();
            }
            
            // Update reduced motion preference
            initReducedMotion();
        }, 250);
    }, { passive: true });
    
    // Add proper focus management for dropdown menus
    document.addEventListener('click', (e) => {
        // Close dropdowns when clicking outside
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                const toggle = dropdown.querySelector('.dropdown-toggle');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (toggle && menu) {
                    toggle.setAttribute('aria-expanded', 'false');
                    menu.style.display = 'none';
                }
            }
        });
    });
});

// Enhanced mobile menu management
document.addEventListener('click', function(e) {
    const navMenu = document.querySelector('.nav-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navMenu && menuBtn && !navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
    }
});

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu
        const navMenu = document.querySelector('.nav-menu');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.focus();
        }
        
        // Close dropdowns
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (toggle && menu && toggle.getAttribute('aria-expanded') === 'true') {
                toggle.setAttribute('aria-expanded', 'false');
                menu.style.display = 'none';
                toggle.focus();
            }
        });
        
        // Stop hero carousel autoplay
        if (document.querySelector('.hero-carousel')) {
            stopHeroAutoplay();
        }
    }
});

// Enhanced viewport height calculation for mobile browsers
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial viewport height
setViewportHeight();

// Update viewport height on resize and orientation change
window.addEventListener('resize', setViewportHeight, { passive: true });
window.addEventListener('orientationchange', setViewportHeight, { passive: true });

// Enhanced touch event handling to prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// Export enhanced functions for global access
window.UM6P = {
    // Hero carousel functions
    changeHeroSlide,
    currentHeroSlide,
    startHeroAutoplay,
    stopHeroAutoplay,
    
    // Navigation functions
    toggleMobileMenu,
    
    // Gallery functions
    changeSlide,
    currentSlide,
    
    // Blog functions
    changePage,
    filterPosts,
    
    // Utility functions
    openNewsletterArchive,
    openOpportunitiesDatabase,
    openEventsCalendar,
    
    // Accessibility functions
    announceSlideChange
};

// Make key functions available globally for HTML onclick handlers
window.changeHeroSlide = changeHeroSlide;
window.currentHeroSlide = currentHeroSlide;
window.toggleMobileMenu = toggleMobileMenu;
window.changePage = changePage;
window.filterPosts = filterPosts;