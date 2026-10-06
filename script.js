/* ==========================================
   BE NICE BEAUTY
========================================== */

(() => {
  function initSite() {
    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    /* ==========================================
       HEADER
    ========================================== */

    if (header) {
      function updateHeader() {
        header.classList.toggle(
          "is-sticky",
          window.scrollY > 40
        );
      }

      updateHeader();

      window.addEventListener("scroll", updateHeader, {
        passive: true
      });
    }

    /* ==========================================
       MOBILE MENU
    ========================================== */

    if (menuToggle && mobileNav) {
      menuToggle.setAttribute("aria-controls", "mobileNav");

      function setMenuOpen(isOpen, restoreFocus = false) {
        mobileNav.classList.toggle("open", isOpen);
        menuToggle.classList.toggle("open", isOpen);

        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

        menuToggle.setAttribute(
          "aria-label",
          isOpen ? "Close menu" : "Open menu"
        );

        document.body.style.overflow = isOpen ? "hidden" : "";

        if (restoreFocus) {
          menuToggle.focus();
        }
      }

      setMenuOpen(false);

      menuToggle.addEventListener("click", () => {
        setMenuOpen(
          menuToggle.getAttribute("aria-expanded") !== "true"
        );
      });

      mobileNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          setMenuOpen(false);
        });
      });

      document.addEventListener("keydown", event => {
        if (
          event.key === "Escape" &&
          mobileNav.classList.contains("open")
        ) {
          setMenuOpen(false, true);
        }
      });

      window.matchMedia("(min-width: 1101px)")
        .addEventListener("change", event => {
          if (event.matches) setMenuOpen(false);
        });
    }

    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-image"
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (
      "IntersectionObserver" in window &&
      !reducedMotion.matches
    ) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.15,
         rootMargin: document.body.matches(
  ".contact-page, .about-page, .blog-page"
)
            ? "0px 0px -120px 0px"
            : "0px 0px -40px 0px"
        }
      );

      revealElements.forEach(element => {
        revealObserver.observe(element);
      });
    } else {
      revealElements.forEach(element => {
        element.classList.add("is-visible");
      });
    }

    /* ==========================================
       TREATMENTS TABS
    ========================================== */

    const tabList = document.querySelector(".bn-tabs");

    if (tabList) {
      const catalog = document.querySelector(".bn-catalog");

      const tabs = Array.from(
        tabList.querySelectorAll('[role="tab"]')
      );

      const panels = tabs.map(tab =>
        document.getElementById(
          tab.getAttribute("aria-controls")
        )
      );

      if (
        tabs.length !== 4 ||
        panels.some(panel => !panel) ||
        new Set(panels).size !== tabs.length
      ) {
        console.error(
          "Treatments tabs: each of the four tabs must have " +
          "an aria-controls value matching a different panel ID."
        );
      } else {
        const categories = tabs.map(tab =>
          tab.id.replace("tab-", "")
        );

        /* Use the existing Treatments page styles. */
        document.body.classList.add("treatments-page");

        function updateHeaderHeight() {
          const height = header
            ? header.getBoundingClientRect().height
            : 0;

          document.body.style.setProperty(
            "--bn-header-height",
            `${height}px`
          );
        }

        updateHeaderHeight();

        if (header && "ResizeObserver" in window) {
          const observer = new ResizeObserver(
            updateHeaderHeight
          );

          observer.observe(header);
        } else {
          window.addEventListener(
            "resize",
            updateHeaderHeight
          );

          window.addEventListener(
            "scroll",
            updateHeaderHeight,
            { passive: true }
          );

          if (header) {
            header.addEventListener(
              "transitionend",
              updateHeaderHeight
            );
          }
        }

        function headerHeight() {
          return header
            ? header.getBoundingClientRect().height
            : 0;
        }

        function catalogReached() {
          return catalog &&
            catalog.getBoundingClientRect().top <=
            headerHeight() + 1;
        }

        function scrollToCatalog() {
          if (!catalog) return;

          const top =
            catalog.getBoundingClientRect().top +
            window.scrollY -
            headerHeight();

          window.scrollTo({
            top: Math.max(0, top),
            behavior: "instant"
          });
        }

        function updateUrl(index) {
          try {
            window.history.replaceState(
              null,
              "",
              `#${categories[index]}`
            );
          } catch {
            // Tab switching also works without a URL update.
          }
        }

        function activateTab(index, options = {}) {
          const {
            focus = false,
            scroll = false,
            remember = false
          } = options;

          tabs.forEach((tab, position) => {
            const selected = position === index;

            tab.setAttribute(
              "aria-selected",
              String(selected)
            );

            tab.tabIndex = selected ? 0 : -1;
            panels[position].hidden = !selected;
          });

          if (focus) {
            tabs[index].focus({ preventScroll: true });
          }

          if (remember) updateUrl(index);
          if (scroll) scrollToCatalog();
        }

        tabs.forEach((tab, index) => {
          tab.addEventListener("click", event => {
            event.preventDefault();

            activateTab(index, {
              scroll: Boolean(catalogReached()),
              remember: true
            });
          });
        });

        tabList.addEventListener("keydown", event => {
          const index = tabs.indexOf(document.activeElement);
          if (index === -1) return;

          let nextIndex;

          switch (event.key) {
            case "ArrowRight":
              nextIndex = (index + 1) % tabs.length;
              break;

            case "ArrowLeft":
              nextIndex =
                (index - 1 + tabs.length) % tabs.length;
              break;

            case "Home":
              nextIndex = 0;
              break;

            case "End":
              nextIndex = tabs.length - 1;
              break;

            default:
              return;
          }

          event.preventDefault();

          activateTab(nextIndex, {
            focus: true,
            scroll: Boolean(catalogReached()),
            remember: true
          });
        });

        function indexFromHash() {
          return categories.indexOf(
            window.location.hash.slice(1).toLowerCase()
          );
        }

        document.querySelectorAll(
          'a[href="#facial"], a[href="#aesthetic"], ' +
          'a[href="#laser"], a[href="#waxing"]'
        ).forEach(link => {
          link.addEventListener("click", event => {
            const index = categories.indexOf(
              link.getAttribute("href").slice(1)
            );

            if (index === -1) return;

            event.preventDefault();

            activateTab(index, {
              focus: true,
              scroll: true,
              remember: true
            });
          });
        });

        window.addEventListener("hashchange", () => {
          const index = indexFromHash();
          if (index === -1) return;

          activateTab(index, {
            focus: Boolean(
              catalog &&
              catalog.contains(document.activeElement)
            ),
            scroll: true
          });
        });

        const initialIndex = indexFromHash();

        activateTab(initialIndex === -1 ? 0 : initialIndex);

        if (initialIndex !== -1) {
          const positionCategory = () => {
            requestAnimationFrame(scrollToCatalog);
          };

          if (document.readyState === "complete") {
            positionCategory();
          } else {
            window.addEventListener(
              "load",
              positionCategory,
              { once: true }
            );
          }
        }
      }
    }

    /* ==========================================
       REVIEWS SLIDER
    ========================================== */

    const reviewsSlider = document.querySelector(
      ".reviews-slider"
    );

    if (reviewsSlider) {
      const slides = Array.from(
        reviewsSlider.querySelectorAll(".review-slide")
      );

      const previous = reviewsSlider.querySelector(
        ".review-prev"
      );

      const next = reviewsSlider.querySelector(
        ".review-next"
      );

      const counter = reviewsSlider.querySelector(
        ".review-current"
      );

      if (slides.length && previous && next && counter) {
        let currentReview = 0;
        let autoplay;
        let pointerInside = false;

        function showReview(index) {
          currentReview =
            (index + slides.length) % slides.length;

          slides.forEach((slide, position) => {
            slide.classList.toggle(
              "active",
              position === currentReview
            );
          });

          counter.textContent = String(
            currentReview + 1
          ).padStart(2, "0");
        }

        function stopAutoplay() {
          window.clearInterval(autoplay);
        }

        function startAutoplay() {
          stopAutoplay();

          if (
            reducedMotion.matches ||
            pointerInside ||
            reviewsSlider.contains(document.activeElement) ||
            document.hidden ||
            slides.length < 2
          ) {
            return;
          }

          autoplay = window.setInterval(() => {
            showReview(currentReview + 1);
          }, 6000);
        }

        next.addEventListener("click", () => {
          showReview(currentReview + 1);
          startAutoplay();
        });

        previous.addEventListener("click", () => {
          showReview(currentReview - 1);
          startAutoplay();
        });

        reviewsSlider.addEventListener("mouseenter", () => {
          pointerInside = true;
          stopAutoplay();
        });

        reviewsSlider.addEventListener("mouseleave", () => {
          pointerInside = false;
          startAutoplay();
        });

        reviewsSlider.addEventListener(
          "focusin",
          stopAutoplay
        );

        reviewsSlider.addEventListener("focusout", () => {
          window.setTimeout(startAutoplay, 0);
        });

        reducedMotion.addEventListener(
          "change",
          startAutoplay
        );

        document.addEventListener(
          "visibilitychange",
          startAutoplay
        );

        showReview(0);
        startAutoplay();
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initSite,
      { once: true }
    );
  } else {
    initSite();
  }
})();