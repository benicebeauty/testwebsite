/* ==========================================
   BE NICE BEAUTY
   HEADER + HERO
========================================== */


const header =
  document.getElementById("siteHeader");

const menuToggle =
  document.getElementById("menuToggle");

const mobileNav =
  document.getElementById("mobileNav");


/* ==========================================
   STICKY HEADER

   At the top:
   TOP BAR + NAVIGATION

   After scrolling:
   TOP BAR disappears
   NAVIGATION stays at the top
========================================== */

function handleHeaderScroll() {

  if (window.scrollY > 40) {

    header.classList.add(
      "is-sticky"
    );

  } else {

    header.classList.remove(
      "is-sticky"
    );

  }

}


window.addEventListener(
  "scroll",
  handleHeaderScroll,
  {
    passive: true
  }
);


handleHeaderScroll();


/* ==========================================
   MOBILE MENU
========================================== */

menuToggle.addEventListener(
  "click",
  () => {

    const isOpen =
      mobileNav.classList.toggle(
        "open"
      );


    menuToggle.setAttribute(
      "aria-expanded",
      isOpen
    );


    document.body.style.overflow =
      isOpen
        ? "hidden"
        : "";

  }
);


/* Close menu after clicking */

mobileNav
  .querySelectorAll("a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        mobileNav.classList.remove(
          "open"
        );

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.style.overflow =
          "";

      }
    );

  });


  /* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right, .reveal-image'
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        observer.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});