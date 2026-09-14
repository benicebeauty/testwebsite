/* ==========================================================================
   BE NICE CLINIC — LUXURY CORE JAVASCRIPT ENGINE (BLOCK 1/2 - V13.0)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function() {

    // ==========================================================================
    // 1. HERO FŐCÍM REVEAL MOTOR — SZÍNVÉDETT SELYMES EMELKEDÉS ÉS FIXÁLT LÁTHATÓSÁG
    // ==========================================================================
    function initLuxuryTitleAnimation() {
        const mainTitle = document.querySelector('.exhibition-main-title');
        if (!mainTitle) return;

        setTimeout(() => {
            const titleAnim = mainTitle.animate([
                { opacity: 0, transform: 'translateY(40px) scaleY(1.05)', filter: 'blur(6px)' },
                { opacity: 0.5, transform: 'translateY(12px) scaleY(1.02)', filter: 'blur(2px)' },
                { opacity: 1, transform: 'translateY(0) scaleY(1)', filter: 'blur(0px)' }
            ], {
                duration: 1600,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                fill: 'forwards'
            });

            titleAnim.onfinish = () => {
                mainTitle.style.setProperty('opacity', '1', 'important');
                mainTitle.style.setProperty('transform', 'translateY(0) scaleY(1)', 'important');
                mainTitle.style.setProperty('filter', 'blur(0px)', 'important');
            };
        }, 200);
    }

    // ==========================================================================
    // 2. HERO ELLIPSZIS GOMB MOTOR — REVEAL OSZTÁLY INDÍTÓ
    // ==========================================================================
    function initLuxuryHeroButton() {
        const desktopBtn = document.querySelector('.desktop-hero-ellipse-btn');
        if (!desktopBtn) return;

        setTimeout(() => {
            desktopBtn.classList.add('visible');
            setTimeout(() => {
                desktopBtn.addEventListener('mouseenter', function() {
                    desktopBtn.style.setProperty('transform', 'scale(0.9)', 'important');
                });
                desktopBtn.addEventListener('mouseleave', function() {
                    desktopBtn.style.setProperty('transform', 'scale(1.0)', 'important');
                });
            }, 1800);
        }, 500);
    }

    // ==========================================================================
    // 3. INTELLIGENS HEADER GÖRDÜLÉS DETEKTOR (STICKY HEADER)
    // ==========================================================================
    const header = document.querySelector('.site-header');
    function handleScroll() {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }

    // ==========================================================================
    // 4. RESPONSIVE HAMBURGER MENÜ KAPCSOLÓ — SMOOTH CSS ÁTMENETTEL
    // ==========================================================================
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.navigation-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }

    // ==========================================================================
    // 5. MOBIL ÉS TABLET PRICES DROPDOWN NYITÓ
    // ==========================================================================
    const dropdownLink = document.querySelector('.dropdown > .nav-link');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownLink && dropdownMenu) {
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 1100) {
                e.preventDefault();
                
                const isVisible = dropdownMenu.classList.toggle('dropdown-visible');
                const listItems = dropdownMenu.querySelectorAll('li');
                
                if (isVisible) {
                    dropdownMenu.classList.add('dropdown-active');
                    const dynamicHeight = dropdownMenu.scrollHeight + 'px';
                    
                    dropdownMenu.animate([
                        { maxHeight: '0px', opacity: 0 },
                        { maxHeight: dynamicHeight, opacity: 1 }
                    ], {
                        duration: 500,
                        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                        fill: 'forwards'
                    });

                    listItems.forEach((li, index) => {
                        li.style.setProperty('opacity', '0', 'important');
                        li.style.setProperty('transform', 'translateY(15px)', 'important');
                        
                        const animationDuration = 550; 
                        const itemDelay = 150 + (index * 120); 
                        
                        setTimeout(() => {
                            const smoothAnim = li.animate([
                                { opacity: 0, transform: 'translateY(15px)' },
                                { opacity: 0.5, transform: 'translateY(5px)' }, 
                                { opacity: 1, transform: 'translateY(0)' }
                            ], {
                                duration: animationDuration,
                                easing: 'cubic-bezier(0.34, 1.3, 0.64, 1)', 
                                fill: 'forwards'
                            });

                            smoothAnim.onfinish = () => {
                                li.style.setProperty('opacity', '1', 'important');
                                li.style.setProperty('transform', 'translateY(0)', 'important');
                            };
                        }, itemDelay);
                    });
                } else {
                    const dynamicHeight = dropdownMenu.scrollHeight + 'px';

                    dropdownMenu.animate([
                        { maxHeight: dynamicHeight, opacity: 1 },
                        { maxHeight: '0px', opacity: 0 }
                    ], {
                        duration: 450,
                        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                        fill: 'forwards'
                    });

                    setTimeout(() => {
                        dropdownMenu.classList.remove('dropdown-active');
                        listItems.forEach(li => {
                            li.style.setProperty('opacity', '0', 'important');
                            li.style.setProperty('transform', 'translateY(15px)', 'important');
                        });
                    }, 450);
                }
            }
        });
    }
    // ==========================================================================
    // 6. ASZIMMETRIKUS ANIMÁCIÓS MOTOR — BIZTONSÁGOS ELLENŐRZÉSSEL ÉS SZEPARÁLÁSSAL
    // ==========================================================================
    function initLuxuryScrollAnimations() {
        const targets = document.querySelectorAll(
            '.editorial-header:not(.hero-linear-section *), .marquee-title-wrapper:not(.hero-linear-section *), ' +
            '.clean-luxury-card:not(.hero-linear-section *), .luxury-intro-column-old:not(.hero-linear-section *), ' +
            '.editorial-service-item-old:not(.hero-linear-section *), ' +
            '.monograph-paper-block:not(.hero-linear-section *), .inkless-form-box:not(.hero-linear-section *), ' +
            '.monumental-map-passepartout:not(.hero-linear-section *), .inkless-row:not(.hero-linear-section *), ' +
            '.treatment-split-row, .treatment-grid-card, .price-interactive-row'
        );

        if (!targets.length || !('IntersectionObserver' in window)) {
            targets.forEach(el => { if(el) el.style.opacity = '1'; });
            return;
        }

        targets.forEach(el => {
            if (!el) return;
            el.style.opacity = '0';
            if (el.classList.contains('treatment-split-row') && !el.classList.contains('reverse')) {
                el.style.transform = 'translateX(100px)';
            } else if (el.classList.contains('treatment-split-row') && el.classList.contains('reverse')) {
                el.style.transform = 'translateX(-100px)';
            } else if (el.classList.contains('luxury-intro-column-old') || el.classList.contains('inkless-row')) {
                el.style.transform = 'translateX(-40px)';
            } else if (el.classList.contains('editorial-service-item-old') || el.classList.contains('inkless-form-box')) {
                el.style.transform = 'translateX(40px)';
            } else {
                el.style.transform = 'translateY(30px)';
            }
        });

        const observerOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.08 };
        
        const scrollObserver = new IntersectionObserver(function(entries, observer) {
            let cardIndex = 0;

            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    if (!el) return;
                    let baseDelay = 200; 
                    let startKeyframe = { opacity: 0 };

                    if (el.classList.contains('treatment-split-row') && !el.classList.contains('reverse')) {
                        startKeyframe.transform = 'translateX(100px)';
                    } else if (el.classList.contains('treatment-split-row') && el.classList.contains('reverse')) {
                        startKeyframe.transform = 'translateX(-100px)';
                    } else if (el.classList.contains('luxury-intro-column-old') || el.classList.contains('inkless-row')) {
                        startKeyframe.transform = 'translateX(-40px)';
                    } else if (el.classList.contains('editorial-service-item-old') || el.classList.contains('inkless-form-box')) {
                        startKeyframe.transform = 'translateX(40px)';
                    } else {
                        startKeyframe.transform = 'translateY(30px)';
                    }

                    if (el.classList.contains('clean-luxury-card') || el.classList.contains('treatment-grid-card') || el.classList.contains('price-interactive-row')) {
                        baseDelay += (cardIndex * 150); 
                        cardIndex++;
                    }

                    setTimeout(() => {
                        el.animate([
                            startKeyframe,
                            { opacity: 1, transform: 'translateX(0) translateY(0)' }
                        ], {
                            duration: 1400, 
                            easing: 'cubic-bezier(0.25, 1, 0.5, 1)', 
                            fill: 'forwards'
                        });

                        el.style.opacity = '1';
                        el.style.transform = 'translateX(0) translateY(0)';
                    }, baseDelay);
                    
                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        targets.forEach(el => { if(el) scrollObserver.observe(el); });
    }
    // ==========================================================================
    // 7. LUXURY CUSTOM DROPDOWN ENGINE (Űrlap Kiválasztó)
    // ==========================================================================
    function initLuxuryCustomDropdown() {
        const dropdown = document.getElementById('custom-inquiry-dropdown');
        if (!dropdown) return; 

        const trigger = dropdown.querySelector('.custom-select-trigger');
        const listItems = dropdown.querySelectorAll('.custom-options-list li');
        const hiddenInput = document.getElementById('contact-type-hidden');

        dropdown.addEventListener('click', function(e) {
            e.stopPropagation(); 
            dropdown.classList.toggle('menu-open');
        });

        listItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation(); 
                const value = this.getAttribute('data-value');
                const text = this.textContent;

                if(trigger) trigger.textContent = text; 
                if (hiddenInput) hiddenInput.value = value; 

                dropdown.classList.remove('menu-open'); 
            });
        });

        document.addEventListener('click', function() {
            dropdown.classList.remove('menu-open');
        });
    }

    // ==========================================================================
    // 8. 4-PIECE LUXURY TAB ENGINE — UNIVERSAL PRICE LIST SYSTEM
    // ==========================================================================
    function initUniversalPriceTabs() {
        const tabButtons = document.querySelectorAll('.price-tab-trigger');
        const tabPanels = document.querySelectorAll('.price-tab-panel');
        if (!tabButtons.length || !tabPanels.length) return; 

        tabButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetTabId = this.getAttribute('data-tab');

                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                tabPanels.forEach(panel => {
                    if (!panel) return;
                    if (panel.id === targetTabId) {
                        panel.classList.add('active');
                        panel.animate([
                            { opacity: 0, transform: 'translateY(15px)' },
                            { opacity: 1, transform: 'translateY(0)' }
                        ], {
                            duration: 600,
                            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                            fill: 'forwards'
                        });
                    } else {
                        panel.classList.remove('active');
                    }
                });
            });
        });
    }

    // ==========================================================================
    // 9. ATOMBIZTOS REVEAL ENGINE — KIFEJEZETTEN A REVIEWS, BLOG ÉS ABOUT LASSÍTÁSÁHOZ
    // ==========================================================================
    function initLuxuryStaticInnerLoads() {
        const isMobile = window.innerWidth <= 650;

        // A, REVIEWS OLDAL LASSÍTOTT HULLÁMA
        const reviewCards = document.querySelectorAll('.reviews-masonry-grid .review-masonry-card');
        if (reviewCards.length) {
            reviewCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(25px)';
                
                setTimeout(() => {
                    card.animate([
                        { opacity: 0, transform: 'translateY(25px)' },
                        { opacity: 1, transform: 'translateY(0)' }
                    ], {
                        duration: 1500,
                        easing: 'cubic-bezier(0.25, 1, 0.3, 1)',
                        fill: 'forwards'
                    });
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * (isMobile ? 100 : 180));
            });
        }

        // B, BLOG ÉS ABOUT US OLDALAK BIZTONSÁGI AZONNALI LASSU BEÚSZÁSA
        const staticGrids = document.querySelectorAll('.journal-isolated-3grid, .inner-page-body .modern-collage-journal');
        staticGrids.forEach(grid => {
            if (!grid) return;
            grid.style.opacity = '0';
            grid.style.transform = 'translateY(15px)';
            
            setTimeout(() => {
                grid.animate([
                    { opacity: 0, transform: 'translateY(15px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 1500,
                    easing: 'cubic-bezier(0.25, 1, 0.3, 1)',
                    fill: 'forwards'
                });
                grid.style.opacity = '1';
                grid.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    // ==========================================================================
    // RENDSZERINDÍTÁSOK BIZTONSÁGOS AKTIVÁLÁSA
    // ==========================================================================
    initLuxuryTitleAnimation(); 
    initLuxuryHeroButton();
    initLuxuryScrollAnimations();
    initLuxuryCustomDropdown();
    initUniversalPriceTabs(); 
    initLuxuryStaticInnerLoads(); 
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', function() {
        handleScroll(); 
    });
});
