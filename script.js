/* ==========================================================================
   BE NICE BEAUTY — PURIFIED STICKY HEADER JAVASCRIPT ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function() {

    // Megkeressük a globális fejléc elemet a dokumentumban
    const header = document.querySelector('.site-header');
    
    // Passzív eseményfigyelőt használunk, amit az iPhone grafikus chipje (GPU) imádni fog
    window.addEventListener('scroll', function() {
        if (!header) return;
        
        // Amint a vendég 20 pixelnél lejjebb görget, azonnal rárakjuk a felragadási osztályt
        if (window.scrollY > 20) { 
            header.classList.add('header-scrolled'); 
        } else { 
            header.classList.remove('header-scrolled'); 
        }
    }, { passive: true });

});
