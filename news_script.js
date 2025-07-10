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

        // Gallery images data
        const galleryImages = [
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
                src: "images/gallery/ISdB.webp",
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

        // Gallery functionality
        let currentSlide = 0;
        let autoplayInterval;
        let isAutoplayActive = true;
        const autoplayDelay = 5000; // 5 seconds

        // Sort blog posts by date (newest to oldest) and ensure proper initialization
        blogPosts.sort((a, b) => b.sortDate - a.sortDate);

        // Pagination variables
        const postsPerPage = 6;
        let currentPage = 1;
        let filteredPosts = [...blogPosts]; // Copy sorted array

        // Enhanced mobile menu toggle
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

        // Enhanced image loading with fallback
        function createImageElement(post) {
            const img = document.createElement('img');
            img.className = 'blog-image';
            img.alt = post.title;
            img.loading = 'lazy';
            
            img.addEventListener('error', function() {
                // Create fallback div with gradient background
                const fallback = document.createElement('div');
                fallback.className = 'blog-image-placeholder';
                fallback.textContent = '📰';
                fallback.setAttribute('role', 'img');
                fallback.setAttribute('aria-label', post.title);
                this.parentNode.replaceChild(fallback, this);
            });
            
            img.src = post.image;
            return img;
        }

        // Gallery Functions
        function initializeGallery() {
            const galleryMain = document.getElementById('gallery-main');
            const galleryThumbnails = document.getElementById('gallery-thumbnails');
            const galleryTotal = document.getElementById('gallery-total');
            
            if (!galleryMain || !galleryThumbnails || !galleryTotal) return;

            // Set total count
            galleryTotal.textContent = galleryImages.length;

            // Create slides
            galleryImages.forEach((image, index) => {
                // Create main slide
                const slide = document.createElement('div');
                slide.className = `gallery-slide ${index === 0 ? 'active' : ''}`;
                slide.setAttribute('role', 'tabpanel');
                slide.setAttribute('aria-labelledby', `gallery-thumb-${index}`);
                
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.alt;
                img.loading = index === 0 ? 'eager' : 'lazy';
                
                // Add error handling for gallery images
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
                });
                
                const overlay = document.createElement('div');
                overlay.className = 'gallery-overlay';
                overlay.innerHTML = `
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                `;
                
                slide.appendChild(img);
                slide.appendChild(overlay);
                galleryMain.appendChild(slide);

                // Create thumbnail
                const thumbnail = document.createElement('button');
                thumbnail.className = `gallery-thumbnail ${index === 0 ? 'active' : ''}`;
                thumbnail.setAttribute('role', 'tab');
                thumbnail.setAttribute('id', `gallery-thumb-${index}`);
                thumbnail.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
                thumbnail.setAttribute('aria-label', `View ${image.title}`);
                thumbnail.onclick = () => goToSlide(index);
                
                const thumbImg = document.createElement('img');
                thumbImg.src = image.src;
                thumbImg.alt = '';
                thumbImg.loading = 'lazy';
                
                // Add error handling for thumbnail images
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
                });
                
                thumbnail.appendChild(thumbImg);
                galleryThumbnails.appendChild(thumbnail);
            });

            // Start autoplay
            startAutoplay();
        }

        function changeSlide(direction) {
            const slides = document.querySelectorAll('.gallery-slide');
            const thumbnails = document.querySelectorAll('.gallery-thumbnail');
            
            if (slides.length === 0) return;

            // Remove active classes
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].classList.add('prev');
            thumbnails[currentSlide].classList.remove('active');
            thumbnails[currentSlide].setAttribute('aria-selected', 'false');

            // Calculate new slide index
            currentSlide = (currentSlide + direction + slides.length) % slides.length;

            // Add active classes
            setTimeout(() => {
                slides.forEach(slide => slide.classList.remove('prev'));
                slides[currentSlide].classList.add('active');
                thumbnails[currentSlide].classList.add('active');
                thumbnails[currentSlide].setAttribute('aria-selected', 'true');
                
                // Update counter
                const galleryCurrentElement = document.getElementById('gallery-current');
                if (galleryCurrentElement) {
                    galleryCurrentElement.textContent = currentSlide + 1;
                }
                
                // Update progress bar
                updateProgressBar();
            }, 100);

            // Reset autoplay
            if (isAutoplayActive) {
                stopAutoplay();
                startAutoplay();
            }
        }

        function goToSlide(index) {
            if (index === currentSlide) return;
            
            const direction = index > currentSlide ? 1 : -1;
            const steps = Math.abs(index - currentSlide);
            
            // Directly go to the slide for better UX
            const slides = document.querySelectorAll('.gallery-slide');
            const thumbnails = document.querySelectorAll('.gallery-thumbnail');
            
            // Remove active classes
            slides[currentSlide].classList.remove('active');
            thumbnails[currentSlide].classList.remove('active');
            thumbnails[currentSlide].setAttribute('aria-selected', 'false');

            currentSlide = index;

            // Add active classes
            slides[currentSlide].classList.add('active');
            thumbnails[currentSlide].classList.add('active');
            thumbnails[currentSlide].setAttribute('aria-selected', 'true');
            
            // Update counter
            const galleryCurrentElement = document.getElementById('gallery-current');
            if (galleryCurrentElement) {
                galleryCurrentElement.textContent = currentSlide + 1;
            }
            
            // Update progress bar
            updateProgressBar();

            // Reset autoplay
            if (isAutoplayActive) {
                stopAutoplay();
                startAutoplay();
            }
        }

        function startAutoplay() {
            if (autoplayInterval) clearInterval(autoplayInterval);
            autoplayInterval = setInterval(() => {
                changeSlide(1);
            }, autoplayDelay);
            updateProgressBar();
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        function toggleAutoplay() {
            const icon = document.getElementById('autoplay-icon');
            if (!icon) return;
            
            isAutoplayActive = !isAutoplayActive;
            
            if (isAutoplayActive) {
                startAutoplay();
                icon.className = 'fas fa-pause';
            } else {
                stopAutoplay();
                icon.className = 'fas fa-play';
            }
        }

        function updateProgressBar() {
            const progressBar = document.getElementById('gallery-progress');
            if (!progressBar || !isAutoplayActive) {
                if (progressBar) progressBar.style.width = '0%';
                return;
            }
            
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += (100 / (autoplayDelay / 50)); // Update every 50ms
                progressBar.style.width = `${Math.min(progress, 100)}%`;
                
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    progressBar.style.width = '0%';
                }
            }, 50);
        }

        // Touch/Swipe support for mobile
        function addTouchSupport() {
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

                if (Math.abs(diffX) > 50) { // Minimum swipe distance
                    if (diffX > 0) {
                        changeSlide(1); // Swipe left - next slide
                    } else {
                        changeSlide(-1); // Swipe right - previous slide
                    }
                }

                startX = startY = 0;
            }, { passive: true });
        }

        // Pause autoplay on hover
        function addHoverSupport() {
            const galleryCarousel = document.querySelector('.gallery-carousel');
            if (!galleryCarousel) return;

            galleryCarousel.addEventListener('mouseenter', () => {
                if (isAutoplayActive) {
                    stopAutoplay();
                }
            });

            galleryCarousel.addEventListener('mouseleave', () => {
                if (isAutoplayActive) {
                    startAutoplay();
                }
            });
        }

        // Keyboard navigation for gallery
        function addKeyboardSupport() {
            document.addEventListener('keydown', (e) => {
                // Only handle keys when gallery is in view or focused
                const gallerySection = document.querySelector('.gallery-section');
                if (!gallerySection) return;

                const rect = gallerySection.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                const isFocused = gallerySection.contains(document.activeElement);

                if (!isInView && !isFocused) return;

                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        changeSlide(-1);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        changeSlide(1);
                        break;
                    case ' ': // Spacebar
                        if (isFocused) {
                            e.preventDefault();
                            toggleAutoplay();
                        }
                        break;
                    case 'Home':
                        if (isFocused) {
                            e.preventDefault();
                            goToSlide(0);
                        }
                        break;
                    case 'End':
                        if (isFocused) {
                            e.preventDefault();
                            goToSlide(galleryImages.length - 1);
                        }
                        break;
                }
            });
        }

        // Blog post functionality (updated for categories)
        function renderPosts(posts, page) {
            const start = (page - 1) * postsPerPage;
            const end = start + postsPerPage;
            const postsToDisplay = posts.slice(start, end);

            const blogGrid = document.getElementById('blog-grid');
            if (blogGrid) {
                blogGrid.innerHTML = '';
                
                // Add loading state
                blogGrid.setAttribute('aria-busy', 'true');
                
                if (postsToDisplay.length === 0) {
                    // Show no results message
                    const noResults = document.createElement('div');
                    noResults.className = 'no-results';
                    noResults.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--medium-gray);';
                    noResults.innerHTML = '<h3>No articles found</h3><p>Try adjusting your search terms or filters.</p>';
                    blogGrid.appendChild(noResults);
                } else {
                    postsToDisplay.forEach((post, index) => {
                        const article = document.createElement('article');
                        article.className = 'blog-post fade-in';
                        article.setAttribute('role', 'article');
                        
                        // Create image element
                        const imageElement = createImageElement(post);
                        
                        // Create content wrapper
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
                        
                        // Append image and content to article
                        article.appendChild(imageElement);
                        article.appendChild(contentWrapper);
                        
                        blogGrid.appendChild(article);
                    });
                }
                
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
            const pagination = document.getElementById('blog-pagination');
            
            // Hide pagination if only one page or no posts
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
                
                // Generate page numbers with ellipsis for large page counts
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
                        ellipsis.style.cssText = 'padding: 0.75rem; color: var(--medium-gray);';
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
                        ellipsis.style.cssText = 'padding: 0.75rem; color: var(--medium-gray);';
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
                    window.scrollTo({ top: document.querySelector('.blog-content').offsetTop - 100, behavior: 'smooth' });
                }
            };
            return pageBtn;
        }

        // Enhanced change page function
        function changePage(direction) {
            const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
            
            if (direction === 'prev' && currentPage > 1) {
                currentPage--;
            } else if (direction === 'next' && currentPage < totalPages) {
                currentPage++;
            } else {
                return; // No change needed
            }
            
            renderPosts(filteredPosts, currentPage);
            
            // Smooth scroll to blog content
            const blogContent = document.querySelector('.blog-content');
            if (blogContent) {
                window.scrollTo({ 
                    top: blogContent.offsetTop - 100, 
                    behavior: 'smooth' 
                });
            }
            
            // Announce page change
            updateResultsSummary();
        }

        // Enhanced filter posts with debouncing
        let filterTimeout;
        function filterPosts() {
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(() => {
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

                // Reset to first page when filtering
                currentPage = 1;
                renderPosts(filteredPosts, currentPage);
                updateResultsSummary();
            }, 300); // 300ms debounce
        }

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
            
            // Scroll to blog section
            const blogSection = document.querySelector('.blog-content');
            if (blogSection) {
                blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Trigger filter
            filterPosts();
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
            window.open('https://um6p-my.sharepoint.com/:x:/g/personal/africa_initiative_um6p_ma/EdKkT38UIMJKnWRJJ6od7mMBMmYwY8G8cp4V6WHHEdCZew?e=aH35dU&nav=MTVfezAwMDAwMDAwLTAwMDEtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMH0', '_blank', 'noopener,noreferrer');
        }

        // Intersection Observer for animations
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

        // Enhanced search functionality with real-time updates
        function setupEnhancedSearch() {
            const searchInput = document.getElementById('search-posts');
            const filterSelect = document.getElementById('filter-tags');
            
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    filterPosts();
                });
                
                // Handle Enter key for search
                searchInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        filterPosts();
                    }
                });
            }
            
            if (filterSelect) {
                filterSelect.addEventListener('change', function() {
                    filterPosts();
                });
            }
        }

        // Enhanced page initialization
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all elements
            console.log('Initializing with', blogPosts.length, 'blog posts');
            console.log('First post date:', blogPosts[0]?.date);
            console.log('Last post date:', blogPosts[blogPosts.length - 1]?.date);
            
            observeElements();
            setupEnhancedSearch();
            renderPosts(filteredPosts, currentPage);
            updateResultsSummary();
            
            // Initialize gallery
            initializeGallery();
            addTouchSupport();
            addHoverSupport();
            addKeyboardSupport();
            
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

        // Mobile menu close on outside click
        document.addEventListener('click', function(e) {
            const navMenu = document.querySelector('.nav-menu');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            if (navMenu && menuBtn && !navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const navMenu = document.querySelector('.nav-menu');
                const menuBtn = document.querySelector('.mobile-menu-btn');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                    menuBtn.focus();
                }
            }
        });

        // Enhanced loading state management
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            stopAutoplay();
        });

        // Make global functions available
        window.toggleMobileMenu = toggleMobileMenu;
        window.changePage = changePage;
        window.filterPosts = filterPosts;
        window.filterByCategory = filterByCategory;
        window.openNewsletterArchive = openNewsletterArchive;
        window.openOpportunitiesDatabase = openOpportunitiesDatabase;
        window.openEventsCalendar = openEventsCalendar;
        window.changeSlide = changeSlide;
        window.goToSlide = goToSlide;
        window.toggleAutoplay = toggleAutoplay;
    