// Ensure Swiper is loaded (only needed if not included via CDN in HTML)
if (typeof Swiper === 'undefined') {
    console.warn('Swiper library not loaded. Include it via CDN in your HTML.');
}

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle (applies to all pages)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });

        // Dropdown toggle for mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            toggle.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
    }

    // Smooth Scroll for Anchor Links (all pages)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade-In Animation (all pages)
    const elements = document.querySelectorAll('section, .work-item, .highlight, .diagram-image, .impact-item, .blog-post, .team-member');
    const fadeIn = () => {
        elements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < window.innerHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', fadeIn);
    window.addEventListener('load', fadeIn);

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // News Page Functionality
    if (document.querySelector('.blog-hero')) { // Check if on news.html
        // Blog posts data
        const blogPosts = [
            {
                "image": "images/Healthcare.jpg",
                "date": "March 1, 2025",
                "author": "Azeez Hamzat",
                "authorLink": "https://www.linkedin.com/in/azeezhamzat",
                "title": "Advancing Healthcare in Africa: UM6P’s Vision for AI-Driven Innovation",
                "excerpt": "Learn how UM6P leverages AI to transform healthcare in Africa, addressing challenges and improving access during Science Week.",
                "link": "Advancing-healthcare.html",
                "tags": ["Health", "AI", "Innovation", "Africa"],
                "year": 2025,
                "month": "March"
            },
            {
                "image": "images/Energy-Research.jpg",
                "date": "February 27, 2025",
                "author": "Azeez Hamzat",
                "authorLink": "https://www.linkedin.com/in/Azeezhamzat",
                "title": "Why Africa Must Do More on Energy Research",
                "excerpt": "Learn why Africa must prioritize energy research to address access gaps and climate challenges, with insights on the €30M EU-AU fund boosting sustainable solutions.",
                "link": "africa-energy-research.html",
                "tags": ["Energy", "Research", "Sustainability", "Climate Change"],
                "year": 2025,
                "month": "February"
            },
            {
                "image": "images/NextAfrica.jpeg",
                "date": "February 28, 2025",
                "author": "Azeez Hamzat",
                "authorLink": "https://www.linkedin.com/in/azeezhamzat",
                "title": "NextAfrica: Bridging Europe and Africa Through Innovation at Station F",
                "excerpt": "Learn how UM6P’s NextAfrica program at Station F accelerates Greentech, Agritech, and Healthtech startups, connecting Europe and Africa for sustainable innovation.",
                "link": "next-africa.html",
                "tags": ["Innovation", "Entrepreneurship", "Environment", "Agriculture", "Health"],
                "year": 2025,
                "month": "February"
            },
            {
                image: "images/Startgate.jpg",
                date: "December 15, 2024",
                author: "Azeez Hamzat",
                authorLink: "https://www.linkedin.com/in/azeezhamzat",
                title: "Unleashing Africa’s Entrepreneurial Spirit: How UM6P is Shaping the Future Through Innovation",
                excerpt: "Discover how UM6P is empowering Africa’s youth to tackle challenges through entrepreneurship and innovation.",
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
                "image": "images/For Africa.png",
                "date": "January 10, 2025",
                "author": "Azeez Hamzat",
                "authorLink": "https://www.linkedin.com/in/azeezhamzat",
                "title": "For Africa: UM6P’s Commitment to Industry, Research, and Business Innovation",
                "excerpt": "Discover how UM6P drives excellence through AAIT, AIRESS, ABS, and the Center for African Studies, fostering innovation and African perspectives.",
                "link": "For-Africa.html",
                "tags": ["Industry", "Research", "Business", "African Studies"],
                "year": 2025,
                "month": "January"
            },
            {
                image: "images/excellence-in-africa.jpg",
                date: "January 23, 2024",
                author: "Azeez Hamzat",
                authorLink: "https://www.linkedin.com/in/azeezhamzat",
                title: "Excellence in Africa: UM6P and EPFL’s Collaborative Push for Academic Innovation",
                excerpt: "Explore how UM6P and EPFL are advancing academic excellence in Africa through the Excellence in Africa initiative.",
                link: "excellence-in-africa.html",
                tags: ["Education", "Research", "Innovation"],
                year: 2024,
                month: "January"
            },
            {
                "image": "images/um6pv.png",
                "date": "February 16, 2025",
                "author": "Azeez Hamzat",
                "authorLink": "https://www.linkedin.com/in/azeezhamzat",
                "title": "UM6P Ventures: Investing in Africa’s Future Through Science and Innovation",
                "excerpt": "Explore how UM6P Ventures supports Digital Transformation and Deeptech startups, driving innovation in Agriculture, GreenTech, and Healthtech across Africa.",
                "link": "um6p-ventures.html",
                "tags": ["Innovation", "Startups", "Deeptech", "Digital Transformation"],
                "year": 2025,
                "month": "February"
            }
        ];

        // Pagination variables
        const postsPerPage = 6;
        const recentPagesLimit = 3;
        const recentPostsLimit = postsPerPage * recentPagesLimit;
        let currentPage = 1;
        let filteredPosts = blogPosts;

        // Sort blogPosts by date (newest to oldest)
        blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Function to render blog posts (Recent Updates)
        function renderPosts(posts, page) {
            const start = (page - 1) * postsPerPage;
            const end = start + postsPerPage;
            const postsToDisplay = posts.slice(start, end);

            const blogGrid = document.getElementById('blog-grid');
            if (blogGrid) {
                blogGrid.innerHTML = '';
                postsToDisplay.forEach(post => {
                    const article = document.createElement('article');
                    article.className = 'blog-post';
                    const authorDisplay = post.authorLink ? `<a href="${post.authorLink}" target="_blank">${post.author}</a>` : post.author;
                    article.innerHTML = `
                        <img src="${post.image}" alt="${post.title}" class="blog-image">
                        <div class="blog-meta">
                            <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
                            <span><i class="fas fa-user"></i> ${authorDisplay}</span>
                        </div>
                        <h3>${post.title}</h3>
                        <p>${post.excerpt}</p>
                        <a href="${post.link}" class="read-more">Read More</a>
                    `;
                    blogGrid.appendChild(article);
                });
                updatePagination(posts);
            }
        }

        // Function to update pagination controls
        function updatePagination(posts) {
            const totalPages = Math.ceil(posts.length / postsPerPage);
            const paginationNumbers = document.getElementById('pagination-numbers');
            if (paginationNumbers) {
                paginationNumbers.innerHTML = '';
                for (let i = 1; i <= totalPages; i++) {
                    const pageBtn = document.createElement('button');
                    pageBtn.className = `btn pagination-btn ${i === currentPage ? 'active' : ''}`;
                    pageBtn.textContent = i;
                    pageBtn.onclick = () => {
                        currentPage = i;
                        renderPosts(filteredPosts, currentPage);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    };
                    paginationNumbers.appendChild(pageBtn);
                }

                const prevBtn = document.querySelector('.pagination-btn[onclick="changePage(\'prev\')]');
                const nextBtn = document.querySelector('.pagination-btn[onclick="changePage(\'next\')]');
                if (prevBtn) prevBtn.disabled = currentPage === 1;
                if (nextBtn) nextBtn.disabled = currentPage === totalPages;
            }
        }

        // Function to change page
        window.changePage = function(direction) {
            const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
            if (direction === 'prev' && currentPage > 1) {
                currentPage--;
            } else if (direction === 'next' && currentPage < totalPages) {
                currentPage++;
            }
            renderPosts(filteredPosts, currentPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        // Function to filter posts by search and tags
        window.filterPosts = function() {
            const searchQuery = document.getElementById('search-posts')?.value.toLowerCase() || '';
            const selectedTag = document.getElementById('filter-tags')?.value || '';

            filteredPosts = blogPosts.filter(post => {
                const matchesSearch = post.title.toLowerCase().includes(searchQuery) || post.excerpt.toLowerCase().includes(searchQuery);
                const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
                return matchesSearch && matchesTag;
            });

            currentPage = 1;
            renderPosts(filteredPosts, currentPage);
            // Uncomment if archive is re-enabled
            // renderArchive();
        };

        // Function to render archive (only posts after the first 3 pages of recent updates)
        /* Uncomment if archive section is re-enabled in news.html
        function renderArchive() {
            const archiveGrid = document.getElementById('archive-grid');
            if (archiveGrid) {
                archiveGrid.innerHTML = '';
                const archivePosts = blogPosts.slice(recentPostsLimit);
                const postsByYearMonth = {};
                archivePosts.forEach(post => {
                    const key = `${post.year}-${post.month}`;
                    if (!postsByYearMonth[key]) {
                        postsByYearMonth[key] = { year: post.year, month: post.month, posts: [] };
                    }
                    postsByYearMonth[key].posts.push(post);
                });

                const sortedKeys = Object.keys(postsByYearMonth).sort((a, b) => {
                    const [yearA, monthA] = a.split('-');
                    const [yearB, monthB] = b.split('-');
                    if (yearA !== yearB) return yearB - yearA;
                    const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    return monthOrder.indexOf(monthB) - monthOrder.indexOf(monthA);
                });

                sortedKeys.forEach(key => {
                    const { year, month, posts } = postsByYearMonth[key];
                    const details = document.createElement('details');
                    details.className = 'archive-month';
                    details.innerHTML = `
                        <summary>${month} ${year}</summary>
                        <div class="archive-month-content"></div>
                    `;
                    const content = details.querySelector('.archive-month-content');

                    posts.forEach((post, index) => {
                        const item = document.createElement('div');
                        item.className = `archive-item ${index % 2 === 1 ? 'alt-bg' : ''}`;
                        const authorDisplay = post.authorLink ? `<a href="${post.authorLink}" target="_blank">${post.author}</a>` : post.author;
                        item.innerHTML = `
                            <i class="fas fa-newspaper"></i>
                            <p><a href="${post.link}">${post.date}: ${post.title}</a> - By ${authorDisplay} - Tags: ${post.tags.join(', ')}</p>
                        `;
                        content.appendChild(item);
                    });

                    archiveGrid.appendChild(details);
                });
            }
        }
        */

        // Subscription form handling
        function decodeBase64(str) {
            return atob(str);
        }

        const encodedEmail = "YWZyaWNhLmluaXRpYXRpdmVAdW02cC5tYQ==";
        const emailAddress = decodeBase64(encodedEmail);

        const subscriptionForm = document.getElementById('subscriptionForm');
        if (subscriptionForm) {
            subscriptionForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const email = document.getElementById('subscription-email').value.trim();
                if (!email) {
                    alert('Please enter your email address.');
                    return;
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                const subject = encodeURIComponent('Newsletter Subscription');
                const body = encodeURIComponent(`Please subscribe me to the UM6P - Africa Initiative newsletter.\nEmail: ${email}`);
                const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
                window.location.href = mailtoLink;
                alert('Your email client has been opened with a pre-filled subscription request. Please click "Send" to subscribe to the UM6P - Africa Initiative newsletter.');
            });
        }

        // Floating Sidebar Animation for External Links
        const floatingLinks = document.querySelector('.floating-links');
        if (floatingLinks) {
            floatingLinks.addEventListener('mouseenter', function () {
                floatingLinks.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });

            floatingLinks.addEventListener('mouseleave', function () {
                floatingLinks.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
        }

        // Floating Social Links Animation
        const floatingSocialLinks = document.querySelector('.floating-social-links');
        if (floatingSocialLinks) {
            floatingSocialLinks.addEventListener('mouseenter', function () {
                floatingSocialLinks.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });

            floatingSocialLinks.addEventListener('mouseleave', function () {
                floatingSocialLinks.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
        }

        // Initialize news page
        renderPosts(blogPosts, currentPage);
        // Uncomment if archive is re-enabled
        // renderArchive();
    }

    // Impacts Page Functionality
    if (document.querySelector('.impacts-hero')) { // Check if on collaborators.html
        // Initialize Swiper for Collaborations Carousel
        if (typeof Swiper !== 'undefined') {
            const collaborationSwiper = new Swiper('.collaborations-carousel', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                pagination: {
                    el: '.collaboration-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.collaboration-next',
                    prevEl: '.collaboration-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                },
            });

            // Initialize Swiper for Gallery Carousel
            const gallerySwiper = new Swiper('.gallery-carousel', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                pagination: {
                    el: '.gallery-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.gallery-next',
                    prevEl: '.gallery-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                },
            });
        }
    }
});

