// =====================================
// GLOBAL VARIABLES AND CONFIGURATION
// =====================================

// Hero Carousel Variables with Better Interval Management
let currentHeroSlideIndex = 0;
const totalHeroSlides = 4;
let heroAutoplayInterval = null;
let heroProgressInterval = null;
const autoplayDuration = 6000; // 6 seconds per slide

// Gallery Carousel Variables (for photo galleries)
let currentSlideIndex = 0;
const totalSlides = 6;

// News Gallery Variables
let currentNewsGallerySlide = 0;
let newsAutoplayInterval;
let isNewsAutoplayActive = true;
const newsAutoplayDelay = 5000; // 5 seconds

// Performance optimization variables
let isReducedMotion = false;
let imageLoadPromises = [];

// Debouncing variables
let resetTimeout = null;
let isResetting = false;

// Cached DOM elements for performance
const domCache = {
    header: null,
    heroCarousel: null,
    blogGrid: null,
    navMenu: null,
    mobileMenuBtn: null,
    progressBar: null
};

// Performance tracking
let scrollTicking = false;
let resizeTicking = false;

// Blog posts data with categories - Sorted by date (newest first)
const blogPosts = [
    {
        image: "images/higher-education.webp",
        date: "July 09, 2025",
        category: "Education",
        title: "The State of African Higher Education: Trends and Opportunities",
        excerpt: "A comprehensive analysis of Africa's evolving educational landscape based on empirical data from UNESCO, World Bank, and African Union sources.",
        link: "african_higher_education.html",
        tags: ["Higher Education", "Africa", "Research", "Data Analysis"],
        year: 2025,
        month: "July",
        sortDate: new Date("2025-07-09")
    },
    {
        image: "images/skills.webp",
        date: "June 15, 2025",
        category: "Skills",
        title: "Skills for Tomorrow: Preparing African Students for the Future Economy",
        excerpt: "Skills development trends across Africa. Preparing students for tomorrow's economy.",
        link: "skills_future_economy.html",
        tags: ["Skills Development", "Future Economy", "Education", "Digital Skills", "Industry 4.0"],
        year: 2025,
        month: "June",
        sortDate: new Date("2025-06-15")
    },
    {
        image: "images/startup.webp",
        date: "June 07, 2025",
        category: "Entrepreneurship",
        title: "The Rise of Entrepreneurial Universities in Africa",
        excerpt: "Discover how African universities are transforming from traditional knowledge centers into engines of economic development, creating job creators rather than job seekers and driving innovation across the continent.",
        link: "entrepreneurial_universities_africa.html",
        tags: ["Entrepreneurship", "Universities", "Innovation", "Economic Development", "Youth Employment"],
        year: 2025,
        month: "June",
        sortDate: new Date("2025-06-07")
    },
    {
        image: "images/energy-research.webp",
        date: "May 10, 2025",
        category: "Energy",
        title: "The State of Energy Research in Africa",
        excerpt: "A comprehensive analysis of Africa's energy research landscape, investment trends, institutional capacity, and emerging opportunities in renewable energy development across the continent.",
        link: "energy_research_africa.html",
        tags: ["Energy Research", "Renewable Energy", "Investment", "Research Institutions", "SEFA", "ARUA"],
        year: 2025,
        month: "May",
        sortDate: new Date("2025-05-10")
    },
    {
        image: "images/future.webp",
        date: "April 15, 2025",
        category: "Health",
        authorLink: "https://www.linkedin.com/in/hajar-bahi", 
        title: "African Health Futures: A Foresight Perspective for a Resilient Tomorrow",
        excerpt: "Exploring strategic foresight methodologies to anticipate Africa's evolving health landscape, from epidemiological transitions to technological leapfrogging and community-centered care models.",
        link: "african_health_futures.html",
        tags: ["Health Futures", "Strategic Foresight", "Africa", "Epidemiological Transition", "Health Planning", "Futures Thinking"],
        year: 2025,
        month: "April",
        sortDate: new Date("2025-04-15")
    },
    {
        image: "images/compass.webp",
        date: "April 23, 2025",
        category: "Education", 
        authorLink: "https://www.linkedin.com/in/azeezhamzat",
        title: "When the Map Fails: Navigating Academic Purpose",
        excerpt: "A reflective exploration of academic disorientation and existential uncertainty in scholarly life, examining how to find deeper meaning beyond external metrics and rediscover purpose when conventional guideposts fail.",
        link: "when_map_fails_academic_purpose.html",
        tags: ["Academic Life", "Purpose", "Reflection", "Scholarly Life", "PhD Journey", "Academic Compass"],
        year: 2025,
        month: "April",
        sortDate: new Date("2025-04-23")
    },
    {
        image: "images/healthcare.webp",
        date: "April 15, 2025",
        category: "Health",
        title: "Rethinking Africa's Health Systems for Sustainable Resilience",
        excerpt: "Building the foundation for a healthier continent through systematic transformation of Africa's health infrastructure, workforce development, and pharmaceutical independence.",
        link: "africa_health_systems.html",
        tags: ["Health Systems", "Healthcare", "Africa", "Medical Infrastructure", "Pharmaceutical Independence", "Health Workforce"],
        year: 2025,
        month: "April",
        sortDate: new Date("2025-04-15")
    }
];

// News Gallery images data
const newsGalleryImages = [
    {
        src: "images/gallery/Ace-Impact-Morocco.webp",
        alt: "UACE Impact-Morocco Partnership Forum 2023",
        title: "ACE Impact-Morocco Partnership Forum",
        description: "ACE Impact–Morocco Partnership Forum offers valuable learning platform for Vice Chancellors from across Africa to strengthen higher education collaboration."
    },
    {
        src: "images/gallery/DFS-signing.webp",
        alt: "Digital Farming School (DFS) signing ceremony",
        title: "Digital Farming School (DFS) Signing Ceremony",
        description: "Official signing ceremony establishing the Digital Farming School to advance agricultural technology and innovation across Africa."
    },
    {
        src: "images/gallery/INP-HB.webp",
        alt: "INP-HB at UM6P",
        title: "Strengthening Ties Through Leadership: INP-HB at UM6P",
        description: "Student delegation from INP-HB for leadership and cultural immersion under the theme 'Cultures croisées et leadership étudiant.'"
    },
    {
        src: "images/gallery/Mme_Gakinya.webp",
        alt: "Visit of Her Excellence Mrs. Jessica Gakinya",
        title: "Visit of Her Excellence Mrs. Jessica Gakinya, Ambassador of Kenya to Morocco",
        description: "We had the honor of welcoming Her Excellency Mrs. Jessica Gakinya, Ambassador of Kenya to Morocco, along with Mr. Abdullahi Nurrow, Economic Counselor, to explore shared ambitions for Africa's sustainable development."
    },
    {
        src: "images/gallery/IsDB.webp",
        alt: "Visit of the delegation of the Islamic Development Bank",
        title: "Visit of the Delegation of the Islamic Development Bank",
        description: "Exploring collaboration opportunities for deploying UM6P-driven solutions across African countries, with focus on agriculture, entrepreneurship, employability, and capacity building."
    },
    {
        src: "images/gallery/recteur_amadou.webp",
        alt: "Recteur de l'Université Amadou Makhtar Mbow, le Pr. Ibrahima CISSE PAD",
        title: "Visit of Pr. Ibrahima CISSE PAD, Rector of Université Amadou Makhtar Mbow",
        description: "High-level academic visit strengthening partnerships between UM6P and Université Amadou Makhtar Mbow to advance higher education collaboration in West Africa."
    },
    {
        src: "images/gallery/GEP.webp",
        alt: "AAU members visiting the UM6P's Green Energy Park",
        title: "Association of African Universities (AAU) Members Visiting UM6P's Green Energy Park",
        description: "Distinguished delegation from the Association of African Universities exploring cutting-edge renewable energy research and innovation at UM6P's Green Energy Park."
    },
    {
        src: "images/gallery/ESOs-workshop.webp",
        alt: "ESOs Workshop",
        title: "Entrepreneurship Support Ecosystems Workshop",
        description: "Intensive brainstorming session focused on developing African agripreneurship and strengthening entrepreneurship support ecosystems across the continent."
    },
    {
        src: "images/gallery/SUA-delegation.webp",
        alt: "High-level delegation from Sokoine University of Agriculture (SUA)",
        title: "High-level Delegation from Sokoine University of Agriculture (SUA)",
        description: "Strategic partnership discussions with Sokoine University of Agriculture delegation to advance agricultural research, innovation, and capacity building in East Africa."
    }
];

// Blog Pagination variables
const postsPerPage = 6;
let currentPage = 1;
let filteredPosts = [...blogPosts];

// Sort blog posts by date (newest to oldest)
blogPosts.sort((a, b) => b.sortDate - a.sortDate);
filteredPosts.sort((a, b) => b.sortDate - a.sortDate);

// =====================================
// PERFORMANCE OPTIMIZATION UTILITIES
// =====================================

// Optimized throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized debounce function
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

// Cache DOM elements for better performance
function cacheDOMElements() {
    domCache.header = document.querySelector('.header');
    domCache.heroCarousel = document.querySelector('.hero-carousel');
    domCache.blogGrid = document.getElementById('blog-grid');
    domCache.navMenu = document.querySelector('.nav-menu');
    domCache.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    domCache.progressBar = document.querySelector('.hero-progress-bar');
}

// =====================================
// UTILITY FUNCTIONS
// =====================================

// Initialize reduced motion preference
function initReducedMotion() {
    isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Enhanced image loading with better error handling and lazy loading
function createImageElement(post) {
    const img = document.createElement('img');
    img.className = 'blog-image';
    img.alt = post.title;
    img.loading = 'lazy';
    
    img.addEventListener('error', function() {
        const fallback = document.createElement('div');
        fallback.className = 'blog-image-placeholder';
        fallback.textContent = '📰';
        fallback.setAttribute('role', 'img');
        fallback.setAttribute('aria-label', post.title);
        this.parentNode.replaceChild(fallback, this);
    }, { once: true });
    
    img.src = post.image;
    return img;
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

// =====================================
// HERO CAROUSEL FUNCTIONS
// =====================================

// Hero carousel image preloading
function preloadHeroImages() {
    const imageUrls = [
        'images/hero/africa-collaboration.jpg',
        'images/hero/research-innovation.jpg',
        'images/hero/education-campus.jpg',
        'images/hero/sustainable-development.jpg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        const loadPromise = new Promise((resolve) => {
            img.onload = () => resolve(url);
            img.onerror = () => {
                console.warn(`Failed to load hero image: ${url}`);
                resolve(url);
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
    if (domCache.progressBar) {
        domCache.progressBar.style.width = '0%';
        domCache.progressBar.style.transition = 'none';
    }
}

// Improved function to start autoplay with safety checks
function startHeroAutoplay() {
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
const resetHeroAutoplay = debounce(() => {
    if (isResetting) return;
    
    isResetting = true;
    stopHeroAutoplay();
    setTimeout(() => {
        startHeroAutoplay();
        isResetting = false;
    }, 200);
}, 100);

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
    if (domCache.progressBar && !isReducedMotion) {
        domCache.progressBar.style.transition = 'none';
        domCache.progressBar.style.width = '0%';
        requestAnimationFrame(() => {
            domCache.progressBar.style.transition = `width ${autoplayDuration}ms linear`;
            domCache.progressBar.style.width = '100%';
        });
    }
}

function announceSlideChange(slideNumber) {
    const announcement = `Slide ${slideNumber} of ${totalHeroSlides}`;
    const announcer = document.getElementById('slide-announcer');
    if (announcer) {
        announcer.textContent = announcement;
    }
}

// =====================================
// NEWS GALLERY FUNCTIONS (OPTIMIZED)
// =====================================

function initializeNewsGallery() {
    const galleryMain = document.getElementById('gallery-main');
    const galleryThumbnails = document.getElementById('gallery-thumbnails');
    const galleryTotal = document.getElementById('gallery-total');
    
    if (!galleryMain || !galleryThumbnails || !galleryTotal) return;

    galleryTotal.textContent = newsGalleryImages.length;

    // Use document fragment for better performance
    const slidesFragment = document.createDocumentFragment();
    const thumbnailsFragment = document.createDocumentFragment();

    newsGalleryImages.forEach((image, index) => {
        // Create main slide
        const slide = document.createElement('div');
        slide.className = `gallery-slide ${index === 0 ? 'active' : ''}`;
        slide.setAttribute('role', 'tabpanel');
        slide.setAttribute('aria-labelledby', `gallery-thumb-${index}`);
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.loading = index === 0 ? 'eager' : 'lazy';
        
        // Optimized error handling
        img.addEventListener('error', function() {
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 100%;
                height: 100%;
                background: var(--gradient-1);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 3rem;
            `;
            fallback.textContent = '🖼️';
            fallback.setAttribute('role', 'img');
            fallback.setAttribute('aria-label', image.alt);
            this.parentNode.replaceChild(fallback, this);
        }, { once: true });
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.innerHTML = `
            <h3>${image.title}</h3>
            <p>${image.description}</p>
        `;
        
        slide.appendChild(img);
        slide.appendChild(overlay);
        slidesFragment.appendChild(slide);

        // Create thumbnail
        const thumbnail = document.createElement('button');
        thumbnail.className = `gallery-thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.setAttribute('role', 'tab');
        thumbnail.setAttribute('id', `gallery-thumb-${index}`);
        thumbnail.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        thumbnail.setAttribute('aria-label', `View ${image.title}`);
        thumbnail.onclick = () => goToNewsSlide(index);
        
        const thumbImg = document.createElement('img');
        thumbImg.src = image.src;
        thumbImg.alt = '';
        thumbImg.loading = 'lazy';
        
        thumbImg.addEventListener('error', function() {
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 100%;
                height: 100%;
                background: var(--gradient-1);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
            `;
            fallback.textContent = '🖼️';
            this.parentNode.replaceChild(fallback, this);
        }, { once: true });
        
        thumbnail.appendChild(thumbImg);
        thumbnailsFragment.appendChild(thumbnail);
    });

    // Append fragments at once for better performance
    galleryMain.appendChild(slidesFragment);
    galleryThumbnails.appendChild(thumbnailsFragment);

    // Start autoplay
    startNewsAutoplay();
}

// Optimized slide change function
const changeNewsSlide = throttle((direction) => {
    const slides = document.querySelectorAll('.gallery-slide');
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    
    if (slides.length === 0) return;

    // Remove active classes
    slides[currentNewsGallerySlide].classList.remove('active');
    slides[currentNewsGallerySlide].classList.add('prev');
    thumbnails[currentNewsGallerySlide].classList.remove('active');
    thumbnails[currentNewsGallerySlide].setAttribute('aria-selected', 'false');

    // Calculate new slide index
    currentNewsGallerySlide = (currentNewsGallerySlide + direction + slides.length) % slides.length;

    // Add active classes with RAF for smooth animation
    requestAnimationFrame(() => {
        slides.forEach(slide => slide.classList.remove('prev'));
        slides[currentNewsGallerySlide].classList.add('active');
        thumbnails[currentNewsGallerySlide].classList.add('active');
        thumbnails[currentNewsGallerySlide].setAttribute('aria-selected', 'true');
        
        // Update counter
        const galleryCurrentElement = document.getElementById('gallery-current');
        if (galleryCurrentElement) {
            galleryCurrentElement.textContent = currentNewsGallerySlide + 1;
        }
        
        // Update progress bar
        updateNewsProgressBar();
    });

    // Reset autoplay
    if (isNewsAutoplayActive) {
        stopNewsAutoplay();
        startNewsAutoplay();
    }
}, 150);

function goToNewsSlide(index) {
    if (index === currentNewsGallerySlide) return;
    
    const slides = document.querySelectorAll('.gallery-slide');
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    
    // Remove active classes
    slides[currentNewsGallerySlide].classList.remove('active');
    thumbnails[currentNewsGallerySlide].classList.remove('active');
    thumbnails[currentNewsGallerySlide].setAttribute('aria-selected', 'false');

    currentNewsGallerySlide = index;

    // Add active classes
    slides[currentNewsGallerySlide].classList.add('active');
    thumbnails[currentNewsGallerySlide].classList.add('active');
    thumbnails[currentNewsGallerySlide].setAttribute('aria-selected', 'true');
    
    // Update counter
    const galleryCurrentElement = document.getElementById('gallery-current');
    if (galleryCurrentElement) {
        galleryCurrentElement.textContent = currentNewsGallerySlide + 1;
    }
    
    // Update progress bar
    updateNewsProgressBar();

    // Reset autoplay
    if (isNewsAutoplayActive) {
        stopNewsAutoplay();
        startNewsAutoplay();
    }
}

function startNewsAutoplay() {
    if (newsAutoplayInterval) clearInterval(newsAutoplayInterval);
    newsAutoplayInterval = setInterval(() => {
        changeNewsSlide(1);
    }, newsAutoplayDelay);
    updateNewsProgressBar();
}

function stopNewsAutoplay() {
    if (newsAutoplayInterval) {
        clearInterval(newsAutoplayInterval);
        newsAutoplayInterval = null;
    }
}

function toggleNewsAutoplay() {
    const icon = document.getElementById('autoplay-icon');
    if (!icon) return;
    
    isNewsAutoplayActive = !isNewsAutoplayActive;
    
    if (isNewsAutoplayActive) {
        startNewsAutoplay();
        icon.className = 'fas fa-pause';
    } else {
        stopNewsAutoplay();
        icon.className = 'fas fa-play';
    }
}

// Optimized progress bar update
function updateNewsProgressBar() {
    const progressBar = document.getElementById('gallery-progress');
    if (!progressBar || !isNewsAutoplayActive) {
        if (progressBar) progressBar.style.width = '0%';
        return;
    }
    
    let progress = 0;
    const updateInterval = 100; // Reduced frequency for better performance
    const totalSteps = newsAutoplayDelay / updateInterval;
    const step = 100 / totalSteps;
    
    const progressInterval = setInterval(() => {
        progress += step;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            progressBar.style.width = '0%';
        }
    }, updateInterval);
}

// Touch/Swipe support for news gallery (optimized)
function addNewsGalleryTouchSupport() {
    const galleryMain = document.getElementById('gallery-main');
    if (!galleryMain) return;

    let startX = 0;
    let startY = 0;
    let isScrolling = undefined;

    galleryMain.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isScrolling = undefined;
    }, { passive: true });

    galleryMain.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = startX - currentX;
        const diffY = startY - currentY;

        if (isScrolling === undefined) {
            isScrolling = Math.abs(diffY) > Math.abs(diffX);
        }

        if (!isScrolling && Math.abs(diffX) > 10) {
            e.preventDefault();
        }
    }, { passive: false });

    galleryMain.addEventListener('touchend', (e) => {
        if (!startX || !startY || isScrolling) {
            startX = startY = 0;
            return;
        }

        const currentX = e.changedTouches[0].clientX;
        const diffX = startX - currentX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                changeNewsSlide(1);
            } else {
                changeNewsSlide(-1);
            }
        }

        startX = startY = 0;
    }, { passive: true });
}

// Hover support with throttling
const addNewsGalleryHoverSupport = throttle(() => {
    const galleryCarousel = document.querySelector('.gallery-carousel');
    if (!galleryCarousel) return;

    galleryCarousel.addEventListener('mouseenter', () => {
        if (isNewsAutoplayActive) {
            stopNewsAutoplay();
        }
    }, { passive: true });

    galleryCarousel.addEventListener('mouseleave', () => {
        if (isNewsAutoplayActive) {
            startNewsAutoplay();
        }
    }, { passive: true });
}, 100);

// Keyboard navigation for news gallery
function addNewsGalleryKeyboardSupport() {
    document.addEventListener('keydown', (e) => {
        const gallerySection = document.querySelector('.gallery-section');
        if (!gallerySection) return;

        const rect = gallerySection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        const isFocused = gallerySection.contains(document.activeElement);

        if (!isInView && !isFocused) return;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                changeNewsSlide(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                changeNewsSlide(1);
                break;
            case ' ':
                if (isFocused) {
                    e.preventDefault();
                    toggleNewsAutoplay();
                }
                break;
            case 'Home':
                if (isFocused) {
                    e.preventDefault();
                    goToNewsSlide(0);
                }
                break;
            case 'End':
                if (isFocused) {
                    e.preventDefault();
                    goToNewsSlide(newsGalleryImages.length - 1);
                }
                break;
        }
    }, { passive: false });
}

// =====================================
// BLOG/NEWS FUNCTIONALITY (OPTIMIZED)
// =====================================

// Optimized render posts function
function renderPosts(posts, page) {
    if (!domCache.blogGrid) return;
    
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsToDisplay = posts.slice(start, end);

    domCache.blogGrid.innerHTML = '';
    domCache.blogGrid.setAttribute('aria-busy', 'true');
    
    if (postsToDisplay.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--medium-gray);';
        noResults.innerHTML = '<h3>No articles found</h3><p>Try adjusting your search terms or filters.</p>';
        domCache.blogGrid.appendChild(noResults);
    } else {
        // Use document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        postsToDisplay.forEach((post, index) => {
            const article = document.createElement('article');
            article.className = 'blog-post fade-in';
            article.setAttribute('role', 'article');
            
            const imageElement = createImageElement(post);
            
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'blog-content-wrapper';
            contentWrapper.innerHTML = `
                <div class="blog-meta">
                    <span><i class="fas fa-calendar-alt" aria-hidden="true"></i> <time datetime="${post.sortDate.toISOString()}">${post.date}</time></span>
                    <span><i class="fas fa-tag" aria-hidden="true"></i> <span class="news-category">${post.category}</span></span>
                </div>
                <h3><a href="${post.link}" aria-describedby="excerpt-${start + index}">${post.title}</a></h3>
                <p id="excerpt-${start + index}">${post.excerpt}</p>
                <a href="${post.link}" class="news-link" aria-label="Read more about ${post.title}">
                    Read More <i class="fas fa-arrow-right" aria-hidden="true"></i>
                </a>
            `;
            
            article.appendChild(imageElement);
            article.appendChild(contentWrapper);
            fragment.appendChild(article);
        });
        
        domCache.blogGrid.appendChild(fragment);
    }
    
    domCache.blogGrid.setAttribute('aria-busy', 'false');
    updatePagination(posts);
    observeElements();
}

// Update pagination controls with better accessibility
function updatePagination(posts) {
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const paginationNumbers = document.getElementById('pagination-numbers');
    const pagination = document.getElementById('blog-pagination');
    
    if (totalPages <= 1) {
        if (pagination) {
            pagination.style.display = 'none';
        }
        return;
    } else {
        if (pagination) {
            pagination.style.display = 'flex';
        }
    }
    
    if (paginationNumbers) {
        paginationNumbers.innerHTML = '';
        
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        // First page
        if (startPage > 1) {
            const firstBtn = createPageButton(1, 1 === currentPage);
            paginationNumbers.appendChild(firstBtn);
            
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                ellipsis.className = 'pagination-ellipsis';
                paginationNumbers.appendChild(ellipsis);
            }
        }
        
        // Page range
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = createPageButton(i, i === currentPage);
            paginationNumbers.appendChild(pageBtn);
        }
        
        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                ellipsis.className = 'pagination-ellipsis';
                paginationNumbers.appendChild(ellipsis);
            }
            
            const lastBtn = createPageButton(totalPages, totalPages === currentPage);
            paginationNumbers.appendChild(lastBtn);
        }
    }

    // Update prev/next buttons
    if (pagination) {
        const prevBtn = pagination.querySelector('button:first-child');
        const nextBtn = pagination.querySelector('button:last-child');
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
        }
    }
}

// Helper function to create page buttons
function createPageButton(pageNum, isActive) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `btn pagination-btn ${isActive ? 'active' : ''}`;
    pageBtn.textContent = pageNum;
    pageBtn.setAttribute('aria-label', `Go to page ${pageNum}`);
    pageBtn.setAttribute('aria-current', isActive ? 'page' : 'false');
    pageBtn.onclick = () => {
        if (pageNum !== currentPage) {
            currentPage = pageNum;
            renderPosts(filteredPosts, currentPage);
            const blogContent = document.querySelector('.blog-content');
            if (blogContent) {
                blogContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };
    return pageBtn;
}

// Enhanced change page function with smooth scrolling optimization
function changePage(direction) {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    } else {
        return;
    }
    
    renderPosts(filteredPosts, currentPage);
    
    const blogContent = document.querySelector('.blog-content');
    if (blogContent) {
        blogContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    updateResultsSummary();
}

// Enhanced filter posts with optimized debouncing
const filterPosts = debounce(() => {
    const searchQuery = document.getElementById('search-posts')?.value.toLowerCase() || '';
    const selectedTag = document.getElementById('filter-tags')?.value || '';

    filteredPosts = blogPosts.filter(post => {
        const matchesSearch = searchQuery === '' || 
                            post.title.toLowerCase().includes(searchQuery) || 
                            post.excerpt.toLowerCase().includes(searchQuery) ||
                            post.category.toLowerCase().includes(searchQuery) ||
                            post.tags.some(tag => tag.toLowerCase().includes(searchQuery));
        
        const matchesTag = selectedTag === '' || post.category === selectedTag;
        
        return matchesSearch && matchesTag;
    });

    currentPage = 1;
    renderPosts(filteredPosts, currentPage);
    updateResultsSummary();
}, 250);

// Update results summary
function updateResultsSummary() {
    const summary = document.getElementById('results-summary');
    if (summary) {
        const searchQuery = document.getElementById('search-posts')?.value.trim();
        const category = document.getElementById('filter-tags')?.value;
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        
        let text = `Showing ${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''}`;
        
        if (totalPages > 1) {
            const start = (currentPage - 1) * postsPerPage + 1;
            const end = Math.min(currentPage * postsPerPage, filteredPosts.length);
            text = `Showing ${start}-${end} of ${filteredPosts.length} articles`;
        }
        
        if (category && searchQuery) {
            text += ` in "${category}" category matching "${searchQuery}"`;
        } else if (category) {
            text += ` in "${category}" category`;
        } else if (searchQuery) {
            text += ` matching "${searchQuery}"`;
        }
        
        summary.textContent = text;
        summary.style.display = 'block';
    }
}

// Enhanced filter by category function
function filterByCategory(category) {
    const filterSelect = document.getElementById('filter-tags');
    const searchInput = document.getElementById('search-posts');
    
    if (filterSelect) {
        filterSelect.value = category;
    }
    if (searchInput) {
        searchInput.value = '';
    }
    
    const blogSection = document.querySelector('.blog-content');
    if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    filterPosts();
}

// Enhanced search functionality with real-time updates
function setupEnhancedSearch() {
    const searchInput = document.getElementById('search-posts');
    const filterSelect = document.getElementById('filter-tags');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterPosts, { passive: true });
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                filterPosts();
            }
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', filterPosts, { passive: true });
    }
}

// =====================================
// NAVIGATION FUNCTIONS
// =====================================

// Mobile menu toggle with cached elements
function toggleMobileMenu() {
    if (domCache.navMenu && domCache.mobileMenuBtn) {
        const isExpanded = domCache.navMenu.classList.contains('active');
        
        domCache.navMenu.classList.toggle('active');
        domCache.mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            const firstMenuItem = domCache.navMenu.querySelector('a');
            if (firstMenuItem) {
                setTimeout(() => firstMenuItem.focus(), 100);
            }
        }
    }
}

// =====================================
// PERFORMANCE OPTIMIZED SCROLL HANDLERS
// =====================================

// Optimized header update function
const updateHeader = throttle(() => {
    if (domCache.header) {
        if (window.scrollY > 100) {
            domCache.header.style.background = 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(51, 51, 51, 0.95) 100%)';
            domCache.header.style.backdropFilter = 'blur(15px)';
        } else {
            domCache.header.style.background = 'linear-gradient(135deg, var(--primary-black) 0%, var(--dark-gray) 100%)';
            domCache.header.style.backdropFilter = 'blur(10px)';
        }
    }
}, 16); // ~60fps

// =====================================
// GENERAL CAROUSEL FUNCTIONS
// =====================================

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

// =====================================
// EXTERNAL LINKS FUNCTIONS
// =====================================

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
    window.open('https://um6p-my.sharepoint.com/:x:/g/personal/africa_initiative_um6p_ma/EdKkT38UIMJKnWRJJ6od7mMBMmYwY8G8cp4V6WHHEdCZew?e=aH35dU&nav=MTVfezAwMDAwMDAwLTAwMDEtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMH0', '_blank', 'noopener,noreferrer');
}

// =====================================
// IMAGE AND INITIALIZATION FUNCTIONS
// =====================================

// Optimized logo initialization
function initializeLogos() {
    const logoImages = document.querySelectorAll('.logo-img');
    
    if (logoImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loading');
                
                img.addEventListener('load', function() {
                    this.classList.remove('loading');
                    this.classList.add('loaded');
                }, { once: true });
                
                img.addEventListener('error', function() {
                    this.classList.remove('loading');
                    this.classList.add('error');
                    createFallback(this);
                }, { once: true });
                
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
        rootMargin: '50px',
        threshold: 0.1
    });
    
    logoImages.forEach(img => imageObserver.observe(img));
}

function initializeHeroImages() {
    const heroImages = document.querySelectorAll('.hero-feature-image');
    
    heroImages.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                font-size: 8rem;
                filter: drop-shadow(0 0 20px rgba(215, 73, 42, 0.5));
            `;
            
            const slideIndex = Array.from(img.closest('.hero-slide').parentNode.children).indexOf(img.closest('.hero-slide'));
            const emojis = ['🌍', '🔬', '🎓', '🌱'];
            fallback.textContent = emojis[slideIndex] || '🌍';
            
            img.parentNode.appendChild(fallback);
        }, { once: true });
    });
}

// =====================================
// ACCESSIBILITY FUNCTIONS (OPTIMIZED)
// =====================================

// Accessibility features
function initAccessibility() {
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
    
    // Optimized keyboard navigation for hero carousel
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

    // Dropdown keyboard navigation
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

// =====================================
// PERFORMANCE AND UTILITY FUNCTIONS
// =====================================

// Performance monitoring
function initPerformanceMonitoring() {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
        
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.entryType === 'largest-contentful-paint') {
                            console.log('LCP:', entry.startTime);
                        }
                    }
                });
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.log('Performance monitoring not fully supported');
            }
        }
    }, { once: true });
}

// Optimized form validation
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
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                input.classList.add('error');
                input.setAttribute('aria-invalid', 'true');
                
                if (!firstErrorField) firstErrorField = input;
            }
        }
    });
    
    if (!isValid && firstErrorField) {
        firstErrorField.focus();
    }
    
    return isValid;
}

// Optimized Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function observeElements() {
    const elements = document.querySelectorAll('.fade-in:not(.visible)');
    elements.forEach(el => observer.observe(el));
}

// Stats animation with intersection observer
function animateStats() {
    const statNumbers = document.querySelectorAll('.impact-stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target || stat.textContent);
        const suffix = '+';
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

// Workstreams diagram interactions
function initializeWorkstreamsInteractions() {
    const workstreamNodes = document.querySelectorAll('.workstream-node');
    const workstreamCards = document.querySelectorAll('.workstream-card');
    
    workstreamNodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            const correspondingCard = document.querySelector(`[data-workstream="${index + 1}"]`);
            if (correspondingCard) {
                correspondingCard.style.transform = 'translateY(-10px)';
                correspondingCard.style.boxShadow = '0 20px 40px rgba(215, 73, 42, 0.2)';
                correspondingCard.style.borderColor = 'var(--primary-red)';
            }
        }, { passive: true });
        
        node.addEventListener('mouseleave', function() {
            const correspondingCard = document.querySelector(`[data-workstream="${index + 1}"]`);
            if (correspondingCard) {
                correspondingCard.style.transform = '';
                correspondingCard.style.boxShadow = '';
                correspondingCard.style.borderColor = '';
            }
        }, { passive: true });
        
        node.addEventListener('click', function() {
            const correspondingCard = document.querySelector(`[data-workstream="${index + 1}"]`);
            if (correspondingCard) {
                correspondingCard.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                correspondingCard.style.background = 'rgba(215, 73, 42, 0.05)';
                setTimeout(() => {
                    correspondingCard.style.background = '';
                }, 2000);
            }
        });
    });
}

// Newsletter form submissions
function handleNewsletterSubmission(formId, successId) {
    const form = document.getElementById(formId);
    const successMessage = document.getElementById(successId);
    
    if (form && successMessage) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                successMessage.classList.add('show');
                successMessage.style.display = 'block';
                successMessage.setAttribute('role', 'alert');
                this.reset();
                
                successMessage.focus();
                
                setTimeout(() => {
                    successMessage.classList.remove('show');
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
}

// Initialize CTA buttons specifically with enhanced debugging
function initCTAButtons() {
    console.log('Initializing CTA buttons...');
    const ctaButtons = document.querySelectorAll('.cta-button');
    console.log('Found CTA buttons:', ctaButtons.length);
    
    ctaButtons.forEach((button, index) => {
        const href = button.getAttribute('href');
        console.log(`CTA Button ${index + 1}: href="${href}"`);
        
        // Ensure buttons are clickable with enhanced styling
        button.style.cssText += `
            pointer-events: auto !important;
            position: relative !important;
            z-index: 15 !important;
            cursor: pointer !important;
        `;
        
        // Remove any existing click handlers to avoid conflicts
        button.removeEventListener('click', handleCTAClick);
        
        // Add click event listener
        button.addEventListener('click', handleCTAClick, { passive: false });
        
        // Verify target exists
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (!target) {
                console.warn(`CTA button target not found: ${href}`);
            } else {
                console.log(`CTA button target found: ${href} -> ${target.tagName}#${target.id}`);
            }
        }
    });
}

// Dedicated CTA click handler
function handleCTAClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const href = this.getAttribute('href');
    console.log('CTA button clicked, href:', href);
    
    if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
            console.log('Navigating to:', href);
            
            // Stop hero autoplay
            stopHeroAutoplay();
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL hash without triggering page jump
            if (history.pushState) {
                history.pushState(null, null, href);
            } else {
                location.hash = href;
            }
            
            // Restart autoplay after navigation
            setTimeout(() => {
                if (!document.hidden && !isReducedMotion) {
                    startHeroAutoplay();
                }
            }, 1500);
        } else {
            console.error('CTA button target not found:', href);
            alert(`Navigation target "${href}" not found on page.`);
        }
    }
}

// Enhanced debugging for desktop vs mobile click issues
function debugClickIssues() {
    console.log('=== CLICK DEBUGGING ===');
    
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    console.log(`Screen width: ${window.innerWidth}px`);
    console.log(`Is mobile: ${isMobile}`);
    
    // Test click detection on each CTA button
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach((button, index) => {
        const rect = button.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(button);
        
        console.log(`\nButton ${index + 1}: "${button.textContent.trim()}"`);
        console.log(`  Position: ${rect.left.toFixed(1)}, ${rect.top.toFixed(1)}`);
        console.log(`  Size: ${rect.width.toFixed(1)} x ${rect.height.toFixed(1)}`);
        console.log(`  Z-index: ${computedStyle.zIndex}`);
        console.log(`  Pointer events: ${computedStyle.pointerEvents}`);
        console.log(`  Display: ${computedStyle.display}`);
        console.log(`  Visibility: ${computedStyle.visibility}`);
        
        // Test what element is actually at the button's center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const elementAtPoint = document.elementFromPoint(centerX, centerY);
        
        console.log(`  Element at center: ${elementAtPoint?.tagName}${elementAtPoint?.id ? '#' + elementAtPoint.id : ''}${elementAtPoint?.className ? '.' + elementAtPoint.className.split(' ')[0] : ''}`);
        console.log(`  Is button itself: ${elementAtPoint === button}`);
        console.log(`  Is button child: ${button.contains(elementAtPoint)}`);
        
        if (elementAtPoint !== button && !button.contains(elementAtPoint)) {
            console.log(`  ❌ BLOCKING ELEMENT DETECTED!`);
            console.log(`  Blocker z-index: ${window.getComputedStyle(elementAtPoint).zIndex}`);
        } else {
            console.log(`  ✅ Button is clickable`);
        }
    });
}

// Add click test functionality
function addClickTestOverlay() {
    if (window.location.hash === '#debug') {
        const style = document.createElement('style');
        style.textContent = `
            .cta-button::after {
                content: '';
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                border: 2px solid lime !important;
                border-radius: 50px;
                pointer-events: none;
                z-index: 999999;
            }
            .hero-overlay {
                border: 2px dashed red !important;
            }
            .hero-content {
                border: 2px dashed blue !important;
            }
            .hero-text {
                border: 2px dashed green !important;
            }
        `;
        document.head.appendChild(style);
        console.log('🐛 Debug mode enabled - you should see colored borders around elements');
    }
}
function debugAndFixCTAButtons() {
    console.log('=== CTA BUTTON DEBUG ===');
    
    // Check all hero slides
    const heroSlides = document.querySelectorAll('.hero-slide');
    console.log(`Found ${heroSlides.length} hero slides`);
    
    heroSlides.forEach((slide, slideIndex) => {
        console.log(`\n--- Slide ${slideIndex + 1} ---`);
        const ctaButtons = slide.querySelectorAll('.cta-button');
        console.log(`CTA buttons in slide: ${ctaButtons.length}`);
        
        ctaButtons.forEach((button, buttonIndex) => {
            const href = button.getAttribute('href');
            const target = href ? document.querySelector(href) : null;
            
            console.log(`Button ${buttonIndex + 1}:`);
            console.log(`  Text: "${button.textContent.trim()}"`);
            console.log(`  Href: "${href}"`);
            console.log(`  Target exists: ${!!target}`);
            console.log(`  Z-index: ${window.getComputedStyle(button).zIndex}`);
            console.log(`  Pointer events: ${window.getComputedStyle(button).pointerEvents}`);
            
            if (target) {
                console.log(`  Target: ${target.tagName}#${target.id}`);
            } else if (href) {
                console.log(`  ❌ TARGET NOT FOUND for ${href}`);
            }
            
            // Force click handler attachment
            button.onclick = function(e) {
                e.preventDefault();
                console.log(`Manual click handler triggered for: ${href}`);
                if (target) {
                    stopHeroAutoplay();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => {
                        if (!document.hidden && !isReducedMotion) {
                            startHeroAutoplay();
                        }
                    }, 1500);
                } else {
                    console.error('No target found for manual click');
                }
            };
        });
    });
    
    // Check if all required targets exist
    const requiredTargets = ['#about', '#workstreams', '#partners', '#contact'];
    console.log('\n--- Target Check ---');
    requiredTargets.forEach(targetId => {
        const target = document.querySelector(targetId);
        console.log(`${targetId}: ${target ? '✅ Found' : '❌ Missing'}`);
        if (target) {
            console.log(`  Element: ${target.tagName}#${target.id}.${target.className}`);
        }
    });
}

// Enhanced smooth scrolling for navigation links
function initSmoothScrolling() {
    console.log('Initializing smooth scrolling...');
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    console.log('Found anchor links:', anchorLinks.length);
    
    anchorLinks.forEach((anchor, index) => {
        const targetId = anchor.getAttribute('href');
        console.log(`Anchor ${index + 1}: href="${targetId}"`);
        
        // Verify target exists
        if (targetId && targetId !== '#') {
            const target = document.querySelector(targetId);
            if (!target) {
                console.warn(`Anchor target not found: ${targetId}`);
            }
        }
        
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip empty hashes
            if (!targetId || targetId === '#') {
                console.warn('Empty or invalid anchor href');
                return;
            }
            
            const target = document.querySelector(targetId);
            
            if (target) {
                console.log('Smooth scrolling to:', targetId);
                
                // Stop hero autoplay when navigating
                stopHeroAutoplay();
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update navigation active states only for nav menu items
                if (this.closest('.nav-menu')) {
                    document.querySelectorAll('.nav-menu a').forEach(link => {
                        link.classList.remove('active');
                        link.removeAttribute('aria-current');
                    });
                    this.classList.add('active');
                    this.setAttribute('aria-current', 'page');
                }
                
                // Close mobile menu if open
                if (domCache.navMenu && domCache.navMenu.classList.contains('active')) {
                    domCache.navMenu.classList.remove('active');
                    domCache.mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
                
                // Update URL hash
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
                
                // Restart hero autoplay after navigation
                setTimeout(() => {
                    if (!document.hidden && !isReducedMotion) {
                        startHeroAutoplay();
                    }
                }, 1500);
            } else {
                console.error('Smooth scroll target not found:', targetId);
                // Fallback: try to scroll to top if target not found
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// Touch/swipe support for hero carousel
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function initTouchSupport() {
    if (domCache.heroCarousel) {
        domCache.heroCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        domCache.heroCarousel.addEventListener('touchend', function(e) {
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
    
    if (Math.abs(horizontalDistance) > swipeThreshold && Math.abs(horizontalDistance) > verticalDistance) {
        if (horizontalDistance > 0) {
            changeHeroSlide(1);
        } else {
            changeHeroSlide(-1);
        }
    }
}

// Visibility change handler for carousel management
function handleVisibilityChange() {
    if (document.hidden) {
        stopHeroAutoplay();
    } else if (!isReducedMotion && !isResetting) {
        startHeroAutoplay();
    }
}

// =====================================
// PAGE INITIALIZATION (OPTIMIZED)
// =====================================

// Optimized page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements first for better performance
    cacheDOMElements();
    
    // Initialize reduced motion detection
    initReducedMotion();
    
    // Initialize core functionality
    initializeLogos();
    initializeHeroImages();
    initPerformanceMonitoring();
    initAccessibility();
    initSmoothScrolling();
    initCTAButtons();
    initTouchSupport();
    
    // Debug and fix any CTA button issues
    setTimeout(() => {
        debugAndFixCTAButtons();
        debugClickIssues();
        addClickTestOverlay();
    }, 500);
    
    // Add resize handler to debug desktop/mobile differences
    window.addEventListener('resize', debounce(() => {
        console.log('Screen resized, re-checking buttons...');
        debugClickIssues();
    }, 500));
    
    // Preload hero images for better performance
    preloadHeroImages().then(() => {
        console.log('Hero images preloaded');
    });
    
    // Observe all fade-in elements
    observeElements();
    
    // Initialize blog functionality if on news page
    if (domCache.blogGrid) {
        console.log('Initializing with', blogPosts.length, 'blog posts');
        setupEnhancedSearch();
        renderPosts(filteredPosts, currentPage);
        updateResultsSummary();
    }
    
    // Initialize news gallery if it exists
    if (document.getElementById('gallery-main')) {
        initializeNewsGallery();
        addNewsGalleryTouchSupport();
        addNewsGalleryHoverSupport();
        addNewsGalleryKeyboardSupport();
    }
    
    // Initialize hero carousel if it exists
    if (domCache.heroCarousel) {
        setTimeout(() => {
            startHeroAutoplay();
        }, 1000);
        
        let hoverTimeout;
        domCache.heroCarousel.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            stopHeroAutoplay();
        }, { passive: true });
        
        domCache.heroCarousel.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                if (!document.hidden && !isReducedMotion) {
                    startHeroAutoplay();
                }
            }, 500);
        }, { passive: true });
        
        domCache.heroCarousel.addEventListener('focusin', () => {
            stopHeroAutoplay();
        }, { passive: true });
        
        domCache.heroCarousel.addEventListener('focusout', () => {
            setTimeout(() => {
                if (!domCache.heroCarousel.contains(document.activeElement) && !document.hidden) {
                    startHeroAutoplay();
                }
            }, 100);
        }, { passive: true });
    }
    
    // Add visibility change listener for better carousel management
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Initialize workstream interactions if workstreams section exists
    if (document.querySelector('.workstreams-section')) {
        initializeWorkstreamsInteractions();
    }
    
    // Setup newsletter forms
    handleNewsletterSubmission('newsletterForm', 'newsletterSuccess');
    
    // Trigger stats animation when section comes into view
    const statsSection = document.querySelector('.impact-mission');
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
    
    // Optimized scroll event with passive listener
    window.addEventListener('scroll', updateHeader, { passive: true });
    
    // Loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => {
            if (!el.classList.contains('logo-img')) {
                el.classList.remove('loading');
            }
        });
    }, { once: true });
    
    // Error handling for failed resources
    window.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            console.warn('Failed to load image:', e.target.src);
            if (!e.target.classList.contains('error')) {
                if (e.target.classList.contains('logo-img')) {
                    createFallback(e.target);
                } else if (e.target.classList.contains('hero-feature-image')) {
                    e.target.style.display = 'none';
                }
            }
        }
    }, true);
    
    // Optimized resize handler with throttling
    const handleResize = throttle(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        if (document.querySelector('.gallery-carousel')) {
            updateCarousel();
        }
        
        initReducedMotion();
    }, 250);
    
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const successMessage = document.getElementById('newsletterSuccess');
            if (successMessage) {
                successMessage.classList.add('show');
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.classList.remove('show');
                    successMessage.style.display = 'none';
                }, 5000);
            }
            this.reset();
        });
    }
});

// Optimized mobile menu management
document.addEventListener('click', function(e) {
    if (domCache.navMenu && domCache.mobileMenuBtn && 
        !domCache.navMenu.contains(e.target) && !domCache.mobileMenuBtn.contains(e.target)) {
        domCache.navMenu.classList.remove('active');
        domCache.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
});

// Optimized keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (domCache.navMenu && domCache.navMenu.classList.contains('active')) {
            domCache.navMenu.classList.remove('active');
            domCache.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            domCache.mobileMenuBtn.focus();
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
        if (domCache.heroCarousel) {
            stopHeroAutoplay();
        }
    }
});

// Viewport height calculation for mobile browsers
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial viewport height
setViewportHeight();

// Touch event handling to prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// =====================================
// GLOBAL EXPORTS AND API
// =====================================

// Export test function for manual testing
window.testCTAButtons = function() {
    console.log('=== TESTING CTA BUTTONS ===');
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach((button, index) => {
        const href = button.getAttribute('href');
        const target = href ? document.querySelector(href) : null;
        
        console.log(`\nTesting button ${index + 1}: "${button.textContent.trim()}"`);
        console.log(`Href: ${href}`);
        console.log(`Target exists: ${!!target}`);
        
        if (target) {
            console.log(`✅ Button ${index + 1} should work`);
        } else {
            console.log(`❌ Button ${index + 1} will NOT work - target missing`);
        }
    });
    
    console.log('\n=== You can test by calling: ===');
    console.log('document.querySelector(".cta-button").click()');
    console.log('\n=== Or debug what\'s blocking clicks: ===');
    console.log('debugClickIssues()');
    console.log('\n=== Or enable visual debug mode: ===');
    console.log('Add #debug to URL and refresh page');
};

// Add global debug function
window.debugClickIssues = debugClickIssues;

// Force click through any blocking elements
window.forceButtonClick = function(buttonIndex = 0) {
    const buttons = document.querySelectorAll('.cta-button');
    const button = buttons[buttonIndex];
    if (button) {
        const href = button.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            console.log(`Force clicking button: ${button.textContent.trim()}`);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

// Export functions for global access
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
    changeNewsSlide: changeNewsSlide,
    goToNewsSlide: goToNewsSlide,
    toggleNewsAutoplay: toggleNewsAutoplay,
    
    // Blog functions
    changePage,
    filterPosts,
    filterByCategory,
    
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
window.filterByCategory = filterByCategory;
window.changeSlide = changeNewsSlide;
window.goToSlide = goToNewsSlide;
window.toggleAutoplay = toggleNewsAutoplay;
window.changeNewsSlide = changeNewsSlide;
window.goToNewsSlide = goToNewsSlide;
window.toggleNewsAutoplay = toggleNewsAutoplay;
window.openNewsletterArchive = openNewsletterArchive;
window.openOpportunitiesDatabase = openOpportunitiesDatabase;
window.openEventsCalendar = openEventsCalendar;