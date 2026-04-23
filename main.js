/**
 * NOTIDE — Main JavaScript
 * Vanilla JS · No Frameworks · No Libraries
 * Features: Mobile Nav · Newsletter Popup · Scroll Reveal · Lazy Images
 */

'use strict';

/* =============================================================
   1. MOBILE NAVIGATION
   ============================================================= */
(function () {
  const toggle    = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function () {
    const isOpen = mobileNav.classList.contains('is-open');

    if (isOpen) {
      mobileNav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileNav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close on link click (mobile nav)
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      mobileNav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* =============================================================
   2. ACTIVE NAV LINK
   Marks the current page link in the nav as active.
   ============================================================= */
(function () {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* =============================================================
   3. SCROLL REVEAL
   Lightweight IntersectionObserver-based reveal.
   Add class "reveal" to any element to animate it in.
   ============================================================= */
(function () {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  // If browser doesn't support IntersectionObserver, just show everything
  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(function (el) { observer.observe(el); });
})();

/* =============================================================
   4. LAZY LOAD IMAGES
   Uses native loading="lazy" where supported, with a fallback.
   Add data-src="..." to images you want lazy-loaded.
   ============================================================= */
(function () {
  const lazyImages = document.querySelectorAll('img[data-src]');

  if (!lazyImages.length) return;

  // Native lazy loading supported → just set src
  if ('loading' in HTMLImageElement.prototype) {
    lazyImages.forEach(function (img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
    return;
  }

  // Fallback: IntersectionObserver
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    lazyImages.forEach(function (img) { imgObserver.observe(img); });
    return;
  }

  // Last resort: load all images immediately
  lazyImages.forEach(function (img) {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });
})();

/* =============================================================
   5. NEWSLETTER POPUP
   Shows after 12 seconds or when user scrolls 60% of the page.
   Stored in sessionStorage so it only shows once per session.
   ============================================================= */
(function () {
  const popup      = document.getElementById('newsletter-popup');
  if (!popup) return;

  const popupInner = popup.querySelector('.popup-inner');
  const closeBtn   = popup.querySelector('.popup-close');

  // Don't show if already dismissed this session
  if (sessionStorage.getItem('notide_popup_dismissed')) return;

  function showPopup() {
    popup.classList.add('is-visible');
    popup.setAttribute('aria-hidden', 'false');
  }

  function hidePopup() {
    popup.classList.remove('is-visible');
    popup.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem('notide_popup_dismissed', '1');
    clearTimeout(timer);
    document.removeEventListener('scroll', onScroll);
  }

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', hidePopup);
  }

  // Click outside popup inner to close
  popup.addEventListener('click', function (e) {
    if (e.target === popup) hidePopup();
  });

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popup.classList.contains('is-visible')) {
      hidePopup();
    }
  });

  // Timer trigger: 12 seconds
  const timer = setTimeout(showPopup, 12000);

  // Scroll trigger: 60% of page height
  function onScroll() {
    const scrolled    = window.scrollY + window.innerHeight;
    const docHeight   = document.documentElement.scrollHeight;
    const percentage  = scrolled / docHeight;

    if (percentage > 0.6) {
      showPopup();
      document.removeEventListener('scroll', onScroll);
    }
  }

  document.addEventListener('scroll', onScroll, { passive: true });
})();

/* =============================================================
   6. NEWSLETTER FORM HANDLING
   Placeholder: replace action URL / add fetch call for your
   actual newsletter provider (e.g. Mailchimp, Brevo, etc.)
   ============================================================= */
(function () {
  const forms = document.querySelectorAll('.js-newsletter-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function () {
      const submitBtn = form.querySelector('button[type="submit"], .btn');

      if (submitBtn) {
        submitBtn.textContent = 'Wird eingetragen...';
        submitBtn.disabled = true;
      }
    });
  });
})();

/* =============================================================
   7. CONTACT FORM HANDLING
   Placeholder: replace with your actual form backend.
   ============================================================= */
(function () {
  const contactForm = document.querySelector('.js-contact-form');

  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // -------------------------------------------------------
    // TODO: Replace with actual form handler.
    // Example: Formspree, Netlify Forms, custom endpoint, etc.
    // Action URL: [CONTACT_FORM_ACTION_URL]
    // -------------------------------------------------------

    if (submitBtn) {
      const originalText    = submitBtn.textContent;
      submitBtn.textContent = 'Nachricht gesendet.';
      submitBtn.disabled    = true;

      setTimeout(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled    = false;
        contactForm.reset();
      }, 3000);
    }
  });
})();

/* =============================================================
   8. YEAR IN FOOTER
   Auto-updates copyright year.
   ============================================================= */
(function () {
  const yearEl = document.querySelector('.js-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
