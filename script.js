/* ==========================================================================
   BE NICE BEAUTY — ULTIMATE MASTER JAVASCRIPT ENGINE (100% HIÁNYTALAN)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. INTELLIGENS STICKY HEADER DETEKTOR ---
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', function() {
        if (!header) return;
        if (window.scrollY > 20) { 
            header.classList.add('header-scrolled'); 
        } else { 
            header.classList.remove('header-scrolled'); 
        }
    }, { passive: true });

    // --- 2. RESPONSIVE HAMBURGER MENÜ REVEAL MOTOR ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.navigation-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }

    // --- 3. CUSTOM DROPDOWN SELECTION MOTOR (KAPCSOLAT ŰRLAP) ---
    const dropdownContainer = document.getElementById('custom-inquiry-dropdown');
    const hiddenInput = document.getElementById('contact-type-hidden');
    
    if (dropdownContainer) {
        const trigger = dropdownContainer.querySelector('.custom-select-trigger');
        const options = dropdownContainer.querySelectorAll('.custom-options-list li');

        dropdownContainer.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('menu-open');
        });

        options.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const value = this.getAttribute('data-value');
                const text = this.textContent;

                if (trigger) trigger.textContent = text;
                if (hiddenInput) hiddenInput.value = value;
                dropdownContainer.classList.remove('menu-open');
            });
        });

        document.addEventListener('click', function() {
            dropdownContainer.classList.remove('menu-open');
        });
    }

    // --- 4. UNIVERSAL PRICE TABS — INTERAKTÍV FÜLVÁLTÓ MOTOR (AZONNALI JAVÍTÁS) ---
    const tabTriggers = document.querySelectorAll('.price-tab-trigger');
    const tabPanels = document.querySelectorAll('.price-tab-panel');

    if (tabTriggers.length > 0 && tabPanels.length > 0) {
        tabTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                // 1. Kiszedjük az aktív osztályt az összes fül-gombból
                tabTriggers.forEach(t => t.classList.remove('active'));
                // 2. Rátesszük az aktív osztályt arra a gombra, amit megnyomtál
                this.classList.add('active');

                // 3. Elrejtjük az összes tartalompanelt
                tabPanels.forEach(panel => {
                    panel.style.display = 'none';
                    panel.classList.remove('active');
                });

                // 4. Megkeressük és fenségesen kinyitjuk a kiválasztott fülhöz tartozó panelt
                const targetId = this.getAttribute('data-target') || this.getAttribute('href');
                if (targetId) {
                    const targetPanel = document.querySelector(targetId);
                    if (targetPanel) {
                        targetPanel.style.display = 'block';
                        // Kis késleltetést adunk neki, hogy a CSS animáció selymesen lefusson
                        setTimeout(() => {
                            targetPanel.classList.add('active');
                        }, 10);
                    }
                }
            });
        });
    }

    // --- 5. GÖRDÜLÉSI ANIMÁCIÓ REVEAL MOTOR (IPHONE GPU READY) ---
    const scrollSections = document.querySelectorAll('.linear-grid-section, .premium-services-section-old, .museum-monograph-section, .journal-content-section');
    
    function checkSectionReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        
        scrollSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add('revealed');
            }
        });
    }

    checkSectionReveal();
    window.addEventListener('scroll', checkSectionReveal, { passive: true });
});

